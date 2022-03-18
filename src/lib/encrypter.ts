
import bcrypt from "bcryptjs";

export async function encryptPassword(password: string){
    
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function matchPassword(password:string, dbPassword: string) {
    try {
        return await bcrypt.compare(password, dbPassword);
    } catch (error) {
        console.error(error);
    }
}
