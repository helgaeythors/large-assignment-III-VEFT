const Art = require('../data/db').Art;

const artService = () => {
   
    const getAllArts = (cb, errorCb) => {
        Art.find({}, function(err, arts) {
            if (err) { errorCb(err); }
            cb(arts);
        });
    };

    const getArtById = (id, cb, errorCb) => {
        // Your implementation goes here
    };

    const createArt = (art, cb, errorCb) => {
        // Your implementation goes here
    };

    return {
        getAllArts,
        getArtById,
        createArt
    };
};

module.exports = artService();
