import React, {Component, useEffect, useState} from "react";
import Slider from "react-slick";
import css from "../../styles/Index.module.css";

export const IndexTitleFadeEffect = ({t}) => {
	const settings = {
		className: `${css.MasterKaruselTitle}`,
		vertical: true,
		dots: false,
		autoplay: true,
		// fade: true,
		infinite: true,
		speed: 1500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
	};

	return (
		<div style={{marginTop: 30}}>
			<Slider {...settings} >
				<h1 className={css.IndexTitle}>{t.wrapperTitle}</h1>
				<h1 className={css.IndexTitle}>{t.modaltitle}</h1>
			</Slider>
		</div>
	);
}
