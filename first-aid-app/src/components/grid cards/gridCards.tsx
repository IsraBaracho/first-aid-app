
import Card from "../cards/ExampleCard"
import "./gridCards.css"

export default function GridCards() {
  return (
    <div className="cards-grid">
      < Card
        title="Ressuscitação Cardiopulmonar (RCP)"
        description="A RCP é uma técnica de emergência que combina compressões torácicas..."
        tags={["CORAÇÃO", "ALTO RISCO"]}
      />
      < Card
        title="Manobra de Heimlich para Engasgo"
        description="A Manobra de Heimlich é uma técnica de primeiros socorros usada para desobstruir as vias aéreas de uma pessoa que está engasgada. É essencial quando há obstrução completa das vias respiratórias."
        tags={["RESPIRAÇÃO", "ALTO RISCO"]}
      />
      < Card
        title="Controle de Hemorragia Severa"
        description="O controle rápido de hemorragia severa é crucial para prevenir choque e salvar vidas. Hemorragias não controladas são uma das principais causas de morte evitável em traumas."
        tags={["TRAUMA", "ALTO RISCO"]}
      />
      < Card
        title="Reconhecimento de AVC"
        description="O AVC ocorre quando o fluxo sanguíneo para parte do cérebro é interrompido. Cada minuto conta - o tratamento rápido pode reduzir danos cerebrais e outras complicações."
        tags={["NEUROLÓGICO", "ALTO RISCO"]}
      />
      < Card
        title="Reconhecimento de AVC"
        description="O AVC ocorre quando o fluxo sanguíneo para parte do cérebro é interrompido. Cada minuto conta - o tratamento rápido pode reduzir danos cerebrais e outras complicações."
        tags={["NEUROLÓGICO", "ALTO RISCO"]}
      />
    </div>
  )
}