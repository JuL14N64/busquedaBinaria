import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
