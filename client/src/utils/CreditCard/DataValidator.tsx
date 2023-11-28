export function isCardNumberValid(cardNumber: string): boolean {
  const pattern = /^\d{4} \d{4} \d{4} \d{4}$/;
  return pattern.test(cardNumber);
}

export function isCVVValid(cvv: string): boolean {
  const pattern = /^\d{3}$/;
  return pattern.test(cvv);
}

export function isExpiryDateValid(expiryDate: string): boolean {
  const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!pattern.test(expiryDate)) return false;

  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  const month = parseInt(expiryDate.substring(0, 2));
  const year = parseInt(expiryDate.substring(3, 5));

  if (year < currentYear || year > currentYear + 10) return false;
  if (year === currentYear && month < currentMonth) return false;
  if (month < 1 || month > 12) return false;

  return true;
}
