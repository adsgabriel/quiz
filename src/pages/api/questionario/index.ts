import { NextApiRequest, NextApiResponse } from "next"
import questoes from "../bancoDeQuestoes"

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(questoes.map(questao => questao.id))
}