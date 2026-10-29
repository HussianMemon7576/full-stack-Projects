import bcrypt from "bcrypt"
export async function comaprePasswrord(password:string,Userpassword:string){
    return await bcrypt.compare(password,Userpassword)
}