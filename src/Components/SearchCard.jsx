import { Avatar, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchCard = ({data,reset}) => {
    const {title,userId} = data
  return (
    <>
   <Link to={`/${userId}`}> <HStack w="100%" p={1} cursor={"pointer"} onClick={reset}>
    <Box w="20%" >
     <Avatar src='https://www.pngarts.com/files/3/Avatar-Transparent-Image.png'/>
    </Box>
    <Box w="80%" p={1} noOfLines={2}>{title}</Box>
    </HStack></Link>
    </>
  )
}

export default SearchCard