import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Category, IImage } from "../Category/category.schema";
import slugify from "slugify";
import { User } from "../user/user.schema";
export enum DiscountType{
    FIXED_AMOUNT ='fixedAmount',
    PERCENTAGE='percentage'
}

@Schema({timestamps:true})
export class Product{
    @Prop({type:String,required:true, trim:true})
    title:string;
    @Prop({
        type:String,
        default:function(){
            return slugify(this.title);
        }, 
        trim:true
    })
    slug:string;
    @Prop({type:String, trim:true})
    description:string;
    //objectId
    @Prop({type:SchemaTypes.ObjectId,ref:User.name,required:true})
    createdBy:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId,ref:User.name,default:function(){
        return this.createdBy;
    }})
    updatedBy:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId,ref:Category.name,required:true})
    category:Types.ObjectId;
    //subcategory , brand
    //number
    @Prop({type:Number,required:true, min:1})
    price:number;
    @Prop({type:Number,default:0,min:0})
    discount:number;
    @Prop({ type: String, enum: DiscountType })
    discountType: DiscountType;
    // discountType:["fixedAmount",'percentage']
    @Prop({type:Number,required:true, min:1})
    finalPrice:number;
    @Prop({type:Number,default:1,min:0})
    stock:number;
    //image
    @Prop({type:[{secure_url:String, public_id:String}]})
    images:IImage[];
    @Prop({type:String})
    folderId:string;

}
export const productSchema =SchemaFactory.createForClass(Product);
export type TProduct = HydratedDocument<Product> & Document;