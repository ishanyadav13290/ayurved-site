import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
import { useContext } from 'react'
  import { FaArrowRight } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../AuthContext/context'
import toIndianNumberingSystem from '../../Features/Carousel/IndianConversionSystem'
  const OrderSummaryItem = (props) => {
    // let {setCheckoutTotal} = useContext(AuthContext)
    const { label, value,children } = props
    return (
      <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
          {label}
        </Text>
        {value ? <Text fontWeight="medium">{value}</Text> : children}
      </Flex>
    )
  }
  
  export const CartOrderSummary = () => {
    let {total,setCheckoutTotal} = useContext(AuthContext)
    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Order Summary</Heading>
  
        <Stack spacing="6">
          <OrderSummaryItem label="Subtotal" value={toIndianNumberingSystem(total)} />
          <OrderSummaryItem label="Shipping + Tax">
            <Link href="#" textDecor="underline">
              {toIndianNumberingSystem(50)}
            </Link>
          </OrderSummaryItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              {toIndianNumberingSystem(total+50)}
            </Text>
          </Flex>
        </Stack>
        <NavLink to="/checkout">
        <Button colorScheme="blue" onClick={()=>{
          setCheckoutTotal(total+50)
        }} size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
          Checkout
        </Button>
        </NavLink>
      </Stack>
    )
  }