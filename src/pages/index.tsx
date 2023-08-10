import Questao from '@/components/Questao'
import QuestaoModel from '@/model/questao'
import RespostaModel from '@/model/resposta'
import { useState } from 'react'

const questaoMock = new QuestaoModel(1, 'Melhor cor?', [
  RespostaModel.errada('Verde'),
  RespostaModel.errada('Vermelha'),
  RespostaModel.errada('Azul'),
  RespostaModel.certa('Preta'),
])

export default function Home() {
  
  const [questao, setQuestao] = useState(questaoMock)
  
  function respostaFornecida(indice: number) {
    setQuestao(questao.responderCom(indice))
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center'

    }}>
      <Questao valor={questao} 
      respostaFornecida={respostaFornecida}></Questao>
    </div>
  )
}
