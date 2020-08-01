import { GetParams } from './GetParams';

//APIS
import {
	ChicagoCrimeDataApi,
	CRIMES_2001_TO_PRESENT,
} from '../../api/ChicagoCrimeDataApi';

import Moment from 'moment';

export function SingleYear(year, callOnSuccess, callOnError) {
	if (year !== undefined) {
		ChicagoCrimeDataApi()
			.get(CRIMES_2001_TO_PRESENT, {
				params: GetParams(year),
			})
			.then(function (response) {
				const groupedData = getCrimeData(response.data);
				callOnSuccess(groupedData);
			})
			.catch(function (error) {
				callOnError(error);
			});
	}
}

function getCrimeData(data) {
	let groupedData = {};
	data = data.map((row) => {
		return { ...row, date: row.date.substring(5, 7) };
	});
	for (let row of data) {
		let month = row.date;
		if (groupedData[month] !== undefined) {
			groupedData[month].amount = mapData(groupedData[month].amount, row.count);
		} else {
			groupedData[month] = {
				amount: mapData(0, row.count),
			};
		}
	}
	return Object.keys(groupedData)
		.map((month) => {
			return {
				id: Moment(month, 'MM').format('MMM'),
				monthNumber: month,
				amount: groupedData[month].amount,
			};
		})
		.sort((a, b) => (a.monthNumber < b.monthNumber ? -1 : 1));
}

function mapData(currentCount, count) {
	return parseInt(count) + currentCount;
}
