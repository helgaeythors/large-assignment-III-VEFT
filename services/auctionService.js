const database = require('../data/db');
const mongoose = require('mongoose');

const auctionService = () => {
    const getAllAuctions = (cb, errorCb) => {
        database.Auction.find({}, function(err, auctions){
            if(err) { errorCb(404, "Auctions were not found"); }
            cb(auctions);
        }); 
    };

    const getAuctionById = (id, cb, errorCb) => {
        database.Auction.findById(id, function(err, auction){
            if(err) { errorCb(404, "Auction was not found"); }
            cb(auction);
        })
    };

    const getAuctionWinner = (auctionId, cb, errorCb) => {
        database.Auction.findById(auctionId, function(err, auction) {
            if (err) { errorCb(404, "Auction was not found"); }
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
                            errorCb(404, err);
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
                                    if (err) { errorCb(404, "Customer was not found"); }
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
                                if(err) { errorCb(500, "Creation failed"); }
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
            if (err) { errorCb(404, "Auction bids were not found"); }
            cb(bids);
        });
    };

    const placeNewBid = (auctionId, customerId, price, cb, errorCb) => {    
        var b = {
            "auctionId" : auctionId,
            "customerId" : customerId,
            "price" : price
        }; 
       
        database.Auction.findById(auctionId, function(err, auction) {
            console.log(auction.miminumPrice);
            if(err){ errorCb(400, "Auction was not found"); }
            else {
                if (auction.endDate < new Date())
                {
                    errorCb(403, "Auction has already passed");
                }
                else if (price <= auction.miminumPrice){
                    errorCb(412, "This bid is lower than the minimum bid");
                }
                else {
                    database.Customer.findById(customerId, function(err, customer) {
                        if(err){ errorCb(400, "Customer was not found"); }
                        else {
                            database.AuctionBid.find({"auctionId": auctionId}, function(err, bids){
                                if(err){ errorCb(500, err); }
                                else if (bids == null) {
                                    errorCb(400, "Aution was not found");
                                }
                                else {
                                    // if no bids are found
                                    if (bids.length <= 0) {
                                        database.AuctionBid.create(b, function(err, bid){
                                            if(err) { errorCb(500, "Failed to create auction bid"); }
                                            else {
                                                // update auction winner
                                                auction.getAuctionWinner = customerId;
    
                                                database.Auction.updateOne( {_id : auctionId }, auction, function(err){
                                                    if(err) { errorCb(500, "Update of auctionWinner failed"); }
                                                });
                                                cb(bid);
                                            }
                                        });
                                    }
                                    else {
                                        var highestBid = Math.max.apply(Math, bids.map(function(bid) { return bid.price; }))
                                        if(price < highestBid)
                                        {
                                            errorCb(412, "This bid is lower than the current highest bid");
                                        }
                                        else
                                        {
                                            database.AuctionBid.create(b, function(err, bid){
                                                if(err) { errorCb(500, "creation failed"); }
                                                auction.getAuctionWinner = customerId;
            
                                                database.Auction.updateOne( {_id : auctionId }, auction, function(err){
                                                    if(err) { errorCb(500, "Update of auctionWinner failed"); }
                                                })
            
                                                cb(bid);
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
                
            }
        }); 
    }


    
    // /api/auctions/:id/bids [POST] - Creates a new auction bid (see how model should look like in Model section). 
    /*  If the auction has already passed its end date,
    the web service should return a status code 403 (Forbidden). As a side-effect the
    auctionWinner property in the Auction schema should be updated to the latest
    highest bidder. */

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
