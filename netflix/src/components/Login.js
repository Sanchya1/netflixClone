import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const isLoading= useSelector(store =>store.app.isLoading);
  const loginHandler = () => {
    setIsLogin(!isLogin);
  };
  const getInputData = async (e) => {
    e.preventDefault(); // prevents page relaod
    dispatch(setLoading(true));
    if (isLogin) {
      //login
      const user = {email,password}; 
      try {
        const res = await axios.post(`${API_END_POINT}/login`, user,{
          header:{
            'Content-Type':'application/json'
          },
          withCredentials:true
        });
        console.log(res);
        if(res.data.success){
          toast.success(res.data.message);
        }

        dispatch(setUser(res.data.user));
        console.log(user);
        navigate("/browse");

      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
      finally{
        dispatch(setLoading(false));
      }
    } else {
      //register
      dispatch(setLoading(true));
      const user = {fullName, email, password};
      try {
          const res = await axios.post(`${API_END_POINT}/register`,user,{
            header:{
              'Content-Type':'application/json'
            },
            withCredentials:true
          });
        console.log(res);
        if(res.data.success){
          toast.success(res.data.message);
        }
        setIsLogin(true);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
      finally{
        dispatch(setLoading(false));
      }
    }

    setFullName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          className=" w-[100vw] h-[100vh]"
          src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY-970-80.jpg.webp"
          alt="banner"
        />
      </div>
      <form
        onSubmit={getInputData}
        className="flex flex-col w-3/12 p-12 items-center justify-center absolute my-36 left-0 right-0 mx-auto bg-black opacity-85 rounded-md"
      >
        <h1 className=" text-3xl text-white mb-5 font-bold">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <div className="flex flex-col">
          {!isLogin && (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Full Name"
              className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white "
          />
          <button type='submit' className="bg-red-600 mt-6 p-3 text-white rounded-sm font-medium">
            {`${isLoading ? "loading... " :(isLogin ? "Login" : "Sign Up") }`}
          </button>
          <p className=" text-white mt-2">
            {isLogin ? "New to Netflix?" : "Already have an Account"}
            <span
              onClick={loginHandler}
              className=" ml-1 text-blue-900 font-medium cursor-pointer"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}
