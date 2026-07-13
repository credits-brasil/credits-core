export enum AppError {
  INTERNAL_SERVER_ERROR = "Error Interno do Servidor.",
  GET_ALL_BRANDS_ERROR = "Error ao buscar todas as marcas.",
  REQUIRE_BRAND_NAME_ERROR = "O nome da marca deve ser informado.",
  REQUIRE_BRAND_LOGO_ERROR = "A logo da marca deve ser informado.",
  FOUND_BRAND_BY_NAME_ERROR = "A marca informada já existe em nossa base de dados.",
  CREATE_BRAND_ERROR = "Error ao criar uma nova marca.",
}

export enum AppMessages {
  GET_ALL_BRANDS_SUCCESS = "Marcas encotradas com sucesso.",
  CREATE_BRAND_SUCCESS = "Marca criada com sucesso.",
}