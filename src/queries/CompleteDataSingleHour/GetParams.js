export function GetParams(year, month, day, hour) {
	return {
		$where: `date_extract_y(date)=${year} AND date_extract_m(date)=${month} AND date_extract_d(date)=${day} AND date_extract_hh(date)=${hour}`,
	};
}
