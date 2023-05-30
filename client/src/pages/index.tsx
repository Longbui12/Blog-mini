/* eslint-disable @next/next/no-img-element */
//import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";

function Home() {
  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://assets.vogue.com/photos/62ba4b9fd383d5d45d4d4dec/master/w_800%2Cc_limit/PARIS-MENS-STREETSTYLE-PHILOH-DAY6-%25207.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://assets.vogue.com/photos/62ba4b8e7068ff72e6ce8661/master/w_800%2Cc_limit/PARIS-MENS-STREETSTYLE-PHILOH-DAY6-%252012.jpg",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://assets.vogue.com/photos/62ba4b8a0ae86878563d664c/master/w_800%2Cc_limit/PARIS-MENS-STREETSTYLE-PHILOH-DAY6-%252013.jpg",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://assets.vogue.com/photos/62ba4b7bdb5ea5a908fdc3e9/master/w_800%2Cc_limit/PARIS-MENS-STREETSTYLE-PHILOH-DAY6-%252018.jpg",
  //   },
  // ];

  // Cấu hình văn bản để không hiển thị thẻ <p> khi đưa văn bản ra trình duyệt
  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const [posts, setPosts] = useState([]);

  const fashion = useRouter().asPath;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4004/api/posts${fashion}`
        );
        // console.log(res);
        setPosts(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
        setPosts([]);
      }
    };
    fetchData();
  }, [fashion]);
  return (
    <Layout>
      <div className="home">
        <div className="posts">
          {posts.map((post: any) => (
            <div className="post" key={post.id}>
              {/* <Link className="img" href={`/post/${post.id}`}>
              <img src={post.img} alt="" />
              </Link> */}
              <Link className="img" href={`/post/${post.id}`}>
                <div>
                  <img src={`../upload/${post.img}`} alt="" />
                </div>
              </Link>
              <div className="content">
                <Link className="link" href={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.desc)}</p>
                <Link href={`/post/${post.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
