import { Box, Button, HStack, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <>
   <HStack h="10vh" w="100vw" bgColor={"#10b3ff"} p="0px 3vw" justifyContent={"space-between"}>
       <Box fontSize={"2em"} fontWeight={"bold"}>Blog<Text as={"span"} color="yellow.100">Shlog</Text></Box>
       <HStack w="50%" justifyContent={"space-between"}>
       <Input w="50%" placeholder='Search' bgColor={"white"}></Input>
       <Link style={{width:"30%"}} to='/favorites'><Button w="100%" fontSize={"1.2em"} fontWeight={"bold"} color="#10b3ff" bgColor={"white"}>My Favorites</Button></Link> 
       </HStack>
   </HStack>
   </>
  )
}

export default Navbar