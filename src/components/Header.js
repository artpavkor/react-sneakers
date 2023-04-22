import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "./context";

function Header(props) {
  const { cartItems } = useContext(AppContext);

  const totalPriceSum = cartItems.reduce((acc, currentString) => acc + parseFloat(currentString.price.replace(/\s/g, '')), 0);

  return (
    <header>
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
          <p>MEN'S SHOES & SNEAKERS <br /><span>Интернет магазин спортивной обуви</span></p>
        </div>
      </div>
      <ul className="navbar">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={20} height={20} src="/img/card.png" alt="card" />
          <span className="ml-10">{totalPriceSum} руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={20} height={20} src="/img/favourite.png" alt="card"></img>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={20} height={20} src="/img/user.png" alt="card" />
          </Link>
        </li>
      </ul>
    </header>
  )
}


export default Header;