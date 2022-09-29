import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import axios from "axios";

function Orders() {
 
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://63185d22f6b281877c6a1f78.mockapi.io/oders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("error orders");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      {orders.length > 0 ? (
        <div>
          <div className="d-flex align-center justify-between mb-50">
            <h1 className="myOrders">My Order</h1>
          </div>
          <div className="d-flex flex-wrap justify-center">
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
              <Card
                key={index}
                favorited={false}
                loading={isLoading}
                {...item}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-bookmarks d-flex flex-column align-center justify-center">
          <img className="emoji" src="/img/sad-emoji.jpg" alt="Empty" />
          <h2 className="myOrders">No Orders :(</h2>
          <span>You have not orders anything</span>
          <Link to="/">
            <button className="greenButton mt-20">
              <img src="/img/arrow-left.svg" alt="Arrow" />
              Go Back
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Orders;
