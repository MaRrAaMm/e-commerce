import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRoles } from "src/common/enums/index";
//schema class
@Schema({timestamps: true})
export class User {
    @Prop({type:String, required: true})
    username: string;
    @Prop({type:String, required: true,unique: true })
    email :string;
    @Prop({type:String, required: true})
    password :string;

    @Prop({type:String,enum:UserRoles ,default: UserRoles.USER})
    role:string;
}
//schema
export const userSchema = SchemaFactory.createForClass(User);
//user type
export type TUser = User & Document;
