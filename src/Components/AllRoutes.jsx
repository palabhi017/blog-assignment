import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Homepage'
import MyFavoritesPage from './MyFavoritesPage'
import SingleBlogPage from './SingleBlogPage'

const AllRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Homepage/>}/>
      <Route path="/favorites" element={<MyFavoritesPage/>}/>
      <Route path="/:userId" element={<SingleBlogPage/>}/>

    </Routes>
  )
}

export default AllRoutes