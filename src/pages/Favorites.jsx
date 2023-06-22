import { useContext } from 'react';
import Card from '../components/Card/index';
import AppContext from '../components/context';

function Favorites() {
  const state = useContext(AppContext);
  const { favorites, onAddToFavorite, onAddToCart } = state;

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
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
