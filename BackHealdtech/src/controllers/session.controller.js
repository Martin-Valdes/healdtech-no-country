const { request, response } = require("express");
const { isValidPassword } = require("../utils/hashPassword.js");
const { createToken, verifyToken } = require("../utils/jw.js");
const Patient = require("../models/patientModel.js");
const Admin = require("../models/adminModel.js");
const Doctor = require("../models/doctorModel.js");

const findUserByEmail = async (email) => {
  const userRoles = [
    { model: Patient, role: "patient" },
    { model: Admin, role: "admin" },
    { model: Doctor, role: "doctor" },
  ];

  for (const userRole of userRoles) {
    const user = await userRole.model.findOne({ where: { email } });
    if (user) {
      return { user, role: userRole.role };
    }
  }
  return { user: null, role: null };
};

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res
        .status(400)
        .json({ status: "error", error: "Incomplete values" });
    }

    const { user } = await findUserByEmail(email);
    if (!isValidPassword(user.password, password)) {
      return res
        .status(401)
        .json({ status: "error", msg: "Incorrect password" });
    }
    const token = createToken({ ...user.toJSON() });
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      status: "ok",
      msg: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};
const logout = async (req = request, res = response) => {
  try {
    const { email } = req.body;
    const { user } = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ status: "error", msg: "Person not found" });
    }

    res.clearCookie("token");
    return res.status(200).json({
      status: "ok",
      msg: "Logout successful",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};

const protected = async (req = request, res = response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ status: "error", msg: "No token provided" });
    }
    const verifyCredentials = verifyToken(token);
    return res.json({ message: "Login ok.", data: verifyCredentials });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};

module.exports = { login, logout, protected };
