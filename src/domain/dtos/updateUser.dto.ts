export class UpdateUserDto{

    constructor(
        public readonly name:string,
        public readonly email:string,
        public readonly password:string
    ){
    }

    static updateUdto(objetc:{[key:string]:any}):[string?,UpdateUserDto?]{
        const {name,email,password}=objetc
        if(!name) return ['missing name']
        if(!email) return ['missing email']
        if(!password) return ['missing passowrd']
        
        return [undefined,new UpdateUserDto(name,email,password)]
    }
}