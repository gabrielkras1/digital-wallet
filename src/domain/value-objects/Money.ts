export class Money {
  private readonly cents: number;

  constructor(cents: number) {
    if (cents < 0) {
      throw new Error("Valor não pode ser negativo");
    }

    this.cents = cents;
  }

  get value(): number {
    return this.cents;
  }

  add(other: Money): Money {
    return new Money(this.cents + other.value);
  }

  subtract(other: Money): Money {
    return new Money(this.cents - other.value);
  }

  greaterThan(other: Money): boolean {
    return this.cents > other.value;
  }

  lessThan(other: Money): boolean {
    return this.cents < other.value;
  }

  equals(other: Money): boolean {
    return this.cents === other.value;
  }
}