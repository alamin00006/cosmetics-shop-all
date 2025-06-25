import InvestmentPlace from "@/components/Investment-submit/InvestmentPlace";

export const metadata = {
  title: "Sharikana | Investment Place ",
};

const InvestmentSubmitPage = ({ params }) => {
  return (
    <div>
      <InvestmentPlace params={params} />
    </div>
  );
};

export default InvestmentSubmitPage;
