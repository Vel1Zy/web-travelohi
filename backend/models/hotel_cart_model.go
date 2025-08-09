package model

type HotelCart struct {
	ID           uint    `gorm:"primaryKey" json:"id"`
	UserID       uint    `json:"userID"`
	RoomID       uint    `json:"roomID"`
	TotalPrice   float64 `json:"totalPrice"`
	CheckInDate  string  `json:"checkInDate"`
	CheckOutDate string  `json:"checkOutDate"`
}
