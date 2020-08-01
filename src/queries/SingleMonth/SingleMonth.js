import { GetParams } from './GetParams';

//APIS
import {
	ChicagoCrimeDataApi,
	CRIMES_2001_TO_PRESENT,
} from '../../api/ChicagoCrimeDataApi';

import Moment from 'moment';

export function SingleMonth(year, month, callOnSuccess, callOnError) {
	if (year !== undefined && month !== undefined) {
		ChicagoCrimeDataApi()
			.get(CRIMES_2001_TO_PRESENT, {
				params: GetParams(year, month),
			})
			.then(function (response) {
				const groupedData = getCrimeData(response.data, year, month);
				callOnSuccess(groupedData);
			})
			.catch(function (error) {
				callOnError(error);
			});
	}
}

function getCrimeData(data, year, month) {
	let groupedData = {};
	data = data.map((row) => {
		return { ...row, date: row.date.substring(8, 10) };
	});
	for (let row of data) {
		let day = row.date;
		if (groupedData[day] !== undefined) {
			groupedData[day].amount = mapData(groupedData[day].amount, row.count);
		} else {
			groupedData[day] = {
				amount: mapData(0, row.count),
			};
		}
	}
	return Object.keys(groupedData)
		.map((day) => {
			return {
				dayNumber: parseInt(day),
				amount: groupedData[day].amount,
			};
		})
		.sort((a, b) => (a.dayNumber < b.dayNumber ? -1 : 1));
}

function mapData(currentCount, count) {
	return parseInt(count) + currentCount;
}
