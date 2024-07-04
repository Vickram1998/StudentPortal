import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Student from '../student';
import { Home } from '../home';
import Professor from '../Professor';

function RoutePort() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/student" element={<Student />} />
        <Route path="/professor" element={<Professor />} />
      </Routes>
    </Router>
  );
}

export default RoutePort;