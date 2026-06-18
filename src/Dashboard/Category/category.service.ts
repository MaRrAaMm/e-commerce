import { ConflictException, Injectable } from "@nestjs/common";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./dto";
import { CategoryRepository } from "src/DB/Models/Category/category.repository";
import { TUser } from "src/DB/Models/user/user.schema";
import { FilterQuery, Types } from "mongoose";
import { TCategory } from "src/DB/Models/Category/category.schema";
import { cloudService } from "src/common/Services/cloud.service";
import slugify from "slugify";
import { Request } from "express";

@Injectable()
export class CategoryService {
    constructor(
        private readonly categoryRepository:CategoryRepository,
        private readonly cloudService: cloudService
){}
    async findOne(filter:FilterQuery<TCategory>){
        return await this.categoryRepository.findOne(filter);
    }
    async create(
        createCategoryDTO:CreateCategoryDTO,
        user:TUser,
       
    ):Promise<TCategory>{
        const {name} = createCategoryDTO;
        const categoryExist= await this.findOne({name});
        if(categoryExist) throw new ConflictException('category already exist');
        // upload file
        // const folderId = Math.ceil(Math.random()*10000+9999).toString();
        // const {secure_url, public_id} = await this.cloudService.uploadFile({path:file.path, folder:folderId})
        // prepare data

        const category = {
            name, 
            createdBy:user._id as Types.ObjectId,
            image:{
                secure_url:createCategoryDTO.image.secure_url, 
                public_id:createCategoryDTO.image.public_id
            }, 
            folderId:createCategoryDTO.image.folderId,
        };
        const createdCategory =await this.categoryRepository.create(category);
        return createdCategory;
    }
    async update(id: Types.ObjectId,
        updateCategoryDTO:UpdateCategoryDTO,
        req:Request,
    ){
        const{name} = updateCategoryDTO;
        const{file} = req;
        const categoryExist = await this.findOne({_id:id});
        if(!categoryExist) throw new ConflictException('category not found');
        if(name){
            const nameExist = await this.findOne({name});
            if(nameExist) throw new ConflictException('category already exist');
            categoryExist.name = name;
            categoryExist.slug = slugify(name);
        }
        if(file){
            const{secure_url} = await this.cloudService.uploadFile({
                path:file.path,
                public_id:categoryExist.image.public_id
            });
            categoryExist.image.secure_url = secure_url;
        }
        return await categoryExist.save();
    }
}