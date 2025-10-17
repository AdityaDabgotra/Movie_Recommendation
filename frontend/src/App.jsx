import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home.jsx'
import Recommend from './pages/Recommend.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/recommend" element={<Recommend />} />
    </Routes>
  )
}

export default App
