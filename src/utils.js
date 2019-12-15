import copy from 'copy-to-clipboard';

/**
 * Copies supplied text to the clipboard
 */
export const copyTextToClipboard = text => {
    try {
      copy(text);
      return true;
    } catch (err) {
      console.log('Unable to copy the contract address to clipboard');
      return false;
    }
  };
  