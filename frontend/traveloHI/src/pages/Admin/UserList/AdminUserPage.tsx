import React, { useState, useEffect } from "react";
import axios from "axios";
import FullPageContainer from "../../../template/FullPageContainer";
import AdminUserList from "./AdminUserList";
import {
  CreateButton,
  CreateButtonContainer,
} from "../../User/Component/Buttons";
import { PageTitle } from "../../User/Component/Forms";
import styled from "@emotion/styled";

const IC = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function AdminUserPage() {
  const [userList, setUserList] = useState<UserAdmin[]>([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUserList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  const handleSendEmail = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/send-email-subscription"
      );
      console.log(response);
      alert(response.data);
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("An error occurred while sending emails. Please try again later.");
    }
  };

  return (
    <FullPageContainer>
      <IC>
        <PageTitle>User List</PageTitle>
      </IC>
      <CreateButtonContainer>
        <CreateButton onClick={handleSendEmail}>
          Send Email to Subscribed Account
        </CreateButton>
      </CreateButtonContainer>
      <AdminUserList users={userList} />
    </FullPageContainer>
  );
}
