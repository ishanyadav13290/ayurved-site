import {
  Box,
  Flex,
  Input,
  Text,
  VStack,
  RadioGroup,
  Radio,
  Spacer,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AuthContext } from "../../../AuthContext/context";
import toIndianNumberingSystem from "../../../Features/Carousel/IndianConversionSystem";

export default function Checkout() {
  let {cartItems, setCartLength, setCartItems, loginUserID, total,checkoutTotal, setCheckoutTotal} = useContext(AuthContext)
  const [value, setValue] = useState("1");
  const fullNameRef = useRef(null)
  const streetAddressRef = useRef(null)
  const zipCodeRef = useRef(null)
  const cityRef = useRef(null)
  const phoneNumberRef = useRef(null)
  const emailAddressRef = useRef(null)
  
  useEffect(() => {
    let finalTotal = 0;
    cartItems.forEach((el,i)=>{
      finalTotal +=el.price * el.qty 
      finalTotal += 50
    })
    setCheckoutTotal(finalTotal);
  }, [cartItems]);

  return (
    <>
    <br />
    <Box textAlign={"center"}>
      <Text fontSize={"lg"} fontWeight={700}>Once you tap on PLACE ORDER, we'll contact you offline and proceed your order!!!!</Text>
    </Box>
      <Box
      display={["block", "block", "flex"]}
      p="20px"
      w={["80%"]}
      m=" 3% auto 5px auto"
      bg="white"
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
    >
      <VStack align={"flex-start"}>
        <Text fontWeight={"700"}>Shipping Information</Text>
        <Box>
          <Box w="100%">
            <Text fontWeight={"500"}>Full Name</Text>
            <Input ref={fullNameRef} placeholder="Your Full Name" />
          </Box>
          <Box w="100%">
            <Text fontWeight={"500"}>Street Address</Text>
            <Input ref={streetAddressRef} placeholder="123 Example Street" />
          </Box>
          <Flex w="100%">
            <Box>
              <Text fontWeight={"500"}>Zip Code</Text>
              <Input ref={zipCodeRef} placeholder="Zip Code" />
            </Box>
            <Box>
              <Text fontWeight={"500"}>City</Text>
              <Input ref={cityRef} placeholder="City" />
            </Box>
          </Flex>
          <Box w="100%">
            <Text fontWeight={"500"}>Phone Number</Text>
            <Input ref={phoneNumberRef} type="number" required placeholder="9765432100" />
          </Box>
          <Box w="100%">
            <Text fontWeight={"500"}>Email Address</Text>
            <Input ref={emailAddressRef} placeholder="you@example.com" />
          </Box>
        </Box>
        {/* Payment Information */}
        <Text fontWeight={700}>Payment Information</Text>
        <RadioGroup onChange={setValue} value={value} w="100%">
          <Flex direction="row" w="100%">
            <Box>
              <Radio value="1" display={"block"}>
                Cash on Delivery {"(COD)"}
              </Radio>
              <Text fontSize={"xs"}>Pay via Cash on Delivery</Text>
            </Box>
          </Flex>
        </RadioGroup>

       
      </VStack>
      <Spacer />
      <VStack w={"full"} align={"flex-start"} p={"20px"} >
        <Text fontWeight={700}>Order Summary</Text>
        {/* Map each Item in this format */}
        <Box maxH={"600px"} overflowY="scroll" w="full" pr={"10px"}>
        {cartItems.map((el,i)=>{
          return <Box display={["block","block","flex"]} mb={"20px"} w={"100%"} key={i} justify={"center"} align={"center"}>
          <Box>
            <Image
              src={el.image}
              w={"100px"}
            />
          </Box>
          <Spacer />
          {/* Name, price and Qty from Api */}
            <Text fontWeight={600} maxW={["100%","75%","50%","25%"]}>{el.name}</Text>
            <Spacer />
            <Text>Qty: {el.qty}</Text>
            {/* <Spacer /> */}
            <Text fontWeight={600} ml={"5%"}>{toIndianNumberingSystem(Number(el.price )* Number(el.qty))}</Text>
          {/* <Spacer /> */}
        </Box>
        })}
        </Box>
        <Divider />
        <Flex w={"100%"} p={"20px 0"}>
            <Text fontSize={"lg"} fontWeight={"600"} >Order Total</Text>
            <Spacer />
            <Text fontSize={"lg"} fontWeight={"600"}>${checkoutTotal}</Text>
        </Flex>
        <Flex w="100%">
        <NavLink to="/"><Button onClick={async ()=>{
          let obj = {
            fullName:fullNameRef.current.value,
            streetAddress:streetAddressRef.current.value,
            zipCode:zipCodeRef.current.value,
            city:cityRef.current.value,
            emailAddress:emailAddressRef.current.value,
            phoneNumber:phoneNumberRef.current.value,
            orderedProducts:[...cartItems],
            paymentMode:"Cash on Delivery ( COD )",
            totalAmt:String(checkoutTotal)
            
          }
          
          let data = await axios.get(`https://ayurved-products-api.onrender.com/users/${loginUserID.id}`);
          data = data.data;
          if(!data.prevOrders){
            axios.patch(`https://ayurved-products-api.onrender.com/users/${loginUserID.id}`,{
              prevOrders:[obj]
            });
          }
          else{
            axios.patch(`https://ayurved-products-api.onrender.com/users/${loginUserID.id}`,{
              prevOrders:[...data.prevOrders,obj]
            });
          }
          axios.post("https://ayurved-products-api.onrender.com/orders",obj)
          axios.patch(`https://ayurved-products-api.onrender.com/users/${loginUserID.id}`,{
            cart:[]
          })
          setCartItems([]);
          setCartLength(0)
        }} m={"auto"} variant={"outline"} color="white" bg="rgb(55, 146, 55)">Place Order</Button></NavLink>
        </Flex>
      </VStack>
      
    </Box>
    </>
    
  );
}
