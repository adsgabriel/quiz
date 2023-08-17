// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next'
import questoes from '../bancoDeQuestoes'


export default function questoesProId (req: any, res: NextApiResponse) {
  const idSelecionado = +req.query.id

  const unicaQuestaoOuNada = questoes.filter(questao => questao.id === idSelecionado)

  if(unicaQuestaoOuNada.length === 1) {
    const questaoSelecionada = unicaQuestaoOuNada[0].embaralharRespostas()
    res.status(200).json(questaoSelecionada.converterParaObjeto())
  } else {
    res.status(204).send('Nada foi encontrado')
  }
  res.status(200).json(questoes[0].converterParaObjeto())
}
