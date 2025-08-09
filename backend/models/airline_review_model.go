package model

type FlightReview struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	FlightID uint   `json:"flightId"`
	UserID   uint   `json:"userId"`
	Review   string `json:"review"`
	Rating   uint   `json:"rating"`
}
