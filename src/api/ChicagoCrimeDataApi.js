import axios from 'axios';

 const CRIMES_2001_TO_PRESENT = 'ijzp-q8t2.json';

function ChicagoCrimeDataApi() {
	return axios.create({
		baseURL: `https://data.cityofchicago.org/resource`,
	});
} 
    

export { ChicagoCrimeDataApi, CRIMES_2001_TO_PRESENT };
