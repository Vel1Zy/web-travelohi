package model

type Hotel struct {
	ID               uint   `gorm:"primaryKey" json:"id"`
	HotelName        string `json:"hotelName"`
	HotelPictureURL  string `json:"hotelPictureUrl"`
	HotelAddress     string `json:"hotelAddress"`
	HotelDescription string `json:"hotelDescription"`
	HotelStar        int    `json:"hotelStar,string"`
	CreatedAt        string `json:"createdAt"`

	HotelRoom   []HotelRoom   `gorm:"foreignKey:HotelID" json:"hotelRoom"`
	HotelReview []HotelReview `gorm:"foreignKey:HotelID" json:"hotelReview"`
}
