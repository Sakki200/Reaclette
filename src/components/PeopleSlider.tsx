import { useState } from "react";

export default function PeopleSlider() {
  const [peopleData, setPeopleData] = useState<number>(1);

  return (
    <>
      <p>{peopleData} personnes</p>
      <input
        type="range"
        min="1"
        max="12"
        value={peopleData}
        onChange={(e) => setPeopleData(e.target.value)}
      />
    </>
  );
}
