import React, { useEffect, useState, Suspense } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { postFetch } from "../../request/Fetch";
import css from "../../styles/Index.module.css";
import CarouselCard from "./CarouselCard";
import { Preloader } from "utils/Preloader";

function MasterCarusel(props) {
  const { config, lang } = props;

  const [carouselUser, setCarouselUser] = useState([]);
  useEffect(() => {
    postFetch({ path: "topusers", method: "GET" })
      .then((res) => {
        if (res.status === 200) {
          setCarouselUser(res.data.data);
          // console.log("carousel", res.data.data)
        } else {
          console.error("warning:", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const settings = {
    className: `${css.MasterKaruselUser}`,
    swipeToSlide: true,
    infinite: true,
    autoplay: true,
    dots: false,
    speed: 4000,
    autoplaySpeed: 500,
    cssEase: "linear",
    // slidesToShow: 6,
    slidesToScroll: 1,
    variableWidth: true,
    pauseOnHover: true,
    touchMove: true,
    // nextArrow: <SampleNextArrow/>,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      // {
      // 	breakpoint: 1024,
      // 	settings: {
      // 		slidesToShow: 3,
      // 		slidesToScroll: 3,
      // 		infinite: true,
      // 		dots: true
      // 	}
      // },
      // {
      // 	breakpoint: 1000,
      // 	settings: {
      // 		slidesToShow: 2,
      // 		slidesToScroll: 1,
      // 		initialSlide: 1,
      // 		infinite: true,
      // 		dots: true
      // 	}
      // },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <Suspense fallback={<Preloader />}>
      <Slider {...settings}>
        {carouselUser.map((a) => (
          <CarouselCard
            key={a.id}
            id={a.id}
            image={a.image}
            specialName={a.special?.name}
            specialId={a.special?.id || null}
            firstname={a.firstname}
            lastname={a.lastname}
            districtVilName={a.distirct?.vil_name}
            subSpecial={a.sub_special}
            lang={lang}
          />
        ))}
      </Slider>
    </Suspense>
  );
}

export default MasterCarusel;
