import Collection from "../../shared/entities/Collection";
import {DatabaseField, DatabaseModel} from "../js/DatabaseEntity";

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
            new DatabaseField({name: 'dateCreated', type: 'int', length: 11})
                .setDefault(0),
            new DatabaseField({name: 'dateUpdated', type: 'int', length: 11})
                .setDefault(0),
            new DatabaseField({name: 'hasImage', type: 'tinyint', length: 1})
                .setDefault(0),
        ]
    });


export default CollectionModel;