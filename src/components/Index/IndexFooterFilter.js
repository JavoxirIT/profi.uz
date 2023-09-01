import React from 'react';
import {sortFunction} from "../../utils/sortFunction";
import css from "../../styles/Index.module.css"

function IndexFooterFilter(props) {
	const {vil, lang, loading, t, onFinish, special, setOpenModal, setSubId} = props
	const onSubSpecial = (e) => {
		setSubId(e)
		setOpenModal(true)
	}

	const specialData = special.sort(sortFunction("name", "nameru")).map((i) =>
		<div key={i.id} className={css.IndexFooterFilterItemGroup}>
			<p className={css.IndexFooterFilterItemTitle}>{lang === "ru" ? i.nameru : i.name}</p>
			<ul>
				{i.subspecial.sort(sortFunction("name", "nameru")).map((item) =>
					<li onClick={() => onSubSpecial(item.id)} className={css.IndexFooterFilterItems}
					    key={item.id}>{lang === "ru" ? item.nameru : item.name}</li>
				)}
			</ul>
		</div>
	)


	return (
		<div className={css.IndexFooterFilterContainer}>
			{specialData}
		</div>
	);
}

export default IndexFooterFilter;