import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BrandTabs = () => {
  return (
    <Tabs defaultValue="brand">
      <TabsList className="grid grid-cols-2 w-full sm:w-auto">
        <TabsTrigger value="brand">Brand</TabsTrigger>
        <TabsTrigger value="model">Model</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default BrandTabs;
