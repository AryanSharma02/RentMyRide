import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import Signin from "./Pages/Signin";
import Register from "./Pages/Register";
import Otpvarify from "./Pages/Otpvarify";
import DataProvider from "./context/providerdata";

function App() {
  return (
    
    <DataProvider>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signin" element={<Signin/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="otpvarify" element={<Otpvarify/>}></Route>
      </Routes>
    </DataProvider>
    
  );
}

export default App;
