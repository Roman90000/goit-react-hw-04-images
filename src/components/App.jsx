import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getItemsApi } from './Api/Api';
import { Button } from './Button/Button';
import { Loader } from './loader/loader.styled';
import { CustomModal } from './Modal.js/modal';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    inputData: '',
    images: [],
    page: 1,
    btnMore: false,
    isLoading: false,
    modalIsOpen: false,
    webformatURL: '',
    tags: '',
  };

  inputData = e => {
    e.preventDefault();
    this.setState({
      inputData: e.target.search.value.toLowerCase().trim(),
    });
  };

  addPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = ({ webformatURL, tags }) => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen,
      webformatURL,
      tags,
    }));
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      webformatURL: '',
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { inputData, page } = this.state;

    if (prevState.inputData !== inputData) {
      this.setState({
        images: [],
        page: 1,
        isLoading: true,
      });
      try {
        const responseApi = await getItemsApi(inputData, page);
        const totalPhoto = responseApi.total;

        if (responseApi.total) {
          toast.success(`Знайшли ${totalPhoto} фото ${inputData}`, {
            duration: 5000,
          });
          return this.setState({
            images: responseApi.hits,
            btnMore: true,
          });
        } else {
          toast.error(`Знайшли ${totalPhoto} фото ${inputData}`, {
            duration: 5000,
          });
          return this.setState({
            btnMore: false,
          });
        }
      } catch (error) {
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }

    if (prevState.page !== page) {
      try {
        const responseApi = await getItemsApi(inputData, page);
        if (responseApi.total) {
          return this.setState(prevState => ({
            images: [...prevState.images, ...responseApi.hits],
            btnMore: true,
          }));
        }
      } catch (error) {}
    }
  }

  render() {
    const { images, btnMore, isLoading, modalIsOpen, webformatURL, tags } =
      this.state;
    return (
      <div>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.inputData} />
        {btnMore && (
          <>
            <ImageGallery openModal={this.openModal} images={images} />
            <Button onClick={this.addPage} />
          </>
        )}

        <CustomModal
          closeModal={this.closeModal}
          modalIsOpen={modalIsOpen}
          image={webformatURL}
          tags={tags}
        />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    );
  }
}
