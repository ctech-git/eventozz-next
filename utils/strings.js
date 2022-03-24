import StringMask from "string-mask";

export const onlyNumbers = (_string) => _string?.replace(/[^0-9.,+-]+/g, "");

//Retorna apenas os números, sem sinal ou pontos
export const onlyUnsignedNumbers = (_string) => _string?.replace(/[^0-9]+/g, "");

export const onlyDecimal = (_string) => {
  let match = _string.match(/^[0-9]*\.?[0-9]*$/);
  if (match) return _string;
  else return _string.substring(0, _string.length - 1);
};

export const convertMoney = (string) => {
  string = Number(string);
  string = string?.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
  return string;
};

export const isValidCnpj = (cnpj_string) => {
  cnpj_string = onlyNumbers(cnpj_string);

  if (cnpj_string === "") return false;

  // Elimina CNPJ_strings invalidos conhecidos
  if (
    cnpj_string.length !== 14 ||
    cnpj_string === "00000000000000" ||
    cnpj_string === "11111111111111" ||
    cnpj_string === "22222222222222" ||
    cnpj_string === "33333333333333" ||
    cnpj_string === "44444444444444" ||
    cnpj_string === "55555555555555" ||
    cnpj_string === "66666666666666" ||
    cnpj_string === "77777777777777" ||
    cnpj_string === "88888888888888" ||
    cnpj_string === "99999999999999"
  ) {
    return false;
  }

  let tamanho = cnpj_string.length - 2;
  let numeros = cnpj_string.substring(0, tamanho);
  const digitos = cnpj_string.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho;i >= 1;i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let resultado = String(soma % 11 < 2 ? 0 : 11 - (soma % 11));
  if (resultado !== digitos.charAt(0)) return false;
  tamanho = tamanho + 1;
  numeros = cnpj_string.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho;i >= 1;i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = String(soma % 11 < 2 ? 0 : 11 - (soma % 11));
  if (resultado !== digitos.charAt(1)) return false;

  return true;
};

export const isValidCpf = (cpf_string) => {
  cpf_string = onlyUnsignedNumbers(cpf_string);
  if (cpf_string === "") return false;

  // Elimina cpf_strings invalidos conhecidos
  if (
    cpf_string.length !== 11 ||
    cpf_string === "00000000000" ||
    cpf_string === "11111111111" ||
    cpf_string === "22222222222" ||
    cpf_string === "33333333333" ||
    cpf_string === "44444444444" ||
    cpf_string === "55555555555" ||
    cpf_string === "66666666666" ||
    cpf_string === "77777777777" ||
    cpf_string === "88888888888" ||
    cpf_string === "99999999999"
  ) {
    return false;
  }
  // Valida 1o digito
  let add = 0;
  for (let i = 0;i < 9;i++) {
    add += parseInt(cpf_string.charAt(i)) * (10 - i);
  }
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpf_string.charAt(9))) {
    return false;
  }

  // Valida 2o digito
  add = 0;
  for (let i = 0;i < 10;i++) {
    add += parseInt(cpf_string.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpf_string.charAt(10))) {
    return false;
  }

  return true;
};

export const boletoMask = (linhaDigitavel) => {
  if (String(linhaDigitavel).length === 47) {
    const mask = new StringMask(
      "00000.00000 00000.000000 00000.000000 0 00000000000000"
    );
    return mask.apply(linhaDigitavel);
  }
};
export const cpfMask = (cpfCnpj) => {
  if (cpfCnpj === null || cpfCnpj === undefined) return;
  //if (String(cpfCnpj).length === 11) {
  return String(cpfCnpj)
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
  //}

};
export const cpfCnpjMask = (cpfCnpj) => {
  if (cpfCnpj === null || cpfCnpj === undefined) return;
  if (String(cpfCnpj).length <= 11) {
    return String(cpfCnpj)
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }
  if (String(cpfCnpj).length > 11 && String(cpfCnpj).length <= 14) {
    return String(cpfCnpj)
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }
};

export const cepMask = (cep) => {
  if (cep === null || cep === undefined) return;
  const mask = new StringMask("00000-000");
  return mask.apply(cep);
};

export const cvvMask = (cvv) => {
  if (cvv === null || cvv === undefined) return;
  const mask = new StringMask("000");
  return mask.apply(cvv);
};


export const expirationDateMask = (expirationDate) => {
  if (expirationDate === null || expirationDate === undefined) return;
  const mask = new StringMask("00/00");
  return mask.apply(expirationDate);
}

export const dateLastAccess = (data) => {
  if (data === null || data === undefined) return;
  data = data?.split("T");
  let days = data[0]?.split("-");

  days = days[2] + "/" + days[1] + "/" + days[0]

  return days;
};

export const stringNormalize = (string) => {
  if (string === null || string === undefined) return;
  string = string.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();

  return string;
}

export const percentageMask = (number) => {
  return number.replace(/[^0-9,.]+/g, "").replace(/([0-9,.]+?$)/, "$1%");
};

export const phoneMaskForList = (number) => {
  const phone = onlyUnsignedNumbers(number);
  return phone?.replace(/(\d{2})(\d{5})(\d)/, "($1) $2-$3")
}

export function isValidEmail(email) {
  let usuario = email.substring(0, email.indexOf("@"));
  let dominio = email.substring(email.indexOf("@") + 1, email.length);
  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {
    return true;
  } else {
    return false;
  }
}