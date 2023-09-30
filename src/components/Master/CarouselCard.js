import React from "react";
import Image from "next/image";
import Link from "next/link";
import {nanoid} from "nanoid";
import {Tag, Typography} from "antd";
import {HiOutlineLocationMarker} from "react-icons/hi";
import img from "../../img/photo.jpg";
import css2 from "../../styles/MasterCarousel.module.css";

const {Text, Title} = Typography;

export default function CarouselCard(props){
	const {id, image,specialName, specialId,firstname,lastname, districtVilName, subSpecial, lang} = props
	return(
		<div key={id} className={css2.carouserWrapper}>
			<div className={css2.carouselHeader}>
				<div className={css2.carouselImageBlock} >
					{image !== null ? (<Image
						fill
						src={`${process.env.NEXT_PUBLIC_IMG_URL + image}`}
						key={nanoid()}
						alt="avatar"
						className={css2.indexCarouselImage}
						priority={true}
					/>) : (<Image
						fill
						key={nanoid()}
						src={img}
						alt="avatar"
						className={css2.indexCarouselImage}
						priority={true}
					/>)}
				</div>
				<div>
					<Link href={"/index/[id]"} as={`/index/${id}`}>
						<Tag style={{textTransform: "uppercase", fontSize: 12, fontWeight: 700}} key={specialId || null}>
							{specialName}
						</Tag>
						<Title level={5} style={{color: "#ffff"}} >
							{firstname} {lastname}
						</Title>
						<p style={{marginBottom: 5}}>
							<HiOutlineLocationMarker color={"#001529"}/>
							<Text style={{paddingLeft: 10, color: "#ffff"}}>
								{districtVilName}
							</Text>
						</p>
					</Link>
				</div>
			</div>
			<div>
				{subSpecial?.map((i) => (<Tag color="default" key={i.id} style={{marginBlock: 5,textTransform: "uppercase", fontSize: 10, fontWeight: 700}}>
					{lang === "ru" ? i.nameru : i.name}
				</Tag>))}
			</div>
		</div>
	)
}