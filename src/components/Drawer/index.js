import React from "react";
import axios from "axios";

import Info from "../Info";
import styles from "./Drawer.module.scss";

import { useCart } from "../../hooks/useCart";

function Drawer({ onClose, onRemove, items = [], opened }) {
  const {cartItems, setCartItems, totalPrice} = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://63185d22f6b281877c6a1f78.mockapi.io/oders",
        {
          items: cartItems,
        }
      );

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
    } catch (error) {
      alert("Orders error");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between align-center">
          Shopping cart
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            width={24}
            height={24}
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className=" d-flex flex-column flex">
            <div className={styles.items}>
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex justify-between align-center mt-15"
                >
                  <div className="d-flex">
                    <img
                      className="mr-20"
                      width={70}
                      height={70}
                      src={obj.imageUrl}
                      alt="Sneakers"
                    />

                    <div className="mr-20">
                      <p className="mb-5">{obj.title}</p>
                      <b>${obj.price}</b>
                    </div>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    width={24}
                    height={24}
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>${totalPrice}</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Checkout <img src="/img/arrow.svg" alt="Arrow" />{" "}
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Ordere Completed" : "Cart is empty"}
            description={
              isOrderComplete
                ? `Your order #${orderId} will soon be delivered by courier`
                : "Add something for order"
            }
            image={
              isOrderComplete
                ? "/img/complete-order.jpg"
                : "/img/empty-cart.svg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
