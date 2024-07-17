import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import ReacletteLogo from "../../public/img/reaclette_logo.png";

export default function Header() {
  return (
    <>
      <header>
        <nav>
          <figure>
            <NavLink to="/">
              <img src={ReacletteLogo} alt="Logo Reaclette" />
            </NavLink>
          </figure>
          <SearchBar />
          <div>
            <button>
              <NavLink to="/add">AJOUTEZ VOTRE RECETTE</NavLink>
            </button>
            <button>
              <NavLink to="/receipe/all">RECETTES</NavLink>{" "}
            </button>
            <button>
              <NavLink to="/fav">FAVORIS</NavLink>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
