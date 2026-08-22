const founded = { year: 2011, month: 10, day: 1 };

const ones = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

export function numberToWords(value: number): string {
  if (!Number.isInteger(value) || value < 0 || value > 999) {
    return String(value);
  }

  if (value < 20) return ones[value];

  if (value < 100) {
    const remainder = value % 10;
    return `${tens[Math.floor(value / 10)]}${remainder ? `-${ones[remainder]}` : ""}`;
  }

  const remainder = value % 100;
  return `${ones[Math.floor(value / 100)]} hundred${remainder ? ` ${numberToWords(remainder)}` : ""}`;
}

export function getYearsOfService(date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, Number(value)]),
  );

  const anniversaryHasPassed =
    values.month > founded.month ||
    (values.month === founded.month && values.day >= founded.day);

  return Math.max(
    0,
    values.year - founded.year - (anniversaryHasPassed ? 0 : 1),
  );
}
