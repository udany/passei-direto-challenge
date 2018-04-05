import {DatabaseField, DatabaseFieldBoolean, DatabaseModel} from "../js/DatabaseEntity";
import Album from "../../shared/entities/Album";
import DynamicFile from "../js/DynamicFile";
import {DatabaseRelationshipOneToMany} from "../js/DatabaseRelationship";
import AlbumTrackModel from "./AlbumTrackModel";

class AlbumModel extends DatabaseModel {
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

AlbumModel.imageFile = new DynamicFile(o => o.id + '_' + o.imageSeed, 'album');

AlbumModel
    .config({
        table: 'album',
        entity: Album,

        fields: [
            new DatabaseField({name: 'id', type: 'int', length: 11})
                .setAutoIncrement(true).setPrimaryKey(true),

            new DatabaseField({name: 'name', type: 'varchar', length: 256})
                .setDefault(''),

            new DatabaseField({name: 'artist', type: 'varchar', length: 256})
                .setDefault(''),

            new DatabaseField({name: 'releaseYear', type: 'smallint', length: 4})
                .setDefault(0),

            new DatabaseField({name: 'popularity', type: 'tinyint', length: 3})
                .setDefault(0),


            new DatabaseField({name: 'spotifyId', type: 'varchar', length: 22})
                .setDefault(''),


            new DatabaseFieldBoolean({name: 'hasImage', type: 'tinyint', length: 1})
                .setDefault(0),

            new DatabaseField({name: 'imageSeed', type: 'int', length: 11})
                .setDefault(0),
        ],

        relationships: [
            (new DatabaseRelationshipOneToMany({
                model: AlbumModel,
                externalModel: AlbumTrackModel,
                property: 'albums',
                externalForeignKey: 'albumId'
            })).autoload(true).readonly(false)
        ]
    });


export default AlbumModel;