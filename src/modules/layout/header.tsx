import { Link } from "react-router-dom";


export const Header = () => {
  return (
    <div className="header">
      <Link to="/">Homepage</Link>
      <Link to="/animal">Animals</Link>
      <Link to="/animal/new">Add your pet</Link>
    </div>
  );
};
