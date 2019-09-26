const database = require('../data/db');

const auctionService = () => {
    const getAllAuctions = (cb, errorCb) => {
        database.Auction.find({}, function(err, auction){
            if(err) { errorCb(err); }
            cb(auction);
        }); 
    };

    const getAuctionById = (id, cb, errorCb) => {
        database.Auction.findById(id, function(err, auction){
            if(err) { errorCb(err); }
            cb(auction);
        })
    };

    const getAuctionWinner = (auctionId, cb, errorCb) => {
        database.Auction.findById(auctionId, function(err, auction) {
            if (err) {
                errorCb(500, err);
            }
            else {
                var returnObj = {};
                
                // check if the auction is not finished
                if (auction.endDate > new Date()) {
                    errorCb(409, "This auction is ongoing"); 
                }
                else {
                    // find bids
                    database.AuctionBid.find({ "auctionId": auction.id }, function(err, bids) { 
                        if (err) { 
                            errorCb(500, err);
                        }
                        else {
                            // check if no results
                            if (bids.length <= 0) { 
                                errorCb(200, "This auction had no bids."); 
                            }
                            else {
                                // return winner
                                var highestBid = Math.max.apply(Math, bids.map(function(bid) { return bid.price; }))
                                var objHighestBid = bids.find(bid => bid.price = highestBid);
                                database.Customer.findById(objHighestBid.customerId, function(err, customer) {
                                    if (err) { errorCb(err); }
                                    returnObj.customer = customer;
                                    
                                    // return the object with cb function
                                    cb(returnObj);
                                });
                            }
                        }
                    });
                }
            }
        });
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
