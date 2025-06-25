"use client";
import Statement from "@/components/Statement/Statement";
import { useParams } from "next/navigation";

const StatementPage = () => {
  const params = useParams();
  return (
    <>
      <Statement params={params} />
    </>
  );
};

export default StatementPage;
