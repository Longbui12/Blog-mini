import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const router = useRouter();

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4004/api/auth/register", inputs);

      router.push("/login");
      //router.push("/");
    } catch (err: any) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  return (
    <div className="auth">
      <form>
        <h1>Register</h1>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account ?&ensp;
          <Link href="/Login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
