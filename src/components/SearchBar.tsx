import {  useState } from "react";
import { NavLink } from "react-router-dom";

export default function SearchBar() {
  const [urlFromID1, setUrlFromID1] = useState("/receipe/all");
  const [urlFromID2, setUrlFromID2] = useState("/receipe/all");
  const [urlFromID3, setUrlFromID3] = useState("/receipe/all");

  const searchBar = document.getElementById("searchBar") as HTMLInputElement;
  const displayResearch1 = document.getElementById(
    "displayResearch1"
  ) as HTMLParagraphElement;
  const displayResearch2 = document.getElementById(
    "displayResearch2"
  ) as HTMLParagraphElement;
  const displayResearch3 = document.getElementById(
    "displayResearch3"
  ) as HTMLParagraphElement;

  const getAPISearch = async () => {
    if (searchBar.value) {
      try {
        displayResearch1.innerText = "";
        displayResearch2.innerText = "";
        displayResearch3.innerText = "";

        const response = await fetch(
          `http://localhost:3000/receipes?name=${searchBar.value}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        displayResearch1.innerText = data[0].name;
        setUrlFromID1("/receipe/" + data[0].id);
        displayResearch2.innerText = data[1].name;
        setUrlFromID2("/receipe/" + data[1].id);
        displayResearch3.innerText = data[2].name;
        setUrlFromID3("/receipe/" + data[2].id);
      } catch (error) {
        console.log("error : " + error);
      }
    }
  };

  return (
    <>
      <input type="text" name="" id="searchBar" onChange={getAPISearch} />
      <div>
        <NavLink id="displayResearch1" to={urlFromID1}></NavLink>
        <NavLink id="displayResearch2" to={urlFromID2}></NavLink>
        <NavLink id="displayResearch3" to={urlFromID3}></NavLink>
      </div>
    </>
  );
}
