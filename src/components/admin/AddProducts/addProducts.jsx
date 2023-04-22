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
  
  export default function AddProduct(){
    let imageInput = useRef()
    const [image, setImage] = useState(null);
    let [finalProduct, setFinalProduct] = useState({
      name:"",
      category:"",
      price:0,
      image:""
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
      console.log(link.secure_url)
      setImage(link.secure_url)
  };
  
    function handleRemoveImage() {
      setImage(null);
    }

    function uploadProduct(){
      console.log(finalProduct)
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
            Add New Product
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            {/* <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full">Change Icon</Button>
              </Center>
            </Stack> */}
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
          <FormControl id="productName" isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input
              placeholder="Product Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              onChange={(e)=>{
                setFinalProduct({...finalProduct,name: e.target.value})
              }}
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Product Description</FormLabel>
            <Textarea placeholder="Add Product's Description" onChange={(e)=>{
                setFinalProduct({...finalProduct,description: e.target.value})
              }} />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Product Category</FormLabel>
            <Select placeholder='Select Category' onChange={(e)=>{
                setFinalProduct({...finalProduct,category: e.target.value})
              }}>
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>
          </FormControl>
          
          <FormControl id="price" isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              placeholder="Product's Price"
              _placeholder={{ color: 'gray.500' }}
              type="number"
              onChange={(e)=>{
                setFinalProduct({...finalProduct,price: e.target.value})
              }}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'#379237'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={uploadProduct}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }