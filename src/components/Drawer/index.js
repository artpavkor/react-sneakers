import { useState, useContext } from "react";
import Info from "../Info";
import AppContext from '../context';
import axios from "axios";
import styles from './Drawer.module.scss'


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
    const { cartItems, setCartItems } = useContext(AppContext);
    const [orderId, setOrderId] = useState(null)
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const totalPriceSum = cartItems.reduce((acc, currentString) => acc + parseFloat(currentString.price.replace(/\s/g, '')), 0);

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://641d8e42945125fff3d0159f.mockapi.io/orders', {
                items: cartItems,
            });

            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                axios.delete('https://6415ce21351c4aed4910041d.mockapi.io/cart/' + item.id)
                await delay(1000)
            }
        } catch (error) {
            alert("Ошибка при создании заказа!")
        }
        setIsLoading(false);
    }
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''} `}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Корзина
                    <img
                        onClick={onClose}
                        className="removeBtn cu-p"
                        src="/react-sneakers/img/btn-remove.svg"
                        alt="Remove"
                    />
                </h2>
                {items.length > 0 ? (
                    <>
                        <div className="items flex">
                            {items.map((obj, index) => {
                                return (
                                    <div key={index} className="cartItem d-flex align-center mb-20">
                                        <div
                                            style={{ backgroundImage: `url(${obj.img})` }}
                                            className="cartItemImg"
                                        ></div>
                                        <div className="mr-10 flex">
                                            <p className="mb-5">{obj.name}</p>
                                            <b>{obj.price} руб. </b>
                                        </div>
                                        <img
                                            className="removeBtn"
                                            src="/react-sneakers/img/btn-remove.svg"
                                            alt="Remove"
                                            onClick={() => onRemove(obj.id)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="cartTotalBlock">
                            <ul className="cartTotalBlock">
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPriceSum} руб. </b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b> {parseInt(totalPriceSum / 100 * 5)} руб. </b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                                Оформить заказ
                                <img src="/react-sneakers/img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </>
                ) : (
                    <Info
                        title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                        description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}
                        image={isOrderComplete ? '/react-sneakers/img/complete-order.jpg' : '/react-sneakers/img/empty-cart.png'} />
                )}
            </div>
        </div>
    );
}

export default Drawer;
