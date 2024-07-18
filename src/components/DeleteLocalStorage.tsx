export default function DeleteLocalStorage(id: number) {
  const allFavorite = JSON.parse(localStorage.getItem("reaclette"));
  console.log(typeof allFavorite);
}
