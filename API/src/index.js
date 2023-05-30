import express from "express";
import postRoutes from "./routes/posts.router.js";
import authRouter from "./routes/auth.router.js";
import userRoutes from "./routes/users.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import * as dotenv from "dotenv";

// Thêm các import cần thiết
import path from "path";

// import {
//   getPost,
//   getPosts,
//   addPost,
//   updatePost,
//   deletePost,
// } from "./controllers/post.controller.js";

//import { createImg } from "./services/image.service.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4004;

app.use(cookieParser());
// Cấu hình CORS
app.use(
  cors({
    origin: "http://localhost:9001",
    credentials: true, // Cho phép chia sẻ cookie
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + " " + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Middleware để kiểm tra cookie từ client và gửi nó trong yêu cầu
app.use((req, res, next) => {
  const { cookies } = req;
  if (cookies && cookies.access_token) {
    // Gửi cookie từ client trong yêu cầu
    req.headers.cookie = `access_token=${cookies.access_token}`;
  }
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRouter);

// authRouter(app);
app.use("/api/users", userRoutes);

app.post("/api/posts", (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    return res.status(401).json({ error: "Access token not found" });
  }

  const { title, desc, fashion, img, date } = req.body;
  const newPost = new Post({
    title,
    desc,
    fashion,
    img,
    date,
  });

  newPost.save((err) => {
    if (err) {
      return res.status(500).json({ error: "Error creating post" });
    }
    res.status(200).json({ message: "Post created" });
  });
});

// PUT
app.put("/api/posts/:id", (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    return res.status(401).json({ error: "Access token not found" });
  }

  const postId = req.params.id;
  const { title, desc, fashion, img, date } = req.body;
  Post.findByIdAndUpdate(
    postId,
    {
      title,
      desc,
      fashion,
      img,
      date,
    },
    (err, updatedPost) => {
      if (err) {
        return res.status(500).json({ error: "Error updating post" });
      }
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ message: "Post updated" });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`, "conected succsess");
});
