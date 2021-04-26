import styled from "styled-components";

const Container = styled.input`
  width: 100%;
  background-color: black;
  color: white;
  text-transform: uppercase;
  padding: 15px 0;
  font-size: 16px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  &:active,
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.8;
  }
`;

interface IProps {
  value: string;
  onClick: any;
  disabled?: boolean;
  className?: string;
}

const Button: React.FunctionComponent<IProps> = ({
  value,
  onClick,
  disabled = false,
  className,
}) => (
  <Container
    value={value}
    disabled={disabled}
    onClick={onClick}
    type={"submit"}
    className={className}
  />
);

export default Button;
