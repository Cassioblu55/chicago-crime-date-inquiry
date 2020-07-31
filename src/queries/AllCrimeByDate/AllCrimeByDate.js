import { GetParams } from './GetParams';

//APIS
import {
	ChicagoCrimeDataApi,
	CRIMES_2001_TO_PRESENT,
} from '../../api/ChicagoCrimeDataApi';

export function AllCrimeByDate(callOnSuccess, callOnError) {
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
	for (let row of data) {
		const type = row.date.substring(5, 10);
		if (groupedData[type] !== undefined) {
			groupedData[type] = groupedData[type] + parseInt(row.count);
		} else {
			groupedData[type] = parseInt(row.count);
		}
	}

	return Object.keys(groupedData).map(key => {
		return { amount: groupedData[key], date: key};
	});
}
