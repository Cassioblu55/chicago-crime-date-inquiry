import { GetParams } from './GetParams';

//APIS
import {
	ChicagoCrimeDataApi,
	CRIMES_2001_TO_PRESENT,
} from '../../api/ChicagoCrimeDataApi';

export function AllCrimeByMonth(callOnSuccess, callOnError) {
	ChicagoCrimeDataApi()
		.get(CRIMES_2001_TO_PRESENT, {
			params: GetParams(),
		})
		.then(function (response) {
			const groupedData = groupCrimeByDate(response.data);
			callOnSuccess(groupedData);
		})
		.catch(function (error) {
			callOnError(error);
		});
}

function groupCrimeByDate(data) {
	let groupedData = {};
	data = data.map((row) => {
		return { ...row, date: row.date.substring(0, 7) };
	});
	for (let day of data) {
		let year = day.date.substring(0, 4);
		let month = day.date.substring(5, 7);
		if (groupedData[year] !== undefined) {
			let data = groupedData[year].data;
			data.push(mapMonth(month, day.count));
			groupedData[year].data = data;
		} else {
			groupedData[year] = {
				data: [mapMonth(month, day.count)],
			};
		}
	}
	return Object.keys(groupedData).map((year) => {
		return { id: year, data: groupedData[year].data };
	});
}

function mapMonth(month, count) {
	return { month: parseInt(month), amount: parseInt(count) };
}
