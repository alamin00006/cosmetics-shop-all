import { Toaster } from "react-hot-toast";

const ToasterMessage = () => {
  return (
    <Toaster
      position="top-center"
      containerStyle={{ marginTop: "60px" }}
      reverseOrder={false}
    />
  );
};

export default ToasterMessage;
