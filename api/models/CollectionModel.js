import Collection from "../../shared/entities/Collection";
import {DatabaseField, DatabaseFieldBoolean, DatabaseModel} from "../js/DatabaseModel";
import DynamicFile from "../js/DynamicFile";

class CollectionModel extends DatabaseModel {
    /**
     * Saves the cover image if tempImage is set
     * @param {Object} db
     * @param {Collection} obj
     * @returns {Promise.<boolean>}
     */
    static async saveImage(db, obj) {
        if (obj.id && obj.tempImage) {
            // Delete current image
            this.imageFile.remove(obj);

            // Update info
            obj.imageSeed = DynamicFile.getModificationTime(DynamicFile.getTempFilePath(obj.tempImage));
            obj.hasImage = true;

            // Move new image
            this.imageFile.save(obj, obj.tempImage);

            // Save data
            await this.save(db, obj, ['imageSeed', 'hasImage']);

            obj.tempImage = '';

            return true;
        }

        return false;

    }
}

CollectionModel.imageFile = new DynamicFile(o => o.id + '_' + o.imageSeed, 'collection');

CollectionModel
    .config({
        table: 'collection',
        entity: Collection,
        fields: [
            new DatabaseField({name: 'id', type: 'int', length: 11})
                .setAutoIncrement(true).setPrimaryKey(true),

            new DatabaseField({name: 'name', type: 'varchar', length: 256})
                .setDefault(''),

            new DatabaseField({name: 'description', type: 'text'})
                .setDefault(''),

            new DatabaseFieldBoolean({name: 'hasImage', type: 'tinyint', length: 1})
                .setDefault(0),

            new DatabaseField({name: 'imageSeed', type: 'int', length: 11}),
        ]
    });


export default CollectionModel;