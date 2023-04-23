import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
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
import ListedProductsCards from "./ListedProducts/ListedProductsCards";
import AddTestimonials from "./AddTestimonials/AddTestimonials";
import RemoveTestimonials from "./removeTestimonials";

export default function Admin() {
  
  let { loginUserID, productsData, setProductsData, testimonialData } = useContext(AuthContext);
  let [data, setData] = useState([]);

  useEffect(() => {
    (async function fetch() {
      let temp = await axios.get("https://ayurved-products-api.onrender.com/orders");
      setData(temp.data);
    })();
    (async function fetch() {
      let temp = await axios.get("https://ayurved-products-api.onrender.com/products");
      setProductsData(temp.data);
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
            <Tab>Listed Products</Tab>
            <Tab>Add Testimonials</Tab>
            <Tab>Remove Testimonials</Tab>
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
            <TabPanel h="100%" display={"block"} w={"100%"}>
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6} w="100%" m="auto">
                {productsData.map((el,i)=>{
                  return <ListedProductsCards key={i} data={el} />
                })}
            </Grid>
            </TabPanel>
            <TabPanel h="100%" display={"block"} w={"100%"}>
            <AddTestimonials />
            </TabPanel>
            <TabPanel h="100%" display={"block"} w={"100%"}>
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6} w="100%" m="auto">
            {testimonialData.map((el,i)=>{
                  return <RemoveTestimonials key={i} data={el} />
                })}
            </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
