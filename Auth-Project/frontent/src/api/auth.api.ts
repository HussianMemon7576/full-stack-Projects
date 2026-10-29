import { api, } from "./api"

import type { logout,  OtpVerifyResponse, RegisterData,RegisterResponse, LoginResponse, login,refreshResponse, profile, chnageUserNameT, chnageUserPasswordT } from "../types/auth.types"
export const register = async (data:RegisterData) : Promise<RegisterResponse> => {
    const response = await api.post("/auth/register",data)
 
    return response.data

}

export const logins = async (loginData:login) : Promise<LoginResponse> => {

    const response = await api.post<LoginResponse>("/auth/login",loginData)
    
    return response.data

}


export const verifyOtp = async (email:string,otp:string) : Promise<OtpVerifyResponse> => {
    const response = await api.post("/auth/verify-otp",{email,otp})
   
    return response.data

}


export const logouts = async() :Promise<logout> => {
 const response = await api.post("/auth/logout")
 
    return response.data

}



let refreshPromise: Promise<string> | null = null;

export const RefreshToken = (): Promise<string> => {
    if (!refreshPromise) {
        refreshPromise = api
            .post<refreshResponse>("/auth/refresh")
            .then((response) => response.data.accessToken)
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
};


export const profiles = async() :Promise<profile> => {
 const response = await api.get("/user/profile")
 
    return response.data

}


export const changeUsername = async ( newUserName: string) : Promise<chnageUserNameT> => {
  const response = await api.patch(
    "/user/change-username",
    { newUserName }
  );

  return response.data;
};

export const changePassword = async (payload: { oldPassword: string; newPassword: string;}) :Promise<chnageUserPasswordT> =>  {
  const response = await api.patch(
    "/user/change-password",
    payload
  );

  return response.data;
};


export const forgotPassword = async (email:string) :Promise<logout> =>  {
  const response = await api.post(
    "/user/forgot-password",
    {email}
  );

  return response.data;
};

export const Resetpassword = async (token:string,newPassword:string,confirmPassword:string) :Promise<logout> =>  {
  const response = await api.post(
    "/user/reset-password",
    {token,newPassword,confirmPassword}
  );

  return response.data;
};