import { Body, Controller, Post, Req, UseInterceptors } from "@nestjs/common";
import { productService } from "./product.service";
import { CreateProductDTO } from "./dto/index";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "src/common/Utils/multer";
import { Request } from "express";
import { Auth } from "src/common/Decorators/auth.decorator";

@Controller('seller/product')
@Auth('seller')
export class ProductController{
    constructor(private readonly productService:productService){}

    @Post()
    @UseInterceptors(FilesInterceptor('files',3,multerOptions()))
    async create(@Body() createProductDTO:CreateProductDTO, @Req() req:Request){
        const product = await this.productService.create(createProductDTO,req);
        return{
            success:true,
            data:product
        }
    }
}