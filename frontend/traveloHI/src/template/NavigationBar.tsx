import styled from "@emotion/styled";
import { useUser } from "../contexts/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { useEffect, useState } from "react";

const StyledNavBar = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-bottom: 1px solid #00a3e7;
  height: 90px;
  padding: 10px 20px;
  text-align: center;
  font-size: 1.2em;
  content-align: center;
  justify-content: center;
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: black; // Set text color to black
  background-color: transparent;
  border-radius: 5px;
  padding: 10px 20px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const LogoLink = styled(Link)`
  height: 100%;
  max-width: 10rem;
`;

const MenuSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const LogoImage = styled.img`
  height: 100%;
  width: 100%;
`;

const StyledLogOutButton = styled.button`
  padding: 10px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f44336;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const MidMenuContainer = styled.div`
  height: 70%;
  display: flex;
  gap: 10px;
`;

const Top = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bottom = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  height: 20%;
  display: flex;
  border-bottom: 1px solid #00a3e7;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ProfileContainer = styled.div`
  height: auto;
  width: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  &:hover {
    background-color: lightgray;
  }
`;

const ProfileBorder = styled.img`
  width: 38px;
  height: 38px;
  border: 2px solid black;
  border-radius: 100%;
  display: block;
`;

export const CartLogo = styled.div`
  height: auto;
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  &:hover {
    background-color: lightgray;
  }
`;

export const CurrencyLogo = styled.div`
  height: auto;
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  &:hover {
    background-color: lightgray;
  }
`;

const FlagBorder = styled.img`
  width: 32px;
  height: 32px;
  border: 2px solid black;
  border-radius: 100%;
  display: block;
`;

const PaymentContainer = styled.div`
  height: auto;
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  &:hover {
    background-color: lightgray;
  }
`;

const PaymentMenu = styled.div`
  position: absolute;
  top: 100px; /* Adjust this value according to your NavBar height */
  right: 150px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  z-index: 9999;
`;

const Text = styled.p`
  margin-left: 5px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const SearchBarDiv = styled.div`
  height: 90%;
  margin-left: 10px;
`;

const SearchBar = styled.input`
  border: 1px solid lightgray;
  border-radius: 4px;
  outline: none;
  width: 20vw;
  height: 100%;

  &:focus {
    border-color: blue;
    box-shadow: 0 0 3px blue;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998; // buat nutup 1 layar tanpa nutup PaymentDropDown
`;

const H_Break = styled.div`
  height: 36px;
  width: 2px;
  background-color: #00a3e7;
  margin: 0 15px;
`;

const pathToLogo = "/TraveloHI.png";
const pathToGuestLogo = "guest_profile_pic.png";

export default function NavigationBar() {
  const { user, updateUserData, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    updateUserData();
  }, []);

  const logoutHandler = async () => {
    try {
      // send request to the backend to clear the JWT token cookie
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    navigate("/login");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const togglePaymentMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <StyledNavBar>
        <Top>
          <MidMenuContainer>
            <LogoLink to="/home">
              <LogoImage src={pathToLogo} alt="TraveloHI Logo" />
            </LogoLink>
            <SearchBarContainer>
              <FaSearch size={30} />
              <SearchBarDiv>
                <SearchBar placeholder="Search" />
              </SearchBarDiv>
            </SearchBarContainer>
            <CartLogo onClick={() => navigate("/user/cart")}>
              <IoMdCart size={35} />
              Cart
            </CartLogo>
            <CurrencyLogo>
              <FlagBorder src="currency_indo.png" />
              <Text>IDR</Text>
            </CurrencyLogo>
            <PaymentContainer onClick={togglePaymentMenu}>
              <FaRegCreditCard size={35} />
              <Text>Card</Text>
            </PaymentContainer>
            {isMenuOpen && (
              <PaymentMenu>
                <div>Wallet</div>
                <div>Card</div>
              </PaymentMenu>
            )}
            {isMenuOpen && <Overlay onClick={togglePaymentMenu}></Overlay>}
            <ProfileContainer
              onClick={() => {
                if (user) {
                  navigate("/profile-page/" + user?.id);
                } else {
                  navigate("/login");
                }
              }}
            >
              <ProfileBorder
                src={user ? user?.profilePictureURL : pathToGuestLogo}
              />
              <Text>{user ? user?.firstName : "Guest"}</Text>
            </ProfileContainer>
          </MidMenuContainer>
          {user && (
            <StyledLogOutButton onClick={logoutHandler}>
              Log Out
            </StyledLogOutButton>
          )}
        </Top>
      </StyledNavBar>
      {user && (
        <Bottom>
          {Number(user?.id) === 1 ? (
            <MenuSection>
              <H_Break />
              <StyledLink to="/admin/hotel">HotelList</StyledLink> <H_Break />
              <StyledLink to="/admin/airline">AirlineList</StyledLink>
              <H_Break />
              <StyledLink to="/admin/promo">PromoList</StyledLink> <H_Break />
              <StyledLink to="/admin/users">UserList</StyledLink> <H_Break />
              <H_Break />
              <StyledLink to="/home">Home</StyledLink> <H_Break />
              <StyledLink to="/flight">Flight</StyledLink> <H_Break />
              <StyledLink to="/hotel-routing">Hotel</StyledLink> <H_Break />
            </MenuSection>
          ) : (
            <MenuSection>
              <H_Break />
              <StyledLink to="/home">Home</StyledLink> <H_Break />
              <StyledLink to="/flight">Flight</StyledLink> <H_Break />
              <StyledLink to="/hotel">Hotel</StyledLink> <H_Break />
            </MenuSection>
          )}
        </Bottom>
      )}
    </>
  );
}
