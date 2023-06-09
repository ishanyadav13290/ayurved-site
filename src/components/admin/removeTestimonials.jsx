import { Button, ButtonGroup, Card, CardBody, CardFooter, Center, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";

import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext/context";

export default function RemoveTestimonials({data}){
    let {productsData, setProductsData} = useContext(AuthContext)
    function DeleteProduct(id){
        axios.delete(`https://ayurved-products-api.onrender.com/testimonials/${id}`)
        .then(response => {
          // remove the deleted product from productsData array
          const updatedProductsData = productsData.filter(product => product._id === id);
          // update productsData state with new array
          setProductsData(updatedProductsData);
          alert("Testimonial Removed")
        })
        .catch(error => console.log(error));
        
    }
    return <Card maxW='sm'>
    <CardBody>
      <Center><Image
        src={data.avatar}
        alt={data.name}
        borderRadius='lg'
        minH={"250px"}
        maxH={"250px"}
        minW={"250px"}
        maxW={"250px"}
      /></Center>
      <Stack mt='4' spacing='3'>
        <Heading size='md'>{data.name}</Heading>
        <Text fontSize={"sm"}>
          {data.content}
        </Text>
        <Text color='blue.600' fontSize='xl'>
          {data.role}
        </Text>
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing='2'>
        <Button onClick={()=>{DeleteProduct(data._id)}} variant='solid' size={'sm'} colorScheme='red'>
          Delete
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
}