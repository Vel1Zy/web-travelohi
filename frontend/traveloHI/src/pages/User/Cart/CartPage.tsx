import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserProvider";
import FullPageContainer from "../../../template/FullPageContainer";
import { getJWTFromCookie } from "../../../contexts/Utilities";
import { useNavigate } from "react-router-dom";
import { CreateButton } from "../Component/Buttons";
import Modal from "../../../template/Modal";

interface HotelCart {
  ID: number;
  UserID: number;
  RoomID: number;
  TotalPrice: number;
  CheckInDate: string;
  CheckOutDate: string;
}

export default function CartPage() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const { user } = useUser();
  const [carts, setcart] = useState([]);
  const currentDate = new Date();
  const [update, setupdate] = useState(false);
  const [sum, setsum] = useState(0);

  useEffect(() => {}, []);
  async function gc() {
    const response = await axios.get(
      "http://localhost:8080/hotel-cart/" + user?.id
    );

    console.log(response);

    if (response.data) setcart(response.data);
    console.log(response.data);
    setupdate(!update);
    console.log("updating cart");
  }

  useEffect(() => {
    // gc();
    if (user?.id)
      axios
        .get("http://localhost:8080/hotel-cart/" + user?.id)
        .then((response) => {
          if (response.data) {
            let current = 0;
            setcart(response.data);

            carts.forEach((cart) => {
              current += cart.totalPrice;
              console.log(cart.totalPrice);
            });

            setsum(current);
          }
          setupdate(!update);
        });
  }, [user?.id]);

  if (!carts) return <></>;

  return (
    <FullPageContainer>
      <>
        <h1>Show Cart</h1>
        <h1>total cart : {carts.length}</h1>
        <h1>total price : {sum}</h1>
        {(carts || carts.length > 0) && (
          <>
            {carts.map((cart, index) => (
              <div key={index}>
                <p>{cart.id}</p>
                <p>{new Date(cart.checkInDate).toString()}</p>
                <p>{new Date(cart.checkOutDate).toString()}</p>
                <p>{cart.totalPrice}</p>
                <p>{cart.roomID}</p>
                <p>
                  Status :{" "}
                  {new Date(cart.checkInDate) < currentDate
                    ? "not valid"
                    : "valid"}
                </p>
              </div>
            ))}
          </>
        )}
        <CreateButton>CheckOut</CreateButton>

        <CreateButton
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Choose Payment Type
        </CreateButton>
        <Modal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <h2>Choose Payment Type</h2>
          <div>
            <input type="radio" id="ccPayment" name="paymentType" value="CC" />
            <label htmlFor="ccPayment">Credit Card Payment</label>
          </div>
          <div>
            <input
              type="radio"
              id="hiWallet"
              name="paymentType"
              value="HIWallet"
            />
            <label htmlFor="hiWallet">HIWallet</label>
          </div>
        </Modal>
      </>
    </FullPageContainer>
  );
}
