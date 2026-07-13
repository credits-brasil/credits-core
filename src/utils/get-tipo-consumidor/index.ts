export const getTipoConsumidor = (typeDocument: "CPF" | "CNPJ"): "F" | "J" => {
  const DOCUMENT_TYPE_MAP = {
    CPF: "F",
    CNPJ: "J",
  } as const;

  return (
    DOCUMENT_TYPE_MAP[typeDocument as keyof typeof DOCUMENT_TYPE_MAP] ?? "J"
  );
};
