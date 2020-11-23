import db from "../database/connection";
import moment from "moment";
class ReportsModel {
  async perUser(userId: string, begin: string, end: string) {
    return await db("reservations as res")
      .where("res.teacher_id", userId)
      .whereBetween("res.date", [
        moment(begin, "DD/MM/YYYY"),
        moment(end, "DD/MM/YYYY"),
      ])
      .join("locations as loc", "loc.id", "res.location_id")
      .select(
        "loc.comments as localName",
        "res.date as date",
        "res.time_start as start",
        "res.time_end as end",
        "res.class as class",
        "res.discipline as discipline",
        "res.comments as observations"
      )
      .then((data) => {
        return data;
      });
  }
}

export default ReportsModel;
