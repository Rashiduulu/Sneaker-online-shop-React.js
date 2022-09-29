import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();
  return (
    <header className=" d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="headerLeft d-flex align-center">
          <img width={40} height={40} src="/img/logo.svg" alt="logo" />
          <div className="headerInfo">
            <h3 className="text-uppercase">React Sneakers</h3>
            <p>Sneakers shop</p>
          </div>
        </div>
      </Link>

      <ul className="headerRight d-flex">
        <li onClick={props.onClickCart} className="mr-30 d-flex">
          <img
            className="cu-p cart"
            width={18}
            height={18}
            src="/img/Group.svg"
            alt="Cart"
          />
          <span>${totalPrice}</span>
        </li>

        <li>
          <Link to="/Favorites">
            <img
              className="fav-i cu-p"
              width={18}
              height={18}
              src="/img/liked.svg"
              alt="Favorite"
            />
          </Link>
        </li>

        <li>
          <Link to="/Orders">
            <img
              className="cu-p"
              width={18}
              height={18}
              src="/img/User.svg"
              alt="User"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
