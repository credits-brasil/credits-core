export const get5232PerfilComportamentalInput = (perfilComportamental: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => perfilComportamental.resumo.$["quantidade-total"];
