import { Outlet, NavLink } from "react-router";

const NewView = () => {
  return (
    <>
      <h2>New View</h2>
      <Outlet />

      <nav>
        <NavLink to="ekonomi">Ekonomi</NavLink>
        <NavLink to="spor">Spor</NavLink>
      </nav>
    </>
  );
};

export default NewView;
