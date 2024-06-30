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
        
        return [undefined,new CreateUserDto(name,email,password)]
    }
}