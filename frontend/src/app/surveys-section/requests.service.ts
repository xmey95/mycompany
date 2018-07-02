import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, interval } from "rxjs";
import { switchMap, map, share, filter } from "rxjs/operators";
import {
  SurveyCreationResponseType,
  MySurveyType,
  MySurveysResponseType,
  QuestionsResponseType,
  QuestionsType,
  SuccessResponseType,
  SurveyType,
  SurveysResponseType,
  VersionResponseType
} from "../interfaces";
import * as config from "../config.json";
import swal from "sweetalert";
import { UserService } from "../user.service";

/**
 * This service can be used for all the survey-related funtionality. It's methods sends propr requests to backend to get and update values in the database
 */
@Injectable()
export class RequestsSurveysService {
  private api: string; //api base url
  public all_surveys$: Observable<SurveyType[]>;
  private all_surveys_version = ""; //version code for all_surveys list
  public my_surveys$: Observable<MySurveyType[]>;
  private my_surveys_version = ""; //version code for my_surveys list
  /**
   *
   */
  constructor(
    private HttpClient: HttpClient,
    private UserService: UserService
  ) {
    this.api = (<any>config).api;

    //Observable to get the list of all surveys
    this.all_surveys$ = interval(2000).pipe(
      switchMap(() =>
        this.HttpClient.get<VersionResponseType>(
          this.api + "surveys/allsurveys/true",
          {
            headers: new HttpHeaders().set(
              "Authorization",
              "bearer " + this.UserService.get_token()
            ) //set authentication header with thoken got from UserService
          }
        )
      ), //this request gets version code
      filter((data: VersionResponseType) => {
        if (data.version === this.all_surveys_version) {
          return false; //stop stream for this iteration, value has not changed from last check
        }
        //data has changed, refresh version code
        this.all_surveys_version = data.version;
        return true;
      }),
      switchMap(() =>
        this.HttpClient.get<SurveysResponseType>(
          this.api + "surveys/allsurveys/false",
          {
            headers: new HttpHeaders().set(
              "Authorization",
              "bearer " + this.UserService.get_token()
            )
          }
        )
      ),
      map(data => {
        return data.surveys;
      }), //save new value (get just requests field from response)
      share()
    );

    //Observable to get the list of all surveys
    this.my_surveys$ = interval(2000).pipe(
      switchMap(() =>
        this.HttpClient.get<VersionResponseType>(
          this.api + "surveys/allsurveyssubmitted/true",
          {
            headers: new HttpHeaders().set(
              "Authorization",
              "bearer " + this.UserService.get_token()
            ) //set authentication header with thoken got from UserService
          }
        )
      ), //this request gets version code
      filter((data: VersionResponseType) => {
        if (data.version === this.my_surveys_version) {
          return false; //stop stream for this iteration, value has not changed from last check
        }
        //data has changed, refresh version code
        this.my_surveys_version = data.version;
        return true;
      }),
      switchMap(() =>
        this.HttpClient.get<MySurveysResponseType>(
          this.api + "surveys/allsurveyssubmitted/false",
          {
            headers: new HttpHeaders().set(
              "Authorization",
              "bearer " + this.UserService.get_token()
            )
          }
        )
      ),
      map(data => {
        return data.surveys;
      }), //save new value (get just requests field from response)
      share()
    );
  }

  deleteSurvey(survey: number) {
    var url = this.api + "surveys/surveys/" + survey;
    //http request to backend (with authorization header containing the token got from UserService)
    this.HttpClient.delete<SuccessResponseType>(url, {
      headers: new HttpHeaders().set(
        "Authorization",
        "bearer " + this.UserService.get_token()
      )
    }).subscribe(
      data => {
        if (!data.success) {
          console.log(data.error);
          return;
        }
        swal("Fatto!", "Sondaggio eliminato!", "success");
      },
      err => {
        swal("Oops!", "Errore durante l'operazione!", "error");
        console.log(err);
      }
    );
  }

  sendQuestions(survey: string, questions: any) {
    var url = this.api + "surveys/surveys/" + survey;
    //new request's data
    var post = {
      questions: JSON.stringify(questions)
    };
    //http request to backend (with authorization header containing the token got from UserService)
    this.HttpClient.post<SuccessResponseType>(url, post, {
      headers: new HttpHeaders().set(
        "Authorization",
        "bearer " + this.UserService.get_token()
      )
    }).subscribe(
      data => {
        if (!data.success) {
          console.log(data.error);
          return;
        }
      },
      err => {
        swal("Oops!", "Errore durante l'operazione!", "error");
        console.log(err);
      }
    );
  }

  modifyQuestion(question, parameters) {
    var url = this.api + "surveys//questions/" + question;
    //http request to backend (with authorization header containing the token got from UserService)
    this.HttpClient.put<SuccessResponseType>(url, parameters, {
      headers: new HttpHeaders().set(
        "Authorization",
        "bearer " + this.UserService.get_token()
      )
    }).subscribe(
      data => {
        if (!data.success) {
          console.log(data.error);
          return;
        }
      },
      err => {
        swal("Oops!", "Errore durante l'operazione!", "error");
        console.log(err);
      }
    );
  }

  deleteQuestion(question) {
    var url = this.api + "surveys//questions/" + question;
    //http request to backend (with authorization header containing the token got from UserService)
    this.HttpClient.delete<SuccessResponseType>(url, {
      headers: new HttpHeaders().set(
        "Authorization",
        "bearer " + this.UserService.get_token()
      )
    }).subscribe(
      data => {
        if (!data.success) {
          console.log(data.error);
          return;
        }
      },
      err => {
        swal("Oops!", "Errore durante l'operazione!", "error");
        console.log(err);
      }
    );
  }

  reset_all_surveys_version() {
    this.all_surveys_version = "";
  }

  reset_my_surveys_version() {
    this.my_surveys_version = "";
  }
}
