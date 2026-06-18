import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "src/DB/Models/Category/category.repository";
import { CategoryModel } from "src/DB/Models/Category/category.model";
import { TokenService } from "src/common/index";
import { cloudService } from "src/common/Services/cloud.service";

@Module({
    imports:[CategoryModel],
    controllers:[CategoryController],
    providers:[
        CategoryService,
        CategoryRepository,
        cloudService
    ]
})
export class CategoryModule {}