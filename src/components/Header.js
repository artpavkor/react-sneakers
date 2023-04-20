import { Link } from "react-router-dom";

function Header(props) {

  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <Link to="/">
          <img
            className="mr-20"
            width={40}
            height={40}
            src="/img/logo.png"
            alt="logo"
          />
        </Link>
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших красовок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p align-center ">
          <img width={18} height={18} src="/img/card.svg" alt="card" />
          <span className="ml-10">1205 p.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={19} height={18} src="/img/heart.png" alt="bookmarks" />
          </Link>

        </li>
        <li>
          <img width={18} height={18} src="/img/user.svg" alt="user" />
        </li>
      </ul>
    </header>
  )
}


export default Header;