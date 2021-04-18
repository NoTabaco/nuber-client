import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  transform: scale(0.8);
`;

interface IProps {
  backTo: string;
  className?: string;
}

const BackArrow: React.FunctionComponent<IProps> = ({ backTo, className }) => (
  <Container className={className}>
    <Link to={backTo}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      </svg>
    </Link>
  </Container>
);

export default BackArrow;
