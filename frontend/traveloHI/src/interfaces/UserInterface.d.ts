interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePictureURL: string;
    gender: string;
    address: string;
    birthDate: string;
    newsletterSubscription: boolean;
    phoneNumber:string;
    balance:number;
    
}

interface UserAdmin{
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    password: string;
    email: string;
    gender: string;
    phoneNumber: string;
    address: string;
    profilePictureUrl: string;
    personalSecurityQuestion: string;
    personalSecurityAnswer: string;
    createdAt: string;
    otp: string;
    otpCreatedAt: string;
    newsletterSubscription: boolean;
    isBanned: boolean;
    isLoggedIn: boolean;
}