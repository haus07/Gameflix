import * as bcrypt from 'bcrypt'

export async function hashPashword(password:string) {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password,salt)
}

export async function comparePassword(password:string,hashPashword:string) {
    return bcrypt.compare(password,hashPashword)
}