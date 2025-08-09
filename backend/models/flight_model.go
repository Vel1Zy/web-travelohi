package model

type Flight struct {
	ID                      uint   `gorm:"primaryKey" json:"id"`
	AirlineID               uint   `json:"airlineID"`
	FlightName              string `json:"flightName"`
	AirplaneCode            string `json:"airplaneCode"`
	FlightDescription       string `json:"flightDescription"`
	FlightPrice             string `json:"flightPrice"`
	FlightDuration          string `json:"flightDuration"`
	FlightDepartureLocation string `json:"flightDepartureLocation"`
	FlightArrivalLocation   string `json:"flightArrivalLocation"`
	FlightDepartureTime     string `json:"flightDepartureTime"`
	FlightArrivalTime       string `json:"flightArrivalTime"`

	FLightSeats []FlightSeat `json:"flightSeats" gorm:"foreignKey:FlightID"`
}
