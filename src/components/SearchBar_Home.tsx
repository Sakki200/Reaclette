import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function SearchBarHome() {
  const [urlFromID1, setUrlFromID1] = useState("/receipe/all");
  const [urlFromID2, setUrlFromID2] = useState("/receipe/all");
  const [urlFromID3, setUrlFromID3] = useState("/receipe/all");
  const [searchValue, setSearchValue] = useState("");

  const displayResearch1Home = document.getElementById(
    "displayResearch1Home"
  ) as HTMLAnchorElement;
  const displayResearch2Home = document.getElementById(
    "displayResearch2Home"
  ) as HTMLAnchorElement;
  const displayResearch3Home = document.getElementById(
    "displayResearch3Home"
  ) as HTMLAnchorElement;

  const resetText = () => {
    if (displayResearch1Home) {
      displayResearch1Home.innerText = "";
    }
    if (displayResearch2Home) {
      displayResearch2Home.innerText = "";
    }
    if (displayResearch3Home) {
      displayResearch3Home.innerText = "";
    }
  };

  const getAPISearch = async () => {
    console.log("object");
    try {
      resetText();
      const response = await fetch(`https://reaclette-api.vercel.app/receipes`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      const textLowerCase = searchValue.toLowerCase();

      const filteredData = data.filter((item: any) => {
        console.log(item);
        return item.name.toLowerCase().includes(textLowerCase);
      });

      if (filteredData.length > 0) {
        displayResearch1Home.innerText = filteredData[0].name
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char: any) => char.toUpperCase());
        setUrlFromID1("/receipe/" + filteredData[0].id);
      }

      if (filteredData.length > 1) {
        displayResearch2Home.innerText = filteredData[1].name
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char: any) => char.toUpperCase());
        setUrlFromID2("/receipe/" + filteredData[1].id);
      }

      if (filteredData.length > 2) {
        displayResearch3Home.innerText = filteredData[2].name
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char: any) => char.toUpperCase());
        setUrlFromID3("/receipe/" + filteredData[2].id);
      }
    } catch (error) {
      console.log("error : " + error);
    }
  };
  useEffect(() => {
    if (searchValue) {
      getAPISearch();
    } else {
      resetText();
    }
  }, [searchValue]);

  return (
    <>
      <input
        type="text"
        name=""
        id="searchBar"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div>
        <NavLink id="displayResearch1Home" to={urlFromID1}></NavLink>
        <NavLink id="displayResearch2Home" to={urlFromID2}></NavLink>
        <NavLink id="displayResearch3Home" to={urlFromID3}></NavLink>
      </div>
    </>
  );
}
