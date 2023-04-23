
import { Box } from "@chakra-ui/react"
import axios from "axios"
import Carousel from "../Features/Carousel/Carousel"
import { SearchBar } from "../navbar/nav2"
import {BigGrid} from "./BigPicGrid/BigGrid"
import Cards from "./Cards Grid/Cards"
import Expand from "./Expanding Section/expand"
import Testimonials from "./Testimonials/Testimonials"

export default function Frontpage() {
    return (
        <>
            <Box display={["none","none","none", "block", "block"]}>
            <Carousel />
            <br />
      <br />
      <br />
            </Box>
            {/* <BigGrid /> */}
            <Cards />
            <br />
            <Testimonials />
      <br />
      <br />
            <Expand />
            
        </>
    )
}

