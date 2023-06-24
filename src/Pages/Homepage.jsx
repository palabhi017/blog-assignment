import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogCard from '../Components/BlogCard'
import {  Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Heading, Icon, Spinner, Text, VStack, useDisclosure } from '@chakra-ui/react'
import Pagination from '../Components/Pagination'
import Comment from '../Components/Comment'
import { BiUpArrowAlt } from "react-icons/bi";

// This component is homepage of our web application.
// I am dynamiclly maping all blogcard here. 
// also added pagination so that only 10 blog can show on one page.
// In last I added one drawer which is showing all the comment related to particular post. on clicking comments.

const Homepage = () => {
    const [allBlogs,setAllBlogs] = useState([])
    const [loader,setLoader] = useState(false)
    const [allComments,setAllComments] = useState([])
    const [page,setPage] = useState([])
    const [activePage,setActivePage] = useState(1)
    const { isOpen, onOpen, onClose } = useDisclosure()
    
// This function is fetching all blogs form server and storing it in a state.
// and also calculation data length for dynamic pagination.
    const getAllBlogs = async()=>{
      setLoader(true)
        try {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            setAllBlogs(res.data)
            setLoader(false)
            let temp = Math.ceil(res.data.length/10)
            let arr = new Array(temp).fill(0) 
            setPage(arr)
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
        
    }

// This component is fetching all the comments.
    const getComments = async(id)=>{
        try {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            setAllComments(res.data)
          
        } catch (error) {
            console.log(error)
        }
        
    }
// this function is used to call getcomment function and also to open side drawer.
    const handleComments=(id)=>{
        getComments(id)
        onOpen()
    }

  // This useEffect function calling getAllblog function on first rendering.
    useEffect(()=>{
        getAllBlogs()

    },[])
   
   
  return (
    <Box   pb='20px' >
    <Heading textAlign={"center"} color="blue.700">Latest Blogs</Heading>

    {/* here i added one loader which will be shown if data will take time to fetch from server */}
     {loader? <Box m="auto" w={{base:"50vw",md:"20vw",lg:"10vw"}} mt="30px"><Spinner size={"xl"} /> <Text fontSize={"1.5em"}>Loading...</Text> </Box>:""}
   {/*  here I am mapping all the blogcards */}
    <VStack gap={8} m="auto" w={{base:"98vw",md:'95vw',lg:"50vw"}} mt="3vh">
    {allBlogs.length>0 && allBlogs.filter((e,i)=> i+1>=(activePage-1)*10+1 && i+1<=(activePage)*10).map((e)=> <BlogCard key={e.id} blogData={e} handleComment={(id)=> handleComments(id)} removeBTN={false}/>)}
    </VStack>

    {/* this part is for pagination */}
    {allBlogs.length>0 ? <Text textAlign={"center"} fontSize={"1.2em"} mt="30px">Page No.</Text>:""}
    <HStack maxW={{base:"80vw",md:'95vw',lg:"30vw"}} h="auto" m="auto" gap={{base:"2px",md:'3px',lg:"5px"}} mt="10px">
    {page.length>0 && page.map((e,i)=>  <Pagination key={i} page={i+1} handlePage={(val)=> setActivePage(val)} active={activePage}/>)}
    </HStack>
    {/*  this is scroll to top button */}
     <Icon as={BiUpArrowAlt}  bgColor={"tomato"} color="white" w={{base:"13vw",md:"8vw",lg:"5vw"}} h="10vh" borderRadius={"50%"} pos="fixed" bottom={"5vh"} right={"3vw"} cursor={"pointer"} onClick={()=> window.scrollTo({top:0,behavior:"smooth"})}></Icon> 
    
    {/*  this is a drawer. it is showing all comments */}
    <Drawer placement={"right"}  onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>All Comments</DrawerHeader>
          <DrawerBody >
            <VStack w="100%" gap={5}>

           {allComments.length>0 && allComments.map((e)=> <Comment key={e.id} {...e}/>)}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Homepage