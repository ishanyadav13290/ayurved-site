import { Box, Text, Accordion, AccordionButton, AccordionItem, AccordionPanel, Flex, Spacer } from "@chakra-ui/react";
import LordIcon from "../../Features/Carousel/LordIcon"

export default function Expand(){
      return  <Box w={["95%","85%","75%"]} m="auto" p="20px">
            <Text fontWeight="700" fontSize="xl">Ayurvedic Natural Treatment</Text>
            <Box fontSize="sm" m="10px 0">
            Ayurveda is a traditional Indian system of medicine that dates back more than 5,000 years. The word "Ayurveda" is derived from the Sanskrit words "ayu" (life) and "veda" (knowledge). This holistic approach to healthcare aims to balance the mind, body, and spirit through personalized treatments that are tailored to an individual's unique constitution. 
            </Box>
            <Box fontSize="sm" m="10px 0">
            Ayurveda emphasizes the use of natural remedies, such as herbs, spices, and oils, and encourages healthy lifestyle practices, including yoga, meditation, and a balanced diet. Today, Ayurveda is recognized as a complementary and alternative medicine (CAM) practice in many countries around the world.
            </Box>

   <Accordion defaultIndex={[false]} allowMultiple >
  <AccordionItem>
    <h2>
      <AccordionButton p="0">
        <Flex w="100%"><Text fontWeight="700" fontSize="xl">History of Ayurveda</Text>
        <Spacer />
        <LordIcon  />
        </Flex>
      </AccordionButton>
    </h2>
    <AccordionPanel p="0" pb={4} >
    <Box fontSize="sm" m="10px 0">Ayurveda is an ancient system of medicine that has been practiced in India for thousands of years. The origins of Ayurveda can be traced back to the Vedas, which are a collection of ancient Hindu scriptures. Ayurveda is believed to have been developed by the sages and seers of ancient India who were seeking ways to maintain good health and longevity.






</Box>
    <Box fontSize="sm" m="10px 0">The first written records of Ayurveda date back to around 1500 BCE, in the form of the Atharva Veda. Over the centuries, Ayurveda evolved into a comprehensive system of medicine with detailed descriptions of diseases, treatments, and medicinal herbs.</Box>
    <Box fontSize="sm" m="10px 0">
During the Mauryan period (322 BCE to 185 BCE), the emperor Ashoka promoted the spread of Ayurveda throughout his kingdom, which helped to establish it as a widely accepted form of medicine in India.</Box>
    <Box fontSize="sm" m="10px 0">Ayurveda continued to flourish throughout the centuries, with many notable scholars and physicians contributing to its development. In the 8th century CE, the famous Ayurvedic text, the Charaka Samhita, was written, which is still considered one of the most important works on Ayurvedic medicine.</Box>
    <Box fontSize="sm" m="10px 0">Today, Ayurveda continues to be an important part of traditional Indian medicine and is recognized as a complementary and alternative medicine (CAM) practice in many parts of the world.</Box>
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
        </Box>
}