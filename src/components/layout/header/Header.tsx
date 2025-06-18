import { MscLogo } from "../../../assets/brand/MscLogo";
import useChat from "../../../hooks/useChat";
import LogoutButton from "../../LogoutButton/LogoutButton";

const Header: React.FC = () => {
  const { isLoading, clearChat, messages } = useChat();

  const handleClearChat = () => {
    clearChat();
  };

  return (
    <header className="bg-white shadow-sm py-4 px-5 flex flex-row w-full justify-between items-center sticky top-0 z-40">
      <div className="flex flex-row items-center gap-4 sm:gap-28 lg:gap-[6.6rem] xl:gap-[9.5rem]">
        <MscLogo width={100} />
      </div>
      <div className="flex items-center gap-5">
        {messages.length > 0 && (
          <button
            type="button"
            onClick={handleClearChat}
            className="self-end px-4 py-1 w-fit h-fit bg-primary-blue text-white border-none rounded-full cursor-pointer font-semibold hover:bg-primary-blue_dark transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Clear Chat
          </button>
        )}
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
