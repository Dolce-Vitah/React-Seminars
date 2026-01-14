import React from "react";
import UnreadMessages from "./components/UnreadMessages";

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <UnreadMessages />
    </div>
  );
};

export default App;