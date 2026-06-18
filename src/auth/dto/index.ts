import { 
    IsEmail,
    IsNotEmpty, 
    IsNumber, 
    IsString, 
    IsStrongPassword, 
    MinLength
} from "class-validator";

export class SignupDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email :string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @IsStrongPassword()
    @IsNotEmpty()
    cPassword : string;
}

export class LoginDTO{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email :string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}
export class signupQueryDTO{
    @IsNumber()
    id:number;
}