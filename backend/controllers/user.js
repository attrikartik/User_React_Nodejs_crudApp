const User = require("../models/user");
const { validationResult } = require("express-validator");

class UserControllers {
  static addUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }
    const fullName = req.body.fullName;
    const email = req.body.email;
    const zipCode = req.body.zipCode;
    const message = req.body.message;
    const country = req.body.country;
    const gender = req.body.gender;

    try {
      const user = await User.create({
        fullName: fullName,
        email: email,
        zipCode: zipCode,
        message: message,
        country: country,
        gender: gender
      });
      if (!user) {
        const error = new Error("No user with this Id");
        error.statusCode = 400;
        throw error;
      }
      return res.status(200).send({ message: "Data Inserted" });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 422;
      }
      next(error);
    }
  };
  static deleteUser = async (req, res, next) => {
    const userId = req.params.userId;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        const error = new Error("No user with this Id");
        error.statusCode = 400;
        throw error;
      }
      await user.destroy();
      return res.status(200).send("User Deleted");
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 422;
      }
      next(error);
    }
  };

  static editUser = async (req, res, next) => {
    const userId = req.params.userId;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        const error = new Error("No user with this Id");
        error.statusCode = 400;
        throw error;
      }
      user.fullName = req.body.fullName;
      user.email = req.body.email;
      user.zipCode = req.body.zipCode;
      user.message = req.body.message;
      user.country = req.body.country;
      user.gender = req.body.gender;
      await user.save();
      res.status(200).send({ user: result });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 400;
      }
      next(error);
    }
  };

  static getUsers = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    try {
      const count = await User.count();
      const users = await User.findAll({offset:(currentPage-1)*perPage,limit:perPage,order:['createdAt']})
      if (!users) {
        const error = new Error({ message: "NO users" });
        error.statusCode = 400;
        throw error;
      }
      res.status(200).send({ message: "Data Fetched", users: users,totalItems: count});
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 400;
      }
      next(error);
    }
  };
}
module.exports = UserControllers;
