import { GetParams } from './GetParams';

//APIS
import {
	ChicagoCrimeDataApi,
	CRIMES_2001_TO_PRESENT,
} from '../../api/ChicagoCrimeDataApi';

export function AllCrimeByTypeFromSingleDate(date, callOnSuccess, callOnError) {
	
	ChicagoCrimeDataApi()
	.get(CRIMES_2001_TO_PRESENT, {
		params: GetParams(date),
	})
	.then(function (response) {
			const groupedData = groupCrimeByType(response.data);
			callOnSuccess(groupedData);
		})
		.catch(function (error) {
			callOnError(error);
		});
}

function groupCrimeByType(data) {
	let groupedData = {};
	for (let row of data) {
		const type = row.primary_type;
		if (groupedData[type] !== undefined) {
			groupedData[type] = groupedData[type]+1;
		} else {
			groupedData[type] = 1;
		}
	}
	return groupedData;
}
