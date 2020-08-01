export function GetParams() {
	return {
		$select: 'date_trunc_ym(date) as date, count(date) as count',
		$group: 'date',
		$limit: 500000,
	};
}