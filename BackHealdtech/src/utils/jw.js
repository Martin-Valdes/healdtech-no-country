const jwt = require("jsonwebtoken");
const { JWT_SECRET_CODE } = process.env;

const createToken = (user) => {
  
  const { id, email, rol, name} = user;

  const token = jwt.sign({ id, email, rol, name}, JWT_SECRET_CODE, {
    expiresIn: "20m",
  });
 
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_CODE);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  verifyToken,
  createToken,
}