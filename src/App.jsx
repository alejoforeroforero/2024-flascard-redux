import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from './Redux/states/categorySlice';

import NavBar from './components/NavBar/NavBar';
import FlashCards from './components/FlashCards/FlashCards';

import './App.css'



function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCategories())
  }, [])

  console.log('entro')

  return (
    <>
      {/* <Loading /> */}
      <NavBar />
      <FlashCards />
    </>
  )
}

export default App
