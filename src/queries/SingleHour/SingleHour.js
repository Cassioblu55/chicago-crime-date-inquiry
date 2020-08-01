import { GetParams } from './GetParams';

//APIS
import {
	ChicagoCrimeDataApi,
	CRIMES_2001_TO_PRESENT,
} from '../../api/ChicagoCrimeDataApi';

export function SingleHour(year, month, day, hour, callOnSuccess, callOnError) {
	if (year !== undefined && month !== undefined && day !== undefined && hour !== undefined) {
		ChicagoCrimeDataApi()
			.get(CRIMES_2001_TO_PRESENT, {
				params: GetParams(year, month, day, hour),
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
	for (let row of data) {
		const type = row.primary_type;
		groupedData[type] = parseInt(row.count);
	}
	return groupedData;
}
