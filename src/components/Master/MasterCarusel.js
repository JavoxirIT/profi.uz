import React, {useEffect, useState} from 'react';
import {Card, Carousel, Rate, Tag, Typography} from "antd";
import Image from "next/image";
import img from "../../img/photo.jpg";
import Link from "next/link";
import {AiFillHeart} from "react-icons/ai";
import {HiOutlineLocationMarker} from "react-icons/hi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {nanoid} from 'nanoid'
import {AiOutlineDoubleRight, AiOutlineDoubleLeft} from "react-icons/ai"
import {postFetch} from "../../request/Fetch";
import css from "../../styles/Index.module.css";
import css2 from "../../styles/MasterCarousel.module.css";

const {Text, Title} = Typography;
const imgUrl = process.env.NEXT_PUBLIC_IMG_URL


function MasterCarusel({lang}) {
	const [caruselUser, setCaruselUser] = useState([]);
	useEffect(() => {

		postFetch({path: "topusers", method: "GET"}).then((res) => {
			if (res.status === 200) {
				setCaruselUser(res.data.data)
				// console.log("carousel", res.data.data)
			} else {
				console.error("warning:", res)
			}
		}).catch((err) => {
			console.log(err)
		}).finally(() => {

		})
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
					dots: true
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			}
		]
	};
	// console.log("caruselUser>>>", caruselUser)
	const data = caruselUser.map((a) =>
		<div key={a.id} className={css2.carouserWrapper}>
			<div className={css2.carouselHeader}>
				<div>
					{a.image !== null ? (<Image
						src={`${imgUrl + a.image}`}
						key={nanoid()}
						alt="avatar"
						width={120}
						height={120}
						className={css.indexCaruselImage}
						priority={true}
					/>) : (<Image
						key={nanoid()}
						src={img}
						alt="avatar"
						width={120}
						height={120}
						className={css.indexCaruselImage}
						priority={true}
					/>)}
				</div>
				<div>
					<Link href={"/index/[id]"} as={`/index/${a.id}`}>
						<Tag style={{textTransform: "uppercase", fontSize: 12, fontWeight: 700}} key={a.special?.id || null}>
							{a.special?.name}
						</Tag>
						<Title level={5} style={{color: "#ffff"}} >
							{a.firstname} {a.lastname}
						</Title>
						<p style={{marginBottom: 5}}>
							<HiOutlineLocationMarker color={"#001529"}/>
							<Text style={{paddingLeft: 10, color: "#ffff"}}>
								{a.distirct?.vil_name}
							</Text>
						</p>
					</Link>
				</div>
			</div>
			<div>
				{a.sub_special?.map((i) => (<Tag color="default" key={i.id} style={{marginBlock: 5,textTransform: "uppercase", fontSize: 10, fontWeight: 700}}>
					{lang === "ru" ? i.nameru : i.name}
				</Tag>))}
			</div>
		</div>
	)
	const noDataArr = [];
	for (let i = 0; i < 10; i++) {
		noDataArr.push({
			key: i,
			image: img
		});
	}
	return (
		<Slider {...settings} >
			{data}
		</Slider>);
}

export default MasterCarusel;