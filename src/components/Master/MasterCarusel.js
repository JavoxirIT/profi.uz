import React from 'react';
import {Card, Carousel, Rate, Tag, Typography} from "antd";
import Image from "next/image";
import css from "../../styles/Index.module.css";
import img from "../../img/photo.jpg";
import Link from "next/link";
import {AiFillHeart} from "react-icons/ai";
import {HiOutlineLocationMarker} from "react-icons/hi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {nanoid} from 'nanoid'
import {AiOutlineDoubleRight, AiOutlineDoubleLeft} from "react-icons/ai"
const {Text, Title} = Typography;
const imgUrl = process.env.NEXT_PUBLIC_IMG_URL



function MasterCarusel({caruselUser}) {
	const settings = {
		className: `${css.MasterKaruselUser}`,
		swipeToSlide: true,
		infinite: true,
		autoplay: true,
		dots: false,
		speed: 4000,
		autoplaySpeed: 500,
		cssEase: "linear",
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		pauseOnHover: true,
		touchMove: true,
		// nextArrow: <SampleNextArrow/>,
		// prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 1,
					infinite: true,
					dots: true
				}
			},
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
		<Card key={a.id} className={css.indexUserCardBody}>
			<div className={css.indexUserCardHeader}>
				{a.image !== null ? (<Image
					src={`${imgUrl + a.image}`}
					key={nanoid()}
					alt="avatar"
					width={50}
					height={50}
					className={css.indexCaruselImage}
					priority={true}
				/>) : (<Image
					key={nanoid()}
					src={img}
					alt="avatar"
					width={50}
					height={50}
					className={css.indexCaruselImage}
					priority={true}
				/>)}

				<div>
					<Rate
						className={css.indexUserRate}
						// onChange={(e) => ratingChange(i.id, e)}
						value={a.reyting}
						disabled
					/> <br/>
					<Text>Umumiy reyting: {a.reyting}</Text>
				</div>
				<AiFillHeart
					key={a.like.id}
					aria-labelledby="like"
					// onClick={() => ChangeLike({id: i.id, like: i.like?.likes})}
					className={a.like?.likes === 0 || a.like === "Unauthorized" ? `${css.indexUserRate}` : `${css.indexUserRateTrue}`}
				/>
			</div>
			<div>
				<Text style={{fontSize: 12}} key={a.special?.id || null}>
					{a.special?.name}
				</Text>
				<br/>
				<Link href={"/index/[id]"} as={`/index/${a.id}`}>
					<Title level={4}>
						{a.firstname} {a.lastname}
					</Title>
				</Link>
				<p style={{marginBottom: 5}}>
					<HiOutlineLocationMarker/>
					<Text style={{paddingLeft: 10}}>
						{a.distirct?.vil_name}
					</Text>
				</p>

				<Tag key={a.sub_special?.id}>{a.sub_special?.name || null}</Tag>
			</div>
		</Card>
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
			{noDataArr.map((i)=>
				<Card bordered={false} hoverable key={i.key} >
					<Image
						key={nanoid()}
						src={i.image}
						alt="avatar"
						width={250}
						height={150}
						priority={true}
					/>
				</Card>
			)}
		</Slider>);
}

export default MasterCarusel;