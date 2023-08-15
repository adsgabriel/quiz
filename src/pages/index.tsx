import Questionario from '@/components/Questionario'
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
  
  function questaoRespondida(questao: QuestaoModel) {
    
  }

  function irParaProximoPasso() {
    
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center'

    }}>
      <Questionario 
        questao={questao}
        ultima={false}
        questaoRespondida={questaoRespondida}
        irParaProximoPasso={irParaProximoPasso}
      />
    </div>
  )
}
