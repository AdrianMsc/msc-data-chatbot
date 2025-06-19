interface IFaqCards {
  title?: string;
  description?: string;
}

const FaqCard = ({
  title = "Faq Title",
  description = "This is a short description placeholder",
}: IFaqCards) => {
  return (
    <div className="flex flex-col justify-center max-w-[250px] max-h-[150px] p-4 text-sm rounded-lg bg-white overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default FaqCard;
