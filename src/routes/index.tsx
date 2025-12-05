import { Route, Routes } from 'react-router-dom';
import Home from '@pages/home';
import LogIn from '@pages/log-in';
import Register from '@pages/register';
import Vacancies from '@pages/vacancies';
import CreateVacancy from '@pages/create-vacancy';
import VacancyView from '@pages/vacancy-view';
import VacancyEdit from '@pages/vacancy-edit';
import Candidates from '@pages/candidates';
import Analytics from '@pages/analytics';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hr/vacancies" element={<Vacancies />} />
      <Route path="/hr/vacancies/create" element={<CreateVacancy />} />
      <Route path="/hr/vacancies/:id" element={<VacancyView />} />
      <Route path="/hr/vacancies/:id/edit" element={<VacancyEdit />} />

      <Route path="/hr/candidates" element={<Candidates />} />

      <Route path="/hr/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default AppRouter;
