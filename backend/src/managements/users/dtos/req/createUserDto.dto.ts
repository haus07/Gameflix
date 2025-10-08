import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto{
    @IsString({message:"Tên người dùng phải là chuỗi kí tự"})
    @IsNotEmpty({message:"Tên người dùng không được để trống"})
    username: string
    
    @IsString({message:"Mật khẩu phải là chuỗi kí tự"})
    @IsNotEmpty({ message: "Mật khẩu không được để trống" })
    password:string

    @IsEmail()
    @IsNotEmpty({message:"Email không được để trống"})
    email?: string
    
    @IsPhoneNumber('VN')
    @IsOptional()
    @IsNotEmpty({ message: "Số điện thoại không được để trống" })
    phone?:string
}