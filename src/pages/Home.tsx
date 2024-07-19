import Header from "../components/Header";
import SearchBarHome from "../components/SearchBar_Home";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <img src="public/img/reaclette_home_logo.png" alt="Logo Reaclette v2" />
        <h1>TROUVE LA RECETTE DE TON PLAT FAVORIS</h1>
        <SearchBarHome />
      </main>
    </>
  );
}
