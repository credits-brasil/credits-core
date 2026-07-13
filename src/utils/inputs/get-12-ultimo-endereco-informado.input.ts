export const get12UltimoEnderecoInformadoInput = (ultimoEnderecoInformado: {
  "detalhe-ultimo-endereco-informado"?: {
    endereco?: {
      $?: {
        logradouro?: string;
        numero?: string;
        complemento?: string;
        bairro?: string;
        cep?: string;
      };
      cidade?: {
        $?: {
          nome?: string;
        };
        estado?: {
          $?: {
            "sigla-uf"?: string;
          };
        };
      };
    };
  }[];
}): {
  "detalhe-ultimo-endereco-informado": {
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
  }[];
} => ({
  "detalhe-ultimo-endereco-informado":
    ultimoEnderecoInformado?.["detalhe-ultimo-endereco-informado"]?.map(
      (i) => ({
        logradouro: i.endereco?.$?.logradouro,
        numero: i.endereco?.$?.numero,
        complemento: i.endereco?.$?.complemento,
        bairro: i.endereco?.$?.bairro,
        cep: i.endereco?.$?.cep,
        cidade: i.endereco?.cidade?.$?.nome,
        estado: i.endereco?.cidade?.estado?.$?.["sigla-uf"],
      }),
    ) ?? [],
});
