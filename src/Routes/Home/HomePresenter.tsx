import { Helmet } from "react-helmet-async";
import Sidebar from "react-sidebar";
import styled from "styled-components";

const Container = styled.div``;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const HomePresenter: React.FC<IProps> = ({ isMenuOpen, toggleMenu }) => (
  <Container>
    <Helmet>
      <title>Home | Nuber</title>
    </Helmet>
    <Sidebar
      sidebar={<b>Sidebar content</b>}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{ sidebar: { background: "white", width: "80%", zIndex: "10" } }}
    >
      <button onClick={toggleMenu}>Open sidebar</button>
    </Sidebar>
  </Container>
);

export default HomePresenter;