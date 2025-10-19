export interface PersonData {
    name: string,
    surname: string,
    address: Address
}

export interface Address {
    street: string,
    houseNumber: number | null,
    city: string,
    postalCode: number | null,
    country: string,
}