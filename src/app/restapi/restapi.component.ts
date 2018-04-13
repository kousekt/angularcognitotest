import { Component, OnInit } from '@angular/core';
import { AuthorizationService} from "../shared/authorization.service";
import {Http, Headers} from "@angular/http";

export class PersonWithCars {
  constructor(public name: string, public age: number) { }  
}

@Component({
  selector: 'app-restapi',
  templateUrl: './restapi.component.html',
  styleUrls: ['./restapi.component.css']
})
export class RestApiComponent implements OnInit {

  _data : any;

  constructor(private http: Http, private auth: AuthorizationService) { }

  ngOnInit() {
    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
      return;
    }
    authenticatedUser.getSession( (err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      const token = session.getIdToken().getJwtToken();      
      const headers = new Headers();
      headers.append('Authorization', token);      
      var that = this;
      this.auth.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log(err);
          return;
        }
        const token = session.getIdToken().getJwtToken();        
        const headers = new Headers();
        headers.append('Authorization', token);        
        this.http.get('put your api gateway endpoint here', { headers: headers })
          .subscribe(
          response => {           
            that._data = response.json();
          },
          error => {
            console.log(error);
          }
        );
      });
    });
  }

}
