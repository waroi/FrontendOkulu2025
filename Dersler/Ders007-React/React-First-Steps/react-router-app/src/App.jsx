import Router from "./routes/Router";
import { NavLink } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Ana Sayfa</NavLink>
      </nav>
      <nav>
        <NavLink to="/user">Kullanıcı Bilgileri</NavLink>
      </nav>
      <nav>
        <NavLink to="/parametre/1">Parametre 1</NavLink>
      </nav>
      <nav>
        <NavLink to="/haberler">Haberler</NavLink>
      </nav>

      <Router />
    </>
  );
}

export default App;
