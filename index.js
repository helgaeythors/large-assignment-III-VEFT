// Here the web service is setup and routes declared
const artService = require('./services/artService');
const customerService = require('./services/customerService');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// define configurations
app.use(bodyParser.json());

// /api/arts [GET] - Gets all arts
app.get('/api/arts', function (req, res) {
   artService.getAllArts(function(arts) {
      return res.json(arts);
   }, function(err) {
      // TODO: correct to send status 500?
      return res.status(500).json(err);
   });
});

// /api/arts/:id [GET] - Gets an art by id
app.get('/api/arts/:id', function(req, res) {
   artService.getArtById(req.params.id, function(art) {
      return res.json(art);
   }, function(err) {
      // TODO: correct to send status 500?
      return res.status(500).json(err);
   });
});

// /api/arts [POST] - Creates a new art
app.post('/api/arts', function(req, res) {
   artService.createArt(req.body, function(art) {
      return res.status(201).json(art);
   }, function(err) {
      return res.status(400).json(err);
   });
});

// /api/artists [GET] - Gets all artists

// /api/artists/:id [GET] - Gets an artist by id

// /api/artists [POST] - Creates a new artist (see how model should look like in Model section)

// /api/customers [GET] - Gets all customers
app.get('/api/customers', function(req, res) {
   customerService.getAllCustomers(function(customer) {
      return res.json(customer);
   }, function(err) {
      // TODO: correct to send status 500?
      return res.status(500).json(err);
   });
});

// /api/customers/:id [GET] - Gets a customer by id
app.get('/api/customers/:id', function(req, res) {
   customerService.getCustomerById(req.params.id, function(customer) {
      return res.json(customer);
   }, function(err) {
      // TODO: correct to send status 500?
      return res.status(500).json(err);
   });
});

// /api/customers [POST] - Creates a new customer
app.post('/api/customers', function(req, res) {
   customerService.createCustomer(req.body, function(customer) {
      return res.status(201).json(customer);
   }, function(err) {
      return res.status(400).json(err);
   });
});

// /api/customers/:id/auction-bids [GET] - Gets all auction bids associated with a customer
app.get('/api/customers/:id/auction-bids', function(req, res) {
   customerService.getCustomerAuctionBids(req.params.id, function(auctionBids) {
      return res.json(auctionBids);
   }, function(err) {
      // TODO: correct to send status 500?
      return res.status(500).json(err);
   });
});

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