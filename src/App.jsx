import { Routes, Route} from "react-router-dom";
import Stats from './Pages/Stats/Stats.jsx';
import Home from './Pages/Home/Home.jsx';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import './App.css'

function App() {
  return (
    <div className="flex flex-col min-h-screen"> 
  
      <Navbar />

    
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code/:code" element={<Stats />} />
        
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
