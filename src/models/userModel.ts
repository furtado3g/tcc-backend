import { randomBytes } from "crypto";
import db from "../database/connection";
import digestHash from "../util/digestHash";
import Mail from "../util/mailer";

interface userInterface {
  name: string;
  username: string;
  email: string;
  password: string;
  last_password: string;
  user_type: string;
}

interface updtUserInterface {
  name: string;
  username: string;
  email: string;
  user_type: string;
  userid: string;
}

interface authUser {
  username: string;
  password: string;
}

export default class UserModel {
  async create(user: userInterface) {
    const usernameExists = await db("users")
      .select("*")
      .where("username", user.username);
    if (usernameExists[0]) {
      return {
        error: "Nome de usuário já cadastrado",
      };
    }
    const emailExists = await db("users")
      .select("*")
      .where("email", user.email);
    if (emailExists[0]) {
      return {
        error: "Email já cadastrado",
      };
    }
    console.log(emailExists);
    const insertedRows = await db("users").insert(user);
    console.log("insertedRows");
    console.log(insertedRows);
    return insertedRows;
  }

  async verifyUser(user: authUser) {
    return await db("users")
      .where("username", user.username)
      .where("password", user.password)
      .where("active", true)
      .then((data: any[]) => {
        if (data[0]) {
          return { is_valid: true, user: data[0] };
        } else {
          return { is_valid: false, user: null };
        }
      })
      .catch((e: any) => {
        return { is_valid: false, user: null };
      });
  }

  async update(user: updtUserInterface) {
    const usernameExists = await db("users")
      .select("*")
      .where("username", user.username)
      .where("active", true)
      .whereNot('id',user.userid)
    if (usernameExists[0]) {
      return {
        error: "Nome de usuário já cadastrado",
      };
    }
    const emailExists = await db("users")
      .select("*")
      .where("email", user.email)
      .whereNot('id',user.userid);
    if (emailExists[0]) {
      return {
        error: "Email já cadastrado",
      };
    }
    return await db("users")
      .where("id", user.userid)
      .update({
        name: user.name,
        email: user.email,
        user_type: user.user_type,
      })
      .then((data: any) => {
        return { message: "Alteração de usuário realizado com sucesso" };
      })
      .catch((e: any) => {
        return { error: "Erro ao atualizar usuário" };
      });
  }

  async deactivate(userId: any) {
    let returnable;
    await db("users")
      .update({
        active: false,
      })
      .where("id", userId)
      .then((data) => {
        returnable = "Usuário desativado com sucesso";
      })
      .catch((e) => {
        console.log(e);
        returnable = "Erro ao desativar usuário";
      });
    return returnable;
  }

  async recoveryPassword(email: string) {
    let random = randomBytes(20).toString("hex");
    let digestedRandom = digestHash(random);
    let returnable: any;
    const user = await db("users")
      .select("password", "id")
      .where("active", true)
      .where("email", email);
    if (!user[0]) return false;
    Mail.to = email;
    Mail.subject = "RLAB: Recuperação de senha.";
    Mail.message =
      "Senha alterada com sucesso. <br> Sua nova senha é : " + random;
    Mail.sendMail();
    const updatedRows = await db("users")
      .where("id", user[0].id)
      .update({
        password: digestedRandom,
        last_password: user[0].password,
      })
      .then((data: any) => {
        returnable = true;
      })
      .catch((e: any) => {
        returnable = false;
      });
    return returnable;
  }

  async updatePassword(userId: any, newPassword: string) {
    let returnable = { updated: true };
    const user = await db("users")
      .select("password")
      .where("active", true)
      .where("id", userId);
    if (!user[0]) return { message: "No user found" };
    const updatedRows = db("users")
      .where("id", userId)
      .update({
        password: newPassword,
        last_password: user[0].password,
      })
      .then(async (data: any) => {
        console.log(await data);
        returnable = { updated: true };
      })
      .catch((e: any) => {
        returnable = { updated: false };
      });
    return returnable;
  }

  async checkAtualPassword(userId: any, actualPassword: string) {
    let returnable: boolean = true;
    await db("users")
      .where("id", userId)
      .where("active", true)
      .where("password", actualPassword)
      .select("*")
      .then((data: any) => {
        console.log(data);
        if (!data[0]) returnable = false;
      })
      .catch((e: any) => {
        returnable = false;
      });
    return returnable;
  }

  async detail(usersId: string) {
    let returnable;
    await db("users")
      .where("id", usersId)
      .select("*")
      .where("active", true)
      .then((data) => {
        returnable = data[0];
      })
      .catch((err) => {
        returnable = {
          error: "Erro ao obter usuário",
        };
      });
    return returnable;
  }

  async list(perPage: number, page: number) {
    let returnable;
    const numberofPages = await db("users").select("id");
    await db("users")
      .select("id", "name")
      .where("active", true)
      .orderBy("name")
      .limit(perPage || 10)
      .offset(page * perPage || 0)
      .then((data) => {
        if (data[0]) {
          returnable = {
            numberofPages:
              numberofPages.length < perPage
                ? 1
                : numberofPages.length / perPage || 10,
            data,
          };
        } else {
          returnable = {
            error: "Usuário não encontrado",
          };
        }
      });
    return returnable;
  }
}
