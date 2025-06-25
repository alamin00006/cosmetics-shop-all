import { returnTypes } from "@/constants/returnType";

const ReturnTypeFilter = ({ profitShareType, setProfitShareType }) => {
  return (
    <div>
      <label htmlFor="return-type" className="mb-2 block text-lg font-bold">
        Select return type
      </label>
      <div className="flex flex-wrap gap-4">
        {returnTypes.map((type, index) => (
          <div className="flex items-center gap-2 " key={index}>
            <input
              id={type}
              type="radio"
              value={type}
              name="return-type"
              className="mr-2"
              onChange={() => setProfitShareType(type)}
              checked={type === profitShareType}
            />
            <label htmlFor={type} className="text-base">
              {type}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReturnTypeFilter;
