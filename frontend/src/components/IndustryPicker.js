import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function IndustryPicker () {
    const [industryList, setIndustryList] = useState({industries: [] });
  
    useEffect(() => {
      async function getIndustries() {
        try {
          const { data: industries } = await axios.get('/api/industries');
          if (industries) {
            setIndustryList({ industries })
          }
        } catch (e) {
          console.log(e)
        }
      }
  
      getIndustries()
    }, []);
  
    return (
      <Fragment>
        {industryList.industries.map((industry) => {
          return (
            <option value={industry.name}>{industry.display_name}</option>
          );
        })}
      </Fragment>
    );
}

export default IndustryPicker;