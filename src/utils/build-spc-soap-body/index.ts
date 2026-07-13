type BuildSpc325SoapParams = {
  productCode: number;
  tipoConsumidor: "F" | "J";
  document: string;
  insumos: number[];
};

export const buildSPCSoapBody = ({
  productCode,
  tipoConsumidor,
  document,
  insumos,
}: BuildSpc325SoapParams) => {
  const insumosXml = insumos
    .map(
      (codigo) => `<codigo-insumo-opcional>${codigo}</codigo-insumo-opcional>`,
    )
    .join("");

  return `
    <soapenv:Envelope
      xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
      xmlns:web="http://webservice.consulta.spcjava.spcbrasil.org/">
      <soapenv:Header/>
      <soapenv:Body>
        <web:filtro>
          <codigo-produto>${productCode}</codigo-produto>

          <tipo-consumidor>${tipoConsumidor}</tipo-consumidor>

          <documento-consumidor>${document}</documento-consumidor>

          ${insumosXml}
        </web:filtro>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
};
