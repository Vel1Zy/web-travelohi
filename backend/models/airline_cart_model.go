package model

type FlightCart struct {
	ID           uint    `gorm:"primaryKey" json:"id"`
	UserID       uint    `json:"userID"`
	FlightSeatID uint    `json:"flightSeatID"`
	TotalPrice   float64 `json:"totalPrice"`
	TotalSeats   int     `json:"totalSeats"`
}
