import { useContext } from 'react';
import Card from '../components/Card/index';
import AppContext from '../components/context';
import axios from 'axios';

function Favorites() {
  const state = useContext(AppContext);
  const { favorites, onAddToFavorite, onAddToCart, setFavorites } = state;

  const onRemoveFav = async (id) => {
    try {
      await axios.delete(
        `https://641d8e42945125fff3d0159f.mockapi.io/favorite/${id}`
      );
      setFavorites([]);
    } catch (error) {
      alert('Ошибка при удалении');
      console.error(error);
    }
  };

  function deleteCardFav() {
    favorites.map((item) => {
      return onRemoveFav(item.id);
    });
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
        <button onClick={deleteCardFav} className="greenButton_favorite">
          Удалить
        </button>
      </div>
      <div className="favorite_card">
        {favorites.map((item, index) => {
          return (
            <Card
              key={index}
              visibility={false}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
