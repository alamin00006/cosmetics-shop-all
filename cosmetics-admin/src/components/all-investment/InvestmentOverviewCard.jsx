// import Lottie from "lottie-react";

// import animationData from "../../../animations/DashboardAnimation1.json";
// import investor from "../../../animations/investor.json";
// import investmentAnimation from "../../../animations/investmentAnimation.json";
// import quarterly from "../../../animations/quarterly.json";
// import yearly from "../../../animations/yearly.json";
const InvestmentOverviewCard = ({
  totalInvestors,
  monthlyInvestors,
  quarterlyInvestors,
  yearlyInvestors,
  totalInvestmentAmount,
}) => {
  return (
    <>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 p-4">
        <div className="flex flex-1 items-center rounded-lg bg-green-500 p-2 text-white shadow-md">
          <div className="mr-4 text-xl">
            <i className="fa fa-users"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Total Investors</h4>
            <h5 className="text-xl font-bold">{totalInvestors}</h5>
            {/* <Lottie
              animationData={investor}
              loop
              autoplay
              style={{ height: "100px", width: "400px" }}
            /> */}
          </div>
        </div>

        <div className="flex flex-1 items-center rounded-lg bg-blue-500 p-2 text-white shadow-md">
          <div className="mr-4 text-xl">
            <i className="fa fa-coins"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Total Receive Investment</h4>
            <h5 className="text-xl font-bold">
              Tk {totalInvestmentAmount?.toLocaleString()}
            </h5>
            {/* <Lottie
              animationData={investmentAnimation}
              loop
              autoplay
              style={{ height: "100px", width: "400px" }}
            /> */}
          </div>
        </div>
        <div className="flex min-w-[200px] flex-1 items-center rounded-lg bg-slate-800 p-4 text-white shadow-md">
          <div className="mr-4 text-2xl">
            <i className="fa fa-calendar-alt"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Monthly Investors</h4>
            <h5 className="text-xl font-bold"> {monthlyInvestors || 0}</h5>
            {/* <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{ height: "100px", width: "400px" }}
            /> */}
          </div>
        </div>
        <div className="flex min-w-[200px] flex-1 items-center rounded-lg bg-yellow-800 p-4 text-white shadow-md">
          <div className="mr-4 text-2xl">
            <i className="fa fa-calendar-alt"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Quarterly Investors</h4>
            <h5 className="text-xl font-bold"> {quarterlyInvestors || 0}</h5>
            {/* <Lottie
              animationData={quarterly}
              loop
              autoplay
              style={{ height: "100px", width: "400px" }}
            /> */}
          </div>
        </div>

        <div className="bg-red-500 flex min-w-[200px] flex-1 items-center rounded-lg bg-green-500 p-4 text-white shadow-md">
          <div className="mr-4 text-2xl">
            <i className="fa fa-chart-line"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Yearly Investors</h4>
            <h5 className="text-xl font-bold"> {yearlyInvestors || 0}</h5>
            {/* <Lottie
              animationData={quarterly}
              loop
              autoplay
              style={{ height: "100px", width: "400px" }}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentOverviewCard;
