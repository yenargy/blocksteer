/**
 * A utility component which converts 
 * long hashes or addresses into short forms
 * 
 * @props address
 */

function SmartAddress({address}) {
  address = address.toString();
  return (
    address.substring(0, 6) +
    '...' +
    address.substring(address.length - 4, address.length)
  );
}
export default SmartAddress;