import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>© 2023 Flower Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;