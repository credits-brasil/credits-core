export const get20CreditoConcedidoInput = (creditoConcedido: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => creditoConcedido.resumo.$["quantidade-total"]
