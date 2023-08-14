import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { RevolvingDot } from 'react-loader-spinner';
import Button from './Button/Button';
import SearchBar from './SearchBar/SearchBar';
import Modal from './Modal/Modal';
import style from './Modal/Modal.module.css';
import { fetchImg } from 'services/image-api';
import { useRef } from 'react';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImg, setLargeImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const isfirstRender = useRef(true);

  useEffect(() => {
    if (isfirstRender.current) {
      isfirstRender.current = false;
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, totalHits } = await fetchImg(query, { page });
        setImages(prev => [...prev, ...data]);
        setTotalHits(totalHits);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const handleSearch = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handlePageLoad = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = url => {
    setIsModalOpen(prev => !prev);
    setLargeImg(url);
  };
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <SearchBar onSearch={handleSearch}></SearchBar>
      <ImageGallery data={images} toggleModal={toggleModal} />
      {images.length > 0 && totalHits - images.length && (
        <div
          style={{
            display: 'block',
            textAlign: 'center',
          }}
        >
          {!loading ? (
            <Button clickMore={handlePageLoad} />
          ) : (
            <RevolvingDot wrapperStyle={{ justifyContent: 'center' }} />
          )}
          {isModalOpen && (
            <Modal closeModal={toggleModal}>
              <img src={largeImg} alt="items" className={style.ModalImg} />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}
