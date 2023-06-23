import { Avatar, Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'

const Comment = ({body}) => {
  return (
    <>
    <HStack alignItems={"top"}>
    <Avatar  src='https://www.pngarts.com/files/3/Avatar-Transparent-Image.png' />
    <Text fontSize={"1em"}>{body}</Text>
    </HStack>
    </>
  )
}

export default Comment