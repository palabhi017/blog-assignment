import { VStack,Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import BlogCard from '../Components/BlogCard'
import axios from 'axios'
import Comment from '../Components/Comment'

// this component is to show favorite blogs.
const MyFavoritesPage = () => {
  
    const [triger,setTriger] = useState(false)
    const [allComments,setAllComments] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    let allFavBlogs= JSON.parse(localStorage.getItem("blogs"))||[]

  // this function is fetcing user data.
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
  return (
   <>
   <Heading textAlign={"center"} color={"red.400"}>MY FAVORITES</Heading>
   <VStack gap={8} m="auto" w={{base:"98vw",md:'95vw',lg:"50vw"}} mt="30px" minH={"80vh"}>
    {allFavBlogs.length>0 && allFavBlogs.map((e)=> <BlogCard key={e.id} blogData={e} handleComment={(id)=> handleComments(id)} removeBTN={true} triger={()=> setTriger(!triger)}/>)}
    </VStack>

    {/*  this is a drawer. it is showing all comments */}

    <Drawer placement={"right"} size={"sm"} onClose={onClose} isOpen={isOpen}>
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

export default MyFavoritesPage