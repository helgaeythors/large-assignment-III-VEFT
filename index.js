// Here the web service is setup and routes declared
const artService = require('./services/artService');
const express = require('express');
const app = express();

// /api/arts [GET] - Gets all arts
app.get('/api/arts', function (req, res) {
   // TODO
   return res.json(artService.getAllArts());
});

// /api/arts/:id [GET] - Gets an art by id

// /api/arts [POST] - Creates a new art (see how model should look like in Model section)

// /api/artists [GET] - Gets all artists

// /api/artists/:id [GET] - Gets an artist by id

// /api/artists [POST] - Creates a new artist (see how model should look like in Model section)

// /api/customers [GET] - Gets all customers

// /api/customers/:id [GET] - Gets a customer by id

// /api/customers [POST] - Creates a new customer (see how model should look like in Model section)

// /api/customers/:id/auction-bids [GET] - Gets all auction bids associated with a customer

// /api/auctions [GET] - Gets all auctions

// /api/auctions/:id [GET] - Gets an auction by id

// /api/auctions/:id/winner [GET] - Gets the winner of the auction. 
/* If the auction is not finished the web service should return a status code 409 
(Conflict), otherwise it should return the customer which holds the highest bid. 
If the auction had no bids, it should return a status code 200 (OK) with the 
message: ‘This auction had no bids.’. */

// /api/auctions [POST] - Create a new auction (see how model should look like in Model section). 
/* The art id provided within the body must be a valid art id with its
property isAuctionItem set to true. If the isAuctionItem is set to false, the web
service should return a status code 412 (Precondition failed). Also if there is an
ongoing auction currently for this art, the web service should return a status code 409
(Conflict). */

// /api/auctions/:id/bids [GET] - Gets all auction bids associated with an auction

// /api/auctions/:id/bids [POST] - Creates a new auction bid (see how model should look like in Model section). 
/* Auction bids must be higher than the minimum
price and must also be higher than the current highest bid. If the auction bid price is
lower than the minimum price or current highest bid, the web service should return a
status code 412 (Precondition failed). If the auction has already passed its end date,
the web service should return a status code 403 (Forbidden). As a side-effect the
auctionWinner property in the Auction schema should be updated to the latest
highest bidder. */

// http://localhost:3000
app.listen(3000, function() {
   console.log("Server is listening on port 3000");
});