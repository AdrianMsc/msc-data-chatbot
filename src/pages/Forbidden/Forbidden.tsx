import { MscLogo } from "../../assets/brand/MscLogo";

const Forbidden = () => {
  return (
    <>
      <main className="h-screen w-screen flex items-center justify-center">
        <div className="flex-col flex items-center justify-center">
          <MscLogo />
          <h1>You are not allowed to access</h1>
        </div>
      </main>
    </>
  );
};

export default Forbidden;
