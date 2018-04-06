import Entity from '../base/Entity';
import MusicFile from "../util/MusicFile";

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
 *
 * @property {MusicFile} sound
 */
export class AlbumTrack extends Entity {
    constructor(...args) {
        super(...args);

        if (this.previewUrl) {
            this.getSound();
        }
    }

    getDurationString() {
        let sec = Math.floor(this.duration/1000);
        let min = Math.floor(sec/60);
        sec = sec % 60;

        return `${min}:${sec.pad(2)}`;
    }

    getSound() {
        if (!this.sound) {
            this.sound = new MusicFile(this.previewUrl);
        }

        return this.sound;
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
