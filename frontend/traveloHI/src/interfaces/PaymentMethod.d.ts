export interface PaymentMethod{
    id: number;
    userID: number;
    cardNumber: string;
    cardHolderName: string;
    cardExpiredDate: string;
    cvv: string;
    bankName: string;
}