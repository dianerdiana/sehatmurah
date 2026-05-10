const randomChars = (): string => {
  return Math.random().toString(36).slice(2, 6).toUpperCase();
};

export const generateBookingCode = (): string => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `BK-${datePart}-${randomChars()}`;
};
