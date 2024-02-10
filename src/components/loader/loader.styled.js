import { ColorRing } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ColorRing
      visible={true}
      height="300"
      width="300"
      ariaLabel="blocks-loading"
      wrapperStyle={{ position: 'fixed', top: '30%', left: '40%' }}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
  );
};
