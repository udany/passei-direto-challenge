import Collection from "../../shared/entities/Collection";
import {DatabaseField, DatabaseFieldBoolean, DatabaseModel} from "../js/DatabaseEntity";

class CollectionModel extends DatabaseModel {

}

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