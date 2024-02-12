import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getItemsApi } from './Api/Api';
import { Button } from './Button/Button';
import { Loader } from './loader/loader.styled';
import { CustomModal } from './Modal.js/modal';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [btnMore, setBtnMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [webformatURL, setWebformatURL] = useState('');
  const [tags, setTags] = useState('');

  const inputData = e => {
    e.preventDefault();
    setInputValue(e.target.search.value.toLowerCase().trim());
  };

  const addPage = () => {
    setPage(prevState => prevState + 1);

    async function changePage() {
      const responseApi = await getItemsApi(inputValue, page);
      if (responseApi.total) {
        setImages(prevState => [...prevState, ...responseApi.hits]);
        setBtnMore(true);
      }
    }
    changePage();
  };

  const openModal = ({ webformatURL, tags }) => {
    setModalIsOpen(true);
    setWebformatURL(webformatURL);
    setTags(tags);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setWebformatURL('');
  };

  useEffect(() => {
    setImages([]);
    setPage(1);
    setBtnMore(false);

    if (inputValue) {
      async function getApi() {
        setIsLoading(true);
        try {
          const responseApi = await getItemsApi(inputValue, page);
          const totalPhoto = responseApi.total;

          if (totalPhoto) {
            toast.success(`Знайшли ${totalPhoto} фото ${inputValue}`, {
              duration: 3000,
            });
            setImages(responseApi.hits);
            setBtnMore(true);
          } else {
            toast.error(`Знайшли ${totalPhoto} фото ${inputValue}`, {
              duration: 3000,
            });
          }
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
      getApi();
    }
  }, [inputValue]);

  return (
    <div>
      {isLoading && <Loader />}
      <Searchbar onSubmit={inputData} />
      {btnMore && (
        <>
          <ImageGallery openModal={openModal} images={images} />
          <Button onClick={addPage} />
        </>
      )}

      <CustomModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        image={webformatURL}
        tags={tags}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

// export class App extends Component {
//   state = {
//     inputData: '',
//     images: [],
//     page: 1,
//     btnMore: false,
//     isLoading: false,
//     modalIsOpen: false,
//     webformatURL: '',
//     tags: '',
//   };

//   inputData = e => {
//     e.preventDefault();
//     this.setState({
//       inputData: e.target.search.value.toLowerCase().trim(),
//     });
//   };

//   addPage = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   openModal = ({ webformatURL, tags }) => {
//     this.setState(prevState => ({
//       modalIsOpen: !prevState.modalIsOpen,
//       webformatURL,
//       tags,
//     }));
//   };

//   closeModal = () => {
//     this.setState({
//       modalIsOpen: false,
//       webformatURL: '',
//     });
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { inputData, page } = this.state;

//     if (prevState.inputData !== inputData) {
//       this.setState({
//         images: [],
//         page: 1,
//         isLoading: true,
//       });
//       try {
//         const responseApi = await getItemsApi(inputData, page);
//         const totalPhoto = responseApi.total;

//         if (responseApi.total) {
//           toast.success(`Знайшли ${totalPhoto} фото ${inputData}`, {
//             duration: 5000,
//           });
//           return this.setState({
//             images: responseApi.hits,
//             btnMore: true,
//           });
//         } else {
//           toast.error(`Знайшли ${totalPhoto} фото ${inputData}`, {
//             duration: 5000,
//           });
//           return this.setState({
//             btnMore: false,
//           });
//         }
//       } catch (error) {
//       } finally {
//         this.setState({
//           isLoading: false,
//         });
//       }
//     }

//     if (prevState.page !== page) {
//       try {
//         const responseApi = await getItemsApi(inputData, page);
//         if (responseApi.total) {
//           return this.setState(prevState => ({
//             images: [...prevState.images, ...responseApi.hits],
//             btnMore: true,
//           }));
//         }
//       } catch (error) {}
//     }
//   }

//   render() {
//     const { images, btnMore, isLoading, modalIsOpen, webformatURL, tags } =
//       this.state;
//     return (
//       <div>
//         {isLoading && <Loader />}
//         <Searchbar onSubmit={this.inputData} />
//         {btnMore && (
//           <>
//             image={webformatURL}
//             <ImageGallery openModal={this.openModal} images={images} />
//             <Button onClick={this.addPage} />
//           </>
//         )}

//         <CustomModal
//           closeModal={this.closeModal}
//           modalIsOpen={modalIsOpen}
//           image={webformatURL}
//           tags={tags}
//         />
//         <Toaster position="top-right" reverseOrder={false} />
//       </div>
//     );
//   }
// }
