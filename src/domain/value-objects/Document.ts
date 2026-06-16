export class Document {
  private readonly value: string;

  constructor(document: string) {
    const cleaned = document.replace(/\D/g, "");

    if (!this.isValid(cleaned)) {
      throw new Error("CPF inválido");
    }

    this.value = cleaned;
  }

  getValue(): string {
    return this.value;
  }

  private isValid(cpf: string): boolean {
    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i);
    }

    let remainder = (sum * 10) % 11;

    if (remainder === 10) remainder = 0;

    if (remainder !== parseInt(cpf[9])) {
      return false;
    }

    sum = 0;

    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10) remainder = 0;

    return remainder === parseInt(cpf[10]);
  }
}