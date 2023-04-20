import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Cart.module.scss'
import { useContext } from 'react';
import AppContext from '../context';

function Cart({ id, img, name, price, onPlus, onFavorite, favorited = false, loading = false }) {
    const { isItemAdded } = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited)

    const onClickPlus = () => {
        onPlus({ id, img, name, price })
    }
    const onClickFavorite = () => {
        onFavorite({ id, img, name, price })
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.cart}>
            {loading
                ?
                <ContentLoader
                    speed={2}
                    width={165}
                    height={265}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="4" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
                :
                <>
                    <div className={styles.favotite} onClick={onClickFavorite}>
                        <img src={isFavorite === true ? "/img/liked.svg" : "/img/unliked.svg"} alt="liked" />
                    </div>
                    <img
                        width='100%'
                        height={135}
                        src={img}
                        alt="sneakers"
                    />
                    <h5>{name}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб</b>
                        </div>
                        <img className={styles.plus}
                            onClick={onClickPlus}
                            src={isItemAdded(id) ? '/img/btn-cheked.svg' : '/img/plus.svg'}
                            alt="plus"
                        />
                    </div>
                </>}
        </div>
    )
}

export default Cart;