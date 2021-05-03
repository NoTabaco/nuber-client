import styled from "styled-components";

const Container = styled("div")<{ mine: boolean }>`
  background-color: ${(props) =>
    props.mine ? props.theme.colors.blueColor : props.theme.colors.greyColor};
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  align-self: ${(props) => (props.mine ? "flex-start" : "flex-end")};
  border-bottom-left-radius: ${(props) => (props.mine ? "0px" : "20px")};
  border-bottom-right-radius: ${(props) => (!props.mine ? "0px" : "20px")};
  margin-bottom: 10px;
`;

interface IProps {
  text: string;
  mine: boolean;
}

const Message: React.FC<IProps> = ({ text, mine }) => (
  <Container mine={mine}>{text}</Container>
);

export default Message;
