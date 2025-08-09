package model

type HotelRoom struct {
	ID             uint   `gorm:"primaryKey" json:"id"`
	HotelID        uint   `json:"hotelId,string"`
	RoomName       string `json:"roomName"`
	Price          string `json:"price"`
	RoomPictureURL string `json:"roomPictureUrl"`
	HasBreakfast   bool   `json:"hasBreakfast"`
	HasWifi        bool   `json:"hasWifi"`
	HasShower      bool   `json:"hasShower"`
	HasFreeWater   bool   `json:"hasFreeWater"`
	HasAC          bool   `json:"hasAC"`
	TotalRoom      uint   `json:"totalRoom"`
	AvailableRoom  uint   `json:"availableRoom"`

	CreatedAt string `json:"createdAt"`
}
