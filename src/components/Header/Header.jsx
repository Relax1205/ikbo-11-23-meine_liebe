import './Header.css';

function Header() {
  return (
    <header className="header">
      <img 
        src="https://www.mirea.ru/upload/medialibrary/281/IIT_colour.jpg" 
        alt="MIREA Logo" 
        className="header-logo"
      />
      <h1 className="header-title">Meine liene</h1>
    </header>
  );
}

export default Header;