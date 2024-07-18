import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import PostLocalStorage from "../components/PostLocalStorage";
import DeleteLocalStorage from "../components/DeleteLocalStorage";

export default function Receipe() {
  const { id } = useParams();
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
  const [receipe, setReceipe] = useState<APIObject>({
    id: 0,
    name: "",
    img: "",
    category: "",
    time: "",
    people: 0,
    ingredients: [],
    step01: "",
    step02: "",
    step03: "",
  });

  useEffect(() => {
    console.log(id);
    //Recup info API
    fetch(`http://localhost:3000/receipes?id=` + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReceipe(data[0]);
      });
  }, [id]);

  const LocalStorage = () => {
    const favButton = document.getElementById(
      "favCheckBox"
    ) as HTMLInputElement;

    if (favButton.checked) {
      PostLocalStorage(receipe.id, receipe.name);
    } else {
      DeleteLocalStorage(receipe.id);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1>{receipe.name}</h1>
        <article>
          <input
            type="checkbox"
            id="favCheckBox"
            className="addToFavoris"
            onClick={LocalStorage}
          ></input>
          <section className="productInfo">
            <div className="productHeader">
              <p>{receipe.category}</p>
              <p>{receipe.time}</p>
              <p>{receipe.people}P</p>
            </div>
            <div className="productIngredients">
              <h3>INGRÉDIENTS</h3>
              <ul>
                {receipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.ingredient}{" "}
                    {ingredient.quantity ? " : " + ingredient.quantity : ""}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="productImg">
            <figure>
              <img src={receipe.img} alt="Photo du plat" />
            </figure>
          </section>
          <section className="productSteps">
            <article>
              <h2>ÉTAPE N°1</h2>
              <p>{receipe.step01}</p>
            </article>
            <article>
              <h2>ÉTAPE N°2</h2>
              <p>{receipe.step02}</p>
            </article>
            <article>
              <h2>ÉTAPE N°3</h2>
              <p>{receipe.step03}</p>
            </article>
          </section>
        </article>
      </main>
    </>
  );
}
