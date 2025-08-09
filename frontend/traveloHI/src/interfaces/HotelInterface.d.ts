interface Hotel {
    id: number;
    hotelName: string;
    hotelPictureUrl: string;
    hotelAddress: string;
    hotelDescription: string;
    hotelStar: number;
    createdAt: string;
    hotelRoom: HotelRoom[];
}
interface HotelRoom {
    id: number;
    hotelId: string;
    roomName: string;
    price: string;
    roomPictureUrl: string;
    hasBreakfast: boolean;
    hasWifi: boolean;
    hasShower: boolean;
    hasFreeWater: boolean;
    hasAC: boolean;
    totalRoom: number;
    availableRoom: number;
    createdAt: string;
}




export {Hotel, HotelRoom}