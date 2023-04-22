import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useStatStyles,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/context";
import AddProduct from "./AddProducts/addProducts";
import toIndianNumberingSystem from "../Features/Carousel/IndianConversionSystem";
import OrdersCard from "./orderCards";

export default function Admin() {
  
  let { loginUserID } = useContext(AuthContext);
  let [data, setData] = useState([]);

  useEffect(() => {
    (async function fetch() {
      let temp = await axios.get("https://ayurved-products-api.onrender.com/orders");
      setData(temp.data);
      console.log(temp.data)
    })();
  }, []);
  return (
    // <Box>Hello</Box>
    <Box>
      <Box>
        <Text fontSize={"xl"} fontWeight={"700"} textAlign={"center"}>
          Welcome {loginUserID.email}
        </Text>
      </Box>
      <Box w="100%">
        <Tabs variant="enclosed" orientation={"vertical"} w={"100%"}>
          <TabList mb="1em" w={"30%"}>
            <Tab>Orders</Tab>
            <Tab>Add Product</Tab>
          </TabList>
          <TabPanels
            textAlign={"center"}
            display={["block","flex","flex"]}
            w={"full"}
            overflowY={"scroll"}
          >
            <TabPanel h="100%" display={"block"} w={"100%"}>
              {data.map((el, j) => {
                return <OrdersCard key={j} el={el} />
              })}
            </TabPanel>
            <TabPanel h="100%" display={"block"} w={"100%"}>
            <Box display={["block","flex","flex"]} w="100%" mb={["10%","7%","3%"]} >
                <AddProduct />
            </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
