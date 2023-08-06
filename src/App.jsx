import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/Card";
import Cart from "./components/cart/Cart";
import { getData } from "./constants/db";
import totalPrice from "./units/total-price";

const courses = getData();

const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    telegram.ready();
  });

  const onAddItem = (item) => {
    const existItem = cartItems.find((c) => c.id === item.id);
    if (existItem) {
      const newData = cartItems.map((c) =>
        c.id === item.id
          ? { ...existItem, quantity: existItem.quantity + 1 }
          : c
      );
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };

  const onRemoveItem = (item) => {
    const existItem = cartItems.find((c) => c.id === item.id);
    if (existItem.quantity === 1) {
      const newData = cartItems.filter((c) => c.id !== item.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map((c) =>
        c.id === item.id
          ? { ...existItem, quantity: existItem.quantity - 1 }
          : c
      );
      setCartItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = `Sotib olish: ${totalPrice(
      cartItems
    ).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })}`;
    cartItems.length ? telegram.MainButton.show() : "";
  };

  const onSendData = useCallback(() => {
    telegram.sendData(JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);

    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

  return (
    <>
      <h1 className="heading">Courses</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {courses.map((course) => (
          <Card
            key={course.id}
            course={course}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </>
  );
};

export default App;
