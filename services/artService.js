const mongoose = require('mongoose');
const Art = require('../data/db').Art;
const Artist = require('../data/db').Artist;

const artService = () => {
   
    const getAllArts = (cb, errorCb) => {
        Art.find({}, function(err, arts) {
            if (err) { errorCb(err); }
            cb(arts);
        });
    };

    const getArtById = (id, cb, errorCb) => {
        Art.findById(id, function(err, art) {
            if (err) { errorCb(err); }
            cb(art);
        });
    };

/*     const createArt = (art, cb, errorCb) => {
        // TODO: first check if artist id exists
        Art.create(art, function(err, art) {
            if (err) { errorCb(err); }
            cb(art);
        });
    }; */
 
    const createArt = (art, cb, errorCb) => {
        // first check if artist id exists   
        Artist.findById(art.artistId, function(err, artist) {
            if (err) { errorCb(err); }
            // If it exists then create the art
            if (artist != null) { 
                Art.create(art, function(err, art) {
                    if (err) { errorCb(err); }
                    cb(art);
                });
            }
            else {
                errorCb("Invalid artist ID");
            }
        });
    };

    return {
        getAllArts,
        getArtById,
        createArt
    };
};

module.exports = artService();
