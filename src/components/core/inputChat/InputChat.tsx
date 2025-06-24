import { useState } from "react";
import useChat from "../../../hooks/useChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";

const InputChat = () => {
  const [inputValue, setInputValue] = useState("");
  const { handleMessage, isLoading } = useChat();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      handleMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-[80%] xl:w-[70%] h-[100px] p-2 bg-white rounded-2xl border"
      style={{ border: "1px solid #DBDBDB" }}
    >
      <textarea
        value={inputValue}
        onChange={handleChange}
        placeholder="Ask anything"
        className="flex-1 resize-none w-full h-full px-3 py-2 pr-20 placeholder:text-start placeholder:text-gray-400 rounded-2xl"
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any); // El casting puede reemplazarse si defines bien el tipo
          }
        }}
      />
      <button
        type="submit"
        className="absolute bottom-3 right-4 px-4 py-1 bg-primary-blue text-white border-none rounded-full cursor-pointer font-semibold hover:bg-primary-blue_dark transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!inputValue.trim() || isLoading}
      >
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        ) : (
          <FontAwesomeIcon icon={faPaperPlane} />
        )}
      </button>
    </form>
  );
};

export default InputChat;
