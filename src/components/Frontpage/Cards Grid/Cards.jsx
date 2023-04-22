import { Card, Image, Stack, Button, CardBody,  Grid, GridItem, Link } from '@chakra-ui/react'
import Styles from "./Cards.module.css"


let cardImgs=["https://www.shutterstock.com/image-photo/man-sitting-toilet-bowl-bathroom-260nw-1608755596.jpg","https://www.niddk.nih.gov/-/media/Images/Health-Information/Featured-Images/kidney_stones_square.jpg","https://www.gannett-cdn.com/presto/2018/08/21/PBRE/b54562f1-f06b-4cb0-9852-a5274cca6b58-GettyImages-484036003.jpg","https://cdn.cdnparenting.com/articles/2019/03/03152539/1135057226-H.jpg","https://health.clevelandclinic.org/wp-content/uploads/sites/3/2012/06/menopauseMemory-1171064351-770x553-1-650x428.jpg","https://www.hairmdindia.com/wp-content/uploads/2021/07/Does-Dandruff-cause-hair-loss-300x200.jpg","https://cdn.pixabay.com/photo/2018/01/28/20/00/obesity-3114559_960_720.png","https://img.freepik.com/free-vector/cartoon-character-with-weakness-symptoms_1308-52590.jpg"
]
let cardImgsTitle=["Piles","Kidney Stones","White Spots","Indigestion","Memory Loss","Hair-Fall","Fatness","Weakness"]

let links = ["products","products","products","products","products","products","products","products","products","products","products","products","products","products","products","products"]
export default function Cards(){
    return  <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]} gap={6} w="100%" m="auto">
    {cardImgs.map((pics,i)=>{
        return <GridItem w='100%' h="auto" key={i} overflow="hidden">
        <Link href={links[i]} >
        <Card w='100%' >
    <CardBody className={Styles.cardBody} minHeight={"100px"} >
      <Image
        src={pics}
        alt='Green double couch with wooden legs'
        borderRadius='50%'
        height={"150px"}
        m={"auto"}
        // w={["xs","sm","lg", "full", "full"]}
        maxW={["auto", "auto", "full"]}
      />
      <Stack mt="-5" spacing='3'>
      <Button variant='outline' colorScheme='black' bg="rgba(0,0,0,0.5)" color="white" fontSize={["2xs","xs","sm"]} textAlign="left" maxW={["auto", "auto", "full"]}>
          {cardImgsTitle[i]}
        </Button>
      </Stack>
        
    </CardBody>
  </Card> 
        </Link>
  </GridItem>
    })}
  </Grid>
}