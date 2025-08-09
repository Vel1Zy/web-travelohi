package model

type Airline struct {
	ID                uint   `gorm:"primaryKey" json:"id"`
	AirlineName       string `json:"airlineName"`
	AirlinePictureURL string `json:"airlinePictureURL"`

	Flights []Flight `json:"flights" gorm:"foreignKey:AirlineID"`
}
