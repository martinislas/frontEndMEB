import "bulma/css/bulma.min.css";
import {
  Block,
  Columns,
  Container,
  Content,
  Footer,
  Icon,
  Level,
} from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

function SiteFooter() {
  return (
    <Footer>
      <Container>
        <Level>
          <Level.Side align="left">
            <Level.Item>
              <strong>MEB Resources</strong>
            </Level.Item>
          </Level.Side>
          <Level.Side align="right">
            <Level.Item>
              Follow Us
              <Icon>
                <a href="https://facebook.com/MEBResources">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </Icon>
              <Icon>
                <a href="https://www.instagram.com/mebresources">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </Icon>
            </Level.Item>
          </Level.Side>
        </Level>
        <hr />
        <Columns>
          <Columns.Column size="one-quarter">
            <Block>
              <strong>Contact Us</strong>
            </Block>
            <Block>507-799-0076 / 507-313-4804</Block>
            <Block>info@mebresources.com</Block>
          </Columns.Column>
        </Columns>
        <hr />
        <Content style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon={faCopyright} /> 2022
        </Content>
      </Container>
    </Footer>
  );
}

export default SiteFooter;
