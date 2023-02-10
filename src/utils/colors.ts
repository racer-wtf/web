// Generate a hex color from an Ethereum address
export const addressToColor = (address: string) => {
  if (!address) return "#000000";
  return "#" + address.slice(36, 42).toLowerCase();
};
