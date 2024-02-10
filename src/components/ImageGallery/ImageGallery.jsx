import {
  Container,
  ImageGalleryItem,
  ImageGalleryImg,
} from './ImageGallery.styled';
export const ImageGallery = ({ images, openModal }) => {
  return (
    <Container>
      {images.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem key={id}>
          <ImageGalleryImg
            onClick={() => openModal({ webformatURL, tags })}
            src={webformatURL}
            alt={tags}
          />
        </ImageGalleryItem>
      ))}
    </Container>
  );
};
