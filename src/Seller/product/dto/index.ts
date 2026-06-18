import { Type } from "class-transformer";
import { 
    IsMongoId, 
    IsNotEmpty, 
    IsNumber, 
    IsOptional, 
    IsPositive, 
    IsString, 
    MinLength 
} from "class-validator";
import { Types } from "mongoose";
import { DiscountType } from "src/DB/Models/Product/product.schema";
export class CreateProductDTO{
    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description:string;

    @Type(()=>Types.ObjectId)
    @IsMongoId()
    category:Types.ObjectId;

    @Type(()=>Number)
    @IsNumber()
    @IsPositive()
    price:number;

    @Type(()=>Number)
    @IsNumber()
    @IsPositive()
    discount?:number;

    @IsString()
    @IsOptional()
    discountType?: DiscountType;

    @Type(()=>Number)    
    @IsNumber()
    @IsOptional()
    stock?:number;

    
}
