import AnimatedPage from '../../components/AnimatedPage';
import './style.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout__container">
      <Header />
      <AnimatedPage>{children}</AnimatedPage>
      <Footer />
    </div>
  );
};

export default Layout;
