export function GetParams(year, month, day, hour) {
	return {
		$select: 'primary_type, count(primary_type) as count',
		$where: `date_extract_y(date)=${year} AND date_extract_m(date)=${month} AND date_extract_d(date)=${day} AND date_extract_hh(date)=${hour}`,
		$group: 'primary_type',
		$limit: 5000,
		$order: 'count DESC',
	};
}