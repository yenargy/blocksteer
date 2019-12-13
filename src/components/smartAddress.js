function SmartAddress({address}) {
  address = address.toString();
  return (
    address.substring(0, 6) +
    '...' +
    address.substring(address.length - 4, address.length)
  );
}
export default SmartAddress;