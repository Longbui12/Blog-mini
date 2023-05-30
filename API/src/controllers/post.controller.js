import { db } from "../db.js";
import jwt from "jsonwebtoken";
//import * as service from "../services/post.service.js";
// import util for promise
// import util from "util";

export const getPosts = (req, res) => {
  const q = req.query.fashion
    ? "SELECT * FROM posts WHERE fashion=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.fashion], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q = `
  SELECT  p.id ,u.username, p.title, p.desc, p.img, p.fashion, p.date, u.img AS userImg
  FROM posts p
  JOIN users u ON u.id = p.uid
  WHERE p.id = ?
`;
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};
export const addPost = (req, res) => {
  const token = req.headers.authorization;
  // console.log("Access Token:", token);

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "Not authenticated !",
    });
  }
  jwt.verify(token, "jwtKey", (err, userInfo) => {
    // console.log("Access Token:", token);
    //console.log("User Info:", userInfo);
    if (err) {
      console.log("Authentication Error:", err);
      return res.status(403).json("Token is not valid !");
    }
    const q =
      "INSERT INTO posts (`title`, `desc`, `date`, `uid`, `img`, `fashion`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.date,

      userInfo.id,
      req.body.img,
      req.body.fashion,
    ];
    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json("Post has been created .");
    });
  });
};

//============================================

export const updatePost = (req, res) => {
  const token = req.headers.authorization;
  //console.log("Access Token from Cookies:", token);
  console.log(req.body);
  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "Not authenticated !",
    });
  }
  jwt.verify(token, "jwtKey", (err, userInfo) => {
    // console.log("Access Token:", token);
    // console.log("User Info:", userInfo);
    if (err) {
      console.log("Authentication Error:", err);
      return res.status(403).json("Token is not valid !");
    }
    const postId = req.params.id;

    const q =
      "UPDATE posts SET `title`= ? , `desc`= ? ,`img`= ? ,`fashion`= ? WHERE `id`= ? AND `uid` = ? ";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.fashion,
      postId,
      userInfo.id,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      // console.log(...values);
      // console.log(data);
      // console.log(err);
      if (err) {
        return res.status(500).json(err);
      }
      return res.json("Post has been updated .");
    });
  });
};

// DELETE by :id of post
export const deletePost = (req, res) => {
  const token = req.headers.authorization;
  console.log("Access Token from Cookies:", token);
  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "Not authenticated !",
    });
  }
  jwt.verify(token, "jwtKey", (err, userInfo) => {
    console.log("Access Token:", token);
    console.log("User Info:", userInfo);
    if (err) {
      console.log("Authentication Error:", err);
      return res.status(403).json("Token is not valid !");
    }
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      //if(err) return res.status(403).json('You can delete only your post !') Cách viết 1
      // Cách viết 2 :
      if (err) {
        return res.status(500).json({
          code: 500,
          message: "ERROR  !",
        });
      }
      // return res.json('Post has been deleted !') Cách viết 1 :
      // Cách viết 2:
      return res.json({
        message: "Post has been deleted !",
      });
    });
  });
};
