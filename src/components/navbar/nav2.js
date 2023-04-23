import { Box, Button, Flex, Image, Input, useStatStyles } from "@chakra-ui/react"
import { NavLink, useSearchParams } from "react-router-dom"
import { LordIconSearch } from "../Features/Carousel/LordIcon"
import { CartLog } from "./nav1"
import styles from "./nav.module.css";
import DrawerExample from "./Hamburger";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/context";
import logo from "../database/Imgs/vighnahartaLogo.png"

export default function Nav2() {
    let {searchValue, setSearchValue,setActiveSearch} = useContext(AuthContext)
    let searchQuery = useRef(null)
    let searchButton = useRef(null)
    let [searchParams, setSearchParams] = useSearchParams("")
    function Search(){
       let value= searchQuery.current.value
       setSearchParams(value)
       setSearchValue(value)
       setActiveSearch(true)
       searchQuery.current.value=""
    //    setActiveSearch(false)
    }

    return (
        <Flex id="mid" h="100px" justify="center" align="center" className={styles.fill} >
            <Flex align="center" justify="space-between" w="95%">
            <DrawerExample />
                <NavLink to="/" onClick={()=>{
                    setActiveSearch(false)
                }}><Box flexShrink="0"><Image src={logo}  display={["flex", "flex", "flex"]} w={["100%","50%","30%"]} m="0 20%" /></Box></NavLink>
                <Flex border="1px solid black" w="50%" display={["none", "none", "flex"]} flexShrink="0">
                    <Input ref={searchQuery} border="none" fontStyle="italic" placeholder="Search Something..." borderRadius="0" w="90%" onKeyDown={(e)=>{
                        if(e.key=="Enter"){
                            Search()
                            searchButton.current.click()
                        }
                    }}></Input>
                    <NavLink ref={searchButton} to="/search" style={{width:"10%", border:"1px solid black"}}>
                    <Button _hover={{background:"#379237"}} bg="#54B435" borderRadius="0" w="100%" onClick={()=>{
                        Search()
                    }}><LordIconSearch /></Button></NavLink>
                </Flex>
                <Flex display={["flex", "flex", "none"]} ml="5%">

                <CartLog />

                </Flex>
            </Flex>
        </Flex>
    )
}

