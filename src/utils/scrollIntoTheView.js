export const scrollIntoTheView = (id) => {
	let element = document.getElementById(id);
	if (!element) return;
	element.scrollIntoView({
		behavior: "smooth",
		block: "start",
		inline: "nearest",
	});
};