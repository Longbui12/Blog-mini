import React, { useState, useEffect, use } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import moment from "moment";
//import Cookies from "js-cookie";

//type file = File | null;
type FileInputEvent = React.ChangeEvent<HTMLInputElement>;
type Post = {
  title: string;
  desc: string;
  fashion: string;
  img: string;
  imgUrl: string;
};

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const Write = () => {
  const [file, setFile] = useState<File | null>(null);
  //const [value, setValue] = useState<string>("");
  // const [title, setTitle] = useState<string>("");
  // const [fashion, setFashion] = useState<string>("");

  // Set up state variables for post data and file upload
  const [post, setPost] = useState<Post>({
    title: "",
    desc: "",
    fashion: "",
    img: "",
    imgUrl: "",
  });
  const router = useRouter();
  const postId = router.query.id as string | undefined;

  // Define list of fashion categories
  const listCategory = [
    { name: "Art", value: "art" },
    { name: "Design", value: "design" },
    { name: "Life style", value: "life-style" },
    { name: "Suit", value: "suit" },
    { name: "Denim", value: "denim" },
    { name: "Accessories", value: "accessories" },
    { name: "Shoes", value: "shoes" },
  ];

  const upload = async () => {
    try {
      const formData = new FormData();

      let res: any;
      if (file) {
        formData.append("file", file);
        res = await axios.post("http://localhost:4004/api/upload", formData);
        console.log(res.data);
        return res.data;
      }
      alert("Upload success !!.");
    } catch (err) {
      alert("Upload fail !!.");
      console.log(err);
      throw new Error("File upload failed");
    }
  };

  // const upload = async () => {
  //   try {
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       const res = await axios.post(
  //         "http://localhost:4004/api/upload",
  //         formData
  //       );
  //       console.log(res);
  //       return res.data;
  //     }
  //     throw new Error("No file selected");
  //   } catch (err) {
  //     alert("Upload fail !! You are not the one who posted this article.");
  //     console.log(err);
  //     throw new Error("File upload failed");
  //   }
  // };
  // /////////////////////////////////////////////////////////////////////////////
  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const imgUrl = await upload();
      const updatedPost = {
        ...post,
        fashion: post.fashion,
        img: file ? imgUrl : post.img,
      };

      const user: any = JSON.parse(localStorage.getItem("user") || "null");
      const accessToken = user.token;
      if (postId) {
        await axios.put(
          `http://localhost:4004/api/posts/${postId}`,
          updatedPost,
          {
            headers: { Authorization: `${accessToken}` },
            withCredentials: true,
          }
        );
        setPost(updatedPost);
      } else {
        console.log(accessToken);

        await axios.post(
          "http://localhost:4004/api/posts/",
          {
            ...updatedPost,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          },
          {
            headers: { Authorization: `${accessToken}` },
            withCredentials: true,
          }
        );
        setPost({
          title: "",
          desc: "",
          img: "",
          fashion: "",
          imgUrl: "",
        });
      }
      alert("Posted successfully .");
    } catch (err) {
      console.log(err);
      alert("Đã xảy ra lỗi. Vui lòng kiểm tra lại.");
    }
    router.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (postId) {
          const res: AxiosResponse<Post> = await axios.get(
            `http://localhost:4004/api/posts/${postId}`,
            { withCredentials: true }
          );
          console.log(res);
          setPost(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <Layout>
      <div className="add">
        <div className="content">
          <input
            type="text"
            value={post.title}
            placeholder="Title"
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />

          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={post.desc}
              onChange={(value) => setPost({ ...post, desc: value })}
            />
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>

            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={handleFileChange}
            />
            <label className="file" htmlFor="file">
              <strong>Upload Image in Here !</strong>
            </label>
            <div className="buttons">
              <button>Save as a draft</button>
              <button onClick={handlePublish}>Publish</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            {listCategory.map((item: any, index: number) => {
              return (
                <div key={index} className="fashion">
                  <input
                    type="radio"
                    checked={post.fashion === item.value}
                    value={item.value}
                    onChange={(e) =>
                      setPost({ ...post, fashion: e.target.value })
                    }
                    id={item.value}
                  />
                  <label htmlFor={item.value}>{item.name}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Write;
