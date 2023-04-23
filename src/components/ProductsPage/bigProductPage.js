import { Box, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext/context";
import toIndianNumberingSystem from "../Features/Carousel/IndianConversionSystem";

async function addToCart(userID, newItem, cartItems, setCartItems,setCartLength) {
    if (userID == undefined) return alert("Login First");
    console.log(userID, newItem, cartItems)
    // let data = await axios.get(`https://e-commerce-api-sncm.onrender.com/users/${userID}`);
    // let cartItems = data.data.cart;


    // axios.patch(`https://e-commerce-api-sncm.onrender.com/users/${userID}`, {
    //     cart: [...cartItems, newItem]
    // })
    let tempCartItems = [...cartItems];
    for (let i = 0; i < tempCartItems.length; i++) {
        if (tempCartItems[i].name == newItem.name) {
            tempCartItems[i].qty = tempCartItems[i].qty + 1;
            setCartItems(tempCartItems);
            console.log(await axios.patch(`https://ayurved-products-api.onrender.com/users/${userID}`, {
                cart: tempCartItems
            }))
            console.log(tempCartItems)
            return alert("Added to cart")
        }
    }
    setCartItems([...tempCartItems, newItem]);
    console.log(await axios.patch(`https://ayurved-products-api.onrender.com/users/${userID}`, {
        cart: [...tempCartItems, newItem]
    }))
    setCartLength((prev) => prev + 1)
    return
}
export default function BigProduct(props) {
    let { loginUserID, setCartLength, cartItems, setCartItems } = useContext(AuthContext);
    window.scrollTo(0, 0)
    let [apiData, setApiData] = useState({})
    let data = useParams();
    async function getData() {
        // let fet = await axios.get(`https://e-commerce-api-sncm.onrender.com/${data.categories}/${data.id}`);
        let fet = await axios.get(`https://ayurved-products-api.onrender.com/products/${data.id}`);
        setApiData(fet.data)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Container maxW={'7xl'}>
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 18, md: 24 }}>
                    <Flex justify={"center"}>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={
                                apiData.image
                            }
                            fit={'cover'}
                            align={'center'}
                            h={{ base: '100%', sm: '400px', lg: '500px' }}
                        />
                    </Flex>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Box as={'header'}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={600}
                                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                {apiData.name}
                            </Heading>
                            <br />
                            <Flex
                                color={useColorModeValue('gray.900', 'gray.400')}
                                fontWeight={700}
                                fontSize={'2xl'}>
                                    
                                {toIndianNumberingSystem(Number(apiData.price))}
                                {/* <Text color={"red"} fontWeight={"600"} ml={"10px"}>{apiData["red-discount-percentage"]}</Text> */}
                            </Flex>
                        </Box>

                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                                />
                            }>
                            <VStack spacing={{ base: 4, sm: 6 }}>
                                
                            </VStack>
                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('yellow.500', 'yellow.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    Product Details
                                </Text>
                                <Flex flexDir={"column"}>
                                <Text
                                    color={useColorModeValue('gray.500', 'gray.400')}
                                    fontSize={'2xl'}
                                    fontWeight={'300'}>
                                    {apiData.description}
                                </Text>
                                </Flex>

                            </Box>
                        </Stack>

                        <Button
                            rounded={'none'}
                            w={'full'}
                            mt={8}
                            size={'lg'}
                            py={'7'}
                            bg={useColorModeValue('gray.900', 'gray.50')}
                            color={useColorModeValue('white', 'gray.900')}
                            textTransform={'uppercase'}
                            onClick={async () => {
                                let newItem = {
                                    image:apiData.image,
                                    name: apiData.name,
                                    price: apiData.price,
                                    qty: 1,
                                    id: apiData._id
                                }
                                // setCartLength((prev) => prev + 1)
                                // setCartItems([...cartItems, data1]);
                                addToCart(loginUserID?.id, newItem, cartItems, setCartItems,setCartLength);
                            }}
                            _hover={{
                                transform: 'translateY(2px)',
                                boxShadow: 'lg',
                            }}>
                            Add to cart
                        </Button>

                        <Stack direction="row" alignItems="center" justifyContent={'center'}>
                            <Text>2-3 business days delivery</Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </>
    )
}