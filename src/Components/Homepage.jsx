import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import {  Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Heading, VStack, useDisclosure } from '@chakra-ui/react'
import Pagination from './Pagination'
import Comment from './Comment'

const Homepage = () => {
    const [allBlogs,setAllBlogs] = useState([])
    const [allComments,setAllComments] = useState([])
    const [page,setPage] = useState([])
    const [activePage,setActivePage] = useState(1)
    const { isOpen, onOpen, onClose } = useDisclosure()


    const getAllBlogs = async()=>{
        try {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            setAllBlogs(res.data)
            let temp = Math.ceil(res.data.length/10)
            let arr = new Array(temp).fill(0) 
            setPage(arr)
        } catch (error) {
            console.log(error)
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
    <>
    <Heading textAlign={"center"} color="blue.300">All Blogs</Heading>
    <VStack gap={8} m="auto" w={{base:"98vw",md:'95vw',lg:"50vw"}} mt="3vh">
    {allBlogs.length>0 && allBlogs.filter((e,i)=> i+1>=(activePage-1)*10+1 && i+1<=(activePage)*10).map((e)=> <BlogCard key={e.id} blogData={e} handleComment={(id)=> handleComments(id)} removeBTN={false}/>)}
    </VStack>
    <HStack w={{base:"80vw",md:'95vw',lg:"40vw"}} h="auto" m="auto" gap={{base:"2px",md:'3px',lg:"5px"}} mt="30px">
    {page.length>0 && page.map((e,i)=>  <Pagination key={i} page={i+1} handlePage={(val)=> setActivePage(val)} active={activePage}/>)}
    </HStack>
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
    </>
  )
}

export default Homepage