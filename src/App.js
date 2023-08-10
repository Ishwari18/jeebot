import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About } from "./Components/About";
import { Home } from "./Components/Home";
import { Navbar } from "./Components/Navbar";
import NoteState from './context/notes/NoteState';
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
     <NoteState>
     <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} /> {/* Corrected path for Login */}
          <Route path="/signup" element={<Signup />} /> {/* Corrected path for Signup */}
        </Routes>
      </BrowserRouter>
     </NoteState>
      
    </>
  );
}

export default App;
