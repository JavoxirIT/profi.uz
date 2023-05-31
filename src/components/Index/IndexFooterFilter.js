import React from 'react';
import css from "../../styles/Index.module.css"

function IndexFooterFilter(props) {
	const {vil, lang, loading, t, onFinish, special, setOpenModal, setSubId} = props
	const onSubSpecial = (e) => {
		setSubId(e)
		setOpenModal(true)
	}

	function sortData(a, b) {
		if (lang === "ru") {
			if (a.nameru > b.nameru) return 1;
			if (a.nameru === b.nameru) return 0;
			if (a.nameru < b.nameru) return -1;
		} else {
			if (a.name > b.name) return 1;
			if (a.name === b.name) return 0;
			if (a.name < b.name) return -1;
		}
	}

	const specialData = special.sort(sortData).map((i) =>
		<div key={i.id}>
			<p className={css.IndexFooterFilterItemTitle}>{lang === "ru" ? i.nameru : i.name}</p>
			<ul>
				{i.subspecial.sort(sortData).map((item) =>
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