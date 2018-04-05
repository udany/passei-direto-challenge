import Entity from '../base/Entity';
import AlbumTrack from "./AlbumTrack";

/**
 * @name Album
 * @property {number} id
 * @property {string} name
 * @property {string} artist
 * @property {number} releaseYear
 *
 * @property {string} spotifyId
 *
 * @property {string} tempImage
 * @property {string} spotifyImage
 * @property {boolean} hasImage
 * @property {number} imageSeed
 */
export class Album extends Entity {
    getUrl() {
        return `/album/${this.id}`;
    }

    getImageUrl() {
        if (this.tempImage) {
            return `http://localhost:3001/data/temp/${this.tempImage}`;
        } else if(this.hasImage) {
            return `http://localhost:3001/data/album/${this.id}_${this.imageSeed}`;
        } else if(this.spotifyImage) {
            return this.spotifyImage;
        } else {
            return '';
        }
    }
}

Album.Register();
Album.Attributes = [
    new Entity.Attributes.Integer('id'),
    new Entity.Attributes.String('name'),
    new Entity.Attributes.String('artist'),
    new Entity.Attributes.Integer('releaseYear'),

    new Entity.Attributes.EntityList('tracks', AlbumTrack),

    new Entity.Attributes.String('spotifyId'),

    // Cover
    new Entity.Attributes.String('tempImage'),
    new Entity.Attributes.String('spotifyImage'),
    new Entity.Attributes.Boolean('hasImage'),
    new Entity.Attributes.Integer('imageSeed')
];

export default Album;
