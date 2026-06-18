import { Module } from "@nestjs/common";
import { ProductModel } from "src/DB/Models/Product/product.model";

@Module({imports:[ProductModel], controllers:[], providers:[]})

export class SellerModule{}