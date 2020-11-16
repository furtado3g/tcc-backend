import {Request,Response} from 'express'
import TypeLocationModel from '../models/typeLocationModel' 
import sessionModel from '../models/sessionModel'
import PermissionModel from '../models//permissionModel';
import Verifier from '../util/verify'

const session = new sessionModel();
const permission = new PermissionModel();
const verifier = new Verifier();
const model = new  TypeLocationModel()

class TypeLocationController{
    async create(req:Request,res:Response){
        const {path} = req.route
        const {userid,authorization} = req.headers
        const {description} = req.body
        console.log({userid,authorization,description})
        if(!verifier.verifyNullIncommingFields({userid,authorization,description})) return res.status(404).json({"message":"Campo obrigatório"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(404).json({error:"Sessão inválida"});
        //checks if the user has permission to access the endpoint
        //const grant:any = await permission.verify(userid,path);
        //if(!grant.granted){
        //return res.status(404).json({error:"Você não possui permissão para acesso"})
        //}
        const model = new TypeLocationModel()
        return res.json(await model.create(description))
    }
    
    async delete(req:Request,res:Response){
        const {path} = req.route
        const {id} = req.params
        const {userid,authorization} = req.headers
        if(!verifier.verifyNullIncommingFields({userid,authorization,id})) return res.status(404).json({"message":"Campo obrigatório"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(404).json({error:"Sessão inválida"});
        //checks if the user has permission to access the endpoint
        //const grant:any = await permission.verify(userid,path);
        //if(!grant.granted){
        //    return res.status(404).json({error:"Você não possui permissão para acesso"})
        //}
        return res.json(await model.delete(id))
    }
    
    async list(req:Request,res:Response){
        const {path} = req.route
        const {userid,authorization} = req.headers
        if(!verifier.verifyNullIncommingFields({userid,authorization})) return res.status(404).json({"message":"Campo obrigatório"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(404).json({error:"Sessão inválida"});
        //checks if the user has permission to access the endpoint
        //const grant:any = await permission.verify(userid,path);
        //if(!grant.granted){
        //    return res.status(404).json({error:"Você não possui permissão para acesso"})
        //}
        const list = await model.list()
        return res.json(list)
    }

    async detaiL(req:Request,res:Response){
        const {path} = req.route
        const {userid,authorization} = req.headers
        const {id} = req.params
        if(!verifier.verifyNullIncommingFields({userid,authorization})) return res.status(404).json({"message":"Campo obrigatório"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(403).json({error:"Sessão inválida"});
        //checks if the user has permission to access the endpoint
        //const grant:any = await permission.verify(userid,path);
        //if(!grant.granted){
        //    return res.status(401).json({error:"Você não possui permissão para acesso"})
        //}
        const detail = await model.detail(id) 
        console.log(detail)
        const {error}:any = detail
        if(error){
            return res.status(404).json(detail)
        }else{
            return res.json(detail)
        }
    }
    
    async edit(req:Request,res:Response){
        const {path} = req.route
        const {id} = req.params
        const {description} = req.body
        const {userid,authorization} = req.headers
        if(!verifier.verifyNullIncommingFields({userid,authorization})) return res.status(400).json({"message":"Campo obrigatório"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(401).json({error:"Sessão inválida"});
        //checks if the user has permission to access the endpoint
        //const grant:any = await permission.verify(userid,path);
        //if(!grant.granted){
        //    return res.status(403).json({error:"Você não possui permissão para acesso"})
        //}
        const returnable = await model.update(id,description);
        if(returnable.error){
            return res.status(404).json(returnable)
        }else{
            return res.json(returnable)
        }
    }

}

export default TypeLocationController