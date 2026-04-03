export interface BodyType {
  id: number;
  type: string;
  icon: string;
  createdAt?: string;
  updatedAt?: string;
}

/* =========================
   Pagination Meta
========================= */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

/* =========================
   Paginated BodyType Response
========================= */
export interface BodyTypeListResponse {
  success: boolean;
  message?: string;
  data: BodyType[];
  meta: PaginationMeta;
}

/* =========================
   Single BodyType Response
========================= */
export interface BodyTypeResponse {
  success: boolean;
  message?: string;
  data: BodyType;
}

/* =========================
   Create / Update DTO
========================= */
export interface CreateBodyTypeDto {
  type: string;
  icon: string;
}

export interface UpdateBodyTypeDto {
  type: string;
  icon: string;
}
