import {DatabaseField, DatabaseFieldBoolean, DatabaseModel} from "../js/DatabaseEntity";
import AlbumTrack from "../../shared/entities/AlbumTrack";

class AlbumTrackModel extends DatabaseModel {
}

AlbumTrackModel
    .config({
        table: 'album-track',
        entity: AlbumTrack,
        fields: [
            new DatabaseField({name: 'id', type: 'int', length: 11})
                .setAutoIncrement(true).setPrimaryKey(true),

            new DatabaseField({name: 'albumId', type: 'int', length: 11}),


            new DatabaseField({name: 'number', type: 'smallint', length: 4})
                .setDefault(0),

            new DatabaseField({name: 'name', type: 'varchar', length: 256})
                .setDefault(''),

            new DatabaseField({name: 'duration', type: 'int', length: 11})
                .setDefault(0),


            new DatabaseField({name: 'spotifyId', type: 'varchar', length: 22})
                .setDefault(''),

            new DatabaseField({name: 'previewUrl', type: 'text'})
                .setDefault(''),
        ]
    });


export default AlbumTrackModel;