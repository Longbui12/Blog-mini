// import { db } from "../db.js";

// // search dynamic
// export const findPosts = (id, title, fashion, ids) => {
//   let q =
//     "SELECT p.id, u.username, p.title, p.desc, p.img, p.fashion, p.date, u.img AS userImg FROM posts p JOIN users u ON u.id = p.uid";
//   let value = [id, title];
//   if (id || title) {
//     q += " WHERE p.id=? OR p.title=?";
//   } else if (ids) {
//     q += " WHERE id IN (?)";
//     value = ids;
//   } else if (fashion) {
//     q = "SELECT * FROM posts WHERE fashion=?";
//     value = [fashion];
//   }
//   return new Promise((resolve, reject) => {
//     db.query(q, value, (err, data) => {
//       if (err) reject(err);
//       resolve(data);
//     });
//   });
// };
// // export const getPostId = (id) => {
// //   const q = `
// //   SELECT u.username, p.title, p.desc, p.img, p.fashion, p.date, u.img AS userImg
// //   FROM posts p
// //   JOIN users u ON u.id = p.uid
// //   WHERE p.id = ?
// // `;
// //   return new Promise((resolve, reject) => {
// //     db.query(q, [id], (err, data) => {
// //       if (err) reject(err);
// //       resolve(data);
// //     });
// //   });
// // };
// export const updatePost = (id, postUpdate) => {
//   delete postUpdate.username;
//   delete postUpdate.userImg;
//   const q = "update posts SET ?  WHERE `id` =? ";
//   return new Promise((rs, rj) => {
//     db.query(q, [postUpdate, id], (err, data) => {
//       if (err) rj(err);
//       rs(data);
//     });
//   });
// };
