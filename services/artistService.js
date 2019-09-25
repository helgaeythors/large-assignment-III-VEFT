const Artist = require('../data/db').Artist;

const artistService = () => {
    const getAllArtists = (cb, errorCb) => {
        Artist.find({}, function(err, artist){
            if(err) { errorCb(err); }
            cb(artist);
        }); 
    };

    const getArtistById = (id, cb, errorCb) => {
        Artist.findById(id, function(err, art) {
            if(err) { errorCb(err); }
            cb(art);
        });
    };

    const createArtist = (artist, cb, errorCb) => {
        Artist.create(artist, function(err, result) {
            if (err) { errorCb(err); }
            cb(result);
        });
    };

    return {
        getAllArtists,
        getArtistById,
        createArtist
    };
};

module.exports = artistService();
