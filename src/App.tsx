import './App.scss';
import AppRouter from '@/routes';
import Header from '@components/header';
import Footer from '@components/footer';
import ToastContainer from '@components/toast-container';

function App() {
  return (
    <>
      <div className="page">
        <Header />
        <AppRouter />
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default App;
