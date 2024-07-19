import { useEffect, useState } from "react";
import TimeSlider from "../components/TimeSlider";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";

export default function AllReceipe() {
  //TYPAGE
  interface ingredients {
    ingredient: string;
    quantity: string;
  }
  interface APIObject {
    id: number;
    name: string;
    img: string;
    category: string;
    time: string;
    people: number;
    ingredients: ingredients[];
    step01: string;
    step02: string;
    step03: string;
  }

  const [receipeAll, setReceipeAll] = useState<APIObject[]>([]);
  const [peopleData, setPeopleData] = useState<number>(1);
  const port = import.meta.env.API_PORT;

  useEffect(() => {
    fetch(port + "/receipes", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((receipes) => {
        setReceipeAll(receipes);
      });
  }, []);

  //FONCTION TRI
  const filterByCategory = async (category: string) => {
    const response = await fetch(`${port}/receipes?category=${category}`);
    const data = await response.json();
    setReceipeAll(data);
  };

  const filterByPeople = async (number: number) => {
    setPeopleData(number);
    const response = await fetch(`${port}/receipes?people=${number}`);
    const data = await response.json();
    setReceipeAll(data);
  };

  return (
    <>
      <Header />
      <img src="public/img/reaclette_logo.png" alt="" />
      <main>
        <h1>TOUTES NOS RECETTES</h1>
        <section className="researchFilter">
          <div className="categoryFilter">
            <h2>Catégorie</h2>
            <button
              id="categoryEntree"
              onClick={() => filterByCategory("entree")}
            >
              Entrée
            </button>
            <button id="categoryPlat" onClick={() => filterByCategory("plat")}>
              Plat
            </button>
            <button
              id="categoryDessert"
              onClick={() => filterByCategory("dessert")}
            >
              Dessert
            </button>
          </div>
          <div className="TimeFilter">
            <h2>Temps de préparation</h2>
            <TimeSlider />
          </div>
          <div className="PeopleFilter">
            <h2>Nombre de personnes</h2>
            <p>{peopleData} personnes</p>
            <input
              type="range"
              min="1"
              max="12"
              value={peopleData}
              onChange={(e: any) => filterByPeople(e.target.value)}
            />
          </div>
        </section>
        <section className="researchDisplay">
          {receipeAll.map((receipe, index) => (
            <article key={index}>
              <img src={receipe.img} alt={receipe.name} />
              <h2>{receipe.name}</h2>
              <div>
                <p>{receipe.category}</p>
                <p>{receipe.time}</p>
                <p>{receipe.people}</p>
              </div>

              <NavLink to={"/receipe/" + receipe.id}>
                <button>RECETTE</button>
              </NavLink>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
