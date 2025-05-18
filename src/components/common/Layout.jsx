import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>© Цветочный магазин.</p>
      </footer>
    </div>
  );
};

export default Layout;