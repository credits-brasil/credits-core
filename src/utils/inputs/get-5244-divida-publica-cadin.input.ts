export const get5244DividaPublicaCadinInput = (dividaPublicaCadin: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => dividaPublicaCadin.resumo.$["quantidade-total"];
