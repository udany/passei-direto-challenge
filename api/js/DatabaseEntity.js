import {setOrReturnKey} from '../../shared/base/General';
import {DatabaseQueryClause, DatabaseQueryComponent, DatabaseQueryCondition} from "./DatabaseQueryComponent";

export function dbBacktick(val) {
    return`\`${val}\``;
}
const _e = dbBacktick;


export class DatabaseModel {

    static config({
        table,
        entity,
        fields = []
    }) {
        this.table = table;
        this.entity = entity;

        /** @type {DatabaseField[]} */
        this.fields = fields;

        this._insertWithId = false;

        return this;
    }

    static insertWithId(v){
        return this._setOrReturnKey('_insertWithId', v);
    }

    static async save(db, obj, allowedFields = [], insert = false) {
        const pks = this.primaryKeys();
        const exists = pks.reduce((v, pk) => v && obj[pk.name], true);

        const fields = this.fields.filter(f => !allowedFields.length || allowedFields.indexOf(f.name) >= 0 || pks.indexOf(f) >= 0);

        const data = fields.reduce((d, f) => {
            d[f.name] = f.get(obj);
            return d;
        }, {});

        if (insert || !exists) {
            const query = this.getInsertQuery(data);

            const result = await db.query(query, data);
            const [insertData] = result;

            if (!this.insertWithId()) {
                if (insertData.insertId) {
                    const aiPk = pks.find(x => x.autoIncrement);
                    if (aiPk) {
                        aiPk.set(obj, insertData.insertId);
                    }
                }
            }

            return result;
        } else {
            const query = this.getUpdateQuery(data);

            return db.query(query, data);
        }
    }

    /**
     * Queries the database for entries
     * @param db
     * @param {DatabaseQueryComponent[]|Object[]} filters
     * @param {String[]} fieldNames
     * @returns {Entity[]}
     */
    static async select(db, filters = [], fieldNames = []) {
        if (!filters.length) {
            filters.push(new DatabaseQueryCondition({
                values: 1,
                column: 1,
                bound: false,
                escapeColumn: false
            }));
        }

        filters = filters.map(f => f instanceof DatabaseQueryComponent ? f : new DatabaseQueryCondition(f));

        const where = new DatabaseQueryClause(filters, "AND");

        const query = this.getSelectQuery(where, fieldNames);
        const params = where.getParams();

        let [rows] = await db.query(query, params);

        return rows.map(r => new this.entity(r));
    }

    static async getById(db, id) {
        if (!Array.isArray(id)) id = [id];

        const pks = this.primaryKeys();
        let filters = [];

        for (let [index, field] of pks.entries()) {
            filters.push({
                column: field.name,
                values: id[index]
            });
        }

        let result = await this.select(db, filters);

        return result.length ? result[0] : null;
    }

    /**
     * Returns a select query
     * @param {DatabaseQueryComponent} where
     * @param {String[]} fieldNames
     * @returns {string}
     */
    static getSelectQuery(where = null, fieldNames = []) {
        const fields = this.fields.filter(f => !fieldNames.length || fieldNames.indexOf(f.name) >= 0);

        const columns = fields.map(f => _e(f.name));

        if (!where) {
            where = new DatabaseQueryCondition({
                values: 1,
                column: 1,
                bound: false,
                escapeColumn: false
            });
        }

        return `SELECT ${columns.join(', ')} FROM ${_e(this.table)} WHERE ${where.getClause()}`;
    }

    static getInsertQuery(data) {
        const pks = this.primaryKeys();
        data = JSON.parse(JSON.stringify(data));

        if (!this.insertWithId()) {
            pks.forEach(pk => {
                delete data[pk.name];
            });
        }

        let keys = [];
        let values = [];

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                keys.push(_e(key));
                values.push(':'+key);
            }
        }

        return `INSERT INTO ${_e(this.table)} (${keys.join(', ')}) VALUES (${values.join(', ')})`;
    }

    static getUpdateQuery(data) {
        const pks = this.primaryKeys();
        data = JSON.parse(JSON.stringify(data));

        let idData = {};

        pks.forEach(pk => {
            idData[pk.name] = data[pk.name];
            delete data[pk.name];
        });

        let sets = [];
        let where = [];

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                sets.push(`${_e(key)} = :${key}`);
            }
        }

        for (let key in idData) {
            if (idData.hasOwnProperty(key)) {
                where.push(`${_e(key)} = :${key}`);
            }
        }

        return `UPDATE ${_e(this.table)} SET ${sets.join(', ')} WHERE ${where.join(', ')}`;
    }

    static getCreateStatement() {
        let lines = [];

        for(let field of this.fields) {
            let line = `    ${_e(field.column)} ${field.getTypeString()} ${field.nullable ? 'NULL' : 'NOT NULL'}`;

            if (field.defaultValue !== null) line += ` DEFAULT ${field.getDefaultValue()}`;

            if (field.autoIncrement) line += ' AUTO_INCREMENT';

            lines.push(line);
        }

        let primaryKeys = this.primaryKeys().map(f => _e(f.name));

        lines.push(`    PRIMARY KEY (${primaryKeys.join(', ')})`);

        return `CREATE TABLE ${_e(this.table)} (\n${lines.join(',\n')}\n) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`;
    }

    static primaryKeys() {
        return this.fields.filter(f => f.primaryKey);
    }
}
DatabaseModel._setOrReturnKey = setOrReturnKey;


export class DatabaseField {
    constructor(options) {
        this.name = '';
        this.type = '';
        this.length = 0;
        this.unsigned = false;
        this.nullable = false;
        this.defaultValue = null;
        this.autoIncrement = false;
        this.primaryKey = false;
        this.unique = false;

        /** @type {Function} */
        this.getFunction = null;
        /** @type {Function} */
        this.setFunction = null;

        if (options) Object.assign(this, options);

        this.column = this.column ? this.column : this.name;
    }

    setType(v){
        return this._setOrReturnKey('type', v);
    }
    setPrimaryKey(v){
        return this._setOrReturnKey('primaryKey', v);
    }
    setUnsigned(v){
        return this._setOrReturnKey('unsigned', v);
    }
    setNullable(v){
        return this._setOrReturnKey('nullable', v);
    }
    setLength(v){
        return this._setOrReturnKey('length', v);
    }
    setDefault(v){
        return this._setOrReturnKey('defaultValue', v);
    }
    setAutoIncrement(v){
        return this._setOrReturnKey('autoIncrement', v);
    }
    setUnique(v){
        return this._setOrReturnKey('unique', v);
    }

    baseGet(o) {
        return o[this.name];
    }

    baseSet(o, val) {
        o[this.name] = val;
    }

    get(o) {
        return this.getFunction ? this.getFunction(o) : this.baseGet(o);
    }

    set(o, val) {
        return this.setFunction ? this.setFunction(o, val) : this.baseSet(o, val);
    }

    getTypeString() {
        return this.type + (this.length ? `(${this.length})` : '') + (this.unsigned ? ' unsigned' : '')
    }
    getDefaultValue() {
        if (typeof this.defaultValue === 'string') {
            return `"${this.defaultValue}"`;
        } else {
            return this.defaultValue;
        }
    }
}

export class DatabaseFielfBoolean extends DatabaseField {
    baseGet(o) {
        return o[this.name] ? 0 : 1;
    }

    baseSet(o, val) {
        o[this.name] = !!val;
    }
}
DatabaseField.prototype._setOrReturnKey = setOrReturnKey;