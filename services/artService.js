const mongoose = require('mongoose');
const Art = require('../data/db').Art;
const Artist = require('../data/db').Artist;

const artService = () => {
   
    const getAllArts = (cb, errorCb) => {
        Art.find({}, function(err, arts) {
            if (err) { errorCb(404, "Arts were not found"); }
            cb(arts);
        });
    };

    const getArtById = (id, cb, errorCb) => {
        Art.findById(id, function(err, art) {
            if (err) { errorCb(404, "Art was not found"); }
            cb(art);
        });
    };
 
    const createArt = (art, cb, errorCb) => {
        // first check if artist id exists   
        Artist.findById(art.artistId, function(err, artist) {
            if (err) { errorCb(400, "Artist was not found"); }
            // If it exists then create the art
            if (artist != null) { 
                Art.create(art, function(err, art) {
                    if (err) { errorCb(500, "Create art failed"); }
                    cb(art);
                });
            }
            else {
                errorCb(400, "Invalid artist ID");
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
