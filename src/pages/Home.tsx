import Header from "../components/Header";
import SearchBarHome from "../components/SearchBar_Home";
import ReacletteLogoV2 from "../../public/img/reaclette_home_logo.png";

export default function Home() {
  return (
    <>
      <Header />
      <main className="home">
        <figure>
          <img src={ReacletteLogoV2} alt="Logo Reaclette v2" />
        </figure>
        <h1>TROUVE LA RECETTE DE TON PLAT FAVORIS</h1>
        <SearchBarHome />
      </main>
    </>
  );
}
