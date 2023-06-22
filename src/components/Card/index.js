import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss'
import { useContext } from 'react';
import AppContext from '../context';

function Card({ id, img, name, price, onPlus, visibility = true, onFavorite, loading = false }) {
    const { isItemAdded, isFavoriteAdded } = useContext(AppContext);
    const obj = { id, parentId: id, img, name, price };


    const onClickPlus = () => {
        onPlus(obj)
    }

    const onClickFavorite = () => {
        onFavorite(obj)
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

                    {visibility && <div className={styles.favotite} onClick={onClickFavorite}>
                        <img src={isFavoriteAdded(id) ? "/react-sneakers/img/liked.svg" : "/react-sneakers/img/unliked.svg"} alt="liked" />
                    </div>}

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
                        {visibility && <img className={styles.plus}
                            onClick={onClickPlus}
                            src={isItemAdded(id) ? '/react-sneakers/img/btn-cheked.svg' : '/react-sneakers/img/plus.svg'}
                            alt="plus"
                        />}
                    </div>
                </>}
        </div>
    )
}

export default Card;