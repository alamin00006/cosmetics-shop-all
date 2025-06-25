const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div key={index} className="relative ">
            {/* Step number with styling */}
            <div className="flex relative z-10">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ease-in-out border-2 ${
                  currentStep > index
                    ? "bg-rose-700 border-rose-700 text-white"
                    : currentStep === index
                    ? "bg-rose-500 border-rose-500 text-white"
                    : "bg-gray-200 border-gray-300 text-gray-400 opacity-60"
                }`}
              >
                <span
                  className={`text-lg font-semibold ${
                    currentStep >= index ? "text-white" : "text-black"
                  }`}
                >
                  {index + 1}
                </span>
              </div>
            </div>

            {/* Step title */}
            <div className=" mt-4">
              <span
                className={`text-sm font-semibold transition-colors duration-300 ease-in-out ${
                  currentStep >= index ? "text-black" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
