export function GetParams(date) {
	return {
		$select: 'primary_type, count(primary_type) as count',
		$where: `date_extract_m(date)=${
			date.getMonth() + 1
		} AND date_extract_d(date)=${date.getDate()}`,
		$group: 'primary_type',
		$order: 'count DESC',
	};
}
