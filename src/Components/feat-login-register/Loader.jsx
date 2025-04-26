import CircularProgress from "@mui/material/CircularProgress";
import login_Logo from "/login_Logo.png";

export const Loader = () => {
  return (
    <div className="h-svh flex flex-col gap-8 justify-center items-center align-middle mx-auto my-auto">
      <img src={login_Logo} className=" animate-bounce" />
      <div className="flex items-center gap-4">
        <CircularProgress size={30} />
        <span className="font-sans text-xl">
          Starting server please wait...
        </span>
      </div>
    </div>
  );
};
