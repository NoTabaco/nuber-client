import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.label`
  cursor: pointer;
  height: 80px;
  width: 80px;
  border: 2px solid black;
  border-radius: 50%;
  margin-bottom: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  overflow: hidden;
  & img {
    height: 80px;
    width: 80px;
  }
`;

const Input = styled.input`
  display: none;
`;

interface IProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  uploading: boolean;
  fileUrl: string;
}

const PhotoInput: React.FC<IProps> = ({ onChange, uploading, fileUrl }) => (
  <Container>
    <Input id={"photo"} type="file" accept="image/*" onChange={onChange} />
    <Image htmlFor="photo">
      {uploading ? "⏰" : <img alt="profilePhoto" src={fileUrl} />}
    </Image>
  </Container>
);

export default PhotoInput;
