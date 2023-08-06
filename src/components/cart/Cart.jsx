import Button from "../button/Button";
import totalPrice from "../../units/total-price";
import "./Cart.css";

const Cart = ({ cartItems, onCheckout }) => {
  return (
    <div className="cart__container">
      <p>
        Umumiy narx:{" "}
        {totalPrice(cartItems).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>

      <Button
        title={cartItems.length === 0 ? "Buyurtma" : "To'lov"}
        type={"checkout"}
        disable={cartItems.length == 0 ? true : false}
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
