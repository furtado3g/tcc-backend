import { Request, Response } from "express";
import Session from "../models/sessionModel";
import Verify from "../util/verify";
import reportsModel from "../models/reportsModel";
const session = new Session();
const verify = new Verify();
const model = new reportsModel();
class ReportsController {
  async perUser(req: Request, res: Response) {
    const { id } = req.params;
    const { begin, end }: any = req.query;
    const { authorization, userid } = req.headers;
    if (
      !verify.verifyNullIncommingFields({
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
    const logged = await session.verify(authorization);
    if (!logged.is_valid) res.status(404).json({ error: "Sessão inválida" });
    const data = await model.perUser(id, begin, end);
    return res.json(data);
  }

  async perLocation(req:Request,res:Response){
    const { id } = req.params;
    const { begin, end }: any = req.query;
    const { authorization, userid } = req.headers;
    if (
      !verify.verifyNullIncommingFields({
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
    const logged = await session.verify(authorization);
    if (!logged.is_valid) res.status(404).json({ error: "Sessão inválida" });
    const data =  await model.perLocation(id, begin, end)
    return res.json(data)
  }

  async perPeriod(req: Request, res: Response){
    const { id } = req.params;
    const { begin, end }: any = req.query;
    const { authorization, userid } = req.headers;
    if (
      !verify.verifyNullIncommingFields({
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
    const logged = await session.verify(authorization);
    if (!logged.is_valid) res.status(404).json({ error: "Sessão inválida" });
    const data =  await model.perPeriod(begin, end)
    return res.json(data)  
  }
}

export default ReportsController;
