import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import ChatPage from "./pages/Chat/ChatPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Forbidden from "./pages/Forbidden/Forbidden";
import { ChatProvider } from "./context/ChatContext";

const App = () => {
  return (
    <ChatProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Forbidden />} />
        <Route path="/forbidden" element={<Forbidden />} />
      </Routes>
    </ChatProvider>
  );
};

export default App;
