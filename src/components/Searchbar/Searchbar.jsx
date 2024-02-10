import {
  Container,
  SearchButton,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';
import { MdOutlineImageSearch } from 'react-icons/md';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Container>
      <SearchForm onSubmit={onSubmit}>
        <SearchButton type="submit">
          <span>
            <MdOutlineImageSearch size="30px" />
          </span>
        </SearchButton>

        <SearchInput
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Container>
  );
};
