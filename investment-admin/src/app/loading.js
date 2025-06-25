// import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    // <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
    //   <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    // </div>
    <div className="flex justify-center flex-col items-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
