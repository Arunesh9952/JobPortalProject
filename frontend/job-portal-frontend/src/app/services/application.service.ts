import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
providedIn:'root'
})

export class ApplicationService{

api="http://localhost:5226/api/applications";

constructor(private http:HttpClient){}

apply(jobId:number){

return this.http.post(this.api + "/apply/" + jobId,{});

}

}