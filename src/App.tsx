import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Examination from "./pages/Examination";
import { QuestionProvider } from "./contexts/QuestionContext";

function App() {

  return (
    <> 
    <QuestionProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/examination" element={<Examination />} />
        </Routes>
      </BrowserRouter>
      </QuestionProvider>
    </>
  )
}

export default App
