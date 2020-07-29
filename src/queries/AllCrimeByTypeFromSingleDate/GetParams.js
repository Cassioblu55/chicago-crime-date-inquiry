import Moment from 'moment';
import { extendMoment } from 'moment-range';

const QUERY_BASE = 'SELECT id, primary_type WHERE date in(';
const QUERY_TERMINATOR = ")"

export function GetParams(date) {
	return {
		$query: getAllYearsQuery(date),
	};
}

function getAllYearsQuery(date){
	return QUERY_BASE + getAllYearsList(date) + QUERY_TERMINATOR;
}

function getAllYearsList(date){
	return getAllYearsFromPresentTo2001().map(year =>{
		return getYear(date, year);
	})
}

function getYear(date, year){
	return `'${year}-${date.getMonth()+1}-${date.getDate()}'`;
}

function getAllYearsFromPresentTo2001(){
	let yearCounter = new Date().getFullYear();
	const allYearsFromPresentTo2001 = [];
	while (yearCounter > 2000){
		allYearsFromPresentTo2001.push(yearCounter);
		yearCounter--;
	}
	return allYearsFromPresentTo2001;
}
