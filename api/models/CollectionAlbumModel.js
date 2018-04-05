import {DatabaseField, DatabaseFieldBoolean, DatabaseModel} from "../js/DatabaseModel";
import AlbumTrack from "../../shared/entities/AlbumTrack";

class CollectionAlbumModel extends DatabaseModel {
}

CollectionAlbumModel
    .config({
        table: 'collection-album',
        fields: [
            new DatabaseField({name: 'collectionId', type: 'int', length: 11})
                .setPrimaryKey(true),

            new DatabaseField({name: 'albumId', type: 'int', length: 11})
                .setPrimaryKey(true),
        ],

        insertWithId: true
    });


export default CollectionAlbumModel;