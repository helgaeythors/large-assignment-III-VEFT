const database = require('../data/db');

const auctionService = () => {
    const getAllAuctions = (cb, errorCb) => {
        database.Auction.find({}, function(err, auctions){
            if(err) { errorCb(err); }
            cb(auctions);
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

        //Check if the art excists
        database.Art.findById(auction.artId, function(err, art){
            if(err) { 
                errorCb(400, "Art wasn't found");  
            }
            else {  
                //Check if it is an auction item         
                if(art.isAuctionItem == false)
                {
                    errorCb(409, "This is not an auction item");    
                }
                else {
                    //Check if there has already an ongoing auction
                    database.Auction.find({ artId: auction.artId }, function(err){
                        if(!err) { 
                            errorCb(412, "There is an ongoing auction");  
                        }
                        else {
                            database.Auction.create(auction, function(err, auction) {
                                if(err) { errorCb(err); }
                                cb(auction);
                            });
                        }
                    });
                }
            }
        });
    };

	const getAuctionBidsWithinAuction = (auctionId, cb, errorCb) => {
        database.AuctionBid.find({ "auctionId": auctionId }, function(err, bids) {
            if (err) { errorCb(err); }
            cb(bids);
        });
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
