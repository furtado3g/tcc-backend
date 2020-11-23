import { Request, Response } from "express";
import Session from "../models/sessionModel";
import Verify from "../util/verify";
import reportsModel from "../models/reportsModel";
class ReportsController {
  session = new Session();
  verify = new Verify();
  model = new reportsModel();
  async perUser(req: Request, res: Response) {
    const { id } = req.params;
    const { begin, end }: any = req.query;
    const { authorization, userid } = req.headers;
    if (
      !this.verify.verifyNullIncommingFields({
        id,
        begin,
        end,
        userid,
        authorization,
      })
    )
      return res
        .status(404)
        .json({ message: "Campo obrigatório não informado" });
    const logged = await this.session.verify(authorization);
    if (!logged.is_valid) res.status(404).json({ error: "Sessão inválida" });
    const data = await this.model.perUser(id, begin, end);
    if(!data[0]){
        res.status(404).json({"error":"Não foi encontrada nenhuma ocorrencia na data"})
    }else{
        res.json(data)
    }
  }
}
