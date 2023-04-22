import Card from '../components/Card';
import Slide from '../components/Slide';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => {
      return (
        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
          {...item}
        />
      );
    });
  };
  const images = [
    '/img/image-sneakers-1.png',
    '/img/image-sneakers-2.png',
    '/img/image-sneakers-3.png',
    '/img/image-sneakers-4.png',
  ];
  return (
    <>
      <Slide images={images} />
      <div className="content">
        <div className="d-flex align-center mb-30 justify-between flex-wrap">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : 'Все кроссовки'}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Clear"
                onClick={() => setSearchValue('')}
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>

      <div className="main_home">{renderItems()}</div>
    </>
  );
}

export default Home;
