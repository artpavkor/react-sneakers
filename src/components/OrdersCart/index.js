import ContentLoader from 'react-content-loader';
import styles from '../OrdersCart/OrdersCart.module.scss';


function OrdersCart({ img, name, price, loading = false }) {

    return (
        <div className={styles.ordersCart}>
            {loading
                ?
                <ContentLoader
                    speed={2}
                    width={115}
                    height={185}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="4" y="234" rx="5" ry="5" width="80" height="25" />
                </ContentLoader>
                :
                <>
                    <img
                        width={125}
                        height={95}
                        src={img}
                        alt="sneakers"
                    />
                    <h5>{name}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб</b>
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default OrdersCart;