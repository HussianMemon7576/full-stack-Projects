export interface RegisterData {
  username: string;
  email: string;
  password: string;
}


export interface AuthUser {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
}
export interface AuthState {
    accessToken: string | null;
  isAuthenticated: boolean;
  otpEmail : null|string
  user: AuthUser|null;
  loading : boolean,



}
export interface login {
  email : string,
  password : string
}
export interface SetUserPayload {
  accessToken: string;
  data: AuthUser;
}
export interface OtpVerifyResponse {
  message: string;
  success: boolean;
  accessToken: string;
  data: AuthUser;
}

export interface verifyEmailResponse {
  success : boolean,
  message : string,
  requiresVerification : boolean
}
  


export interface RegisterResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}
export interface otpData{
  
  success : boolean ,
  accessToken : string,
 
} 

export interface otpResponse {
  message : string ,
  data : otpData

}

export interface VerifyOtpData {
  email: string;
  otp: string;
}


export interface logout {
  success : boolean,
  message : string
}
export interface LoginVerificationResponse {
  success: boolean;
  message: string;
  requiresVerification: true;
  email : string,
}

export interface LoginSuccessResponse {
  success: boolean;
  message: string;
  accessToken: string;
    requiresVerification: false;
    data : AuthUser
}

export type LoginResponse =
  | LoginVerificationResponse
  | LoginSuccessResponse;

  export interface refreshResponse {
    message : string,
    accessToken : string
  }

  
  export interface profile {
    success : true
    message : string,
  data : {
    username: string,
    email : string 
  }
  }

  export interface chnageUserNameT {
    success : true
    message : string,
  data : {
    username: string,
    usernameLastChangedAt : Date 
  }
  }

    export interface chnageUserPasswordT {
    success : true
    message : string,
  data : {
    username: string,
    password : string,
    usernameLastPasswordUpdate : Date 
  }
  }

   export interface chnageUserNameQ {
    newUserName : string,

  }

    export interface changePasswordQ{
      oldPassword:string,
      newPassword:string
    }


    export interface forgotPasswordQ{
      token:string,
      newPassword:string,

      confirmPassword:string,
    }