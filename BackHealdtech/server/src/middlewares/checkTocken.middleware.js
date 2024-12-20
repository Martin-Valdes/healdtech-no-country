const { request, response } = require("express");
const { verifyToken } = require("../utils/jw.js");


const checkToken = async (req = request, res = response, next) => {
  try {
    const token = await req.cookies.token;

    if (!token)
      return res.status(401).json({ status: "error", msg: "Token not provided" });

    const tokenVerify = verifyToken(token);
    
    if (!tokenVerify)
      return res.status(401).json({ status: "error", msg: "Invalid Token" });

    req.user = tokenVerify;
    next();
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", msg: "internal server error" });
  }
};


module.exports = checkToken;