import db from "../database/connection";

class TypeLocationModel {
  async create(description: string) {
    let returnable;
    const typeExists = await db("type_location")
      .select("*")
      .where("description", description);
    if (typeExists[0]) {
      return {
        message: "Tipo de espaço já cadastrado",
      };
    }
    await db("type_location")
      .insert({ description })
      .then((data: any) => {
        returnable = {
          message: "Tipo de espaço cadastrado",
        };
      })
      .catch((e: any) => {
        return (returnable = {
          message: "Erro ao criar novo tipo de espaço",
        });
      });
    return returnable;
  }

  async list() {
    let returnable;
    await db("type_location")
      .select("*")
      .then((data: any) => {
        returnable = data;
      })
      .catch((e: any) => {
        returnable = { error: e };
      });
    return returnable;
  }

  async update(locationTypeId: string, description: string) {
    let returnable: any;
    await db("type_location")
      .where("id", locationTypeId)
      .update({
        description: description,
      })
      .then((data: any) => {
        returnable.message = "Tipo de local alterado com sucesso";
      })
      .catch((e: any) => {
        returnable.error = "Erro ao alterar tipo de local";
      });
    return returnable;
  }

  async delete(id: string) {
    let returnable;
    const idExists = await db("type_location").where("id", id).select("*");
    console.log(idExists);
    if (!idExists[0]) {
      return {
        message: "Espaço não cadastrado",
      };
    }
    await db("type_location")
      .where("id", id)
      .delete()
      .then((data: any) => {
        returnable = {
          message: "Tipo de espaço excluído com sucesso",
        };
      })
      .catch((e: any) => {
        returnable = {
          message: "Erro ao excluir tipo de espaço",
        };
      });
    return returnable;
  }
  async detail(id: string) {
    return await db("type_location")
      .select("*")
      .where("id", id)
      .then((data) => {
        if (data[0]) {
          return data;
        } else {
          return {
            error: "Nenhum tipo de local encontrado com este identificador",
          };
        }
      })
      .catch((e) => {
        return {
          error: "Nenhum tipo de local encontrado com este identificador",
        };
      });
  }
}

export default TypeLocationModel;
