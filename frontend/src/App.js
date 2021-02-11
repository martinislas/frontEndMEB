import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch(`api/jobs`)
    .then((response) => response.json())
    .then(setData);
  }, []);

  if(data) {
    return (
      <div>
        <h1>Latest Jobs</h1>
        <ul>
          {data.map((job) => (
            <li>
              <div>{job.name}</div>
              <div>{job.location}</div>
              <div><a href={'jobs/'+job.id}>Apply</a></div>
            </li>
          ))}
        </ul>
      </div>)
  }

  return (
    <div>Fetching jobs</div>
  );
}

export default App;
