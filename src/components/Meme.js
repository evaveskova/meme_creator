import React from "react";

export const Meme = ({ template, onClick }) => {
  return (
    <img
      key={template.id}
      src={template.url}
      alt={template.name}
      onClick={onClick}
    />
  );
};
