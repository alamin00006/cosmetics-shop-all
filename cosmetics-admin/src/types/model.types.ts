/* =========================
   Fuel Type (Backend Enum)
========================= */
export type FuelType =
  | "PETROL"
  | "DIESEL"
  | "HYBRID"
  | "ELECTRIC";

/* =========================
   Model Status (Backend Enum)
========================= */
export type ModelStatus = "ACTIVE" | "INACTIVE";

/* =========================
   Brand Relation (Included)
========================= */
export interface ModelBrand {
  id: number;
  name: string;
  logo?: string;
  country?: string;
  status?: "ACTIVE" | "INACTIVE";
}

/* =========================
   Model Entity
========================= */
export interface Model {
  id: number;
  brandId: number;
  modelName: string;
  fuelType: FuelType;
  bodyType: string;

  status: ModelStatus;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;

  brand: ModelBrand; // because include: { brand: true }
}

/* =========================
   Pagination Meta
========================= */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

/* =========================
   Get All Models Response
========================= */
export interface ModelListResponse {
  success: boolean;
  message?: string;
  data: Model[];
  meta: PaginationMeta;
  timestamp: string;
}

/* =========================
   Single Model Response
========================= */
export interface ModelResponse {
  success: boolean;
  message?: string;
  data: Model;
  timestamp: string;
}

/* =========================
   Create DTO
========================= */
export interface CreateModelDto {
  brandId: number;
  modelName: string;
  fuelType: FuelType;
  bodyType: string;
}

/* =========================
   Update DTO
========================= */
export interface UpdateModelDto {
  modelName?: string;
  fuelType?: FuelType;
  bodyType?: string;
}
