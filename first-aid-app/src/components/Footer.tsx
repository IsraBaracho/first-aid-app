import CallSamuBtn from './buttons/call-samu/callSamuSmall'

import './footer.css'
export default function Footer() {
  return (
    <footer className='footer-header container'>
      <h1>Lembre-se: Em emergências, sempre chame ajuda profissional!</h1>
      <p>Este guia é informativo e não substitui treinamento adequado em primeiros socorros</p>
      <CallSamuBtn />
    </footer>
  )
}