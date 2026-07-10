"import \"@/App.css\";
import { BrowserRouter, Routes, Route } from \"react-router-dom\";
import { Toaster } from \"sonner\";
import Navbar from \"@/components/Navbar\";
import Footer from \"@/components/Footer\";
import Home from \"@/pages/Home\";
import Register from \"@/pages/Register\";
import FindBlood from \"@/pages/FindBlood\";
import RequestBlood from \"@/pages/RequestBlood\";
import Donors from \"@/pages/Donors\";
import Contact from \"@/pages/Contact\";

function App() {
  return (
    <div className=\"App\" data-testid=\"app-root\">
      <BrowserRouter>
        <Navbar />
        <main className=\"min-h-[70vh]\">
          <Routes>
            <Route path=\"/\" element={<Home />} />
            <Route path=\"/find\" element={<FindBlood />} />
            <Route path=\"/request\" element={<RequestBlood />} />
            <Route path=\"/register\" element={<Register />} />
            <Route path=\"/donors\" element={<Donors />} />
            <Route path=\"/contact\" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position=\"top-right\" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
"