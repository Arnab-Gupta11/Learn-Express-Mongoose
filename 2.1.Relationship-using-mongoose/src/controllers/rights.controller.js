const Right = require("../models/rights.model");

module.exports = {
  createRights: async (req, res) => {
    try {
      const rights = await Right.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          rights,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },
  fetchAllRights: async (req, res) => {
    try {
      const allRights = await Right.find({}).populate({
        path: "staffs",
      });
      res.status(200).json({
        status: "success",
        data: {
          allRights,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },
  getSingleRights: async (req, res) => {
    try {
      const rights = await Right.findById(req.params.id).populate({
        path: "staffs",
        select: ["name", "email"],
        options: {
          sort: { email: -1 },
          limit: 2,
        },
        // match: { email: "rahim@gmail.com" },  //case sensitive
        // match: { email: "rahim@gmail.com",name:"Rahim" },   //case sensitive
        // match: { email: { $regex: ".*raja.*" } },  //case sensitive
        // match: { email: { $regex: ".*Raja.*", $options: "i" } },  //ignore case sensitive--> options needs regex
        // match: { email: { $eq: "rahim@gmail.com" } }, //case sensitive
        // match: { email: { $ne: "rahim@gmail.com" } }, //case sensitive
        // match: { age: { $gte: 30 } }, //ignore case sensitive
      });
      res.status(200).json({
        status: "success",
        data: {
          rights,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },
};
