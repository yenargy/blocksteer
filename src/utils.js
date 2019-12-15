import copy from 'copy-to-clipboard';
import moment from 'moment';

/**
 * Copies supplied text to the clipboard
 * 
 * @param text The text which needs to be copied
 * to the clipboard
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
  
/**
 * Method which translates timestamps into human
 * readable present time duration text 
 * 
 * @param timestamp Unix timestamp
 */
export const formatedTimeFrom = timestamp => {
  const now = moment();
  const expiration = moment.unix(timestamp);
  const diff = expiration.diff(now);
  const diffDuration = moment.duration(diff);

  return [
    diffDuration.years() > 0 ? diffDuration.years() + 'y ' : '',
    diffDuration.months() > 0 ? diffDuration.months() + 'mo ' : '',
    diffDuration.days() > 0 ? diffDuration.days() + 'd ' : '',
    diffDuration.hours() > 0 ? diffDuration.hours() + 'h ' : '',
    diffDuration.minutes() > 0 ? diffDuration.minutes() + 'm ' : '',
    diffDuration.seconds() > 0 ? diffDuration.seconds() + 's ' : '',
    diffDuration.seconds() < 0 ? moment.unix(timestamp).fromNow() : '',
  ].join('');
};