import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";

function Search() {
  return (
    <SearchContainer>
      <SearchInput placeholder="Search in Chats" />
      <SearchIcon />
    </SearchContainer>
  );
}

export default Search;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  background-color: transparent;
  font-family: "KoHo", sans-serif;
  color: white;
  font-size: 16px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff1a;
  padding: 8px 20px;
  border-radius: 10px;
`;
