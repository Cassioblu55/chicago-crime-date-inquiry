const COLORS = [
	'#8783D1',
	'#AA9ABA',
	'#BFA4A4',
	'#D1ABAD',
	'#E3B9BC',
	'#A63A50',
	'#012622',
	'#012622',
	'#003B36',
	'#59114D',
	'#42033D',
];

export default function(element){
	const index = element.index || 0;
	if (index < COLORS.length) {
		return COLORS[index];
	}
	let offSet = COLORS.length;
	while (index - offSet >= COLORS.length) {
		offSet += COLORS.length;
	}
	return COLORS[index - offSet];
};