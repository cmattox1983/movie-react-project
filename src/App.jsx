import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/search/:title" element={<Search />}></Route>
          <Route path="/movie/:imdbID" element={<Movie />}></Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
