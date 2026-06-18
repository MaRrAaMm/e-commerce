import { Injectable } from "@nestjs/common";
import { DBService } from "src/DB/db.service";
import { Category, TCategory } from "./category.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CategoryRepository extends DBService<TCategory>{
    constructor(@InjectModel(Category.name) categoryModel:Model<TCategory>    ){
        super(categoryModel);
    }
}