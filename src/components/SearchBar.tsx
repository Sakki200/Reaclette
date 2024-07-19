import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function SearchBar() {
  const [urlFromID1, setUrlFromID1] = useState("/receipe/all");
  const [urlFromID2, setUrlFromID2] = useState("/receipe/all");
  const [urlFromID3, setUrlFromID3] = useState("/receipe/all");
  const [searchValue, setSearchValue] = useState("");

  const displayResearch1 = document.getElementById(
    "displayResearch1"
  ) as HTMLAnchorElement;
  const displayResearch2 = document.getElementById(
    "displayResearch2"
  ) as HTMLAnchorElement;
  const displayResearch3 = document.getElementById(
    "displayResearch3"
  ) as HTMLAnchorElement;

  const resetText = () => {
    if (displayResearch1) {
      displayResearch1.innerText = "";
    }
    if (displayResearch2) {
      displayResearch2.innerText = "";
    }
    if (displayResearch3) {
      displayResearch3.innerText = "";
    }
  };

  const getAPISearch = async () => {
    console.log("object");
    try {
      resetText();
      const response = await fetch(
        `https://reaclette-api.vercel.app/receipes`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      const textLowerCase = searchValue.toLowerCase();

      const filteredData = data.filter((item: any) => {
        console.log(item);
        return item.name.toLowerCase().includes(textLowerCase);
      });

      if (filteredData.length > 0) {
        displayResearch1.innerText = filteredData[0].name
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char: any) => char.toUpperCase());
        setUrlFromID1("/receipe/" + filteredData[0].id);
      }

      if (filteredData.length > 1) {
        displayResearch2.innerText = filteredData[1].name
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char: any) => char.toUpperCase());
        setUrlFromID2("/receipe/" + filteredData[1].id);
      }

      if (filteredData.length > 2) {
        displayResearch3.innerText = filteredData[2].name
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char: any) => char.toUpperCase());
        setUrlFromID3("/receipe/" + filteredData[2].id);
      }
    } catch (error) {
      console.log("error : " + error);
    }
  };
  useEffect(() => {
    const toggleNone = document.querySelector("#searchBarHeaderToggle");
    if (searchValue) {
      toggleNone?.classList.remove("displayNone");
      getAPISearch();
    } else {
      toggleNone?.classList.add("displayNone");
      resetText();
    }
  }, [searchValue]);

  return (
    <>
      <div className="searchBarHeader">
        <input
          type="text"
          name=""
          id="searchBar"
          placeholder="Raclette, Tarte aux fraises, Omelette, Fondant au chocolat ..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div id="searchBarHeaderToggle" className="displayNone">
          <NavLink id="displayResearch1" to={urlFromID1}></NavLink>
          <NavLink id="displayResearch2" to={urlFromID2}></NavLink>
          <NavLink id="displayResearch3" to={urlFromID3}></NavLink>
        </div>
      </div>
    </>
  );
}
