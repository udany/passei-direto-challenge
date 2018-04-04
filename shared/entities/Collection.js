import Entity from '../base/Entity';

/**
 * @name Collection
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} tempImage
 * @property {Date} dateCreated
 * @property {Date} dateUpdated
 * @property {boolean} hasImage
 * @property {number} imageSeed
 */
export class Collection extends Entity {
    getUrl() {
        return `/collection/${this.id}`;
    }
    getImageUrl() {
        if (this.tempImage) {
            return `http://localhost:3001/data/temp/${this.tempImage}`;
        } else if(this.hasImage) {
            return `http://localhost:3001/data/collection/${this.id}_${this.imageSeed}`;
        } else {
            return '';
        }
    }
}

Collection.Register();
Collection.Attributes = [
    new Entity.Attributes.Integer('id'),
    new Entity.Attributes.String('name'),
    new Entity.Attributes.String('description'),
    new Entity.Attributes.String('tempImage'),
    new Entity.Attributes.Boolean('hasImage'),
    new Entity.Attributes.Integer('imageSeed')
];

export default Collection;
