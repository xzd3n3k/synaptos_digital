import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ContactUsModel } from './model/contactUs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from "@ngx-translate/core";
import { EmailService } from './service/email.service';
import { finalize, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
    selector: 'syd-contact-us',
    imports: [ReactiveFormsModule, TranslatePipe],
    templateUrl: 'contact-us.html',
    styleUrl: 'contact-us.scss'
})
export class ContactUs {

    private emailService = inject(EmailService);

    sended: WritableSignal<boolean> = signal(false);
    loading: WritableSignal<boolean> = signal(false);

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
            phone: new FormControl<number | null>(null, Validators.required),
            note: new FormControl<string>('', Validators.required),
            firstname: new FormControl<string>('', Validators.required),
            lastname: new FormControl<string>('', Validators.required),
            address: new FormGroup({
                street: new FormControl<string>(this.personDefault.address.street, Validators.required),
                houseNumber: new FormControl<number | null>(this.personDefault.address.houseNumber, Validators.required),
                city: new FormControl<string>(this.personDefault.address.city, Validators.required),
                postalCode: new FormControl<number | null>(this.personDefault.address.postalCode, Validators.required),
                country: new FormControl<string>(this.personDefault.address.country, Validators.required)
            })
        })
    }


    onSubmit(): void {
        this.sended.set(false);
        if (!this.formGroup.invalid && this.formGroup.errors === null) {
            this.loading.set(true);
            this.emailService.sendEmail(this.formGroup.value).pipe(
                take(1),
                finalize(() => this.loading.set(false))
            ).subscribe(send => {
                this.sended.set(send);
            });
        }
    }
}