import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ContactUsModel } from './model/contactUs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from "@ngx-translate/core";
import { EmailService } from './service/email.service';
import { take } from 'rxjs';

@Component({
    selector: 'syd-contact-us',
    imports: [ReactiveFormsModule, TranslatePipe],
    templateUrl: 'contact-us.html',
    styleUrl: 'contact-us.scss'
})
export class ContactUs {

    private emailService = inject(EmailService);

    sended: WritableSignal<boolean> = signal(false);

    formGroup: FormGroup;

    personDefault: ContactUsModel = {
        firstname: '',
        lastname: '',
        email: '',
        phone: null,
        note: '',
        address: {
            street: '',
            houseNumber: null,
            city: '',
            postalCode: null,
            country: '',
        }
    }

    constructor() {
        this.formGroup = new FormGroup({
            email: new FormControl<string>('', Validators.required),
            phone: new FormControl<number | null>(null),
            note: new FormControl<string>(''),
            firstname: new FormControl<string>('', Validators.required),
            lastname: new FormControl<string>('', Validators.required),
            address: new FormGroup({
                street: new FormControl<string>(this.personDefault.address.street),
                houseNumber: new FormControl<number | null>(this.personDefault.address.houseNumber),
                city: new FormControl<string>(this.personDefault.address.city),
                postalCode: new FormControl<number | null>(this.personDefault.address.postalCode),
                country: new FormControl<string>(this.personDefault.address.country)
            })
        })
    }


    onSubmit(): void {
        this.emailService.sendEmail(this.formGroup.value).pipe(
            take(1)
        ).subscribe(send => {
            this.sended.set(send);
        });
    }
}