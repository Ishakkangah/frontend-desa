import React, { useState, useEffect } from "react";
import Api from "../../services/Api";
import { Carousel } from "react-bootstrap";
import Loading from "../general/Loading";

export default function Sliders() {
  const [sliders, setSliders] = useState([]);
  const [loadingSlider, setLoadingSlider] = useState(true);

  const fetchDataSliders = async () => {
    //setLoadingSlider "true"
    setLoadingSlider(true);

    await Api.get("/api/public/sliders").then((response) => {
      //assign response to state "sliders"
      setSliders(response.data.data.data);

      setLoadingSlider(false);
    });
  };

  useEffect(() => {
    fetchDataSliders();
  }, []);

  return (
    <Carousel
      prevIcon={
        <i className="fa fa-chevron-left fa-lg carousel-custom text-dark shadow-sm"></i>
      }
      nextIcon={
        <i className="fa fa-chevron-right fa-lg carousel-custom text-dark shadow-sm"></i>
      }
    >
      {loadingSlider ? (
        <Loading />
      ) : (
        sliders.map((slider, index) => (
          <Carousel.Item key={index} interval={500}>
            <img
              className="d-block w-100"
              src={slider.image}
              style={{ height: "500px", objectFit: "cover" }}
              alt="Slider"
            />
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
}
