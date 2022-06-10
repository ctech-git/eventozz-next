import StringMask from "string-mask";
import { onlyNumbers, onlyUnsignedNumbers } from "./strings";

export const isValidCnpj = (cnpjString) => {
  cnpjString = onlyNumbers(cnpjString);

  if (cnpjString === "") return false;

  // Elimina CNPJ_strings invalidos conhecidos
  if (
    cnpjString.length !== 14 ||
    cnpjString === "00000000000000" ||
    cnpjString === "11111111111111" ||
    cnpjString === "22222222222222" ||
    cnpjString === "33333333333333" ||
    cnpjString === "44444444444444" ||
    cnpjString === "55555555555555" ||
    cnpjString === "66666666666666" ||
    cnpjString === "77777777777777" ||
    cnpjString === "88888888888888" ||
    cnpjString === "99999999999999"
  ) {
    return false;
  }

  let tamanho = cnpjString.length - 2;
  let numeros = cnpjString.substring(0, tamanho);
  const digitos = cnpjString.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let resultado = String(soma % 11 < 2 ? 0 : 11 - (soma % 11));
  if (resultado !== digitos.charAt(0)) return false;
  tamanho = tamanho + 1;
  numeros = cnpjString.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = String(soma % 11 < 2 ? 0 : 11 - (soma % 11));
  if (resultado !== digitos.charAt(1)) return false;

  return true;
};

export const isValidCpf = (cpfString) => {
  cpfString = onlyUnsignedNumbers(cpfString);
  if (cpfString === "") return false;

  // Elimina cpfStrings invalidos conhecidos
  if (
    cpfString.length !== 11 ||
    cpfString === "00000000000" ||
    cpfString === "11111111111" ||
    cpfString === "22222222222" ||
    cpfString === "33333333333" ||
    cpfString === "44444444444" ||
    cpfString === "55555555555" ||
    cpfString === "66666666666" ||
    cpfString === "77777777777" ||
    cpfString === "88888888888" ||
    cpfString === "99999999999"
  ) {
    return false;
  }
  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpfString.charAt(i)) * (10 - i);
  }
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpfString.charAt(9))) {
    return false;
  }

  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpfString.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpfString.charAt(10))) {
    return false;
  }

  return true;
};

export const isValidCreditCardNumber = (creditCard) => {
  //Check if the number contains only numeric value  
  //and is of between 13 to 19 digits
  const regex = new RegExp("^[0-9]{13,19}$");
  if (!regex.test(creditCard)) {
    return false;
  }

  let checksum = 0; // running checksum total
  let j = 1; // takes value of 1 or 2

  // Process each digit one by one starting from the last
  for (let i = creditCard.length - 1; i >= 0; i--) {
    let calc = 0;
    // Extract the next digit and multiply by 1 or 2 on alternative digits.
    calc = Number(creditCard.charAt(i)) * j;

    // If the result is in two digits add 1 to the checksum total
    if (calc > 9) {
      checksum = checksum + 1;
      calc = calc - 10;
    }

    // Add the units element to the checksum total
    checksum = checksum + calc;

    // Switch the value of j
    if (j == 1) {
      j = 2;
    } else {
      j = 1;
    }
  }

  //Check if it is divisible by 10 or not.
  return (checksum % 10) === 0;
}

export const isValidExpirationDate = (expirationDate) => {
  console.log(expirationDate);
  if (expirationDate.length !== 4) return false;

  const expirationMonth = expirationDate.substring(0, 2);
  const expirationYear = expirationDate.substring(2);
  console.log(expirationMonth);
  console.log(expirationYear);
  if (Number(expirationMonth) > 12) {
    return false;
  }
  const expirationDateTemp = new Date(`20${expirationYear}`, Number(expirationMonth)-1, 1);

  const today = new Date();
  if (Object.prototype.toString.call(expirationDateTemp) === "[object Date]") {
    if (isNaN(expirationDateTemp.getTime())) {
      return false;
    }
  }
  console.log(expirationDateTemp);
  console.log(today);
  if (expirationDateTemp < today) {
    return false;
  }
  // console.log('there');
  return true;
};

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