
export class LoginUserDto{

    constructor(
        public readonly email:string,
        public readonly password:string
    ){
    }

    static logindto(objetc:{[key:string]:any}):[string?,LoginUserDto?]{
        const {email,password}=objetc
        if(!email) return ['missing email']
        if(!password) return ['missing passowrd']
        return [undefined,new LoginUserDto(email,password)]
    }
}