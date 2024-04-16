import {
  Route,
  BrowserRouter as Router,
  Routes,
  // Navigate,
} from "react-router-dom";
import Layout from "./layouts/layout";
// import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route />
      </Routes>
    </Router>
  );
};
export default App;
