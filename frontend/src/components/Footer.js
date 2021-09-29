import 'bulma/css/bulma.min.css';
import { Block, Columns, Container, Content, Footer, Icon, Level } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';


function SiteFooter() {
  return (
    <Footer>
      <Container>
          <Level>
              <Level.Side align="left">
                <Level.Item><strong>MEB Resources</strong></Level.Item>
              </Level.Side>
              <Level.Side align="right">
                  <Level.Item>
                    Follow Us
                    <Icon><FontAwesomeIcon icon={faFacebook} /></Icon>
                    <Icon><FontAwesomeIcon icon={faInstagram} /></Icon>
                    <Icon><FontAwesomeIcon icon={faTwitter} /></Icon>
                  </Level.Item>
              </Level.Side>
          </Level>
          <hr />
          <Columns>
            <Columns.Column size="one-quarter">
                <Block><strong>Rochester Location</strong></Block>
                <Block>507.799.0076 / 507.313.4804</Block>
                <Block>info@mebresources.com</Block>
            </Columns.Column>
            <Columns.Column size="one-quarter">
                <Block><strong>St. Cloud Location</strong></Block>
                <Block>320.291.8213</Block>
                <Block>stcloud@mebresources.com</Block>
            </Columns.Column>
          </Columns>
        <hr />
        <Content style={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon={faCopyright} /> 2021. Powered by Owen. Designed by Martin.
        </Content>
      </Container>
    </Footer>
  );
}
            
export default SiteFooter