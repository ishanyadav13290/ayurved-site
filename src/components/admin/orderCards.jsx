import { Box, Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";
import toIndianNumberingSystem from "../Features/Carousel/IndianConversionSystem";
import { useEffect, useState } from "react";

export default function OrdersCard({el}) {
  return (
    <Box
      display={["block", "flex", "flex"]}
      w="100%"
      mb={["10%", "7%", "3%"]}
    >
      <Box
        overflowY={"scroll"}
        maxH={["130px", "full"]}
        w={["100%", "60%", "30%"]}
        border={"1px solid grey"}
        textAlign="left"
        p="10px"
      >
        <Flex fontWeight={700}>
          Name:
          <Text ml={"5px"} fontWeight={400}>
            {" "}
            {el.fullName}
          </Text>
        </Flex>
        <Flex fontWeight={700}>
          Address:
          <Text ml={"5px"} fontWeight={400}>
            {" "}
            {el.streetAddress}
          </Text>
        </Flex>
        <Flex fontWeight={700}>
          City:
          <Text ml={"5px"} fontWeight={400}>
            {" "}
            {el.city}
          </Text>
        </Flex>
        <Flex fontWeight={700}>
          Phone Number:
          <Text ml={"5px"} fontWeight={400}>
            {" "}
            {el.phoneNumber}
          </Text>
        </Flex>
        <Flex fontWeight={700}>
          Email:
          <Text ml={"5px"} fontWeight={400}>
            {" "}
            {el.emailAddress}
          </Text>
        </Flex>
        <Flex fontWeight={700}>
          Total:
          <Text ml={"5px"} fontWeight={400}>
            {" "}
            {/* {totalPayableAmt + 50} */}
          </Text>
        </Flex>
      </Box>
      <Flex
        overflowX={"scroll"}
        overflowY="hidden"
        w={"100%"}
        maxH={"300px"}
        border={"1px solid grey"}
      >
        {el.orderedProducts.map((prod, i) => {
          return (
            <Card minW={["90%", "50%", "30%"]} key={i}>
              <CardBody>
                <Box
                  maxW={"100px"}
                  h={["auto", "80%"]}
                  m="auto"
                  overflow={"hidden"}
                >
                  <Image
                    src={prod.image || prod.img}
                    alt="alternate image"
                    borderRadius="lg"
                    maxW={"100%"}
                    m="auto"
                  />
                </Box>
                <Text fontSize={["xs", "sm", "md"]} maxW={"100%"}>
                  {prod.name}
                </Text>
                <Text fontSize={["xs", "sm", "md"]} maxW={"100%"}>
                  {toIndianNumberingSystem(prod.price * prod.qty)}
                </Text>
              </CardBody>
            </Card>
          );
        })}
      </Flex>
    </Box>
  );
}
