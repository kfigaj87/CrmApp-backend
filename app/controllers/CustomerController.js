const CustomerModel = require("../models/CustomerModel");

module.exports = {
  index: (_req, res) => {
    CustomerModel.find({})
      .populate("events")
      .lean()
      .exec((err, customers) => {
        if (err) {
          return res.status(500).json({
            message: "Error while fetching Customers",
            error: err,
          });
        }
        res.json(customers);
      });
  },

  create: (req, res) => {
    const customer = new CustomerModel({
      name: req.body.name,
      address: {
        street: req.body.address.street,
        zipCode: req.body.address.zipCode,
        city: req.body.address.city,
      },
      nip: req.body.nip,
    });

    customer.save((err, customer) => {
      if (err) {
        return res.status(500).json({
          message: "Error while creating Customer",
          error: err,
        });
      }
      return res.status(201).json(customer);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;

    CustomerModel.findByIdAndRemove(id, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error while deleting Customer",
          error: err,
        });
      }
      return res.status("200").json({
        id: id,
        deleted: true,
      });
    });
  },
};
