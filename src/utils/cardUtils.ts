// Groups digits into blocks of 4: "1234567812345678" → "1234 5678 1234 5678"
export const formatCard = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

// Masks all but the last 4 digits: "1234 5678 1234 5678" → "**** **** **** 5678"
export const maskCard = (card: string): string => {
    const digits = card.replace(/\s/g, "");
    if (digits.length < 4) return "—";
    return `**** **** **** ${digits.slice(-4)}`;
};
