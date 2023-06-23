import { Box } from '@chakra-ui/react'
import React from 'react'

const Pagination = ({page,handlePage,active}) => {
  return (
    <Box h="auto" p="10px" w="auto"  cursor={"pointer"} borderRadius={"10px"} fontWeight={"bold"} textAlign={"center"} bgColor={page==active? "#10b3ff" : "teal"} color="white" onClick={()=> handlePage(page)}>{page}</Box>
  )
}

export default Pagination