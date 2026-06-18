import { Body, Controller, Param, Post, Put, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Auth } from "src/common/Decorators/auth.decorator";
import { CategoryService } from "./category.service";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./dto/index";
import { Request } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { multerOptions } from "src/common/Utils/multer";
import { CloudInterceptor } from "src/common/Interceptor/cloud.interceptor";
import { Types } from "mongoose";

@Controller('dashboard/category')
@Auth('admin')
export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}
    // 2 wayes to handle file in nest
    // 1- service common way
    // 2- interceptor handle file
    @Post()
    @UseInterceptors(
        FileInterceptor('image',multerOptions()), CloudInterceptor // handle file in req
    )
    async create(
        @Body()CreateCategoryDTO:CreateCategoryDTO,
        @Req() req:Request,
        //@UploadedFile() file:Express.Multer.File,
    ){
        const category = await this.categoryService.create(CreateCategoryDTO,
            req['user'],
            //file
        );
            return{
                success:true,
                message:'category created successfully',
                data:category,
            };
    }
    @Put(':id')
    @UseInterceptors(FileInterceptor('file',multerOptions()))
    async update(
        @Param('id')id:Types.ObjectId,
        @Body()updateCategoryDTO:UpdateCategoryDTO,
        @Req() req:Request
    ){
        const category = await this.categoryService.update(
            id,
            updateCategoryDTO,
            req
        );
        return{
            success:true,
            message:'update category successfully',
            data:category
        };
    }
    
}