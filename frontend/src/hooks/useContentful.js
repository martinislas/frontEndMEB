import { useState, useEffect } from "react";
import axios from "axios";

const { REACT_APP_SPACE_ID, REACT_APP_CDA_TOKEN } = process.env;

function useContentful(query) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getContentfulData() {
      try {
        const response = await axios.post(
          `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}?access_token=${REACT_APP_CDA_TOKEN}`,
          {
            query,
          },
          {
            Headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response) {
          setData(response.data.data);
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    getContentfulData();
  }, [query]);

  return { data };
}

export default useContentful;
