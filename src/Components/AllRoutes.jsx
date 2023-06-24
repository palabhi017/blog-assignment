import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import MyFavoritesPage from "./MyFavoritesPage";
import SingleBlogPage from "./SingleBlogPage";

// This All routes component is created to navigate between components.
// using react-router-dom for this.
// There is three routes 1st is for default homepage route, 2nd is for favorite page,
// 3rd is dynamic route for single blog page.

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/favorites" element={<MyFavoritesPage />} />
      <Route path="/:userId" element={<SingleBlogPage />} />
    </Routes>
  );
};

export default AllRoutes;
