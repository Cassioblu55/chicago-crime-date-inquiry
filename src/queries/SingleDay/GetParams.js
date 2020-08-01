import { MdViewDay } from "react-icons/md";

export function GetParams(year, month, day) {
	return {
		$select: 'date, count(date) as count',
		$where: `date_extract_y(date)=${year} AND date_extract_m(date)=${month} AND date_extract_d(date)=${day}`,
		$group: 'date',
		$limit: 500000,
	};
}