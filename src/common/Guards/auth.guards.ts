import { 
    CanActivate, 
    ExecutionContext, 
    Injectable, 
    NotAcceptableException, 
    UnauthorizedException 
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { TokenService } from "../Services/token.service";
import { UserRepository } from "src/DB/Models/user/user.repository";
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private tokenService:TokenService, 
        private userRepository:UserRepository
    ){}
    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const{authorization} = request.headers;
        if(!authorization?.startsWith("Hambozo")){
            throw new UnauthorizedException("invalid bearer token");
        }
        const token =  authorization.split(" ")[1];
        const data = this.tokenService.verify(token, {
            secret:process.env.JWT_SECRET,
        });
        const user = await this.userRepository.findOne({_id:data._id});
        if(!user) throw new NotAcceptableException("user not found");
        request.user = user
        return true;

    }
}