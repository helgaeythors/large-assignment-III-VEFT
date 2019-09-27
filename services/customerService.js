const Customer = require('../data/db').Customer;
const AuctionBids = require('../data/db').AuctionBid;

const customerService = () => {
    
    const getAllCustomers = (cb, errorCb) => {
        Customer.find({}, function(err, customers) {
            if (err) { errorCb(404, "Customers were not found"); }
            cb(customers);
        });
    };

    const getCustomerById = (id, cb, errorCb) => {
        Customer.findById(id, function(err, customer) {
            if (err) { errorCb(404, "Customer was not found"); }
            cb(customer);
        });
    };

    const getCustomerAuctionBids = (customerId, cb, errorCb) => {
        AuctionBids.find({ "customerId": customerId }, function(err, auctionBids) {
            if (err) { errorCb(404, "Auction bids were not found"); }
            cb(auctionBids);
        })
    };

	const createCustomer = (customer, cb, errorCb) => {
        Customer.create(customer, function(err, result){
            if (err) { errorCb(500, "Create customer failed"); }
            cb(result);
        });
    };

    return {
        getAllCustomers,
        getCustomerById,
        getCustomerAuctionBids,
		createCustomer
    };
};

module.exports = customerService();
