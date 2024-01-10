import ProfileSearchContacts from "./ProfileSearchContacts";
import OpenChat from "./OpenChat";

import { Routes, Route } from "react-router-dom";
import NewChat from "./NewChat";
import DummyRight from "./DummyRight";

function App() {
  return (
    <div id="entire-screen">
      <ProfileSearchContacts />
      <Routes>
        <Route path="/" element={<DummyRight />} />
        <Route path="/:id" element={<OpenChat />} />
        <Route path="/newChat" element={<NewChat />} />
      </Routes>
    </div>
  );
}

export default App;
