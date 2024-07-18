export default function DeleteLocalStorage(id: number) {
  let tableStoreObject: { id: number; name: string }[] = [];

  const addElementTarget = (tableStoreObject: any) => {
    const storeTableStringify = JSON.stringify(tableStoreObject);

    localStorage.setItem("reaclette", storeTableStringify);
  };

  const isStorage = localStorage.getItem("reaclette");
  if (isStorage) {
    tableStoreObject = JSON.parse(isStorage);
    console.log(tableStoreObject);

    if (tableStoreObject.some((item: any) => item.id === id)) {
      tableStoreObject = tableStoreObject.filter((item: any) => item.id !== id);
      addElementTarget(tableStoreObject);
      return;
    }
  }
}
