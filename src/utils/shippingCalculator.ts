/**
 * Calculate shipping charges based on cart quantity
 * @param totalItems - Total number of items in cart
 * @returns Shipping charge in rupees
 */
export const calculateShippingCharge = (totalItems: number): number => {
  if (totalItems <= 0) return 0;
  if (totalItems <= 4) return 50;     // 1-4 items: ₹50
  if (totalItems <= 9) return 99;     // 5-9 items: ₹99
  if (totalItems <= 14) return 149;   // 10-14 items: ₹149
  if (totalItems <= 19) return 199;   // 15-19 items: ₹199
  return 199 + Math.floor((totalItems - 19) / 5) * 100; // 20+ items: ₹199 + ₹100 for every 5 items
};

/**
 * Get shipping charge tiers for display
 */
export const getShippingTiers = () => [
  { min: 1, max: 4, charge: 50, label: '1-4 items' },
  { min: 5, max: 9, charge: 99, label: '5-9 items' },
  { min: 10, max: 14, charge: 149, label: '10-14 items' },
  { min: 15, max: 19, charge: 199, label: '15-19 items' },
  { min: 20, max: Infinity, charge: 199, label: '20+ items' },
];
