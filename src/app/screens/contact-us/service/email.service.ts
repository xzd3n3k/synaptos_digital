import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ContactUsModel } from "../model/contactUs";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EmailService {

    private httpClient = inject(HttpClient);

    private apiEndpoint = 'http://localhost:3000'

    sendEmail(email: ContactUsModel): Observable<boolean> {
        return this.httpClient.post<boolean>(this.apiEndpoint + '/send-email', email);
    }
}