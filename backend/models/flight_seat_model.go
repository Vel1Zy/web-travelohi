package model

type FlightSeat struct {
	ID               uint    `gorm:"primaryKey" json:"id"`
	FlightID         uint    `json:"flightID"`
	SeatCategoryName string  `json:"seatCategory"`
	Price            float64 `json:"price"`
	TotalSeat        uint    `json:"totalSeat"`
	SeatAvailable    uint    `json:"seatAvailable"`

	FlightCart []FlightCart `json:"flightCart" gorm:"foreignKey:FlightSeatID"`
}

// The Seat Category will be between 3 types: Economy, Business, First
