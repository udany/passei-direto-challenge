import {setOrReturnKey} from '../../shared/base/General';
import {DatabaseQueryCondition} from "./DatabaseQueryComponent";

/**
 * @name DatabaseRelationship
 * @property {Function} model The model
 * @property {Function} externalModel The external model
 *
 * @property {string} property The property the relationship is stored within the current model
 *
 * @property {string} localKey A field that identifies the current model within itself
 * @property {string} localForeignKey A field that identifies the external model within the current model
 *
 * @property {string} externalKey A field that identifies the external model within itself
 * @property {string} externalForeignKey A field that identifies the current model within the external model
 *
 * @property {Boolean} _readOnly Means the current relationship will only ever query data and never attempt to update it automatically
 * @property {Boolean} _autoload Means the current relationship will always be queried when querying it's own model
 *
 * @property {DatabaseQueryCondition[]|Object[]} filters Filters to apply when querying the relationship
 * @property {string} order Order clause to be used when querying the relationship
 */
export class DatabaseRelationship {
    constructor({
        model,
        externalModel,

        property,

        localKey = '',
        localForeignKey = '',

        externalKey = '',
        externalForeignKey = '',

        readOnly = true,
        autoload = false,

        filters = [],
        order = ''
    }) {
        this.model = model;
        this.externalModel = externalModel;

        this.property = property;

        this.localKey = localKey;
        this.localForeignKey = localForeignKey;

        this.externalKey = externalKey;
        this.externalForeignKey = externalForeignKey;

        this._readOnly = readOnly;
        this._autoload = autoload;

        this.filters = filters;
        this.order = order;
    }

    select(obj) {}

    selectMany(objs) {}

    save(obj) {}

    readonly(v) { return this._setOrReturnKey('_readOnly', v) }
    autoload(v) { return this._setOrReturnKey('_autoload', v) }

    setFilters(f) { this.filters = f; return this; }
    setOrder(o) { this.order = o; return this; }
}
DatabaseRelationship.prototype._setOrReturnKey = setOrReturnKey;




export class DatabaseRelationshipOneToMany extends DatabaseRelationship{
    constructor({
        model,
        externalModel,
        property,
        localKey = 'id',
        externalForeignKey
    }) {
        super({model, externalModel, property, localKey, externalForeignKey})
    }

    async select(db, obj) {
        const id = obj[this.localKey];

        const filters = this.filters.concat([
            new DatabaseQueryCondition({
                column: this.externalForeignKey,
                values: id
            })
        ]);

        const result = await this.externalModel.select(db, filters, this.order);

        obj[this.property] = result;

        return result;
    }
}