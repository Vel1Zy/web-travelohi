package model

type PaymentMethod struct {
	ID              uint   `gorm:"primaryKey" json:"id"`
	UserID          uint   `json:"userID"`
	CardNumber      string `json:"cardNumber"`
	CardHolderName  string `json:"cardHolderName"`
	CardExpiredDate string `json:"cardExpiredDate"`
	CVV             string `json:"cvv"`
	BankName        string `json:"bankName"`

	User User `gorm:"foreignKey:UserID"`
}
