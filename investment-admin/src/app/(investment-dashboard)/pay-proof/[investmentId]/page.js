"use client";
import PaymentProof from "@/components/paymentProof/PaymentProof";
import { useParams } from "next/navigation";

const PaymentProofPage = () => {
  const params = useParams();
  return (
    <>
      <PaymentProof params={params} />
    </>
  );
};

export default PaymentProofPage;
