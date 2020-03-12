export interface IValidator {
    validate(value: any): boolean
}

export class LengthValidator implements IValidator {
    minLength: number
    maxLength: number

    constructor(minLength: number, maxLength: number) {
        this.minLength = minLength
        this.maxLength = maxLength
    }

    validate (value: string) {
        if (this.minLength && value.length < this.minLength) {
            return false;
        }

        if (this.maxLength && value.length > this.maxLength) {
            return false;
        }
        return true
    }
}

export class EmailValidator implements IValidator {
    validate (email: string) {
        return email.includes('@') && email.includes('.');
    }
}

