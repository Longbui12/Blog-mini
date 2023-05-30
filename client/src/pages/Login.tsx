import Link from "next/link";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4004/api/auth/login",
        inputs
      );
      console.log(res);
      router.push("/");

      // phan nay dung chung voi Cach 2 ben auth controller ( nho them const res = await axios.post(....)  )
      if (res.data.code === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/");
      }
    } catch (err: any) {
      console.log(err.response?.data?.message);
      setErr(err.response?.data?.message);
    }
  };
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     await login(inputs); // Gọi hàm login từ AuthContext
  //     router.push("/");
  //   } catch (err: any) {
  //     console.log(err.response?.data?.message);
  //     setErr(err.response?.data?.message);
  //   }
  // };

  return (
    <div className="auth">
      <form>
        <h1>LOGIN</h1>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don`t you have an account ?&ensp;
          <Link href="/Register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
