import {setOrReturnKey} from '../../shared/base/General';

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

    static save(obj) {

    }


    static getCreateStatement() {
        let lines = [];

        for(let field of this.fields) {
            let line = `    ${_e(field.column)} ${field.getTypeString()} ${field.nullable ? 'NULL' : 'NOT NULL'}`;

            if (field.defaultValue !== null) line += ` DEFAULT ${field.getDefaultValue()}`;

            if (field.autoIncrement) line += ' AUTO_INCREMENT';

            lines.push(line);
        }

        let primaryKeys = this.fields.filter(f => f.primaryKey).map(f => _e(f.name));

        lines.push(`    PRIMARY KEY (${primaryKeys.join(', ')})`);

        return `CREATE TABLE ${_e(this.table)} (\n${lines.join(',\n')}\n) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`;
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
DatabaseField.prototype._setOrReturnKey = setOrReturnKey;