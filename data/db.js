const mongoose = require('mongoose');
const artSchema = require('../schemas/art');
const artistSchema = require('../schemas/artist');
const auctionSchema = require('../schemas/auction');
const auctionBidSchema = require('../schemas/auctionBid');
const customerSchema = require('../schemas/customer');

const connection = mongoose.createConnection('mongodb+srv://mansion_dbuser:12345@mansion-de-subastas-clgd2.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

module.exports = {
    Art: connection.model('Art', artSchema),
    Artist: connection.model('Artist', artistSchema),
    Auction: connection.model('Auction', auctionSchema),
    AuctionBid: connection.model('AuctionBid', auctionBidSchema),
    Customer: connection.model('Customer', customerSchema)
};
