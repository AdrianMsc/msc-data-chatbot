import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import Chat from "../../components/layout/chat/Chat";
import AuthStatusAlert from "../../components/AuthStatusAlert/AuthStatusAlert";

const ChatPage = () => {
  return (
    <>
      <AuthStatusAlert />
      <main className="flex flex-col justify-between h-screen">
        <Header />
        <Chat />
        <Footer />
      </main>
    </>
  );
};

export default ChatPage;
