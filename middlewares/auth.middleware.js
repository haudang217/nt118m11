const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //lay token ra
  const authHeader = req?.header("Authorization");
  console.log("header: " + authHeader);
  let token = authHeader.split(" ")[1];

  //khong tim thay token
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });
  }

  //neu co token
  try {
    console.log("token: " + token);
    const decoded = jwt.verify(
      JSON.parse(token),
      process.env.ACCESS_TOKEN_SECRET
    );

    req.userId = decoded.userId;
    console.log("user id: " + req.userId);
    next(); //passed
  } catch (err) {
    console.log("Auth middleware error: " + err);
    return res
      .status(403)
      .json({ success: false, message: "Access token not found" });
  }
};

module.exports = verifyToken;
