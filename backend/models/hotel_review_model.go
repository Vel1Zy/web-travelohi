package model

type HotelReview struct {
	ID      uint   `gorm:"primaryKey" json:"id"`
	HotelID uint   `json:"hotelId"`
	UserID  uint   `json:"userId"`
	Review  string `json:"review"`
	Rating  uint   `json:"rating"`
}
