import cn from 'classnames';
import { RevolvingDot } from 'react-loader-spinner';
import imageApi from '../../services/image-api';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import style from './ImageGallery.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  EMTY: 'emty',
};
function ImageGallery({ query }) {
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState(0);
  const [largeUrl, setLargeUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);

    imageApi
      .fetchImg(query, page)
      .then(search => {
        if (page > 1) {
          setHits(prev => {
            return [...prev, ...search.hits];
          });
          setTotal(search.total);
          setStatus(Status.RESOLVED);
        } else {
          setHits(search.hits);
          setTotal(search.total);
          setStatus(Status.RESOLVED);
        }
      })
      .catch(error => {
        setError({ error });
        setStatus(Status.REJECTED);
      });
  }, [query, page]);

  const pageLoadMore = () => {
    setPage(p => p + 1);
  };
  const onClickImg = url => {
    setLargeUrl(url);
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  useEffect(() => {});
  if (status === Status.IDLE) {
    return (
      <div style={{ textAlign: 'center' }}>
        Please enter a search term in the text box{' '}
      </div>
    );
  }

  if (status === Status.PENDING) {
    return <RevolvingDot wrapperStyle={{ justifyContent: 'center' }} />;
  }
  if (status === Status.REJECTED) {
    console.log('error', error);
    return <RevolvingDot wrapperStyle={{ justifyContent: 'center' }} />;
  }

  if (status === Status.RESOLVED && total === 0) {
    return (
      <div
        style={{ padding: '20px 10px', margin: '0 auto', textAlign: 'center' }}
      >
        <h2>Nothing to be found </h2>
      </div>
    );
  }
  if (status === Status.RESOLVED) {
    return (
      <div
        style={{ padding: '20px 10px', margin: '0 auto', textAlign: 'center' }}
      >
        <ul
          className={cn(style.ImageGallery, {
            [style.ImageGalleryOverflow]: showModal,
          })}
          query={query}
          page={page}
        >
          {hits.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                alt={tags}
                largeImageURL={largeImageURL}
                onClick={onClickImg}
              ></ImageGalleryItem>
            );
          })}
        </ul>
        <Button clickMore={pageLoadMore}></Button>
        {showModal && (
          <Modal closeModal={hideModal}>
            <img src={largeUrl} alt="items" className={style.ModalImg} />
          </Modal>
        )}
      </div>
    );
  }
}
export default ImageGallery;
