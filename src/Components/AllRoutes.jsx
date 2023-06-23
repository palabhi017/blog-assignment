import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Homepage'
import MyFavoritesPage from './MyFavoritesPage'

const AllRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Homepage/>}/>
      <Route path="/favorites" element={<MyFavoritesPage/>}/>
    </Routes>
  )
}

export default AllRoutes