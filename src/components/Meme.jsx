import React from "react";

const Meme = ({ template }) => {
  return (
    <div>
      <img
        src={template.url}
        alt={template.name}
        height={template.height}
        width={template.width}
      />
    </div>
  );
};

export default Meme;
