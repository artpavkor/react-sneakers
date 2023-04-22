import axios from 'axios';
import { useEffect, useState } from 'react';
import OrdersCart from '../components/OrdersCart';

function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://641d8e42945125fff3d0159f.mockapi.io/orders'
        );
        setOrders(
          data.reduce((prev, obj) => [...prev, ...obj.items], []).flat()
        );
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.log(error);
      }
    })();
  }, []);

  const onRemoveOrd = async (id) => {
    try {
      setOrders([]);
      await axios.delete(
        `https://641d8e42945125fff3d0159f.mockapi.io/orders/${id}`
      );
    } catch (error) {}
  };
  function deleteCardFav() {
    orders.map((item) => {
      return onRemoveOrd(item.id);
    });
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
        <button onClick={deleteCardFav} className="greenButton_favorite">
          Удалить
        </button>
      </div>
      <div className="orders_row">
        {(isLoading ? [...Array(5)] : orders).map((item, index) => {
          return <OrdersCart key={index} loading={isLoading} {...item} />;
        })}
      </div>
    </div>
  );
}

export default Orders;
