import headerStyles from '../styles/Header.module.css';

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Graham's</span> News
      </h1>
      <p className={headerStyles.description}>Keep up to date with Graham's dev news</p>
    </div>
  );
};

export default Header;