import { GetParams } from './GetParams';

//APIS
import {
	ChicagoCrimeDataApi,
	CRIMES_2001_TO_PRESENT,
} from '../../api/ChicagoCrimeDataApi';

export function CompleteDataSingleHour(
	year,
	month,
	day,
	hour,
	callOnSuccess,
	callOnError
) {
	if (
		year &&
		month &&
		day &&
		hour
	) {
		ChicagoCrimeDataApi()
			.get(CRIMES_2001_TO_PRESENT, {
				params: GetParams(year, month, day, hour),
			})
			.then(function (response) {
				callOnSuccess(getCrimeData(response.data));
			})
			.catch(function (error) {
				callOnError(error);
			});
	}
}

function getCrimeData(data){
	return data
		.map((row) => {
			return { ...row, minute: parseInt(row.date.substring(14,16)) };
		})
		.sort((a, b) => (a.minute < b.minute ? -1 : 1));;
}
