import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/components/Sidebar'
import Header from './components/components/Header'
import Footer from './components/components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <Sidebar></Sidebar>
        <div>
          <Header></Header>
          <Footer></Footer>
        </div>
      </div>
    </>
  )
}

export default App
