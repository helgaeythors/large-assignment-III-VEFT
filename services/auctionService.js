const Auction = require('../data/db').Auction;

const auctionService = () => {
    const getAllAuctions = (cb, errorCb) => {
        Auction.find({}, function(err, auction){
            if(err) { errorCb(err); }
            cb(auction);
        }); 
    };

    const getAuctionById = (id, cb, errorCb) => {
        Auction.findById(id, function(err, auction){
            if(err) { errorCb(err); }
            cb(auction);
        })
    };

    //VIRKAR EKKI ENN
    const getAuctionWinner = (auctionId, cb, errorCb) => {
        Auction.findById(auctionId, function(err, auction){
            if(err) { errorCb(err); }
            cb(auction.auctionWinner);
        })
    };

	const createAuction = (auction, cb, errorCb) => {
        // Your implementation goes here
    };

	const getAuctionBidsWithinAuction = (auctionId, cb, errorCb) => {
        // Your implementation goes here
    };

	const placeNewBid = (auctionId, customerId, price, cb, errorCb) => {
		// Your implementation goes here
	}

    return {
        getAllAuctions,
        getAuctionById,
        getAuctionWinner,
		createAuction,
		getAuctionBidsWithinAuction,
		placeNewBid
    };
};

module.exports = auctionService();
