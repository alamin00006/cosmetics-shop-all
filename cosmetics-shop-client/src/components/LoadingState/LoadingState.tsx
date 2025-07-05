import ReactModal from "react-modal";
import { ScaleLoader } from "react-spinners";

const LoadingState = ({ isLoadingState }: any) => {
  return (
    <ReactModal
      style={{
        content: {
          top: "50%",
          left: "50%",
          marginRight: "-50%",
          transform: "translate(-50%, -45%)",
          padding: 0,
          border: 0,
          background: "transparent",
        },
      }}
      ariaHideApp={false}
      isOpen={isLoadingState}
    >
      <div className="flex justify-center items-center">
        <ScaleLoader
          height={30}
          width={4}
          speedMultiplier={0.8}
          color="#36d7b7"
        />
      </div>
    </ReactModal>
  );
};

export default LoadingState;
