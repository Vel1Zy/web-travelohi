import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavigationBar from "./template/NavigationBar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/User/HomePage/HomePage";
import { UserProvider } from "./contexts/UserProvider";
import ProtectedRoute from "./ProtectedRoute";
import EditHotelPage from "./pages/Admin/Hotel/EditHotelPage";
import Footer from "./template/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import CheckLocationPage from "./pages/AI/CheckLocationPage";
import PromoPage from "./pages/Admin/Promo/PromoPage";
import CreatePromoPage from "./pages/Admin/Promo/CreatePromoPage";
import AdminHotelPage from "./pages/Admin/Hotel/AdminHotelPage";
import ProfilePage from "./pages/User/ProiflePage/ProfilePage";
import HotelPage from "./pages/User/Hotel/HotelPage";
import FlightPage from "./pages/User/Flight/FlightPage";
import CartPage from "./pages/User/Cart/CartPage";
import LoginOtpPage from "./pages/LoginOtpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminUserPage from "./pages/Admin/UserList/AdminUserPage";
import AdminHotelRoomList from "./pages/Admin/Hotel/AdminHotelRoomList";
import AdminFlightPage from "./pages/Admin/Flight/AdminFlightPage";
import AdminAirlinePage from "./pages/Admin/Flight/AdminAirlinePage";
import GameFinal from "./pages/Game/GameFinal";
import GameLobby from "./pages/Game/GameLobby";
import WonPrizePage from "./pages/Game/WonPrizePage";
import HotelDetail from "./pages/User/Hotel/HotelDetail";
import HotelRoomDetail from "./pages/User/Hotel/HotelRoomDetail";
import HotelRouting from "./pages/User/Hotel/HotelRouting";
import FlightDetailPage from "./pages/User/Flight/FlightDetailPage";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login-otp" element={<LoginOtpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            {/* Admin */}
            {/* <Route
              path="/admin/hotel"
              element={<ProtectedRoute component={HotelPage} />}
            /> */}
            <Route
              path="/admin/hotel"
              element={<ProtectedRoute component={AdminHotelPage} />}
            />
            <Route
              path="/admin/hotel/detail/:id"
              element={<ProtectedRoute component={AdminHotelRoomList} />}
            />
            <Route
              path="/admin/hotel/edit/:id"
              element={<ProtectedRoute component={EditHotelPage} />}
            />
            <Route
              path="/admin/promo"
              element={<ProtectedRoute component={PromoPage} />}
            />
            <Route
              path="/admin/airline"
              element={<ProtectedRoute component={AdminAirlinePage} />}
            />
            <Route
              path="admin/airline-flight/:id"
              element={<ProtectedRoute component={AdminFlightPage} />}
            />

            <Route
              path="/admin/promo/create"
              element={<ProtectedRoute component={CreatePromoPage} />}
            />
            <Route
              path="/admin/users"
              element={<ProtectedRoute component={AdminUserPage} />}
            />

            {/* User */}
            <Route path="/profile-page/:id" element={<ProfilePage />} />

            <Route path="/flight" element={<FlightPage />} />
            <Route path="/user/cart" element={<CartPage />} />

            {/* Hotel For User */}
            <Route path="/hotel-routing" element={<HotelRouting />} />
            <Route path="/flight/:id" element={<FlightDetailPage />} />
            <Route path="/hotel" element={<HotelPage />} />
            <Route path="/hotel-room/:id" element={<HotelDetail />} />
            <Route
              path="/hotel-room/detail/:id"
              element={<HotelRoomDetail />}
            />

            {/* Game */}
            <Route path="/game-lobby" element={<GameLobby />} />
            <Route path="/game-testing" element={<GameFinal />} />
            <Route path="/won-prize" element={<WonPrizePage />} />

            {/* AI */}
            <Route path="/check-location" element={<CheckLocationPage />} />

            {/* Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
