export default [
  {
    cdg: "01",
    name: "Crédito em Conta Corrente",
  },
  { cdg: "02", name: "Cheque Pagamento / Administrativo" },
  { cdg: "03", name: "DOC/TED" }, // (1) (2)
  { cdg: "04", name: "Cartão Salário" }, //(somente para Tipo de Serviço = 30)
  { cdg: "05", name: "Crédito em Conta Poupança" },
  { cdg: "10", name: "OP à Disposição" },
  { cdg: "11", name: "Pagamento de Contas e Tributos com Código de Barras" },
  { cdg: "16", name: "Tributo - DARF Normal" },
  { cdg: "17", name: "Tributo - GPS (Guia da Previdência Social)" },
  { cdg: "18", name: "Tributo - DARF Simples" },
  { cdg: "19", name: "Tributo - IPTU – Prefeituras" },
  { cdg: "20", name: "Pagamento com Autenticação" },
  { cdg: "21", name: "Tributo – DARJ" },
  { cdg: "22", name: "Tributo - GARE-SP ICMS" },
  { cdg: "23", name: "Tributo - GARE-SP DR" },
  { cdg: "24", name: "Tributo - GARE-SP ITCMD" },
  { cdg: "25", name: "Tributo - IPVA" },
  { cdg: "26", name: "Tributo - Licenciamento" },
  { cdg: "27", name: "Tributo – DPVAT" },
  { cdg: "30", name: "Liquidação de Títulos do Próprio Banco" },
  { cdg: "31", name: "Pagamento de Títulos de Outros Bancos" },
  { cdg: "40", name: "Extrato de Conta Corrente" },
  { cdg: "41", name: "TED – Outra Titularidade" }, // (1)
  { cdg: "43", name: "TED – Mesma Titularidade" }, // (1)
  { cdg: "44", name: "TED para Transferência de Conta Investimento" },
  { cdg: "50", name: "Débito em Conta Corrente" },
  { cdg: "70", name: "Extrato para Gestão de Caixa" },
  { cdg: "71", name: "Depósito Judicial em Conta Corrente" },
  { cdg: "72", name: "Depósito Judicial em Poupança" },
  { cdg: "73", name: "Extrato de Conta Investimento" },
  { cdg: "99", name: "Cadastro de favorecidos" }, // (4)
  { cdg: "45", name: "Pix Transferência" },
  { cdg: "47", name: "Pix QR- CODE" },
];

// WARNING: Ler essa budega eventualmente
//
// "Cartão Salário (somente para Tipo de Serviço = 30)"
// (1) A identificação da titularidade também poderá ser feita a partir do campo G005, “Tipo de Inscrição do Favorecido”, no
// registro detalhe, segmento “B”, a critério de cada banco. Neste caso prevalecerá o código “03” ou “41”.
// (2) A câmara pela qual transitará a transferência também poderá ser identificada a partir do campo
// P001, “Código da Câmara Centralizadora”, no registro detalhe, segmento “A”, a critério de cada banco, com preenchimento a
// saber:
// Forma Lançamento Código da Câmara Centralizadora
// 03 018/700 41/43 018
// (3) Para a forma de lançamento ‘11’ – Pagamento de Contas e Tributos com código de barras, caso o
// Tributo FGTS a ser pago, pertencer aos convênios 0181 - Caixa – Arrecadação do FGTS – Recolhimento Recursal (418) ou
// filantrópico (604) e 0182 – Caixa _ Arrecadação do FGTS – Recolhimento Parcelamento sem Multa (327,337 e 345) é
// obrigatório preencher as Informações Complementares de Tributo no segmento W.
// Este campo não será utilizado pela Cobrança.
// (4) Exclusivo para serviços Bradesco
