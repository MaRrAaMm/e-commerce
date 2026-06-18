import { Injectable } from "@nestjs/common";
import { DBService } from "src/DB/db.service";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Product, TProduct } from "./product.schema.js";

@Injectable()
export class ProductRepository extends DBService<TProduct>{
    constructor(
        @InjectModel(Product.name) private readonly ProductModel:Model<TProduct>,
    ){
        super(ProductModel);
    }
}