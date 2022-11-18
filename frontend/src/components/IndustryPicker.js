import { Fragment, useState, useEffect } from "react";
import axios from "axios";

function IndustryPicker({ selectedIndustryKey, selectedIndustryDisplayName }) {
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

  if (selectedIndustryKey === undefined) {
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
      <option value={selectedIndustryKey}>{selectedIndustryDisplayName}</option>
      {industryList.industries.filter(industry => {
        return (
          industry.name !== selectedIndustryKey && (
            <option value={industry.name}>{industry.display_name}</option>
          )
        );
      })}
    </Fragment>
  );
}

export default IndustryPicker;
