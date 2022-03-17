import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function LocationPicker () {
    const [locationList, setLocationList] = useState({locations: [] });
  
    useEffect(() => {
      async function getLocations() {
        try {
          const { data: locations } = await axios.get('/api/locations');
          if (locations) {
            setLocationList({ locations })
          }
        } catch (e) {
          console.log(e)
        }
      }
  
      getLocations()
    }, []);
  
    return (
      <Fragment>
        {locationList.locations.map((location) => {
          return (
            <option value={location.name}>{location.display_name}</option>
          );
        })}
      </Fragment>
    );
}

  export default LocationPicker;