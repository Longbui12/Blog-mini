import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  console.log(req.body);

  // CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists !");

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`, `password`) VALUES (?)";

    const values = [req.body.username, req.body.email, hash];
    console.log(values);
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  // CHECK USER
  console.log("login req: ", req.body);
  const q = "SELECT * FROM users WHERE username = ?";
  // db.query(q, [req.body.username, req.body.email], (err, data) => {
  ////////////////////////////////////////////////
  db.query(q, [req.body.username], (err, data) => {
    ///========================================
    //console.log(data);
    if (err) return res.json(err);
    //if (data.length === 0) return res.status(404).json("User not found !!!");
    if (data.length === 0)
      return res.status(404).json({
        code: 404,
        message: "User not found !!!",
      });

    // CHECK PASSWORD
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({
        code: 400,
        message: "Incorect password",
      });

    const token = jwt.sign({ id: data[0].id }, "jwtKey");
    const { password, ...other } = data[0];

    // Cach 1:
    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({ ...other, token });
    // ===========================================//

    // Cach 2:
    res.status(200).json({
      code: 200,
      message: "Login success",
      user: { ...other, token },
    });
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      samSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out !!");
};
