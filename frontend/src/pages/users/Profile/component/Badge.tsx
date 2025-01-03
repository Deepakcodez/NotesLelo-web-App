import React from "react";

const Badge = ({ rank }: { rank?: number }) => {
  // Badge colors based on rank
  const colors = ["bg-gray-700/50", "bg-yellow-400", "bg-gray-400", "bg-orange-500"]; // Gray, Gold, Silver, Bronze

  return (
    <div className="w-full bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-2xl text-gray-500 mb-4 font-thin">Badges</h2>
      <div className="flex flex-wrap justify-center gap-4 pb-3">
        {/* Bronze Badge */}
        <div
          className={`w-12 aspect-square rotate-45 rounded-xl ${
            rank === 3 || rank === 2 || rank === 1 ? colors[3] : colors[0]
          }`}
        ></div>
        {/* Silver Badge */}
        <div
          className={`w-12 aspect-square rotate-45 rounded-xl ${
            rank === 2 || rank === 1 ? colors[2] : colors[0]
          }`}
        ></div>
        {/* Gold Badge */}
        <div
          className={`w-12 aspect-square rotate-45 rounded-xl ${
            rank === 1 ? colors[1] : colors[0]
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Badge;
