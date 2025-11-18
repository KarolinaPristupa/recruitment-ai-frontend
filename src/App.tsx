import './App.scss';
import AppRouter from '@/routes';
import Header from '@components/header';
import Footer from '@components/footer';

function App() {
  return (
    <>
      <div className="page">
        <Header />
        <AppRouter />
      </div>
      <Footer />
    </>
  );
}

export default App;
