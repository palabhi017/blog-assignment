import { VStack,Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import BlogCard from './BlogCard'
import axios from 'axios'
import Comment from './Comment'

const MyFavoritesPage = () => {
    const [activePage,setActivePage] = useState(1)
    const [allComments,setAllComments] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    let allFavBlogs= JSON.parse(localStorage.getItem("blogs"))||[]
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
  return (
   <>
   <Heading textAlign={"center"} color={"red.400"}>MY FAVORITES</Heading>
   <VStack gap={8} m="auto" w="50vw" mt="30px">
    {allFavBlogs.length>0 && allFavBlogs.filter((e,i)=> i+1>=(activePage-1)*10+1 && i+1<=(activePage)*10).map((e)=> <BlogCard key={e.id} blogData={e} handleComment={(id)=> handleComments(id)} removeBTN={true}/>)}
    </VStack>
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