export const get1ConsumidorInput = (
  consumidor: {
    "consumidor-pessoa-juridica"?: {
      $?: {
        "data-fundacao"?: string;
        email?: string;
        "nome-comercial"?: string;
        "razao-social"?: string;
      };
      cnpj?: {
        $?: {
          numero?: string;
        };
      };
      "situacao-cnpj"?: {
        $?: {
          "descricao-situacao"?: string;
          "data-situacao"?: string;
        };
      };
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
      telefone?: {
        $?: {
          "numero-ddd"?: string;
          numero?: string;
        };
      };
      "natureza-juridica"?: {
        $?: {
          descricao?: string;
          codigo?: string;
        };
      };
      "atividade-economica-principal"?: {
        $?: {
          descricao?: string;
          codigo?: string;
        };
      };
      "atividade-economica-secundaria"?: {
        $?: {
          descricao?: string;
          codigo?: string;
        };
      }[];
    };

    "consumidor-pessoa-fisica"?: {
      $?: {
        "data-nascimento"?: string;
        email?: string;
        "estado-civil"?: string;
        idade?: string;
        nome?: string;
        "nome-mae"?: string;
        "numero-rg"?: string;
        "numero-titulo-eleitor"?: string;
        "pessoa-estrangeira"?: string;
        sexo?: string;
        signo?: string;
      };
      cpf?: {
        $?: {
          "regiao-origem"?: string;
          numero?: string;
        };
      };
      "situacao-cpf"?: {
        $?: {
          "descricao-situacao"?: string;
          "data-situacao"?: string;
        };
      };
      "estado-rg"?: {
        $?: {
          "sigla-uf"?: string;
        };
      };
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
      "telefone-residencial"?: {
        $?: {
          "numero-ddd"?: string;
          numero?: string;
        };
      };
      "telefone-celular"?: {
        $?: {
          "numero-ddd"?: string;
          numero?: string;
        };
      };
    };
  },
  typeDocument: "CPF" | "CNPJ",
) => {
  if (typeDocument === "CNPJ") {
    return {
      "data-fundacao":
        consumidor?.["consumidor-pessoa-juridica"]?.$?.["data-fundacao"],
      email: consumidor?.["consumidor-pessoa-juridica"]?.$?.email,
      "nome-comercial":
        consumidor?.["consumidor-pessoa-juridica"]?.$?.["nome-comercial"],
      "razao-social":
        consumidor?.["consumidor-pessoa-juridica"]?.$?.["razao-social"],

      cnpj: consumidor?.["consumidor-pessoa-juridica"]?.cnpj?.$?.numero,

      "situacao-cnpj": {
        description:
          consumidor?.["consumidor-pessoa-juridica"]?.["situacao-cnpj"]?.$?.[
            "descricao-situacao"
          ],
        date: consumidor?.["consumidor-pessoa-juridica"]?.["situacao-cnpj"]
          ?.$?.["data-situacao"],
      },

      endereco: {
        logradouro:
          consumidor?.["consumidor-pessoa-juridica"]?.endereco?.$?.logradouro,
        numero: consumidor?.["consumidor-pessoa-juridica"]?.endereco?.$?.numero,
        complemento:
          consumidor?.["consumidor-pessoa-juridica"]?.endereco?.$?.complemento,
        bairro: consumidor?.["consumidor-pessoa-juridica"]?.endereco?.$?.bairro,
        cep: consumidor?.["consumidor-pessoa-juridica"]?.endereco?.$?.cep,
        cidade:
          consumidor?.["consumidor-pessoa-juridica"]?.endereco?.cidade?.$?.nome,
        estado:
          consumidor?.["consumidor-pessoa-juridica"]?.endereco?.cidade?.estado
            ?.$?.["sigla-uf"],
      },

      telefone: `${
        consumidor?.["consumidor-pessoa-juridica"]?.telefone?.$?.[
          "numero-ddd"
        ] ?? ""
      } ${
        consumidor?.["consumidor-pessoa-juridica"]?.telefone?.$?.numero ?? ""
      }`.trim(),

      "natureza-juridica": {
        description:
          consumidor?.["consumidor-pessoa-juridica"]?.["natureza-juridica"]?.$
            ?.descricao,
        code: consumidor?.["consumidor-pessoa-juridica"]?.["natureza-juridica"]
          ?.$?.codigo,
      },

      "atividade-economica-principal": {
        description:
          consumidor?.["consumidor-pessoa-juridica"]?.[
            "atividade-economica-principal"
          ]?.$?.descricao,
        code: consumidor?.["consumidor-pessoa-juridica"]?.[
          "atividade-economica-principal"
        ]?.$?.codigo,
      },

      "atividade-economica-secundaria":
        consumidor?.["consumidor-pessoa-juridica"]?.[
          "atividade-economica-secundaria"
        ]?.map((i) => ({
          description: i.$?.descricao,
          code: i.$?.codigo,
        })) ?? [],
    };
  }

  return {
    "data-nascimento":
      consumidor?.["consumidor-pessoa-fisica"]?.$?.["data-nascimento"],
    email: consumidor?.["consumidor-pessoa-fisica"]?.$?.email,
    "estado-civil":
      consumidor?.["consumidor-pessoa-fisica"]?.$?.["estado-civil"],
    idade: consumidor?.["consumidor-pessoa-fisica"]?.$?.idade,
    nome: consumidor?.["consumidor-pessoa-fisica"]?.$?.nome,
    "nome-mae": consumidor?.["consumidor-pessoa-fisica"]?.$?.["nome-mae"],
    "numero-rg": consumidor?.["consumidor-pessoa-fisica"]?.$?.["numero-rg"],
    "numero-titulo-eleitor":
      consumidor?.["consumidor-pessoa-fisica"]?.$?.["numero-titulo-eleitor"],
    "pessoa-estrangeira":
      consumidor?.["consumidor-pessoa-fisica"]?.$?.["pessoa-estrangeira"],
    sexo: consumidor?.["consumidor-pessoa-fisica"]?.$?.sexo,
    signo: consumidor?.["consumidor-pessoa-fisica"]?.$?.signo,

    cpf: consumidor?.["consumidor-pessoa-fisica"]?.cpf?.$?.numero,

    "situacao-cpf": {
      description:
        consumidor?.["consumidor-pessoa-fisica"]?.["situacao-cpf"]?.$?.[
          "descricao-situacao"
        ],
      date: consumidor?.["consumidor-pessoa-fisica"]?.["situacao-cpf"]?.$?.[
        "data-situacao"
      ],
    },

    "estado-rg":
      consumidor?.["consumidor-pessoa-fisica"]?.["estado-rg"]?.$?.["sigla-uf"],

    endereco: {
      logradouro:
        consumidor?.["consumidor-pessoa-fisica"]?.endereco?.$?.logradouro,
      numero: consumidor?.["consumidor-pessoa-fisica"]?.endereco?.$?.numero,
      complemento:
        consumidor?.["consumidor-pessoa-fisica"]?.endereco?.$?.complemento,
      bairro: consumidor?.["consumidor-pessoa-fisica"]?.endereco?.$?.bairro,
      cep: consumidor?.["consumidor-pessoa-fisica"]?.endereco?.$?.cep,
      cidade:
        consumidor?.["consumidor-pessoa-fisica"]?.endereco?.cidade?.$?.nome,
      estado:
        consumidor?.["consumidor-pessoa-fisica"]?.endereco?.cidade?.estado?.$?.[
          "sigla-uf"
        ],
    },

    "telefone-residencial": `${
      consumidor?.["consumidor-pessoa-fisica"]?.["telefone-residencial"]?.$?.[
        "numero-ddd"
      ] ?? ""
    } ${
      consumidor?.["consumidor-pessoa-fisica"]?.["telefone-residencial"]?.$
        ?.numero ?? ""
    }`.trim(),

    "telefone-celular": `${
      consumidor?.["consumidor-pessoa-fisica"]?.["telefone-celular"]?.$?.[
        "numero-ddd"
      ] ?? ""
    } ${
      consumidor?.["consumidor-pessoa-fisica"]?.["telefone-celular"]?.$
        ?.numero ?? ""
    }`.trim(),
  };
};
