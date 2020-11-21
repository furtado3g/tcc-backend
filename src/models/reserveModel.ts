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
        moment(reserve.time_end,this.format).format(this.format),
        moment(reserve.time_start,this.format).format(this.format),
      ])
      .whereBetween("time_end", [
        moment(reserve.time_end,this.format).format(this.format),
        moment(reserve.time_start,this.format).format(this.format),
      ]);
    if (labIsTaken[0]) {
      return {
        message: "Espaço já reservado",
      };
    }
    console.log(reserve.date)
    return await db("reservations")
      .insert({
        teacher_id: reserve.teacher_id,
        location_id: reserve.location_id,
        date: reserve.date,
        time_start: reserve.time_start,
        time_end: reserve.time_end,
        class: reserve.class,
        discipline: reserve.discipline,
        comments: reserve.comments,
      })
      .then((data) => {
        console.log(data);
        return {
          message: "Reserva efetuada com sucesso",
        };
      });
    //.catch((e) => {
    //  //traduzir retorno a baixo
    //  return {
    //    error: "Erro ao realizar reserva",
    //  };
    //});
  }

  async update(reserve: reserveInterface, reserveId: number) {
    return await db("reservations")
      .where("id", reserveId)
      .update({
        teacher_id: reserve.teacher_id,
        location_id: reserve.location_id,
        date: reserve.date,
        time_start: reserve.time_start,
        time_end: reserve.time_end,
        class: reserve.class,
        discipline: reserve.discipline,
        comments: reserve.comments,
      })
      .then((data) => {
        return {
          message: "Reserva atualizada com sucesso",
        };
      })
      //.catch(() => {
      //  returnable = {
      //    error: "Erro ao atualizar reserva",
      //  };
      //});
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
    return await db("reservations")
      .select("*")
      .then((data) => {
        return data;
      })
      .catch((e) => {
        return {
          error:
            "Ocorreu um erro ao buscar eventos, Tente novamente mais tarde",
        };
      });
  }

  async detail(reserveId: any) {
    return await db("reservations as res")
      .select(
        "res.id",
        "res.date",
        "res.time_start",
        "res.time_end",
        "res.class",
        "res.discipline",
        "res.comments",
        'res.teacher_id',
        'res.location_id',
        "loc.comments as location_name",
        "use.name as user_name"
      )
      .where("res.id", reserveId)
      .join("locations as loc", "loc.id", "res.location_id")
      .join("users as use", "use.id", "res.teacher_id")
      .then((data) => {
        return data;
      });
  }
}

export default ReserveModel;
