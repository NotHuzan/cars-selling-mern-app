// const verifyToken = (req, res, next) => {
//   // const cookies = req.headers.cookie;
//   // const token = cookies.split('=')[1];
//   // console.log(token);
//   // const headers = req.headers['authorization'];
//   // const token = headers.split(" ")[1];

//   const cookies = req.cookie;

//   // Check if cookies exist
//   if (!cookies) {
//     return res.status(404).json({ message: "Cookies not found" });
//   }
//   // Split the cookies string to extract the token
//   const token = cookies.split("=")[1];

//   if (!token) {
//     return res.status(404).json({ message: "Token not found" });
//   }

//   jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(400).json({ message: "Invalid Token" });
//     }
//     console.log(user.id);
//     req.id = user.id;
//   });
//   next();
// };

// module.exports = verifyToken;




// const jwt = require("jsonwebtoken");
// // const User = require("../models/userModel");
// // const asyncHandler = require("express-async-handler");

// const verifyToken = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       // token = req.cookies.token;
//       // console.log("cookies", req.cookies);
//       // console.log("token", token);
      
//       // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       // req.user = await User.findById(decoded.id).select("-password");
//       jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//         if (err) {
//           return res.status(400).json({ message: "Invalid Token" });
//         }
//         console.log(user.id);
//         req.id = user.id;
//         next();
//       });
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized!");
//     }
//   }
//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized!");
//   }
// };

// module.exports = verifyToken;



const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
// const asyncHandler = require("express-async-handler");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  console.log("cookies", req.cookies);
  console.log("token", token);

  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.id = user.id;
    next();
  });
};

module.exports = verifyToken;
