const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //lay token ra
  const authHeader = req?.header("Authorization");
  const token =
    (authHeader && authHeader.split(" ")[1]) || process.env.TEST_TOKEN;
  //khong tim thay token
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });
  }

  //neu co token
  try {
    const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;

    next(); //passed
  } catch (err) {
    console.log("Auth middleware error: " + err);
    return res
      .status(403)
      .json({ success: false, message: "Access token not found" });
  }
};

module.exports = verifyToken;
