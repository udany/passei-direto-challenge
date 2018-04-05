import {DatabaseField, DatabaseFieldBoolean, DatabaseModel} from "../js/DatabaseEntity";
import Album from "../../shared/entities/Album";

class AlbumModel extends DatabaseModel {

}

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
        ]
    });


export default AlbumModel;