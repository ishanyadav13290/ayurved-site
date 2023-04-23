import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Select,
    Textarea,
  } from '@chakra-ui/react';
  import {useState, useRef} from "react"
  import { SmallCloseIcon } from '@chakra-ui/icons';
  import axios from "axios"
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext/context';
  
  export default function AddTestimonials(){
    let { setTestimonialData} = useContext(AuthContext)
    let imageInput = useRef()
    const [image, setImage] = useState(null);
    let [finalTestimonial, setFinalTestimonial] = useState({
      name:"",
      role:"",
      content:"",
      avatar:""
    })
    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      let cloud_name = "dl95ipzp9"
    let upload_preset = "ml_default"
      let formData = new FormData();
      formData.append("file",file);
      formData.append("upload_preset",upload_preset);

      let link = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData);
      link = link.data;
      setImage(link.secure_url)
     setFinalTestimonial({...finalTestimonial,avatar: link.secure_url})
  };
  
    function handleRemoveImage() {
      setImage(null);
    }

   async function uploadTestimonial(){
      axios.post(`https://ayurved-products-api.onrender.com/testimonials`,finalTestimonial)

     let newData = await axios.get(`https://ayurved-products-api.onrender.com/testimonials`)
     setTestimonialData(newData.data)
  }

    
    return (
      <Flex
        minH={'100%'}
        align={'center'}
        width={"100%"}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'100%'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Add New Testimonial
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
      <Center>
        <Avatar size="xl" src={image ?? "https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_960_720.png"}>
          {image && (
            <AvatarBadge
              as={IconButton}
              size="sm"
              rounded="full"
              top="-10px"
              colorScheme="red"
              aria-label="remove Image"
              icon={<SmallCloseIcon />}
              onClick={handleRemoveImage}
            />
          )}
        </Avatar>
      </Center>
      <Center w="full">
        <label>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={imageInput}
            onChange={handleImageChange}
            zIndex={"1000"}
          />
          <Button w="100%" onClick={()=>{imageInput.current.click()}}>Change Photo</Button>
        </label>
      </Center>
    </Stack>
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel>Customer Name</FormLabel>
            <Input
              placeholder="Customer Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              onChange={(e)=>{
             setFinalTestimonial({...finalTestimonial,name: e.target.value})
              }}
            />
          </FormControl>
          <FormControl id="content">
            <FormLabel>Their Testimony</FormLabel>
            <Textarea placeholder="Add Their Review" onChange={(e)=>{
             setFinalTestimonial({...finalTestimonial,content: e.target.value})
              }} />
          </FormControl>
          <FormControl id="role">
            <FormLabel>Their Job Role</FormLabel>
            <Textarea placeholder="Add Their Job" onChange={(e)=>{
             setFinalTestimonial({...finalTestimonial,role: e.target.value})
              }} />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'#379237'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={uploadTestimonial}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }