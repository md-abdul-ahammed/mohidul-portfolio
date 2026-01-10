import React, { createContext, useContext } from "react";

// Create a context to share the "active token" info (for now, just a placeholder)
const TextRevealContext = createContext({ activeIndex: 0 });

export const TextReveal = ({ body, children, className }) => {
  const tokens = body.split(" "); // split text into words

  // For now, no scroll logic, just render tokens
  return (
    <TextRevealContext.Provider value={{}}>
      <div className={className}>
        {children(tokens)}
      </div>
    </TextRevealContext.Provider>
  );
};

// Subcomponent for each token
TextReveal.Token = ({ index, children }) => {
  // For now, just always active
  const isActive = true; // later you can update based on scroll position
  return children(isActive);
};

export default TextReveal;
