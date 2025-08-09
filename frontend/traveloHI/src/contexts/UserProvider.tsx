import axios from "axios";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { getJWTFromCookie } from "./Utilities";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateUserData: () => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
  updateUserData: () => {},
  isLoggedIn: false,
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // useEffect(() => {
  //   updateUserData();
  // }, []);
  const login = (email: string, passwd: string) => {
    axios
      .post(
        "http://localhost:8080/login",
        {
          email: email,
          password: passwd,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log("Response STatus : ", response.status);
        if (response.status === 200) {
          document.cookie = `jwt=${response.data.token}; path=/`;
          updateUserData();
          alert("Login Successful!!");
        } else {
          console.error("Error logging in:", response.statusText);
          alert(response.statusText);
        }
      })
      .catch((error) => {
        console.error("Failed to log in:", error);
      });
  };

  const logout = () => {
    document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    setIsLoggedIn(false);
    setUser(null);
  };

  const fetchData = async () => {
    try {
      const token = getJWTFromCookie();
      const response = await axios.get("http://localhost:8080/current-user", {
        headers: {
          Authorization: `Bearer ${token}`, //masukin token kedalam authorization header
        },
        withCredentials: true,
      });

      // console.log(response.data);
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return response.data; // return the data from the response
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const updateUserData = () => {
    fetchData()
      .then((data) => {
        const userFromBackend: User = {
          id: data.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          profilePictureURL: data.profilePictureURL,
          gender: data.gender,
          address: data.address,
          newsletterSubscription: data.newsletterSubscription,
          birthDate: data.dateOfBirth,
          phoneNumber: data.phoneNumber,
          balance: data.balance,
        };
        setUser(userFromBackend);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, updateUserData, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};
