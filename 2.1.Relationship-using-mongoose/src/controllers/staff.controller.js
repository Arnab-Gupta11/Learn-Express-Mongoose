const Staff = require("../models/staff.model");

module.exports = {
  createStaff: async (req, res) => {
    try {
      const staff = await Staff.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          staff,
        },
      });
    } catch (error) {
      res.status(201).json({
        status: "fail",
        message: error.message,
      });
    }
  },
};
