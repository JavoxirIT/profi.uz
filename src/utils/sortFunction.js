export function sortFunction(nameOne, nameTwo ) {
	return function (a, b) {
		return a[nameOne] > b[nameOne] ? 1 : -1 || a[nameTwo] > b[nameTwo] ? 1 : -1;
	};
}
