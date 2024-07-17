import { useState } from "react";

export default function TimeSlider() {
  // Convert 5 minutes and 5 hours to minutes
  const minValue = 5;
  const maxValue = 5 * 60;
  const [timeData, setTimeData] = useState<number>(minValue);

  // Convert minutes to a readable format (hours and minutes)
  const formatValue = (value: any) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours} heures ${minutes} minutes`;
  };

  return (
    <div>
      <p>{formatValue(timeData)}</p>
      <input
        type="range"
        min={minValue}
        max={maxValue}
        value={timeData}
        onChange={(e: any) => setTimeData(e.target.value)}
      />
    </div>
  );
}
