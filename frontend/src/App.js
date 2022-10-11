import './App.css'
import Navigationbar from './components/Navigationbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Alert from './components/Alert'
import { useContext, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import noteContext from './context/notes/noteContext'

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }

  const context = useContext(noteContext)
  const { progress, setProgress } = context

  return (
    <>
        <BrowserRouter>
          <Navigationbar/>
          <LoadingBar color="white" height={3} progress={progress} />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login setProgress={setProgress} showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup setProgress={setProgress} showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
