import { 
    CallHandler, 
    ExecutionContext, 
    Injectable, 
    NestInterceptor 
} from "@nestjs/common"
import { catchError, map, Observable, throwError } from "rxjs"
import { cloudService } from "../Services/cloud.service";
import { Request } from "express";

@Injectable()
export class CloudInterceptor implements NestInterceptor{
    constructor(private readonly cloudService:cloudService){}
    async intercept(
        context: ExecutionContext, 
        next: CallHandler<any>
    ): Promise<Observable<any>> { // observable handels more method
        const request = context.switchToHttp().getRequest() as Request;
        const file = request.file as Express.Multer.File;
        if(file){
        const folderId = Math.ceil(Math.random()*10000+9999).toString();
        const {secure_url, public_id} = await this.cloudService.uploadFile({
            path:file.path, 
            folder:folderId
        });
        request.body.image={secure_url, public_id, folderId};
        }
        return next.handle().pipe(            // handle >> return Observable
            catchError(async(err)=>{
                //logic 
                this.cloudService.deleteFolder(request.body.image.folderId)
                return throwError(()=>err)
            }),

        ); 
    }
}