import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, largeImageURL, alt, onClick }) => {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        className={style['ImageGalleryItem-image']}
        src={url}
        alt={alt}
        onClick={() => onClick(largeImageURL)}
      />
    </li>
  );
};
export default ImageGalleryItem;
