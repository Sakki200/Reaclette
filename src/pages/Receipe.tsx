import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import PostLocalStorage from "../components/PostLocalStorage";
import DeleteLocalStorage from "../components/DeleteLocalStorage";
import FavOn from "../../public/img/fav_on.png";
import FavOff from "../../public/img/fav_off.png";
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
    //Recup info API
    fetch(`https://reaclette-api.vercel.app/receipes?id=` + id, {
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
      "favCheckBox" + id
    ) as HTMLInputElement;
    const favIcon = document.getElementById("favIcon" + id) as HTMLInputElement;
    favButton.checked = !favButton.checked;

    if (favButton.checked) {
      PostLocalStorage(receipe.id, receipe.name);
      favIcon.src = FavOn;
    } else {
      DeleteLocalStorage(receipe.id);
      favIcon.src = FavOff;
    }
  };

  const lauchFavorite = async () => {
    const favButton = document.getElementById(
      "favCheckBox" + id
    ) as HTMLInputElement;
    const favIcon = document.getElementById("favIcon" + id) as HTMLInputElement;
    const getItem = localStorage.getItem("reaclette");
    const allFavorites: { id: number; name: string }[] = getItem
      ? JSON.parse(getItem)
      : [];
    console.log(allFavorites);
    if (allFavorites.some((item: any) => item.id === receipe.id)) {
      console.log("yes");
      favButton.checked = true;
      favIcon.src = FavOn;
    } else {
      console.log("no");
      favButton.checked = false;
      favIcon.src = FavOff;
    }
  };
  setTimeout(() => {
    lauchFavorite();
  }, 500);

  const stepsInnerHTML = (text: string) => {
    return { __html: text.replace(/\./g, ".<br>") };
  };

  return (
    <>
      <Header />
      <main className="receipe">
        <h1>
          {receipe.name
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </h1>
        <article>
          <section className="productInfo">
            <div className="productHeader">
              <img
                id={"favIcon" + receipe.id}
                className="favIcon"
                src={FavOff}
                alt="Logo favoris"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  LocalStorage();
                }}
              />
              <input
                type="checkbox"
                id={"favCheckBox" + receipe.id}
                className="addToFavoris"
              ></input>
              <div>
                <p>{receipe.category}</p>
                <p>{receipe.time}</p>
                <p>{receipe.people}P</p>
              </div>
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
              <p dangerouslySetInnerHTML={stepsInnerHTML(receipe.step01)}></p>
            </article>
            <article>
              <h2>ÉTAPE N°2</h2>
              <p dangerouslySetInnerHTML={stepsInnerHTML(receipe.step02)}></p>
            </article>
            <article>
              <h2>ÉTAPE N°3</h2>
              <p dangerouslySetInnerHTML={stepsInnerHTML(receipe.step03)}></p>
            </article>
          </section>
        </article>
      </main>
    </>
  );
}
