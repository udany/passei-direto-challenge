import express from 'express';
import spotify from '../js/Spotify';

let router = express.Router();

router.get('/search', async function (req, res, next) {
    let query = req.query.q;

    await spotify.checkAuth();

    let {body: data} = await spotify.api.searchAlbums(query);

    let results = data.albums.items;

    res.send(results.map(r => spotify.toAlbum(r)));
});

module.exports.path = '/spotify';
module.exports.router = router;
