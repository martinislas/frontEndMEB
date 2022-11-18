import { Fragment, useState, useEffect } from "react";
import axios from "axios";

function IndustryPicker({ selectedIndustry }) {
  const [industryList, setIndustryList] = useState({ industries: [] });

  useEffect(() => {
    async function getIndustries() {
      try {
        const { data: industries } = await axios.get("/api/industries");
        if (industries) {
          setIndustryList({ industries });
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    getIndustries();
  }, []);

  if (selectedIndustry === undefined) {
    return (
      <Fragment>
        <option>Select Industry</option>
        {industryList.industries.map(industry => {
          return <option value={industry.name}>{industry.display_name}</option>;
        })}
      </Fragment>
    );
  }
  return (
    <Fragment>
      <option value={selectedIndustry.name}>
        {selectedIndustry.display_name}
      </option>
      {industryList.industries.filter(industry => {
        return (
          industry.name !== selectedIndustry.name && (
            <option value={industry.name}>{industry.display_name}</option>
          )
        );
      })}
    </Fragment>
  );
}

export default IndustryPicker;
