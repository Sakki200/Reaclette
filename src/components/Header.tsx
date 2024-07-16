import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav>
        <figure>
          <NavLink to="/">
            <img src="public/img/reaclette_logo.png" alt="" />
          </NavLink>
        </figure>
        <input type="text" name="" id="" />
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
    </>
  );
}
