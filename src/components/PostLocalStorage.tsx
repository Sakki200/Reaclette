export default function PostLocalStorage(id: number, name: string) {
  const storeObject = { id: id, name: name };
  const storeObjectStringify = JSON.stringify(storeObject);

  localStorage.setItem("reaclette", storeObjectStringify);
}
