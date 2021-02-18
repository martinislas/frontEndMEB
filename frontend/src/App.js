import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Jobs from './Jobs';
import JobDetails from './JobDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />}/> 
        <Route path="/jobs" element={<Jobs />}/>
        <Route path="/jobs/:id" element={<JobDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
