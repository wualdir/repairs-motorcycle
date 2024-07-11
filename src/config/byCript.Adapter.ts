import { compare, genSaltSync, hashSync } from "bcryptjs"

export const byCriptAdapter={
    hash: (password: string) => {
        const salt = genSaltSync(12) // valor por defecto que tiene es 10
        return hashSync(password, salt)
    
      },
      compare:(bodypassword:string,hashedpasword:string)=>{
        return compare(bodypassword,hashedpasword)
      }
}