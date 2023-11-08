import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const gatewayUrl = 'https://tns1xueqq9.execute-api.us-east-1.amazonaws.com/default';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) { }

	getRecentData() {
		const accessToken = localStorage.getItem('accessToken');
		return this.http.get(gatewayUrl + '/getRecentStreamedRunnerData', { params: { tenMinuteIncrementsInPast: 3 }, headers: { Authorization: `Bearer ${accessToken}`}});
	}

}
