import { useContext } from 'react';
import Cart from '../components/Cart/Cart';
import AppContext from '../components/context';

function Favorites() {
  const state = useContext(AppContext);
  const { favorites, onAddToFavorite } = state;

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>
      <div className="product-container">
        {favorites.map((item, index) => {
          return (
            <Cart
              key={index}
              favorited={true}
              onFavorite={onAddToFavorite}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
