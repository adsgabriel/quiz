import Questionario from '@/components/Questionario'
import QuestaoModel from '@/model/questao'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const BASE_URL = 'http://localhost:3000/api'

export default function Home() {

  const router = useRouter()

  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setrespostasCertas] = useState<number>(0)
  
  async function carregarQuestoesIds() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    carregarQuestoesIds()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setrespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function idProximaPergunta() {
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
      return idsDasQuestoes[proximoIndice]
  }

  function irParaProximoPasso() {
    const proximoId = idProximaPergunta()
    proximoId ? irParaProximaQuestao(proximoId) : finalizar()
  }

  function irParaProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return questao ? (
    <Questionario 
      questao={questao}
      ultima={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irParaProximoPasso={irParaProximoPasso}/>
    ) 
      : false
  
}
