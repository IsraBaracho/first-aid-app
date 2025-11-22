import ExampleCard from '../components/cards/ExampleCard'
import HeroBanner from '../components/banner/heroBanner'

export default function Home() {
  return (
    <main>
      <HeroBanner/>
      <div className="container">      

        <h2>Welcome to First Aid App</h2>
        <p>This is your starting point for the First Aid application.</p>

        <h3 style={{marginTop: 20}}>Examples (props + state)</h3>

        <ExampleCard
          title="Ressuscitação Cardiopulmonar (RCP)"
          description="A RCP é uma técnica de emergência que combina compressões torácicas..."
          tags={["CORAÇÃO", "ALTO RISCO"]}
        />

        <h3 style={{marginTop: 20}}>Examples (props + state)</h3>

        <h3 style={{marginTop: 20}}>Examples (props + state)</h3><h3 style={{marginTop: 20}}>Examples (props + state)</h3><h3 style={{marginTop: 20}}>Examples (props + state)</h3>
      </div>
    </main>
  )
}