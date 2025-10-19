import {
    Component,
    Input,
    forwardRef
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    Validator,
    NG_VALIDATORS,
    AbstractControl,
    ValidationErrors,
    FormControl
} from '@angular/forms';

@Component({
    selector: 'syd-form-control',
    template: `
    <label>
        Titulek
        <input
        [type]="type"
        [value]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        (input)="onInput($event)"
        (blur)="onTouched()"
        />
    </label>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormControlWrapper),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => FormControlWrapper),
            multi: true
        }
    ]
})
export class FormControlWrapper implements ControlValueAccessor, Validator {
    @Input() type: string = 'text';
    @Input() placeholder: string = '';
    @Input() control!: FormControl | null;

    value: string = '';
    disabled = false;

    onChange = (value: any) => { };
    onTouched = () => { };

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.onChange(this.value);
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (!this.value) return null;

        switch (this.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(this.value)
                    ? null
                    : { invalidEmail: true };

            case 'number':
                return isNaN(Number(this.value))
                    ? { invalidNumber: true }
                    : null;

            case 'password':
                return this.value.length < 6
                    ? { weakPassword: { minLength: 6 } }
                    : null;

            default:
                return null;
        }
    }
}