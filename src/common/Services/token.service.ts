import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";

@Injectable()
export class TokenService{
    constructor( private jwtService:JwtService){}
    sign(payload:object,optionas:JwtSignOptions){
        return this.jwtService.sign(payload,optionas);
    }
    verify(token:string, options: JwtVerifyOptions){
        return this.jwtService.verify(token, options)
    }
}