import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";


const BlogCard = ({blogData,handleComment,removeBTN,triger}) => {

    const {userId,id,title,body} = blogData
    const [toggle,setToggle] = useState(false)
const toast = useToast()
let favBlogs = JSON.parse(localStorage.getItem("blogs"))||[]
let favBlogsIDs = JSON.parse(localStorage.getItem("blogsIDs"))||[]

const handleFav=()=>{
    if(favBlogsIDs.includes(id)){
        toast({
            title: 'Message',
            position:'top',
            description: "Blog Already In the Favorite List",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
    }else{
        favBlogs.push({userId,id,title,body})
        favBlogsIDs.push(id)
        localStorage.setItem("blogs",JSON.stringify(favBlogs))
        localStorage.setItem("blogsIDs",JSON.stringify(favBlogsIDs))
        setToggle(!toggle)
    }
}
   const handleRemove =()=>{
    favBlogs = favBlogs.filter((e)=> e.id !== id)
    favBlogsIDs = favBlogs.filter((e)=> e !== id)
    localStorage.setItem("blogs",JSON.stringify(favBlogs))
    localStorage.setItem("blogsIDs",JSON.stringify(favBlogsIDs))
    setToggle(!toggle)
    triger()
   }

   const sendData=()=>{
     localStorage.setItem("blogdata",JSON.stringify({title,body}))
   }
   
  return (
    <>
      <VStack
        h={"auto"}
        w={"100%"}
        p="30px"
        
        m="auto"
        bgColor={"white"}
        borderRadius={"15px"}
        boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
      >
        <HStack justifyContent={"space-between"} w={"100%"} textAlign={"left"}>
          <Box>
            <Avatar src='https://www.pngarts.com/files/3/Avatar-Transparent-Image.png' />
          </Box>
          <Box>
            <Icon as={favBlogsIDs.includes(id)?  AiFillHeart : AiOutlineHeart } boxSize={"50px"} color="red.400" onClick={handleFav} />
          </Box>
        </HStack>

        <Heading fontSize={"2em"}>{title}</Heading>
        <Divider  />
        <Image h="40vh" w="100%" src="https://i.pinimg.com/originals/4b/c3/83/4bc38348a51f5b870566e434275753eb.jpg"></Image>
        <Text fontSize={"2em"} noOfLines={2}>{body}</Text>
        <HStack w="100%" justifyContent={"space-between"}>
         <Button bgColor="blue.400" color="white" onClick={()=> handleComment(id)}>Comments</Button>
        <Link style={{width:"50%"}} to={`/${userId}`}> <Button  bgColor="tomato" color="white" w="100%" align="right" _hover={{color:"tomato",bgColor:"red.100"}} onClick={sendData}>READ MORE</Button></Link>
       {removeBTN?  <Button  bgColor="tomato" color="white" w="20%" align="right" _hover={{color:"tomato",bgColor:"red.100"}} onClick={handleRemove}>REMOVE</Button>:""}
        </HStack>
      </VStack>
    </>
  );
};

export default BlogCard;
