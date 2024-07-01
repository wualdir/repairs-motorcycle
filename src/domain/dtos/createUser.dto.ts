import { RegularExpre } from "../../config"

export class CreateUserDto{

    constructor(
        public readonly name:string,
        public readonly email:string,
        public readonly password:string
    ){
    }

    static createUdto(objetc:{[key:string]:any}):[string?,CreateUserDto?]{
        const {name,email,password}=objetc
        if(!name) return ['missing name']
        if(!email) return ['missing email']
        if(!password) return ['missing passowrd']
        //regex
        if(!RegularExpre.email.test(email)) return ['emali invalid']
        if(!RegularExpre.password.test(password)) return ['The password must have at least one capital letter, one number and one special character']
        
        return [undefined,new CreateUserDto(name,email,password)]
    }
}