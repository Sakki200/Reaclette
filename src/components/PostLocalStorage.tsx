export default function PostLocalStorage(id: number, name: string) {
  let tableStoreObject: { id: number; name: string }[] = [];

  const addElementTarget = (tableStoreObject: any) => {
    const storeObject = { id: id, name: name };
    tableStoreObject.push(storeObject);

    const storeTableStringify = JSON.stringify(tableStoreObject);

    localStorage.setItem("reaclette", storeTableStringify);
  };

  const isStorage = localStorage.getItem("reaclette");
  if (isStorage) {
    tableStoreObject = JSON.parse(isStorage);

    if (tableStoreObject.some((item: any) => item.id === id)) {
      return;
    } else {
      addElementTarget(tableStoreObject);
    }
  } else {
    addElementTarget(tableStoreObject);
  }
}
