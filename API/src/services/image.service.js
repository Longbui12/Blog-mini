// import { db } from "../db.js";

// // export const createImg = (image) => {
// //   let q = "insert into images SET ?  ";

// //   return new Promise((rs, rj) => {
// //     db.query(q, [image], (err, data) => {
// //       if (err) rj(err);
// //       rs(data);
// //     });
// //   });
// // };
// export const createImg = (image) => {
//   let q = "insert into images SET ?  ";

//   console.log("Image data:", image); //  câu lệnh để in ra thông tin ảnh

//   return new Promise((rs, rj) => {
//     db.query(q, [image], (err, data) => {
//       if (err) {
//         console.error("Error creating image:", err); //  câu lệnh để in ra lỗi nếu có
//         rj(err);
//       } else {
//         console.log("Created image successfully:", data); //  câu lệnh để in ra thông tin ảnh đã được tạo thành công
//         rs(data);
//       }
//     });
//   });
// };

// export const updateImg = (id, image) => {
//   let q = "UPDATE images SET ? WHERE id = ?";

//   return new Promise((rs, rj) => {
//     db.query(q, [image, id], (err, data) => {
//       if (err) {
//         console.error("Error updating image:", err);
//         rj(err);
//       } else {
//         console.log("Updated image successfully:", data);
//         rs(data);
//       }
//     });
//   });
// };

// export const deleteImg = (id) => {
//   let q = "DELETE FROM images WHERE id = ?";

//   return new Promise((rs, rj) => {
//     db.query(q, [id], (err, data) => {
//       if (err) {
//         console.error("Error deleting image:", err);
//         rj(err);
//       } else {
//         console.log("Deleted image successfully:", data);
//         rs(data);
//       }
//     });
//   });
// };
