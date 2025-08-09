import styled from "@emotion/styled";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { storage } from "../../firebaseConfig.ts";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { ReCAPTCHA } from "react-google-recaptcha";

type UserFormData = {
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  email: string | undefined;
  gender: string | undefined;
  password: string | undefined;
  personalSecurityQuestion: string | undefined;
  personalSecurityAnswer: string | undefined;
  profilePictureUrl: string | undefined;
  newsletterSubscription: boolean;
  isBanned: boolean;
};

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const RegisterLabel = styled.label`
  font-size: 3em;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 30px;
  border: 2px solid black;
  text-align: center;
  margin: 70px 1px;
  gap: 10px;
  border-radius: 20px;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #00a3e7;
  color: white;
  cursor: pointer;
`;

const StyledSelect = styled.select`
  background-color: "lightgrey";
  color: black;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const RegisterPage: React.FC = () => {
  const [c, setc] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    gender: "",
    password: "",
    personalSecurityQuestion: "What is your favorite childhood pet's name?",
    personalSecurityAnswer: "",
    profilePictureUrl: "",
    newsletterSubscription: false,
    isBanned: false,
  });

  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    const name = target.name;

    const selectValue =
      target.tagName.toLowerCase() === "select" ? target.value : value;

    setFormData({
      ...formData,
      [name]: selectValue,
    });
  };
  const handlePictureChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target;
    if (target.type === "file") {
      const file = (target as HTMLInputElement).files?.[0] || null;
      setProfilePictureFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    if (!c) {
      alert("capca brok");
      return;
    }
    event.preventDefault();
    const submitData = {
      ...formData,
      isBanned: false,
      otp: "000000",
      otpCreatedAt: new Date(),
      isLoggedIn: false,
    };
    console.log("Form Submission:", submitData);

    try {
      if (profilePictureFile) {
        const fileRef = ref(storage, `images/${profilePictureFile.name}`);
        await uploadBytes(fileRef, profilePictureFile);
        formData.profilePictureUrl = await getDownloadURL(fileRef);
        console.log("Profile Picture URL:", formData.profilePictureUrl);
      }

      const response = await axios.post(
        "http://localhost:8080/create-user",
        submitData
      );
      console.log("Response:", response);
      if (response.status === 201) {
        alert("User Created Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // === Security Questions ===

  const securityQuestions = [
    "What is your favorite childhood pet's name?",
    "In which city were you born?",
    "What is the name of your favorite book or movie?",
    "What is the name of the elementary school you attended?",
    "What is the model of your first car?",
  ];

  function handleCaptchaChange(s: string | null) {
    if (s) setc(true);
    else setc(false);
  }

  return (
    <OuterContainer>
      <StyledForm onSubmit={handleSubmit}>
        <RegisterLabel>Register</RegisterLabel>
        {imagePreviewUrl && <img src={imagePreviewUrl} alt="Profile Preview" />}
        <StyledInput
          type="File"
          name="profilePictureUrl"
          onChange={handlePictureChange}
          placeholder="Profile Picture File"
        />
        <StyledInput
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <StyledInput
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <StyledInput
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <StyledInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <StyledInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <StyledSelect
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </StyledSelect>
        <StyledSelect
          id="security-question"
          name="personalSecurityQuestion"
          value={formData.personalSecurityQuestion}
          onChange={handleChange}
        >
          {securityQuestions.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </StyledSelect>
        <StyledInput
          type="text"
          name="personalSecurityAnswer"
          value={formData.personalSecurityAnswer}
          onChange={handleChange}
          placeholder="Answer to Personal Security Question"
        />
        <label>
          Subscribe to Newsletter:
          <input
            type="checkbox"
            name="newsletterSubscription"
            checked={formData.newsletterSubscription}
            onChange={handleChange}
          />
        </label>
        <ReCAPTCHA
          sitekey="6LfqzYopAAAAAJCpqFBZHjf_1F0HXZ-osYedJqHJ" // Replace with your reCAPTCHA site key
          onChange={handleCaptchaChange}
        />
        <StyledButton type="submit">Submit</StyledButton>

        <p>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </StyledForm>
    </OuterContainer>
  );
};

export default RegisterPage;
