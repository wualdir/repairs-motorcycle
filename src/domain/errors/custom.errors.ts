

export class CustomError extends Error{

    constructor(
        public readonly message:string,
        public readonly statusCod:number
    ){
        super(message)
    }

    static badRequest(message:string){
        return  new CustomError(message,400)
    }
    static unAutorized(message:string){
        return  new CustomError(message,401)
    }
    static notFound(message:string){
        return  new CustomError(message,404)
    }
    static InternalServer(message:string){
        return  new CustomError(message,500)
    }
}