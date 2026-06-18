import { Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { cloudService } from "src/common/Services/cloud.service";
import { CategoryService } from "src/Dashboard/Category/category.service";
import { CreateCategoryDTO } from "src/Dashboard/Category/dto/index";
import { ProductRepository } from "src/DB/Models/Product/product.repository";
import { CreateProductDTO } from "./dto/index";
import { TProduct } from "src/DB/Models/Product/product.schema";
import { Types } from "mongoose";
import { Product } from "src/DB/Models/Product/product.schema";
import { IImage } from "src/DB/Models/Category/category.schema";

@Injectable()
export class productService {
    constructor(
        private readonly productRepository:ProductRepository, 
        private readonly categoryService:CategoryService,
        private readonly cloudService:cloudService
     ){}

     async create(createProductDTO:CreateProductDTO, req:Request){
        const{
            category, 
            title,
            price, 
            description,
            discount,
            discountType,
            stock
        } = createProductDTO;
        const categoryExist= await this.categoryService.findOne({_id:category});
        if(!categoryExist) throw new NotFoundException('category not found');
        let folderId = categoryExist.folderId;
            folderId = folderId +'/'+ Math.ceil(Math.random()*10000+9999).toString();
        let images:IImage[]=[];
        if(req.files?.length)
        images = await this.cloudService.uploadFiles(
        req.files as Express.Multer.File[],
        folderId
    );
    const product: Partial<Product> = {
        category, 
        title,
        price, 
        description,
        discount,
        discountType,
        stock,
        images,
        folderId,
        createdBy: req.user._id as Types.ObjectId,
        updatedBy: req.user._id as Types.ObjectId,
    } ;
    const createdProduct = await this.productRepository.create(product);
    return createdProduct;

    }
}