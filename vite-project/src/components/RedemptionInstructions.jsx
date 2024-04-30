import React from "react";

const RedemptionInstructions = ({ instructions }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Redemption Instructions:</h2>
      <div dangerouslySetInnerHTML={{ __html: instructions }} />
    </div>
  );
};

export default RedemptionInstructions;
