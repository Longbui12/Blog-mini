/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useRouter } from "next/router";
//import Image from "next/image";

interface MenuProps {
  fashion: string;
}
interface Post {
  id: number;
  title: string;
  desc: string;
  img: string;
}

const Menu = ({ fashion }: { fashion: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // const fashion = useRouter().asPath;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4004/api/posts/?fashion=${fashion}`
        );
        // console.log(res);
        setPosts(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [fashion]);
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
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
