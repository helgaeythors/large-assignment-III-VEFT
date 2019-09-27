// Here the web service is setup and routes declared
const artService = require('./services/artService');
const artistService = require('./services/artistService');
const auctionService = require('./services/auctionService');
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
   }, function(code, message) {
      return res.status(code).json(message);
   });
});

// /api/arts/:id [GET] - Gets an art by id
app.get('/api/arts/:id', function(req, res) {
   artService.getArtById(req.params.id, function(art) {
      return res.json(art);
   }, function(code, message) {
      return res.status(code).json(message);
   });
});

// /api/arts [POST] - Creates a new art
app.post('/api/arts', function(req, res) {
   artService.createArt(req.body, function(art) {
      return res.status(201).json(art);
   }, function(code, message) {
      return res.status(code).json(message);
   });
});

// /api/artists [GET] - Gets all artists
app.get('/api/artists', function(req, res){
   artistService.getAllArtists(function(artist) {
      return res.json(artist);
   }, function(code, message){
      return res.status(code).json(message);
   });
});

// /api/artists/:id [GET] - Gets an artist by id
app.get('/api/artists/:id', function(req, res){
   artistService.getArtistById(req.params.id, function(artist){
      return res.json(artist);
   }, function(code, message){
      return res.status(code).json(message);
   });
});

// /api/artists [POST] - Creates a new artist (see how model should look like in Model section)
app.post('/api/artists', function(req, res){
   artistService.createArtist(req.body, function(artist){
      return res.status(201).json(artist);
   }, function(code, message){
      return res.status(code).json(message);
   });
});

// /api/customers [GET] - Gets all customers
app.get('/api/customers', function(req, res) {
   customerService.getAllCustomers(function(customer) {
      return res.json(customer);
   }, function(code, message) {
      return res.status(code).json(message);
   });
});

// /api/customers/:id [GET] - Gets a customer by id
app.get('/api/customers/:id', function(req, res) {
   customerService.getCustomerById(req.params.id, function(customer) {
      return res.json(customer);
   }, function(code, message) {
      return res.status(code).json(message);
   });
});

// /api/customers [POST] - Creates a new customer
app.post('/api/customers', function(req, res) {
   customerService.createCustomer(req.body, function(customer) {
      return res.status(201).json(customer);
   }, function(code, message) {
      return res.status(code).json(message);
   });
});

// /api/customers/:id/auction-bids [GET] - Gets all auction bids associated with a customer
app.get('/api/customers/:id/auction-bids', function(req, res) {
   customerService.getCustomerAuctionBids(req.params.id, function(auctionBids) {
      return res.json(auctionBids);
   }, function(code, message) {
      return res.status(code).json(message);
   });
});

// /api/auctions [GET] - Gets all auctions
app.get('/api/auctions', function(req, res){
   auctionService.getAllAuctions(function(auction){
      return res.json(auction);
   }, function(code, message) {
      return res.status(code).json(message);
   });
});

// /api/auctions/:id [GET] - Gets an auction by id
app.get('/api/auctions/:id', function(req, res){
   auctionService.getAuctionById(req.params.id, function(auction) {
      return res.json(auction);
   }, function(code, message){
      return res.status(code).json(message);
   });
});

// /api/auctions/:id/winner [GET] - Gets the winner of the auction. 
app.get('/api/auctions/:id/winner', function(req, res) {
   auctionService.getAuctionWinner(req.params.id, function(result) {
         return res.json(result.customer); 
   }, function(code, message) {
      return res.status(code).send(message);
   });
});

// /api/auctions [POST]
app.post('/api/auctions', function(req, res){
      auctionService.createAuction(req.body, function(auction) {
      return res.status(201).json(auction);
   }, function(code, message){
      return res.status(code).send(message);
   });
});

// /api/auctions/:id/bids [GET] - Gets all auction bids associated with an auction
app.get('/api/auctions/:id/bids', function(req, res){
   auctionService.getAuctionBidsWithinAuction(req.params.id, function(auctionBids) {
      return res.json(auctionBids);
   }, function(code, message) {
      return res.status(code).json(message);
   });
});

// /api/auctions/:id/bids [POST] - Creates a new auction bid
app.post('/api/auctions/:id/bids', function(req, res) {
   console.log("Trying to place an auction bid");
   auctionService.placeNewBid(req.params.id, req.body.customerId, req.body.price, function(bid){
      return res.status(201).json(bid);
   }, function(code, message){
      return res.status(code).send(message);
   });
});

// http://localhost:3000
app.listen(3000, function() {
   console.log("Server is listening on port 3000");
});