
import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
const images = [
  { url: "https://cdn.pixabay.com/photo/2015/08/18/22/01/lavenders-894919_960_720.jpg" },
  { url: "https://cdn.pixabay.com/photo/2016/11/06/06/22/cashew-1802360_960_720.jpg" },
  { url: "https://images.unsplash.com/photo-1532092367580-3bd5bc78dd9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
  { url: "https://cdn.pixabay.com/photo/2016/09/05/12/04/plant-1646376_960_720.jpg" }
];

const Carousel = () => {
  return (
    <div style={{width:"100%",backgroundSize:"cover"}}>
      <SimpleImageSlider
        width="100%"
        height={500}
        images={images}
        // showBullets={true}
        showNavs={true}
        autoPlay={true}
        autoPlayDelay={3.5}
      />
    </div>
  );
}


export default Carousel