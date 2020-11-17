import db from "../database/connection";

interface ILocationUser{
    user_id : number,
    location_id:number
}
class LocationUserModel{

    async new(locationUser : ILocationUser){
        const relationExists = await db('user_location')
        .select('*')
        .where('user_id',locationUser.user_id)
        .where('location_id',locationUser.location_id)
        if (relationExists[0]){
            return {
                error : "Relacionamento já existente"
            }            
        }
        return await db('user_location')
        .insert(locationUser)
        .then(data=>{
            return { message : "Espaço atribuído ao usuário" }
        })
        .catch(e=>{
            return { error : "Erro ao atribuir relacionamento"}
        })
    }

    async delete(id:string){
        let returnable
        const idExists = await db('user_location')
        .select('*')
        .where('id',id)
        if(!idExists[0]){
            return  {
                error : "Relacionamento inexistente"
            }
        }
        const deletedRows = await db('user_location')
        .where("id",id)
        .delete().then(data=>{
            returnable = {message : "Associação excluída com sucesso"}
        }).catch(err=>{
            returnable = {error : "Erro ao excluir associação"}
        })
        return returnable
    }

    async listPerUser(id:string){
        let returnable
        const listOfUserLocatios = await db('user_location')
        .where('user_id',id)
        .select('*')
        .then(data=>{
            returnable = data
        })
        .catch(e=>{
            returnable = {error:"Erro ao buscar lista de associação de usuários e espaços"}
        })
        return returnable
    }

    async detail(userId:string,locationId:string){
        return await db('user_location')
        .select('*')
        .where('user_id',userId)
        .where('location_id',locationId)
        .then(data=>{
            if(data[0]){
                return data[0]
            }else{
                return {
                    message: "Não foi encontrada a atribuição de local ao usuario"
                }
            }
        })
        .catch(e=>{
            return{
                error : "Ocorreu um erro ao buscar dados sobre a atribuição de local e usuario"
            }
        })

    }
}

export default LocationUserModel