package model

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	ID                       uint      `gorm:"primaryKey" json:"id"`
	FirstName                string    `json:"firstName"`
	LastName                 string    `json:"lastName"`
	DateOfBirth              string    `json:"dateOfBirth"`
	Password                 string    `json:"password"`
	Email                    string    `gorm:"unique" json:"email"`
	Gender                   string    `json:"gender"`
	PhoneNumber              string    `json:"phoneNumber"`
	Address                  string    `json:"address"`
	ProfilePictureURL        string    `json:"profilePictureUrl"`
	PersonalSecurityQuestion string    `json:"personalSecurityQuestion"`
	PersonalSecurityAnswer   string    `json:"personalSecurityAnswer"`
	CreatedAt                time.Time `json:"createdAt"`
	OTP                      string    `json:"otp"`
	OTPCreatedAt             time.Time `json:"otpCreatedAt"`
	NewsletterSubscription   bool      `json:"newsletterSubscription"`
	Balance                  int64     `json:"balance"`
	IsBanned                 bool      `json:"isBanned"`
	IsLoggedIn               bool      `json:"isLoggedIn"`

	PaymentMethod []PaymentMethod `gorm:"foreignKey:UserID" json:"paymentMethod"`
	HotelCart     []HotelCart     `gorm:"foreignKey:UserID" json:"hotelCart"`
	AirlineCart   []FlightCart    `gorm:"foreignKey:UserID" json:"airlineCart"`
	CartHistory   []CartHistory   `gorm:"foreignKey:UserID" json:"cartHistory"`
}

// ini buat hash password, trus return hashed passwordnya
func (u *User) SetPassword(password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

func CreateNewUser(db *gorm.DB, user *User) error {
	//panggil function buat hash password
	if err := user.SetPassword(user.Password); err != nil {
		return err
	}

	// save ke db
	result := db.Create(user)
	return result.Error
}
