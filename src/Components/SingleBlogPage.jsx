import { Avatar, Box, Divider, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleBlogPage = () => {
    const {userId} = useParams()
    const [userData,setUserData] = useState({})
    let getBlogData= JSON.parse(localStorage.getItem("blogdata"))||{}
console.log(userId)
    const getuserData= async()=>{
        try {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            setUserData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

useEffect(()=>{
    getuserData()
},[])

  return (
    <>
     <Box w={{base:'95vw',md:"95vw",lg:"80vw"}} h="auto" m="auto"  mt="3vh" borderRadius={"10px"} border="1px solid blue" p={3}> 
     <Stack direction={{base:"column",md:"row",lg:'row'}} justifyContent={"space-between"}>
     <Avatar size={"2xl"} src='https://www.pngarts.com/files/3/Avatar-Transparent-Image.png' />
     <Stack w="80%" justifyContent={"space-between"} direction={{base:"column",md:"row",lg:'row'}}>
        <VStack>
            <Text fontSize={"2em"} fontWeight={"bold"} color="teal.500">{userData.name}</Text>
            <Text fontSize={"1.5em"} color="blue.400">{userData.email}</Text>
        </VStack>
        <VStack>
            <Text fontSize={"2em"} fontWeight={"bold"} color="teal.500">Address</Text>
            <Text fontSize={"1.5em"} color="blue.400">{userData.address && userData.address.street}, {userData.address && userData.address.suite}, {userData.address && userData.address.city}</Text>
            <Text fontSize={"1.5em"} color="blue.400">Zip-code : {userData.address && userData.address.zipcode}</Text>
        </VStack>
     </Stack>
     </Stack>
   
    <Divider mt="20px"/>

    <Text fontSize={"2.5em"}>Title : {getBlogData.title}</Text>
    <Divider mt="20px"/>
    <Text fontSize={"2em"}>{getBlogData.body}</Text>

     </Box> 
    </>
  )
}

export default SingleBlogPage