import React from "react";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { googleAuth } from "../services/api";
import { FcGoogle } from "react-icons/fc";
import { Navigate } from "react-router-dom";
import axios from "axios"
import { useDashboardContext } from "../Context/DashboardContext";

export default (props) => {
  const { user, setUser,setAccessToken } = useDashboardContext();
  const SCOPES = [
  'https://www.googleapis.com/auth/classroom.courses',
  'https://www.googleapis.com/auth/classroom.coursework.students',
  'https://www.googleapis.com/auth/classroom.coursework.me',
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.topics.readonly'
];
  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        setAccessToken(result.data.data.accessToken)
        setUser(result.data.data.user);
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
    }
  };


  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError:responseGoogle,
    flow: "auth-code",
    scope: SCOPES.join(' ')
  });


  return (
    <button
      className="py-4 bg-gray-8 rounded-xl hover:bg-gray-7 w-full flex items-center justify-center gap-4"
      onClick={googleLogin}
    >
      <FcGoogle /> Sign in with Google
    </button>
  );
};
