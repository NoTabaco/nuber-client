import Helmet from "react-helmet";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import bgImage from "../../images/bg.png";

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  height: 65%;
  background: linear-gradient(rgba(0, 153, 196, 0.5), rgba(0, 153, 196, 0.4)),
    url(${bgImage});
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  width: 110px;
  height: 110px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 -14px 28px rgba(0, 0, 0, 0.22);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 25px;
`;

const Title = styled.h1``;

const Footer = styled.div`
  height: 35%;
`;

const Subtitle = styled.h2`
  font-size: 30px;
`;

const FakeInput = styled.div`
  margin: 50px 0px;
  font-size: 25px;
  font-weight: 300;
`;

const PhoneLogin = styled.div`
  padding: 20px;
`;

const Grey = styled.span`
  color: ${(props) => props.theme.colors.greyColor};
  margin-left: 10px;
  cursor: pointer;
`;

const SocialLogin = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.greyColor};
  padding: 36px 20px;
`;

const SocialLink = styled.span`
  color: ${(props) => props.theme.colors.blueColor};
  font-size: 20px;
  cursor: pointer;
`;

interface IProps extends RouteComponentProps<any> {}

const LoginPresenter: React.FunctionComponent<IProps> = () => (
  <Container>
    <Helmet>
      <title>Login | Nuber</title>
    </Helmet>
    <Header>
      <Logo>
        <Title>Nuber</Title>
      </Logo>
    </Header>
    <Footer>
      <PhoneLogin>
        <Subtitle>Get moving with Nuber</Subtitle>
        <FakeInput>
          <Link to="/phone-login">
            🇰🇷 +82 <Grey>Enter yout mobile number</Grey>
          </Link>
        </FakeInput>
      </PhoneLogin>
      <SocialLogin>
        <Link to="/social-login">
          <SocialLink>Or connect with social</SocialLink>
        </Link>
      </SocialLogin>
    </Footer>
  </Container>
);

export default withRouter(LoginPresenter);
