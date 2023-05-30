// import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import Layout from "@/components/Layout";
// import axios from "axios";
// import { useRouter } from "next/router";
// const ReactQuill = dynamic(import("react-quill"), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });

// import "react-quill/dist/quill.snow.css";

// type file = string | null;

// const Edit = () => {
//   const router = useRouter();
//   // console.log(router.query);
//   const listCategory = [
//     { name: "Art", value: "art" },
//     { name: "Design", value: "design" },
//     { name: "Life style", value: "life style" },
//     { name: "Suit", value: "suit" },
//     { name: "Denim", value: "denim" },
//     { name: "Accessories", value: "accessories" },
//     { name: "Shoes", value: "shoes" },
//   ];

//   const [file, setFile] = useState<File | null>(null);
//   const [post, setPost] = useState({
//     title: "",
//     desc: "",
//     img: "",
//     fashion: "",
//     // imgId: "",
//   });

//   const postId = router.query.id;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:4004/api/posts/${postId}`
//         );
//         console.log(res);
//         setPost(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, [postId]);

//   ////// ====== PUT =========///
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     if (!e.target.files) return;
//     const selectedFile = e.target.files[0];
//     console.log(selectedFile); // Kiểm tra giá trị của selectedFile
//     setFile(selectedFile);
//   };
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // console.log(e.target.value);
//     //setPost((prev) => ({ ...prev, fashion: e.target.value }));
//     setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // const deleteImg = async (imgId: string) => {
//   //   try {
//   //     const res = await axios.delete(
//   //       `http://localhost:4004/api/posts/image/${imgId}`
//   //     );
//   //     console.log(res);
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // };

//   const upload = async () => {
//     try {
//       const formData = new FormData();
//       if (file) {
//         formData.append("file", file);
//       } else {
//         console.log("File not found");
//         return;
//       }
//       const res = await axios.post(
//         "http://localhost:4004/api/posts/",
//         formData
//       );
//       console.log(res);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     try {
//       if (file) {
//         const img = await upload();
//         setPost((prev) => ({ ...post, img }));
//       }
//       await axios.put(`http://localhost:4004/api/posts/${postId}`, post);
//       alert("Cập nhật thành công!");
//       router.push("/");
//     } catch (err) {
//       console.log(err);
//       alert("Có lỗi xảy ra khi gửi yêu cầu đến server. Vui lòng thử lại sau.");
//     }
//   };

//   //////===== CHANGE IMAGE ===========////

//   // const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
//   //   e.preventDefault();
//   //   try {
//   //     if (file) {
//   //       // Xóa ảnh cũ
//   //       await deleteImg(post.imgId);

//   //       // Tải ảnh mới lên và lưu trữ ID của ảnh
//   //       const img = await upload();
//   //       setPost((prev) => ({ ...post, img }));

//   //       // // Cập nhật giá trị của `img` thành URL hợp lệ
//   //       // const imgUrl = img.imgUrl;
//   //       // setPost((prev) => ({ ...prev, img: imgUrl }));
//   //     }
//   //     await axios.put(`http://localhost:4004/api/posts/${postId}`, post);
//   //     alert("Cập nhật thành công!");
//   //     router.push("/");
//   //   } catch (err) {
//   //     console.log(err);
//   //     alert("Có lỗi xảy ra khi gửi yêu cầu đến server. Vui lòng thử lại sau.");
//   //   }
//   // };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     if (!e.target.files) return;
//     const selectedFile = e.target.files[0];
//     console.log(selectedFile); // Kiểm tra giá trị của selectedFile
//     setFile(selectedFile);
//     setPost((prev) => ({ ...prev, img: URL.createObjectURL(selectedFile) }));
//   };
//   return (
//     <Layout>
//       <div className="add">
//         <div className="content">
//           <h3>
//             <u>Title :</u>
//           </h3>
//           <input
//             type="text"
//             value={post.title}
//             placeholder="Title"
//             name="title"
//             onChange={handleChange}
//           />

//           <strong>
//             <u>Image:</u>
//           </strong>

//           <input type="text" value={post.img} placeholder="image" readOnly />
//           <input
//             style={{ display: "none" }}
//             type="file"
//             id="file"
//             name=""
//             onChange={handleImageChange}
//           />

//           <h3>
//             <u>Description :</u>
//           </h3>
//           <div className="editorContainer">
//             <ReactQuill
//               className="editor"
//               theme="snow"
//               value={post.desc}
//               onChange={(value) => setPost({ ...post, desc: value })}
//             />
//           </div>
//         </div>
//         <div className="menu">
//           <div className="item">
//             <h1>Publish</h1>
//             <span>
//               <b>Status: </b> Draft
//             </span>
//             <span>
//               <b>Visibility: </b> Public
//             </span>
//             <label className="file" htmlFor="file">
//               <strong>Upload Image : </strong>Click here !
//             </label>
//             <div className="buttons">
//               <button>Save as a draft</button>
//               <button onClick={handleClick}>Publish</button>
//             </div>
//           </div>
//           <div className="item">
//             <h1>Category</h1>

//             {listCategory.map((item: any) => {
//               // console.log(item === post.fashion);

//               return (
//                 <div key={item.value} className="fashion">
//                   <input
//                     type="radio"
//                     checked={post.fashion === item.value}
//                     // defaultChecked={post.fashion === item.value}
//                     value={item.value}
//                     id={item.value}
//                     onChange={handleChange}
//                     name="fashion"
//                   />
//                   <label htmlFor={item.value}>{item.name}</label>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Edit;
