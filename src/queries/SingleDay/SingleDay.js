import { GetParams } from './GetParams';

//APIS
import {
	ChicagoCrimeDataApi,
	CRIMES_2001_TO_PRESENT,
} from '../../api/ChicagoCrimeDataApi';

export function SingleDay(year, month, day, callOnSuccess, callOnError) {
	if (year !== undefined && month !== undefined && day !== undefined) {
		ChicagoCrimeDataApi()
			.get(CRIMES_2001_TO_PRESENT, {
				params: GetParams(year, month, day),
			})
			.then(function (response) {
				const groupedData = getCrimeData(response.data, year, month, day);
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
		return { amount: parseInt(row.count), time: new Date(row.date).getHours() };
	});
	for (let row of data) {
		let time = row.time;
		if (groupedData[time] !== undefined) {
			groupedData[time].amount = groupedData[time].amount + row.amount;
		} else {
			groupedData[time] = {
				amount: row.amount,
			};
		}
	}
	return Object.keys(groupedData)
		.map((time) => {
			return {
				time: parseInt(time),
				amount: groupedData[time].amount,
			};
		})
		.sort((a, b) => (a.time < b.time ? -1 : 1));
}
