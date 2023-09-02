import React from "react";
import Slider from "react-slick";
import css from "../../styles/Index.module.css";
import {Carousel} from "antd"

export const IndexTitleFadeEffect = ({t}) => {
	const settings = {
		className: `${css.KaruselTitle}`,
		// vertical: true,
		// verticalSwiping: true,
		dots: false,
		autoplay: true,
		fade: true,
		infinite: true,
		speed: 2000,
		// slidesToShow: 1,
		// slidesToScroll: 1,
		adaptiveHeight: true,
	};

	return (
		<div style={{paddingTop: 20}}>
			<Slider {...settings} >
				<div className={css.indexTitleBlock}>
					<h1 className={css.IndexTitle}>{t.wrapperTitle}</h1>
				</div>
				<div className={css.indexTitleBlock}>
					<h2 className={css.IndexTitle}>{t.modaltitle}</h2>
				</div>
			</Slider>
		</div>
	);
}
