import {
  Flex,
  Box,
  Grid,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import ProductCard from "./productCards";
// import MainProductfilter from "./ProductFilter/mainFilterProduct";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Skeleteon from "../Features/Carousel/skeleton";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AuthContext } from "../AuthContext/context";

export default function Products() {
  let [page, setPage] = useState(1);
  let [pageLimit, setPageLimit] = useState(0);
  let [proData, setProDta] = useState([]);
  let [loading, setLoading] = useState(false);
  let { sortBasis, setSortBasis, activeSearch, setActiveSearch, searchValue,searchProductId,setSearchProductId } =
    useContext(AuthContext);
  let da = useParams();
  const FetchData = async (param) => {
    setLoading(true);
    let data = await axios.get(
          `https://ayurved-products-api.onrender.com/products`
        );
    
    setPageLimit(data.headers["x-total-count"]);
    setProDta(data.data);
    setLoading(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    FetchData(da.pro);
  }, [page, sortBasis, da.pro, searchValue]);
  return (
    <>
      <Flex justify="center" width="100vw" p="0 20px">
        <Spacer />
        <Flex align="center" width="80%">
          <Flex align="center">
            <NavLink to="/">Home</NavLink> <Box margin="2px">/</Box>
          </Flex>
          <Flex align="center">
            {da.pro} <Box margin="2px">/</Box>
          </Flex>
        </Flex>
        <Spacer />
        
        <Spacer />
      </Flex>
      <Flex width="100vw" justify="center">
        {/* Side Filter */}
        {/* <MainProductfilter /> */}
        <Grid
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap="10px"
          p="10px"
          w={["95vw", "90vw", "65vw"]}
          minH="200vh"
        >
          {loading ? (
            <Skeleteon />
          ) : (
            proData.map((data) => {
        
                return (
                  <ProductCard
                    prodId={data._id}
                    key={data._id}
                    title={data["name"]}
                    img={data["image"]}
                    price={data["price"]}
                  />
                );
              }))
            }
        </Grid>
      </Flex>
      <Flex>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Button
          isDisabled={page <= 1}
          fontSize="2xl"
          fontWeight={700}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          -
        </Button>
        <Button isDisabled={true} fontSize="2xl" fontWeight={700} m="0 10px">
          {page}
        </Button>
        <Button
          fontSize="2xl"
          fontWeight={700}
          onClick={() => {
            setPage(page + 1);
          }}
          isDisabled={page >= pageLimit / 35}
        >
          +
        </Button>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
      </Flex>
    </>
  );
}
