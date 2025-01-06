import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Authorization Header:", authHeader);  // Debugging

    if (!authHeader) return res.status(401).json({ message: "No token found" });

    const token = authHeader.split(" ")[1];
    console.log("Token extracted:", token);  // Debugging

    if (!token) return res.status(401).json({ message: "Token is missing" });

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
    
};


export default authenticateUser;
