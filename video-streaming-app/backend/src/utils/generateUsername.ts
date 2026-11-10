// aik full name milega isse jaise Hussain Memon us Hussain memon ko karo trim hussainmemon
// trim ke baad usme add karo 1 hussainmemon1 phir db me find akro agar mil jaye to hussainmemon2 kaor aise hi barhate rhi
import { User } from "../models/user.model.js"
export const generateUserName = async(fullName:string) => {

    const name = fullName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
    let counter = 1 

    let baseName = `${name}${counter}`

    while (await User.find({username : baseName}) ) {
        counter++
        baseName = `${name}${counter}`

    }
    return baseName

}

