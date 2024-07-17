import { useEffect, useState } from "react";
import Header from "../components/Header";
import TimeSlider from "../components/TimeSlider";
import PeopleSlider from "../components/PeopleSlider";

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

  useEffect(() => {
    fetch("http://localhost:3000/Receipes", {
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

  return (
    <>
      <Header />
      <main>
        <h1>TOUTES NOS RECETTES</h1>
        <section className="researchFilter">
          <div className="categoryFilter">
            <h2>Catégorie</h2>
            <p>Entrée</p>
            <p>Plat</p>
            <p>Dessert</p>
          </div>
          <div className="TimeFilter">
            <h2>Temps de préparation</h2>
            <TimeSlider />
          </div>
          <div className="PeopleFilter">
            <h2>Nombre de personnes</h2>
            <PeopleSlider />
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
              <button>RECETTE</button>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
