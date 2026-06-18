import { Module } from "@nestjs/common";
import { ProductModel } from "src/DB/Models/Product/product.model";
import { ProductController } from "./product.controller";
import { productService } from "./product.service";
import { ProductRepository } from "src/DB/Models/Product/product.repository";
import { CategoryRepository } from "src/DB/Models/Category/category.repository";
import { CategoryService } from "src/Dashboard/Category/category.service";
import { CategoryModel } from "src/DB/Models/Category/category.model";
import { cloudService } from "src/common/Services/cloud.service.js";

@Module({
    imports:[ProductModel,CategoryModel],
    controllers:[ProductController],
    providers:[
        productService,
        ProductRepository,
        CategoryRepository,
        CategoryService,
        cloudService
    ]
})
export class ProductModule {}