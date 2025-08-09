import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserProvider";
import axios from "axios";
import { PaymentMethod } from "../../../interfaces/PaymentMethod";
import { getJWTFromCookie } from "../../../contexts/Utilities";
import PaymentMethodsCard from "./PaymentMethodsCard";

interface FormData {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  gender: string | undefined;
  profilePictureURL: string | undefined;
  phoneNumber: string | undefined;
  address: string | undefined;
  newsletterSubscription: boolean | undefined;
}

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 5vh 0;
  max-width: 100vw;
`;

const I_Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 90%vw;
  gap: 0.5vw;
`;

// === ProfileInfoContainer ===

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  border-radius: 10px;
  border: 2px solid black;
  margin: 3vh 0;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px 5px 10px rgba(0, 0, 0, 0.1);
`;

const ProfileInfoI_Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  max-width: 100vw;
  margin: 3vh 3vw;
  gap: 1.5vh;
`;

const TopTitle = styled.div`
  border-bottom: 2px solid black;
  width: 100%;
`;

const TopTitleText = styled.h2`
  margin: 1vw 3vw;
`;

// === PROFILE PICTURE PART ===

const ProfilePictureContainer = styled.div`
  width: 10vw;
  height: 10vw;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid black;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px 5px 10px rgba(0, 0, 0, 0.1);
`;

const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// ============================

const ProfileUsername = styled.p`
  font-size: 1.5vw;
  font-weight: bold;
`;

const ProfileFormUpdate = styled.form`
  width: 100%;
`;

const TextField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

const NewsletterSubscriptionContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2vw;
`;

const N_S_CheckBox = styled.input``;

const UpdateButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #00a3e7;
  color: white;
  cursor: pointer;
  font-size: 16px;
`;

// === PAYMENT METHOD ===

const PaymentMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  border-radius: 10px;
  border: 2px solid black;
  margin: 3vh 0;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px 5px 10px rgba(0, 0, 0, 0.1);
`;

export default function ProfilePage() {
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    gender: user?.gender,
    profilePictureURL: user?.profilePictureURL,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
    newsletterSubscription: user?.newsletterSubscription,
  });
  const [userID, setUserID] = useState<string | undefined>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[]>([]);
  const fetchPaymentMethod = async () => {
    const token = getJWTFromCookie();
    try {
      const response = await axios.get("http://localhost:8080/current-user", {
        headers: {
          Authorization: `Bearer ${token}`, //masukin token kedalam authorization header
        },
        withCredentials: true,
      });
      const data = response.data;
      const I_PaymentMethod = data.paymentMethod;
      setPaymentMethod(I_PaymentMethod);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchPaymentMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(paymentMethod);
  }, [paymentMethod]);

  useEffect(() => {
    setFormData({
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      gender: user?.gender,
      profilePictureURL: user?.profilePictureURL,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      newsletterSubscription: user?.newsletterSubscription,
    });
    setUserID(user?.userID);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    console.log(formData);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.patch(
        "http://localhost:8080/update-user/" + userID,
        formData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ProfilePageContainer>
      <I_Container>
        <ProfilePictureContainer>
          <ProfilePicture src={user?.profilePictureURL} />
        </ProfilePictureContainer>
        <h1>Profile Page</h1>
        <p>Under Construction</p>
        <ProfileInfoContainer>
          <TopTitle>
            <TopTitleText>Profile Info</TopTitleText>
          </TopTitle>
          <ProfileFormUpdate onSubmit={handleSubmit}>
            <ProfileInfoI_Container>
              <ProfileUsername>First Name</ProfileUsername>
              <TextField
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
              />
              <ProfileUsername>Last Name</ProfileUsername>
              <TextField
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
              />
              <ProfileUsername>Email</ProfileUsername>
              <TextField
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
              <ProfileUsername>PhoneNumber</ProfileUsername>
              <TextField
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
              />
              <ProfileUsername>Address</ProfileUsername>
              <TextField
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
              <NewsletterSubscriptionContainer>
                <ProfileUsername>Newsletter Subscription</ProfileUsername>
                <N_S_CheckBox
                  type="checkbox"
                  name="newsletterSubscription"
                  checked={formData.newsletterSubscription || false}
                  onChange={handleChange}
                />
              </NewsletterSubscriptionContainer>
              <UpdateButton type="submit">Update Profile</UpdateButton>
            </ProfileInfoI_Container>
          </ProfileFormUpdate>
        </ProfileInfoContainer>
        <PaymentMethodContainer>
          <TopTitle>
            <TopTitleText>Payment Method</TopTitleText>
          </TopTitle>

          <PaymentMethodsCard paymentMethods={paymentMethod} />
        </PaymentMethodContainer>
      </I_Container>
    </ProfilePageContainer>
  );
}
