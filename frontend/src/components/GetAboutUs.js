import "bulma/css/bulma.min.css";
import { Block, Container, Heading, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import useContentful from "../hooks/useContentful";

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

const query = `query {
  about(id: "6zRlDr7eAXywKonIG9RN8u") {
    title
    subtitle
    aboutUsValue {
      json
    }
  }
}`;

function GetAboutUs() {
  let { data } = useContentful(query);

  if (!data) {
    return (
      <Container textAlign="center">
        <Icon align="center">
          <FontAwesomeIcon icon={faSpinner} className={"fa-spin"} />
        </Icon>
        Fetching content...
      </Container>
    );
  }

  return (
    <Container textAlign="center">
      <Heading spaced>{data.about.title}</Heading>

      <Heading size={2} subtitle spaced>
        {data.about.subtitle}
      </Heading>

      {documentToReactComponents(
        data.about.aboutUsValue.json,
        RICHTEXT_OPTIONS
      )}
    </Container>
  );
}

export default GetAboutUs;
