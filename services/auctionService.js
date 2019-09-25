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
        if(Auction.findById(auction.id) == null)
        {
            console.log(auction);
        }

           /* The art id provided within the body must be a valid art id with its
property isAuctionItem set to true. If the isAuctionItem is set to false, the web
service should return a status code 412 (Precondition failed). Also if there is an
ongoing auction currently for this art, the web service should return a status code 409
(Conflict). */
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
