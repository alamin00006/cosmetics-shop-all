"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileSpreadsheet,
  AlertTriangle,
  X,
  HelpCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BulkImport = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState("new");
  const [showVariationAlert, setShowVariationAlert] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const stepInstructions = [
    {
      step: 1,
      title: "Download Excel File",
      instructions: [
        "Download the format file and fill it with proper data.",
        "You can download the example file to understand how the data must be filled.",
        "Have to upload excel file.",
      ],
    },
    {
      step: 2,
      title: "Match Spread sheet data according to instruction",
      instructions: [
        "Fill up the data according to the format and validations.",
        "You can get store id module id and unit id from their list please input the right ids.",
        "For ecommerce item available time start and end will be 00:00:00 and 23:59:59",
        "If you want to create a product with variation just create variations from the generate variation section below and click generate value.",
        "Copy the value and paste the the spread sheet file column name variation in the selected product row.",
      ],
    },
    {
      step: 3,
      title: "Validate data and complete import",
      instructions: [
        "In the Excel file upload section first select the upload option.",
        "Upload your file in .xls .xlsx format.",
        "Finally click the upload button.",
        "You can upload your product images in product folder from gallery and copy image s path.",
        "Image file name must be in 30 character.",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileSpreadsheet className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">Items Bulk Import</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stepInstructions.map((step) => (
          <Card key={step.step} className="relative">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Step {step.step}</h3>
                  <p className="text-sm text-muted-foreground">{step.title}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileSpreadsheet className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Instruction</h4>
                <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                  {step.instructions.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-lg font-medium">Download spreadsheet template</h3>
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="min-w-[160px]">
            With Current Data
          </Button>
          <Button className="min-w-[160px]">Without Any Data</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Select Data Upload Type</h3>
            <RadioGroup
              value={uploadType}
              onValueChange={setUploadType}
              className="space-y-0"
            >
              <div
                className={`flex items-center justify-between p-4 rounded-t-lg border ${uploadType === "new" ? "bg-primary/5 border-primary" : "bg-muted/30"}`}
              >
                <Label
                  htmlFor="upload-new"
                  className="cursor-pointer font-medium"
                >
                  Upload New Data
                </Label>
                <RadioGroupItem value="new" id="upload-new" />
              </div>
              <div
                className={`flex items-center justify-between p-4 rounded-b-lg border border-t-0 ${uploadType === "update" ? "bg-primary/5 border-primary" : "bg-muted/30"}`}
              >
                <Label
                  htmlFor="upload-update"
                  className="cursor-pointer font-medium"
                >
                  Update Existing Data
                </Label>
                <RadioGroupItem value="update" id="upload-update" />
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Import Items File</h3>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors bg-muted/20">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-10 w-10 mx-auto text-primary mb-4" />
                {selectedFile ? (
                  <div className="space-y-1">
                    <p className="font-medium text-primary">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Must be Excel files using our Excel template above
                  </p>
                )}
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setSelectedFile(null)}>
                Reset
              </Button>
              <Button disabled={!selectedFile}>Upload</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-medium">Generate Variation</h3>
          {showVariationAlert && (
            <Alert className="bg-amber-500/10 border-amber-500/20">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="flex items-start justify-between text-amber-700">
                <span className="text-sm">
                  <strong>Attention!</strong> You must generate variations from
                  this generator if you want to add variations to your products.
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0 ml-2"
                  onClick={() => setShowVariationAlert(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </AlertDescription>
            </Alert>
          )}
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <Label className="text-sm font-medium mb-2 block">
                Attribute
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select attribute" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="size">Size</SelectItem>
                  <SelectItem value="color">Color</SelectItem>
                  <SelectItem value="weight">Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-6">Generate Value</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                Generated varient <HelpCircle className="h-3 w-3" />{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                className="min-h-[120px] resize-y"
                placeholder=""
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                Generated choice option <HelpCircle className="h-3 w-3" />{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                className="min-h-[120px] resize-y"
                placeholder=""
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                Generated attributes field <HelpCircle className="h-3 w-3" />{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                className="min-h-[120px] resize-y"
                placeholder=""
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline">Reset</Button>
          </div>
        </CardContent>
      </Card>

      <footer className="text-center text-sm text-muted-foreground py-4 border-t">
        © Nigar. 2021-2026 Nigar Fashion
        <span className="ml-4">Business setup</span>
        <span className="ml-4">Profile</span>
        <span className="ml-4">Home</span>
        <span className="ml-4 text-primary">Software Version : 3.6</span>
      </footer>
    </div>
  );
};

export default BulkImport;
