
import Drawer from "./components/Drawer/index";
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
      try {
        const [cartResponce, favoritesResponce, itemsResponce] = await Promise.all(
          [
            axios.get('https://6415ce21351c4aed4910041d.mockapi.io/cart'),
            axios.get('https://641d8e42945125fff3d0159f.mockapi.io/favorite'),
            axios.get('https://6415ce21351c4aed4910041d.mockapi.io/items'),
          ])


        setIsLoading(false)
        setCartItems(cartResponce.data);
        setFavorites(favoritesResponce.data);
        setItems(itemsResponce.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error)
      }
    }

    fetchData();
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://6415ce21351c4aed4910041d.mockapi.io/cart/${findItem.id}`)

      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post('https://6415ce21351c4aed4910041d.mockapi.io/cart', obj)
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id,
            };
          }
          return item;
        }))
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину ')
      console.error(error)
    }

  }

  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
      await axios.delete(`https://6415ce21351c4aed4910041d.mockapi.io/cart/${id}`)
    } catch (error) {
      alert('Ошибка при удалении из корзины ')
      console.error(error)
    }

  }

  const onAddToFavorite = async (obj) => {
    try {
      const findFavorite = favorites.find((item) => item.parentId === obj.id)
      if (findFavorite) {
        setFavorites((prev) => prev.filter((item) => item.parentId !== obj.id));
        axios.delete(`https://641d8e42945125fff3d0159f.mockapi.io/favorite/${findFavorite.id}`)
      } else {
        setFavorites((prev) => [...prev, obj])
        const { data } = await axios.post('https://641d8e42945125fff3d0159f.mockapi.io/favorite', obj)
        setFavorites((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id,
            };
          }
          return item;
        }))
      }

    } catch (error) {
      alert('Не удалось добавить в избранное')
      console.error(error)
    }

  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  const isFavoriteAdded = (id) => {
    return favorites.some((obj) => obj.parentId === id)
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, setFavorites, isFavoriteAdded, onAddToCart, onAddToFavorite, setCartOpened, setCartItems }} >
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
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
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
