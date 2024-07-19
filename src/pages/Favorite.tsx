import DeleteLocalStorage from "../components/DeleteLocalStorage";
import Header from "../components/Header";
import PostLocalStorage from "../components/PostLocalStorage";
import { NavLink } from "react-router-dom";
import FavOn from "../../public/img/fav_on.png";
import FavOff from "../../public/img/fav_off.png";
import { useState } from "react";
export default function Favorite() {
  const getItem = localStorage.getItem("reaclette");
  const allFavorites: { id: number; name: string }[] = getItem
    ? JSON.parse(getItem)
    : [];

  const LocalStorage = (id: number, name: string) => {
    const favButton = document.getElementById(
      "favCheckBox" + id
    ) as HTMLInputElement;
    const favIcon = document.getElementById("favIcon" + id) as HTMLInputElement;

    favButton.checked = !favButton.checked;

    if (favButton.checked) {
      PostLocalStorage(id, name);
      favIcon.src = FavOn;
    } else {
      DeleteLocalStorage(id);
      favIcon.src = FavOff;
    }
  };

  return (
    <>
      <Header />
      <main className="showFavorites">
        <h1>VOS FAVORIS</h1>
        <div className="allFavorites">
          {allFavorites.map((favorite: { id: number; name: string }) => (
            <div key={favorite.id}>
              <NavLink to={"/receipe/" + favorite.id}>
                {favorite.name.toUpperCase().replace(/_/g, " ")}
                <img
                  id={"favIcon" + favorite.id}
                  className="favIcon"
                  src={FavOn}
                  alt="Logo favoris"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    LocalStorage(favorite.id, favorite.name);
                  }}
                />
                <input
                  type="checkbox"
                  id={"favCheckBox" + favorite.id}
                  className="addToFavoris"
                  defaultChecked={true}
                />
              </NavLink>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
