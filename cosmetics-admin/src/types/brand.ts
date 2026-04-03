export interface Brand {
  id: number;
  name: string;
  logo: string;
  country: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: string;
  updatedAt?: string;
}

/* =========================
   Brand Entity (DB Model)
========================= */
// export interface Brand {
//   id: string;
//   name: string;
//   description?: string | null;
//   isActive?: boolean;
//   createdAt: string;
//   updatedAt: string;
//   productsCount?: number;
// }

/* =========================
   Pagination Meta
========================= */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number; // backend এর সাথে match করো
}

/* =========================
   Paginated Brand Response
========================= */
export interface BrandListResponse {
  success: boolean;
  message?: string;
  data: Brand[];
  meta: PaginationMeta;
}

/* =========================
   Single Brand Response
========================= */
export interface BrandResponse {
  success: boolean;
  message?: string;
  data: Brand;
}

/* =========================
   Create / Update DTO
========================= */
export interface CreateBrandDto {
  name: string;
  country: string;
  logo?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export interface UpdateBrandDto {
  name?: string;
  country?: string;
  logo?: string;
  status?: "ACTIVE" | "INACTIVE";
}
