import dynamic from "next/dynamic";
import { getBaseUrl } from "@/helpers/config/envConfig";
import Loading from "@/app/loading";

const ProductDetails = dynamic(
  () => import("@/components/productDetails/ProductDetails"),
  {
    ssr: true,
    loading: () => <Loading />,
  }
);

export const metadata = {
  title: "Nigar | Product Details",
};

const ProductDetailsPage = async ({ params }: any) => {
  const res = await fetch(`${getBaseUrl()}/products/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  const product = data?.data;

  // const projectData = await getSingleProjects(params.id);

  //   let project;

  //   if (projectData?.content && projectData?.iv) {
  //     const decrypted = decrypt(projectData?.content, projectData?.iv);
  //     project = decrypted;
  //   } else {
  //     return <Loading />;
  //   }

  return (
    <section className="container mx-auto px-4">
      <ProductDetails product={product} />
    </section>
  );
};

export default ProductDetailsPage;
