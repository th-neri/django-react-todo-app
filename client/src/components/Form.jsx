import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method == "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // only send email, password if login otherwise send name, email, password
      const payload =
        method == "login" ? { email, password } : { username, email, password };

      const response = await api.post(route, payload);

      if (method == "login") {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        navigate("/");
      } else {
        // after successfull registration go to login page
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // reusable red asterisk
  const RedAsterisk = () => <span className="text-red-500 ">*</span>;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center my-12 p-5 rounded-lg shadow-md w-[600px]"
      >
        <h1 className="text-2xl font-semibold pb-10">{name}</h1>

        {/* only render username if registering */}
        {method == "register" && (
          <div className="flex flex-col">
            <label className="text-lg font-bold text-gray-700">
              Username <RedAsterisk />
            </label>
            <input
              className="w-96 py-2.5 pl-2 my-2.5 text-lg font-semibold border border-gray-400 rounded-lg focus:outline-none"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}

        {/* email field */}
        <div className="flex flex-col">
          <label className="text-lg font-bold text-gray-700">
            Email <RedAsterisk />
          </label>
          <input
            className="w-96 py-2.5 pl-2 my-2.5 text-lg font-semibold border border-gray-400 rounded-lg focus:outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* password field */}
        <div className="flex flex-col">
          <label className="text-lg font-bold text-gray-700">
            Password <RedAsterisk />
          </label>
          <input
            className="w-96 py-2.5 pl-2 my-2.5 text-lg font-semibold border border-gray-400 rounded-lg focus:outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="w-80 py-2.5 my-5 text-white text-lg font-semibold bg-sky-500 hover:bg-sky-600 rounded-sm cursor-pointer"
          type="submit"
        >
          {name}
        </button>

        {/* only render if login screen */}
        {method == "login" && (
          <div className="w-full flex justify-end items-center">
            <button
              onClick={() => navigate("/register")}
              className="text-lg font-semibold text-blue-500 hover:text-blue-600 cursor-pointer underline underline-offset-6 pt-10"
            >
              Don't have an account yet?
            </button>
          </div>
        )}

        {/* only render if register screen */}
        {method == "register" && (
          <div className="w-full flex justify-start items-center">
            <button
              onClick={() => navigate("/login")}
              className="text-lg font-semibold text-blue-500 hover:text-blue-600 cursor-pointer underline underline-offset-6 pt-10"
            >
              Already have an account?
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
