import {
    Flex,
    Box,
    FormControl,
    Checkbox,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    Link,
    Divider,
    Image,
    Spacer,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Navigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useRef, useContext } from 'react';
import { AuthContext } from '../AuthContext/context';
  
async function Id(name,func){
  let data = await axios.get("https://ayurved-products-api.onrender.com/users");
  data.data.forEach(el => {
    if(el.email==name){
      let id = el._id;
      let email = el.email;
      func({id,email});
      localStorage.setItem("loginUserID",JSON.stringify({id,email}))
    }
  });
}

  export default function SigninCard() {
    const [showPassword, setShowPassword] = useState(false);
    const {Login, state,setAlertVal, setSignInSuccessfull,loginUserID,setLoginUserID, setIsAdmin} = useContext(AuthContext)
    const {} = useContext(AuthContext)
    let email = useRef(null)
    let password = useRef(null)
    
    async function checkUser(){
      let data = await axios.get("https://ayurved-products-api.onrender.com/users");
      let users=data.data;
      let success = false;
      users.map(el=>{
        if(el.email== email.current.value && el.password == password.current.value){
          Login();
          if(el.isAdmin){setIsAdmin(true)}
          success = true;
          Id(email.current.value,setLoginUserID)
          setSignInSuccessfull(true);
      setTimeout(()=>setSignInSuccessfull(false),3000)
        }
      })
      if(success) return;
      setAlertVal(true);
      setTimeout(()=>setAlertVal(false),3000)

    }
    if(state){
      return <Navigate to="/" />
    }
    return (
      <Flex
        minH={'50vh'}
        align={'center'}
        justify={'center'}
        bg={('gray.50')}>
        <Stack spacing={8} mx={'auto'} w={'xl'} py={12} px={6}>
          
          <Box
            rounded={'lg'}
            bg={('white')}
            boxShadow={'0 1px 20px rgb(0 0 0 / 19%), 0px 0px 6px rgb(0 0 0 / 23%)'}
            w="80%"
            m="auto"
            p={8}>
            <Stack align={'center'} pb="10px">
            <Heading fontSize={'3xl'} textAlign={'center'} fontWeight="400">
              SIGN IN
            </Heading>
          </Stack>
            <Stack spacing={4}>
        
              <FormControl id="email" isRequired>
                {/* Email address*/}
                <Input type="email" placeholder='Email Address' ref={email} />
              </FormControl>
              {/* Password  */}
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Password" ref={password} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* Sign up Button */}
              <Stack spacing={10}>
                <Button
                  loadingText="Submitting"
                  size="sm"
                  w="30%"
                  m="auto"
                  bg={'rgb(55, 146, 55)'}
                  color={'white'}
                  onClick={()=>{
                    checkUser()
                  }}
                  _hover={{
                    bg: 'rgb(130, 205, 71)',
                  }}>
                  SIGN IN
                </Button>
              </Stack>

              {/* Remember Me */}
              <Flex fontSize={"xs"}>
                <Checkbox size={"sm"} />
                <Text pl="2px">REMEMBER ME</Text>
                <Spacer />
                <Link>Forgot Password?</Link>
              </Flex>

              <Box>
              <Text align={'center'} fontSize="xs">
                  Don't have an Account? <NavLink to="/signup" style={{color:"blue",textDecoration:"underline"}}>Create account</NavLink>
                </Text>
              <Text align={'center'} fontSize="xs">
                  Didn't received confirmation? <NavLink style={{color:"blue", textDecoration:"underline"}}>Resend confirmation link</NavLink>
                </Text>
              </Box>

              <Divider borderBottom={"1px solid black"} />
              
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }