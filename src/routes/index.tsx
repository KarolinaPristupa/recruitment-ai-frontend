import { Route, Routes } from 'react-router-dom';
import Home from '@pages/home';
import LogIn from '@pages/log-in';
import Register from '@pages/register';
import Vacancies from '@pages/vacancies';
import CreateVacancy from '@pages/create-vacancy';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hr/vacancies" element={<Vacancies />} />
      <Route path="/hr/vacancies/create" element={<CreateVacancy />} />
    </Routes>
  );
};

export default AppRouter;
