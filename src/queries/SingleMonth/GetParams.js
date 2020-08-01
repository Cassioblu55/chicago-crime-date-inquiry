export function GetParams(year, month) {
	return {
		$select: 'date_trunc_ymd(date) as date, count(date) as count',
		$where: `date_extract_y(date)=${year} AND date_extract_m(date)=${month}`,
		$group: 'date',
		$limit: 50000,
	};
}