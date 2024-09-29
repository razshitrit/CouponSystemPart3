import { useState } from 'react'

import './App.css'
import Header from './Components/Layout/Header/Header'
import Aside from './Components/Layout/Aside/Aside'
import Main from './Components/Layout/Main/Main'
import Footer from './Components/Layout/Footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    
    <>
    <Header/>
    <div className='app'>
      <Aside/>
      <Main/>
    </div>
    <Footer/>
    <ToastContainer />
    </>
  )
}

export default App
