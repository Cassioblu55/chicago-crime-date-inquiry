export function GetParams(year) {
	return {
		$select: 'date_trunc_ymd(date) as date, count(date) as count',
		$where: `date_extract_y(date)=${year}`,
		$group: 'date',
		$limit: 500000,
	};
}