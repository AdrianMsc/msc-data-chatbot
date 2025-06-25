import { faqsMock } from "./consants";
import FaqCard from "./FaqCard";

const FaqContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full xl:w-[100%] h-fit max-h-[500px] gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Frequently Asked</h2>

      <div className="flex flex-row gap-4 justify-start w-full h-fit rounded-lg overflow-x-auto no-scrollbar pb-5">
        {faqsMock.map((f, index) => (
          <div key={index} className="flex-shrink-0 w-[250px]">
            <FaqCard title={f.title} description={f.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqContainer;
