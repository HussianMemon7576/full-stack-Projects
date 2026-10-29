import type { Response } from "express";

export function sendCookie(res:Response,RefreshToken:string|undefined){
        res.cookie('RefreshToken',  RefreshToken, {
        maxAge: 900000, 
      
        sameSite: 'strict'
})
}

export function clearCookie(res:Response){

    res.clearCookie("RefreshToken", {
      httpOnly: true,
     
      sameSite: "strict",
      path: "/",
    });
}
