import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function AddReceipe() {
  //CREATION DES INPUTS POUR LES .MAP
  const inputIngredientsRequired = Array.from({ length: 4 }).map((_, index) => (
    <div className="ingredientsDiv" key={index}>
      <input
        type="text"
        name="ingredientName"
        id="ingredientName"
        placeholder="Ingrédient"
        required
      />
      <input
        type="text"
        name="ingredientQuantity"
        id="ingredientQuantity"
        placeholder="Quantité"
      />
    </div>
  ));
  const inputIngredientsNotRequired = Array.from({ length: 6 }).map(
    (_, index) => (
      <div className="ingredientsDiv" key={index}>
        <input
          type="text"
          name="ingredientName"
          id="ingredientName"
          placeholder="Ingrédient"
        />
        <input
          type="text"
          name="ingredientQuantity"
          id="ingredientQuantity"
          placeholder="Quantité"
        />
      </div>
    )
  );

  let idRandom = "";
  for (let i = 0; i < 10; i++) {
    idRandom += Math.floor(Math.random() * 10).toString();
  }

  const navigate = useNavigate();

  const addNewReceipe = async (e: any) => {
    e.preventDefault();

    //RECUP INPUT
    const receipeName = document.getElementById(
      "receipeName"
    ) as HTMLInputElement;
    const receipeImg = document.getElementById(
      "receipeImg"
    ) as HTMLInputElement;
    const receipeCategory = document.getElementById(
      "receipeCategory"
    ) as HTMLInputElement;
    const receipeTime = document.getElementById(
      "receipeTime"
    ) as HTMLInputElement;
    const receipeNbr = document.getElementById(
      "receipeNbr"
    ) as HTMLInputElement;
    const receipeStep1 = document.getElementById(
      "receipeStep1"
    ) as HTMLInputElement;
    const receipeStep2 = document.getElementById(
      "receipeStep2"
    ) as HTMLInputElement;
    const receipeStep3 = document.getElementById(
      "receipeStep3"
    ) as HTMLInputElement;
    const receipeIngredients = Array.from(
      document.querySelectorAll(".ingredientsDiv")
    ).map((div: any) => div);

    //CREATION DE L'OBJET A POST
    const newReceipeAddObject = {
      id: parseInt(idRandom),
      name: receipeName.value.toLowerCase().replace(/\s/g, "_"),
      img: receipeImg.value,
      category: receipeCategory.value,
      time: receipeTime.value,
      people: parseInt(receipeNbr.value),
      ingredients: receipeIngredients.map((div: any) => ({
        ingredient: div.children[0].value,
        quantity: div.children[1].value,
      })),

      step01: receipeStep1.value,
      step02: receipeStep2.value,
      step03: receipeStep3.value,
    };

    //METHOD POST POUR L'API
    try {
      await fetch("https://reaclette-api.vercel.app/receipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReceipeAddObject),
      });
      navigate("/receipe/" + parseInt(idRandom));
    } catch (error) {
      console.log("Error : " + error);
    }
  };

  return (
    <>
      <Header />
      <main className="addReceipe">
        <h1>AJOUTEZ VOTRE RECETTE</h1>
        <form onSubmit={addNewReceipe}>
          <div className="addName">
            <h4>Nom de la recette</h4>
            <input
              type="text"
              name="receipeName"
              id="receipeName"
              placeholder="Raclette"
              required
            />
            <input
              type="url"
              name="receipeImg"
              id="receipeImg"
              placeholder="https://raclette/img.png"
              required
            />
            <img src="public/img/receipe_name.svg" alt="Post-it" width={100} />
          </div>
          <div className="addInformations" id="ingredientsDiv">
            <h4>Informations</h4>
            <div>
              <label htmlFor="receipeCategory">Catégorie</label>
              <select name="receipeCategory" id="receipeCategory" required>
                <option value="entree">Entrée</option>
                <option value="plat">Plat</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
            <div>
              <label htmlFor="receipeTime">Temps de préparation</label>
              <select name="receipeTime" id="receipeTime" required>
                <option value="5min">5 minutes</option>
                <option value="10min">10 minutes</option>
                <option value="20min">20 minutes</option>
                <option value="30min">30 minutes</option>
                <option value="45min">45 minutes</option>
                <option value="1h00">1 heure</option>
                <option value="1h30">1 heure et 30 minutes</option>
                <option value="2h00">2 heures</option>
                <option value="2h30">2 heures et 30 minutes</option>
                <option value="3h00">3 heures</option>
                <option value="3h30">3 heures et 30 minutes</option>
                <option value="4h00">4 heures</option>
                <option value="4h30">4 heures et 30 minutes</option>
                <option value="5h00">5 heures</option>
              </select>
            </div>
            <div>
              <label htmlFor="receipeNbr">Nombre de personnes</label>
              <select name="receipeNbr" id="receipeNbr" required>
                <option value="1">Pour 1 personne</option>
                <option value="2">Pour 2 personnes</option>
                <option value="3">Pour 3 personnes</option>
                <option value="4">Pour 4 personnes</option>
                <option value="5">Pour 5 personnes</option>
                <option value="6">Pour 6 personnes</option>
                <option value="7">Pour 7 personnes</option>
                <option value="8">Pour 8 personnes</option>
                <option value="9">Pour 9 personnes</option>
                <option value="10">Pour 10 personnes</option>
                <option value="11">Pour 11 personnes</option>
                <option value="12">Pour 12 personnes</option>
              </select>
            </div>
            <img src="public/img/receipe_info.svg" alt="Post-it" width={100} />
          </div>
          <div className="addIngredients">
            <h4>Ingrédients</h4>
            {inputIngredientsRequired}
            {inputIngredientsNotRequired}
            <img
              src="public/img/receipe_ingredients.svg"
              alt="Post-it"
              width={100}
            />
          </div>
          <div className="addStep1">
            <h4>Première étape de préparation</h4>
            <textarea
              name="receipeStep1"
              id="receipeStep1"
              placeholder="Écrivez ici la première étape de votre préparation en détail."
              required
            ></textarea>
            <img
              src="public/img/receipe_etape01.svg"
              alt="Post-it"
              width={100}
            />
          </div>
          <div className="addStep2">
            <h4>Deuxième étape de préparation</h4>
            <textarea
              name="receipeStep2"
              id="receipeStep2"
              placeholder="Écrivez ici la deuxième étape de votre préparation en détail."
              required
            ></textarea>
            <img
              src="public/img/receipe_etape02.svg"
              alt="Post-it"
              width={100}
            />
          </div>
          <div className="addStep3">
            <h4>Dernière étape de préparation</h4>
            <textarea
              name="receipeStep3"
              id="receipeStep3"
              placeholder="Écrivez ici la dernière étape de votre préparation en détail."
              required
            ></textarea>
            <img
              src="public/img/receipe_etape03.svg"
              alt="Post-it"
              width={100}
            />
          </div>
          <div className="addConfirm">
            <p>
              Il est obligatoire de remplir tous les champs et au minimum 4
              ingrédients
            </p>
            <button type="submit">VALIDEZ VOTRE RECETTE</button>
          </div>
        </form>
      </main>
    </>
  );
}
