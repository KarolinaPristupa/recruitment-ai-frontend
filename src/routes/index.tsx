import { Route, Routes } from 'react-router-dom';
import Home from '@pages/home';
import LogIn from '@pages/log-in';
import Register from '@pages/register';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
