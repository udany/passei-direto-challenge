import cfg from '../config';
import Album from "../../shared/entities/Album";
var SpotifyWebApi = require('spotify-web-api-node');

const spotify = {
    _authPromise: null,
    authExpiry: 0,

    async start() {
        /**
         *
         * @type {SpotifyWebApi}
         */
        this.api = new SpotifyWebApi({
            clientId: cfg.spotify.clientId,
            clientSecret: cfg.spotify.secret
        });

        let resolve;
        this._authPromise = new Promise((resolveF, reject) => {
            resolve = resolveF;
        });

        await this.getServerSideAuth();

        resolve();
    },


    async getServerSideAuth() {
        // Retrieve an access token.
        let data  = await this.api.clientCredentialsGrant();

        this.api.setAccessToken(data.body['access_token']);

        this.authExpiry = Date.now() + data.body['expires_in'];

        return true;
    },

    async checkAuth() {
        await this._authPromise;

        if (this.authExpiry <= Date.now()) {
            return this.getServerSideAuth();
        } else {
            return true;
        }
    },


    toAlbum(data) {
        const album = new Album();

        album.artist = data.artists.map(x => x.name).join(', ');
        album.name = data.name;
        album.releaseYear = data.release_date.split('-')[0];
        album.spotifyImage = data.images[0].url;
        album.spotifyId = data.id;

        return album;
    }
};

spotify.start();

export default spotify;