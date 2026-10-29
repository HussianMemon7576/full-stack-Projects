import {   useMutation, useQuery, useQueryClient,  } from "@tanstack/react-query"
import {  changePassword,  changeUsername,  forgotPassword,  logins, logouts,  profiles,  register,  Resetpassword,  verifyOtp } from "../api/auth.api"
import { useNavigate } from "react-router-dom";
import type  {  forgotPasswordQ, VerifyOtpData } from "../types/auth.types";
import { useDispatch } from "react-redux";
import { logout, setOtpEmail } from "../features/auth/authSlice";
export const registerquery = () => {
  const dispatch = useDispatch()
      return  useMutation({
    mutationFn: register,
   
  onSuccess: (data,variables) => {
    console.log("email" , variables)
    dispatch(setOtpEmail(variables.email))
    },
  })
}


export const Otpquery = () => {
  const navigate = useNavigate();
 

  return useMutation({
    mutationFn: ({ email, otp }: VerifyOtpData) => {
      return verifyOtp(email, otp);
    },

    onSuccess: () => {
   
      navigate("/Home");
    },
  });
};





export const logoutquery = () => {
  const navigate = useNavigate();
 const dispatch = useDispatch()
  return useMutation({
    mutationFn : logouts,

    onSuccess: () => {
      
   dispatch(logout())

      navigate("/");
    },
  });
};

export const loginquery = () => {

  return useMutation({
    mutationFn : logins,

  });
};

export  const profileQuery = () => {

  return useQuery({
    queryKey : ["profile"],
    queryFn : profiles,

  });
};



export const chnageUserNameQuery = () => {
const queryClient = useQueryClient();

  return useMutation({
    mutationFn : changeUsername,

       onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },

  });
};


export const changePasswordMutation = () => {
  return useMutation({
       mutationFn : changePassword
  });
};

export const forgotPasswordMutation = () => {
  return useMutation({
       mutationFn : forgotPassword
  });
};

export const resetPasswordMutation = () => {
  return useMutation({
       mutationFn : ({token,newPassword,confirmPassword}:forgotPasswordQ ) => {
        return Resetpassword(token,newPassword,confirmPassword)
       }
  });
};