// import { Brand } from "@prisma/client";

export interface Repository {
  getAllBrands: () => Promise<any[] | []>;
//   getBrandById: (id: string) => Promise<Brand | null>;
//   getBrandByName: (name: string) => Promise<Brand | null>;
//   createBrand: (body: CreateBrandInput) => Promise<Brand>;
}

// export interface CreateBrandInput {
//   name: string;
//   logo: string;
// }