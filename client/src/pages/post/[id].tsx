/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import edit from "../../img/edit.png";
import Delete from "../../img/Delete.png";
import MainMenu from "@/components/Mainmenu";
import Layout from "@/components/Layout";
import moment from "moment";
import { AuthContext } from "@/context/authContext";
// import avatar from "@/img/avatar.jpg";
import Avatar from "../avatar/index";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  fashion?: string;
}

const Menu = ({ fashion, children, ...rest }: MenuProps) => {
  return (
    <div {...rest}>
      <h2>Menu</h2>
      <p>Fashion: {fashion}</p>
    </div>
  );
};

interface PostData {
  img: string;
  username: string;
  date: string;
  title: string;
  desc: string;
  userImg: string;
  fashion: string;
  uid: string;
}

// const Single = () => {
const Single: React.FC = () => {
  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const [post, setPost] = useState({
    img: "",
    username: "",
    date: "",
    title: "",
    desc: "",
    userImg: "",
    fashion: "",
    uid: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(1);

  const router = useRouter();
  const postId = router.query.id;

  // const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:4004/api/posts/${postId}`
        );
        console.log(res);
        setPost(res.data);
        setLoading(false);
      } catch (error) {
        setError("There was an error fetching the data.");
        setLoading(false);
      }
    };
    // fetchData();
    if (postId) {
      fetchData();
    }
  }, [postId, refresh]);

  const handleDelete = async () => {
    const user: any = JSON.parse(localStorage.getItem("user") || "null");
    const accessToken = user.token;
    try {
      setLoading(true);
      setShowModal(false);

      await axios.delete(`http://localhost:4004/api/posts/${postId}`, {
        headers: { Authorization: `${accessToken}` },
        withCredentials: true,
      });
      alert("You have successfully deleted the post.");
      router.push("/");

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const currentUser = useRef<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    currentUser.current = user;
  }, []);
  ///////// UPLOAD AVATAR IMAGE /////////////////////

  // const handleAvatarUpload = (file: File) => {
  //   const formData = new FormData();
  //   formData.append("avatar", file);

  //   // Gửi file đến server để upload avatar
  //   const user: any = JSON.parse(localStorage.getItem("user") || "null");
  //   const accessToken = user.token;

  //   axios
  //     .post("http://localhost:4004/api/avatar", formData, {
  //       headers: { Authorization: `${accessToken}` },
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       const { data } = response;
  //       console.log("Uploading Avatar:", data);

  //       // Cập nhật đường dẫn avatar mới cho bài viết
  //       console.log(post);
  //       setPost((prevPost) => ({
  //         ...prevPost,
  //         userImg: `../avatar/${data.filename}`,
  //       }));
  //     })

  //     .catch((error) => {
  //       console.log("Avatar Upload Error:", error);
  //     });
  // };
  const handleAvatarUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    // Lấy thông tin người dùng hiện tại từ localStorage hoặc context
    const user: any = JSON.parse(localStorage.getItem("user") || "null");
    const accessToken = user.token;

    try {
      if (postId) {
        const res = await axios.patch(
          `http://localhost:4004/api/users/${post?.uid}`,
          formData,
          {
            headers: { Authorization: `${accessToken}` },
            withCredentials: true,
          }
        );
        console.log(res);
        setRefresh((f) => f + 1);
      }
    } catch (error) {
      console.log("Avatar Upload Error:", error);
    }
  };
  //==================================////

  return (
    <>
      <Layout>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="single">
            <div className="content">
              <img src={`../upload/${post?.img}`} alt="" />

              {/* //<Image src={avatar} alt="" /> */}
              <div className="user">
                {post.userImg && (
                  <Avatar
                    src={`../avatar/${post.userImg}`}
                    width={40}
                    height={40}
                    onUpload={handleAvatarUpload}
                  />
                )}

                <div className="info">
                  <span>{post.username}</span>
                  <p>Posted {moment(post.date).fromNow()}</p>
                </div>

                {currentUser.current &&
                  currentUser.current.username === post.username && (
                    <div className="edit">
                      <Link href={`/Write?id=${postId}`}>
                        <Image src={edit} alt="" />
                      </Link>
                      {/* <Image onClick={handleDelete} src={Delete} alt="" /> */}
                      <Image
                        onClick={() => setShowModal(true)}
                        src={Delete}
                        alt=""
                      />
                    </div>
                  )}
              </div>
              <h1>{post.title}</h1>
              <p>{getText(post.desc)}</p>
            </div>
            <MainMenu fashion={post.fashion} />
          </div>
        )}
      </Layout>

      {/* Phan xoa bai viet khi duoc click */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>You want to delete this post ? </h2>
            <div className="button-container">
              <button className="deleteButton" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="closeButton"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Single;
