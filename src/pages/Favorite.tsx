import DeleteLocalStorage from "../components/DeleteLocalStorage";
import Header from "../components/Header";
import PostLocalStorage from "../components/PostLocalStorage";
import { NavLink } from "react-router-dom";
export default function Favorite() {
  const getItem = localStorage.getItem("reaclette");
  const allFavorites: { id: number; name: string }[] = getItem
    ? JSON.parse(getItem)
    : [];

  const LocalStorage = (id: number, name: string) => {
    const favButton = document.getElementById(
      "favCheckBox" + id
    ) as HTMLInputElement;

    if (favButton.checked) {
      PostLocalStorage(id, name);
    } else {
      DeleteLocalStorage(id);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1>VOS FAVORIS</h1>
        {allFavorites.map((favorite: { id: number; name: string }) => (
          <div key={favorite.id}>
            <NavLink to={"/receipe/" + favorite.name}>{favorite.name}</NavLink>
            <input
              type="checkbox"
              id={"favCheckBox" + favorite.id}
              className="addToFavoris"
              onClick={() => LocalStorage(favorite.id, favorite.name)}
              defaultChecked={true}
            ></input>
          </div>
        ))}
      </main>
    </>
  );
}
