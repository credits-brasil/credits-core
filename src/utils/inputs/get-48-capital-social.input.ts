export const get48CapitalSocialInput = (capitalSocial: {
  "detalhe-capital-social"?: {
    $?: {
      "valor-capital-social"?: string;
    };
  };
}): string | undefined =>
  capitalSocial?.["detalhe-capital-social"]?.$?.["valor-capital-social"];
