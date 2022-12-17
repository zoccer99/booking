import jwt from "jsonwebtoken";

const authentification = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && (authHeader).split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
};

export default authentification;