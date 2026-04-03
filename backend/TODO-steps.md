# Type Safety Fixes - Step-by-Step Execution Plan (Approved)

Status: **🚀 Starting implementation**

## Breakdown (8 steps from approved plan):

### ✅ **1. Create shared Prisma types** (`src/types/prisma.types.ts`) - Define CartWithTotal, export types.

- [x] CartWithTotal interface
- [x] Remove invalid exports (ProductWhereInput etc. not exported publicly)

### ✅ **2. Fix cart.service.ts**

- [x] Return types with CartWithTotal
- [x] Fix colorId null handling
- [x] Type reduce callbacks

### ⏳ **3. Fix products.service.ts**

- Replace `any` with `Prisma.ProductWhereInput` / `ProductOrderByWithRelationInput`
- Fix where clauses (minPrice/maxPrice -> price.gte/lte)

### ⏳ **4. Fix admin.service.ts** (priority - many errors)

- `total` -> `totalAmount` in all `_sum` / access (10+ places)
- Remove `shippingAddress: true` includes (3 places, Json field)
- `prisma.productColor` -> `prisma.color` (2 places)
- Remove `features` from product create
- `productImage || ''` null handling
- Category create: handle id

### ⏳ **5. Fix http-exception.filter.ts**

- Remove `(res as any)`, use `HttpExceptionResponse` interface

### ⏳ **6. Minor fixes**

- prisma.config.ts: fix/remove `@prisma/internals`
- seed.ts: remove `specifications: {}`
- addresses.service.ts: fix create data (no id, use CreateInput)
- auth.service.ts + jwt.strategy.ts: remove `role` (no schema field)
- cart.service.ts: colorId number|null
- orders.service.ts: remove `orderNumber`

### ⏳ **7. Verify**

- `npx prisma generate`
- `npm run build`
- `tsc --noEmit`

### ⏳ **8. Test**

- `npm run start:dev`
- Test cart/products/admin endpoints

**Current progress:** Steps 1-2 ✅, starting 3-6  
**Next:** Fix products.service.ts (step 3)

**Updated TODO.md after completion.**
