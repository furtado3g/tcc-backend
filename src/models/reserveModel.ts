import db from "../database/connection";
import moment from "moment";
import { attachPaginate } from "knex-paginate";

interface reserveInterface {
  teacher_id: number;
  location_id: number;
  date: string;
  time_start: string;
  time_end: string;
  class: string;
  discipline: string;
  comments: Text;
}

class ReserveModel {
  format = "HH:mm";

  async insert(reserve: reserveInterface) {
    let returnable;
    const labIsTaken = await db("reservations")
      .where("location_id", reserve.location_id)
      .where("date", moment(reserve.date))
      .whereBetween("time_start", [
        moment(reserve.time_end).format(this.format),
        moment(reserve.time_start).format(this.format),
      ])
      .whereBetween("time_end", [
        moment(reserve.time_end).format(this.format),
        moment(reserve.time_start).format(this.format),
      ]);
    if (labIsTaken[0]) {
      return {
        message: "Espaço já reservado",
      };
    }
    return await db("reservations")
      .insert(reserve)
      .then((data) => {
        console.log(data);
        return {
          message: "Reserva efetuada com sucesso",
        };
      })
      //.catch((e) => {
      //  //traduzir retorno a baixo
      //  return {
      //    error: "Erro ao realizar reserva",
      //  };
      //});
  }

  async update(reserve: reserveInterface, reserveId: number) {
    let returnable;
    console.log(reserve);
    const insertedRows = await db("reservations")
      .where("id", reserveId)
      .update(reserve)
      .then((data) => {
        returnable = {
          message: "Reserva atualizada com sucesso",
        };
      })
      .catch(() => {
        returnable = {
          error: "Erro ao atualizar reserva",
        };
      });
    return returnable;
  }

  async delete(reserveId: any) {
    let returnable;
    const deletedRows = await db("reservations")
      .where("id", "=", reserveId)
      .delete()
      .then((data) => {
        returnable = {
          message: "Reserva excluída com sucesso",
        };
      })
      .catch((e) => {
        returnable = {
          error: "Erro ao excluir reserva",
        };
      });
    return returnable;
  }

  async list(page: any, perPage: any) {
    const itens = await db("reservations")
      .limit(perPage || 10)
      .offset(page * perPage || 0)
      .select("*");
    return itens;
  }

  async detail(reserveId: any) {
    const reserve = db("reservations").select("*").where("id", reserveId);
    return reserve;
  }
}

export default ReserveModel;
