import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import BlogCard from './BlogCard'
import {  Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Heading, Icon, Spinner, Text, VStack, useDisclosure } from '@chakra-ui/react'
import Pagination from './Pagination'
import Comment from './Comment'
import bgImage from "../Images/bgImage.png"
import { BiUpArrowAlt } from "react-icons/bi";

const Homepage = () => {
    const [allBlogs,setAllBlogs] = useState([])
    const [loader,setLoader] = useState(false)
    const [allComments,setAllComments] = useState([])
    const [page,setPage] = useState([])
    const [activePage,setActivePage] = useState(1)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sTop = useRef()

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

    const getComments = async(id)=>{
        try {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            setAllComments(res.data)
          
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleComments=(id)=>{
        getComments(id)
        onOpen()
    }
    useEffect(()=>{
        getAllBlogs()

    },[])
   
   
  return (
    <Box  ref={sTop} pb='20px' bgImage={"https://th.bing.com/th/id/OIP.6ykS3FYVcGPPhx_svLZtIgHaEK?pid=ImgDet&rs=1"} bgSize={"cover"} bgAttachment={"fixed"}>
    <Heading textAlign={"center"} color="blue.700">Latest Blogs</Heading>
     {loader? <Box m="auto" w="10vw" mt="30px"><Spinner size={"xl"} /> <Text fontSize={"1.5em"}>Loading...</Text> </Box>:""}
    <VStack gap={8} m="auto" w={{base:"98vw",md:'95vw',lg:"50vw"}} mt="3vh">
    {allBlogs.length>0 && allBlogs.filter((e,i)=> i+1>=(activePage-1)*10+1 && i+1<=(activePage)*10).map((e)=> <BlogCard key={e.id} blogData={e} handleComment={(id)=> handleComments(id)} removeBTN={false}/>)}
    </VStack>
    {allBlogs.length>0 ? <Text textAlign={"center"} fontSize={"1.2em"} mt="30px">Page No.</Text>:""}
    <HStack maxW={{base:"80vw",md:'95vw',lg:"30vw"}} h="auto" m="auto" gap={{base:"2px",md:'3px',lg:"5px"}} mt="10px">
    {page.length>0 && page.map((e,i)=>  <Pagination key={i} page={i+1} handlePage={(val)=> setActivePage(val)} active={activePage}/>)}
    </HStack>
     <Icon as={BiUpArrowAlt}  bgColor={"tomato"} color="white" w="5vw" h="10vh" borderRadius={"50%"} pos="fixed" bottom={"5vh"} right={"3vw"} cursor={"pointer"} onClick={()=> window.scrollTo({top:0,behavior:"smooth"})}></Icon> 
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