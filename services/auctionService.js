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

    // TODO: VIRKAR EKKI ENN
    const getAuctionWinner = (auctionId, cb, errorCb) => {
        /*database.Auction.findById(auctionId, function(err, auction) {
            if (err) { errorCb(err); }
            var returnVal;
            
            // check if the auction is not finished
            if (auction.endDate > new Date()) { returnVal = "Ongoing"; }
            
            console.log("Here 2");

            // find bids
            database.AuctionBid.find({ "auctionId": auction.id }, function(err, bids) { 
                if (err) { errorCb(err); }
                console.log("Here 3");
                // check if no results
                if (returnVal != null && !bids) { returnVal = "No-bids"; }
                console.log("Here 4");

                // return winner
                var highestBid = Math.max.apply(Math, bids.map(function(bid) { return bid.price; }))
                var objHighestBid = bids.find(bid => bid.price = highestBid);
                console.log("Here 5");
                console.log(objHighestBid);
                database.Customer.findById(objHighestBid.customerId, function(err, customer) {
                    if (err) { errorCb(err); }
                    console.log("Here 6");
                    console.log(customer);
                    if (returnVal != null) { returnVal = customer; }
                });
                console.log(returnVal);
                cb(returnVal);
            });
        });*/
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
