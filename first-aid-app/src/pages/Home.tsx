import Header from '../components/header/Header'
import Footer from '../components/Footer'
import GridCards from '../components/grid-cards/GridCards'
import HeroBanner from '../components/banner/heroBanner'

export default function Home() {
  return (
    <main>
      <Header />
        <HeroBanner/>
          <div className="container"> 
            <h2 className='title-home-page'>EMERGÊNCIAS COMUNS NO BRASIL</h2>
            <GridCards />             
          </div>
      <Footer />  
    </main>
  )
}