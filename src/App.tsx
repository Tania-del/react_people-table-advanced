import { Route, Routes, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />

            <Route
              path="people"
              element={(
                <>
                  <h1 className="title">People page</h1>
                  <PeoplePage />
                </>
              )}
            />
            <Route
              path="/people/:slug"
              element={(
                <>
                  <h1 className="title">People page</h1>
                  <PeoplePage />
                </>
              )}
            />

          </Routes>
        </div>
      </div>
    </div>
  );
};
