// CreditCardHelper
export function isCardNumberValid(cardNumber: string): boolean {
    const pattern = /^\d{4} \d{4} \d{4} \d{4}$/; // 16-digit number with spaces
    return pattern.test(cardNumber);
}

export function isCVVValid(cvv: string): boolean {
    const pattern = /^\d{3}$/; // 3-digit number
    return pattern.test(cvv);
}

export function isExpiryDateValid(expiryDate: string): boolean {
    const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    if (!pattern.test(expiryDate)) return false;

    const currentYear = new Date().getFullYear() % 100; // Last 2 digits of the year
    const currentMonth = new Date().getMonth() + 1; // Current month

    const month = parseInt(expiryDate.substring(0, 2));
    const year = parseInt(expiryDate.substring(3, 5));

    if (year < currentYear || year > currentYear + 10) return false;
    if (year === currentYear && month < currentMonth) return false;
    if (month < 1 || month > 12) return false;

    return true;
}
