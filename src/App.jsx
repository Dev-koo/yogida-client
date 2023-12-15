import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Notfound from './pages/Notfound';
import Layout from './components/commons/Layout';
import Mypage from './pages/mypage/Mypage';
import Login from './pages/Login';
import Schedule from './components/Mypage/Schedule';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="*" element={<Notfound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
