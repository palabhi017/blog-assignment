import { Box, Button, HStack, Icon, Input, Show, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {AiFillHeart } from "react-icons/ai";
import axios from 'axios';
import SearchCard from './SearchCard';

const Navbar = () => {
  const [searchInput,setSearchInput] = useState("")
  const [allBlogs,setAllBlogs] = useState([])

  const getAllBlogs = async()=>{
    try {
        let res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
        let filteration = res.data.filter((e)=> e.title.includes(searchInput))
        setAllBlogs(filteration)
       
    } catch (error) {
        console.log(error)
    }
    
}
const handleChange=(e)=>{
  setSearchInput(e.target.value)
  getAllBlogs()
}
  return (
   <>
   <HStack h="10vh" w="98vw" bgColor={"#10b3ff"} m="auto" p="0px 3vw" justifyContent={"space-between"}>
      <Link to="/"><Box fontSize={"2em"} fontWeight={"bold"}>Blog<Text as={"span"} color="yellow.100">Shlog</Text></Box></Link>
       <Show above='850px'>
       <HStack w="50%" justifyContent={"space-between"}>
       <Input w="50%" placeholder='Search' bgColor={"white"} onChange={handleChange}></Input>
       
       <Link style={{width:"30%"}} to='/favorites'><Button w="100%" fontSize={"1.2em"} fontWeight={"bold"} color="#10b3ff" bgColor={"white"}>My Favorites</Button></Link> 
       </HStack>
       </Show>
       <Show below='850px'>
       <HStack w="50%" justifyContent={"space-between"}>
       <Input w="80%" placeholder='Search' bgColor={"white"} onChange={handleChange}></Input>
       <Link style={{width:"20%"}} to='/favorites'><Icon as={AiFillHeart} boxSize={"50px"} color="red.400"></Icon></Link> 
       </HStack>
       </Show>
   </HStack>
      <VStack zIndex={1} position={"absolute"} h="50vh" display={searchInput.length>0? "block":"none"} overflow={"auto"} w={{base:"50vw",md:"50vw",lg:"25vw"}} ml={{base:"40vw",md:"50vw",lg:"50vw"}} bgColor={"white"}>
       {allBlogs.length>0 && allBlogs.map((e)=> <SearchCard data={e} reset={()=> setSearchInput("")}/>)}
       </VStack>
   </>
  )
}

export default Navbar