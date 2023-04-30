import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import { Block, Container, Heading, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const { REACT_APP_SPACE_ID, REACT_APP_CDA_TOKEN } = process.env;

const RICHTEXT_OPTIONS = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => {
      return (
        <Heading size={4} subtitle spaced>
          {children}
        </Heading>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return (
        <Block>
          <p>{children}</p>
        </Block>
      );
    },
  },
};

function GetAboutUs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getAboutUs() {
      try {
        const response = await axios.post(
          `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}?access_token=${REACT_APP_CDA_TOKEN}`,
          {
            query: `query {
                about(id: "6zRlDr7eAXywKonIG9RN8u") {
                  title
                  subtitle
                  aboutUsValue {
                    json
                  }
                }
              }`,
            Headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response) {
          setData(response.data.data.about);
          console.log(response.data.data.about.aboutUsValue.json);
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    getAboutUs();
  }, []);

  if (!data) {
    return (
      <Fragment>
        <Icon align="center">
          <FontAwesomeIcon icon={faSpinner} className={"fa-spin"} />
        </Icon>
        Fetching content...
      </Fragment>
    );
  }

  return (
    <Container textAlign="center">
      <Heading spaced>{data.title}</Heading>

      <Heading size={2} subtitle spaced>
        {data.subtitle}
      </Heading>

      {documentToReactComponents(data.aboutUsValue.json, RICHTEXT_OPTIONS)}
    </Container>
  );
}

export default GetAboutUs;
