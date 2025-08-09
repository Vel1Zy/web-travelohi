export interface Airline {
    id: number;
    airlineName: string;
    airlinePictureURL: string;
    flights: Flight[];
  }

  export interface Flight {
    id: number;
    airlineID: number;
    flightName: string;
    airplaneCode: string;
    flightDescription: string;
    flightPrice: number;
    flightDuration: string;
    flightDepartureLocation: string;
    flightArrivalLocation: string;
    flightDepartureTime: string;
    flightArrivalTime: string;
    flightSeats: FlightSeat[];
  }

  export interface FlightSeat {
    id: number;
    flightID: number;
    seatCategoryName: string;
    price: number;
    totalSeat: number;
    seatAvailable: number;
    flightCart: FlightCart[];
  }
  