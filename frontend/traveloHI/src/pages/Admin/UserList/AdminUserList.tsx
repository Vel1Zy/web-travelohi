import React from "react";
import { BanUserButton } from "../../User/Component/Buttons";
import axios from "axios";
import {
  CardListContainer,
  Card,
  UserInfo,
  Field,
  Label,
  Value,
  BanButtonContainer,
} from "../../User/Component/BasicList";

interface Props {
  users: UserAdmin[];
}

const AdminUserList: React.FC<Props> = ({ users }) => {
  const handleBanUser = async (id: number) => {
    try {
      await axios.post(`http://localhost:8080/users/${id}/ban`);
      console.log("User banned successfully:", id);
      alert("User banned successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  return (
    <CardListContainer>
      {users.map((user) => (
        <Card key={user.id}>
          <UserInfo>
            <Field>
              <Label>User ID:</Label> <Value>{user.id}</Value>
            </Field>
            <Field>
              <Label>First Name:</Label> <Value>{user.firstName}</Value>
            </Field>
            <Field>
              <Label>Last Name:</Label> <Value>{user.lastName}</Value>
            </Field>
            <Field>
              <Label>Email:</Label> <Value>{user.email}</Value>
            </Field>
            <Field>
              <Label>Gender:</Label> <Value>{user.gender}</Value>
            </Field>
            <Field>
              <Label>Phone Number:</Label> <Value>{user.phoneNumber}</Value>
            </Field>
            <Field>
              <Label>Address:</Label> <Value>{user.address}</Value>
            </Field>
            <Field>
              <Label>is Banned:</Label>{" "}
              <Value>{user.isBanned === true ? "True" : "False"}</Value>
            </Field>
            <BanButtonContainer>
              <BanUserButton onClick={() => handleBanUser(user.id)}>
                Ban User
              </BanUserButton>
            </BanButtonContainer>
          </UserInfo>
        </Card>
      ))}
    </CardListContainer>
  );
};

export default AdminUserList;
