import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "./context";

function Header(props) {
  const { cartItems } = useContext(AppContext);

  const totalPriceSum = cartItems.reduce((acc, currentString) => acc + parseFloat(currentString.price.replace(/\s/g, '')), 0);

  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <Link to="/">
          <img
            className="mr-20"
            width={90}
            height={70}
            src="/img/logoSneakers.png"
            alt="logo"
          />
        </Link>
        <div>
          <h3 className="text-uppercase">Men's Shoes & Sneakers</h3>
        </div>
      </div>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p align-center ">
          <img width={18} height={18} src="/img/card.svg" alt="card" />
          <span className="ml-10">{totalPriceSum} руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={19} height={18} src="/img/heart.png" alt="bookmarks" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={19} height={18} src="/img/user.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </header>
  )
}


export default Header;