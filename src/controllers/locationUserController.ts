import { Request,Response} from 'express';
import LocationUserModel from '../models/locationUserModel';
import PermissionModel from '../models/permissionModel';
import SessionModel from '../models/sessionModel';
import Verify from '../util/verify'
const verifier = new Verify();
const session = new SessionModel();
const permission = new PermissionModel();
const model = new LocationUserModel()

class LocationUserController{

    async assign(req:Request,res:Response){
        const {path} = req.route
        const {user_id,authorization} = req.headers
        const {locationId,userId} = req.body
        if(!verifier.verifyNullIncommingFields({user_id,authorization})) return res.status(404).json({"message":"Campo obrigatório"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(404).json({error:"Sessão inválida"});
        //checks if the user has permission to access the endpoint
        const grant:any = await permission.verify(user_id,path);
        if(!grant.granted){
        return res.status(404).json({error:"Você não possui permissão para acesso"})
        }
        return res.json( await model.new({location_id:locationId,user_id:userId}))
    }

    async unassign(req:Request,res:Response){
        const {path} = req.route
        const {user_id,authorization} = req.headers
        const {locationUserId} = req.params
        if(!verifier.verifyNullIncommingFields({user_id,authorization,locationUserId})) return res.status(404).json({"message":"Campo obrigatório"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(404).json({error:"Sessão inválida"});
        //checks if the user has permission to access the endpoint
        const grant:any = await permission.verify(user_id,path);
        if(!grant.granted){
        return res.status(404).json({error:"Você não possui permissão para acesso"})
        }
        return res.json(await model.delete(locationUserId))
    }

    async listAssigns(req:Request,res:Response){
        const {path} = req.route
        const {userid,authorization} = req.headers
        const {id} = req.params
        if(!verifier.verifyNullIncommingFields({authorization,id,userid})) return res.status(404).json({"message":"Campo obrigatório"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(403).json({error:"Sessão inválida"});
        //checks if the user has permission to access the endpoint
        //const grant:any = await permission.verify(userid,path);
        //if(!grant.granted){
        //    return res.status(404).json({error:"Você não possui permissão para acesso"})
        //}
        return res.json(await model.listPerUser(id))
    }

    async detail(req: Request, res: Response){
        const {path} = req.route
        const {userid,authorization} = req.headers
        const {id,locationId} = req.params
        if(!verifier.verifyNullIncommingFields({authorization,id,userid})) return res.status(404).json({"message":"Campo obrigatório"});
        //Checks whether the session is valid
        const logged = await session.verify(authorization)
        if(!logged.is_valid)return res.status(403).json({error:"Sessão inválida"});
        //checks if the user has permission to access the endpoint
        //const grant:any = await permission.verify(userid,path);
        //if(!grant.granted){
        //    return res.status(404).json({error:"Você não possui permissão para acesso"})
        //}
        const data =  await model.detail(id,locationId)
        if(data.message){
            return res.status(404).json(data)
        }else if(data.error){
            return res.status(422).json(data)
        }else{
            return res.json(data)
        }
    }

}

export default LocationUserController