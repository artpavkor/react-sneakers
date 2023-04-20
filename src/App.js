
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import AppContext from "./components/context";
import Orders from "./pages/Orders";



function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)



  useEffect(() => {
    async function fetchData() {
      const cartResponce = await axios.get('https://6415ce21351c4aed4910041d.mockapi.io/cart')
      const favoritesResponce = await axios.get('https://641d8e42945125fff3d0159f.mockapi.io/favorite')
      const itemsResponce = await axios.get('https://6415ce21351c4aed4910041d.mockapi.io/items')


      setIsLoading(false)

      setCartItems(cartResponce.data);
      setFavorites(favoritesResponce.data);
      setItems(itemsResponce.data);
    }
    fetchData();
  }, [])

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://6415ce21351c4aed4910041d.mockapi.io/cart/${obj.id}`)
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));

    } else {
      axios.post('https://6415ce21351c4aed4910041d.mockapi.io/cart', obj)
      setCartItems((prev) => [...prev, obj])
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://6415ce21351c4aed4910041d.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://641d8e42945125fff3d0159f.mockapi.io/favorite/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://641d8e42945125fff3d0159f.mockapi.io/favorite', obj)
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
    }

  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }} >
      <div className="black_row">
        <img
          width={13}
          height={13}
          src="/img/time_clock.png"
          alt="clock"
        />
        <p className="clock_text">8-22 будни · 8-20 выходные <span> +7 800 700 00 00</span></p>

      </div>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element=
            {<Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

// https://github.com/Archakov06/react-sneakers