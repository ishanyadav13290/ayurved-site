import {
  Image,
  Card,
  CardBody,
  Text,
  Box,
  Stack,
  StackDivider,
  Heading,
  Flex,
  Center,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function ProductCard(props) {
  return (
    <NavLink to={props.prodId} style={{"height":"fit-content"}}>
      <Card
        minW={"200px"}
        _hover={{
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          cursor: "pointer",
        }}
      >
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                <Center>
                  <Image
                    width={"150px"}
                    height={"200px"}
                    src={props.img}
                  ></Image>
                </Center>
              </Heading>
            </Box>
            <Box>
              <Text pt="2" fontSize="sm">
                {props.title}
              </Text>
              <Heading size="xs" textTransform="uppercase">
                <Flex gap={"10px"}>
                  <Box>$ {props.price}</Box>
                  <Box color={"red"}>{props.discount}</Box>
                </Flex>
              </Heading>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </NavLink>
  );
}
