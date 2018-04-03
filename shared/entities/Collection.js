import Entity from '../base/Entity';

/**
 * @name Map
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {Date} dateCreated
 * @property {Date} dateUpdated
 * @property {boolean} hasImage
 */
export class Collection extends Entity {
    getUrl() {
        return `/collection/${this.id}`;
    }
    getImageUrl() {
        return `/mock/collection/${this.id}.jpg`;
    }
}

Collection.Register();
Collection.Attributes = [
    new Entity.Attributes.Integer('id'),
    new Entity.Attributes.String('name'),
    new Entity.Attributes.String('description'),
    new Entity.Attributes.Date('dateCreated', true),
    new Entity.Attributes.Date('dateUpdated', true),
    new Entity.Attributes.Boolean('hasImage')
];

export default Collection;
