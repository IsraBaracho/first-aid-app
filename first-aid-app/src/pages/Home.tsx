import Header from '../components/header/Header'
import Footer from '../components/Footer'
import GridCards from '../components/grid cards/gridCards'
import HeroBanner from '../components/banner/heroBanner'

export default function Home() {
  return (
    <main>
      <Header />
        <HeroBanner/>
          <div className="container"> 
            <h2>EMERGÊNCIAS COMUNS NO BRASIL</h2>
            <GridCards />             
          </div>
      <Footer />  
    </main>
  )
}