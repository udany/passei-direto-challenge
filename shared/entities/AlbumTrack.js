import Entity from '../base/Entity';

/**
 * @name AlbumTrack
 * @property {number} id
 * @property {number} albumId
 *
 * @property {number} number
 * @property {string} name
 * @property {number} duration Duration in ms
 *
 * @property {string} spotifyId
 * @property {string} previewUrl
 */
export class AlbumTrack extends Entity {
    getDurationString() {
        let sec = Math.floor(this.duration/1000);
        let min = Math.floor(sec/60);
        sec = sec % 60;

        return `${min}:${sec.pad(1)}`;
    }
}

AlbumTrack.Register();
AlbumTrack.Attributes = [
    new Entity.Attributes.Integer('id'),
    new Entity.Attributes.Integer('albumId'),

    new Entity.Attributes.Integer('number'),
    new Entity.Attributes.String('name'),
    new Entity.Attributes.Integer('duration'),

    new Entity.Attributes.String('spotifyId'),
    new Entity.Attributes.String('previewUrl')
];

export default AlbumTrack;
