export default function SearchBar() {
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
    try {
      if (searchBar.value) {
        displayResearch1.innerText = "";
        displayResearch2.innerText = "";
        displayResearch3.innerText = "";

        await fetch(`http://localhost:3000/receipes?name=${searchBar.value}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })
          .then((response: any) => response.json())
          .then((data: any) => {
            displayResearch1.innerText = data[0].name;
            displayResearch2.innerText = data[1].name;
            displayResearch3.innerText = data[2].name;
          });
      }
    } catch (error) {
      console.log("error : " + error);
    }
  };

  return (
    <>
      <input type="text" name="" id="searchBar" onChange={getAPISearch} />
      <p id="displayResearch1"></p>
      <p id="displayResearch2"></p>
      <p id="displayResearch3"></p>
    </>
  );
}
