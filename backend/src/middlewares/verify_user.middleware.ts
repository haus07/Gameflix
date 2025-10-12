import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction } from "express";
import { Users } from "src/managements/users/entities/users.entity";
import { Repository } from "typeorm";
import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

dotenv.config()

@Injectable()

export class VerifyLoginMiddleware implements NestMiddleware{
    constructor(
        @InjectRepository(Users)
        private readonly usersRepo:Repository<Users>
    ) { }
    
    async use(req: any, res: any, next:NextFunction) {
        try {
            const accessTokenSecret: string = process.env.SECRET_KEY as string
            const token: string = req.cookies['access_Token']
            console.log(token)
            if (!token) {
                throw new UnauthorizedException("Không có quyển truy cập")
            }
            const decoded = jwt.verify(token, accessTokenSecret)
            req.userData = decoded
            if (req.userData) {
                const user = await this.usersRepo.findOne({
                    where: {
                        id:req.userData.id
                    },
                    relations:['role']
                })
                if (!user) {
                    throw new UnauthorizedException("Không có quyển truy cập")
                }
                const { password: _, ...userWithoutPassword } = user
                req.userData = {
                    ...userWithoutPassword
                }
            }
            return next()
        } catch (error) {
            // XỬ LÝ LỖI TRONG CATCH BLOCK
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('Token đã hết hạn.');
            }
            if (error instanceof JsonWebTokenError) {
                throw new UnauthorizedException('Token không hợp lệ.');
            }
            // Ném lỗi mặc định nếu không phải lỗi từ JWT
            throw new UnauthorizedException(error.message || "Không có quyền truy cập.");
        }
    }
}