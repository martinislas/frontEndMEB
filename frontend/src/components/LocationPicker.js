import { Fragment, useState, useEffect } from "react";
import axios from "axios";

function LocationPicker({ selectedLocationKey, selectedLocationDisplayName }) {
  const [locationList, setLocationList] = useState({ locations: [] });

  useEffect(() => {
    async function getLocations() {
      try {
        const { data: locations } = await axios.get("/api/locations");
        if (locations) {
          setLocationList({ locations });
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    getLocations();
  }, []);

  if (selectedLocationKey === undefined) {
    return (
      <Fragment>
        <option>Select Location</option>
        {locationList.locations.map(location => {
          return <option value={location.name}>{location.display_name}</option>;
        })}
      </Fragment>
    );
  }
  return (
    <Fragment>
      <option value={selectedLocationKey}>{selectedLocationDisplayName}</option>
      {locationList.locations.map(location => {
        return <option value={location.name}>{location.display_name}</option>;
      })}
    </Fragment>
  );
}

export default LocationPicker;
