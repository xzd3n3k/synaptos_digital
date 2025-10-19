export interface ContactUsModel {
    email: string,
    phone: number | null,
    note: string,
    firstname: string,
    lastname: string,
    address: Address
}

export interface Address {
    street: string,
    houseNumber: number | null,
    city: string,
    postalCode: number | null,
    country: string,
}