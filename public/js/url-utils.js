/** Shared URL normalization for browser input and the Node API. */
export function normalizeHttpUrl(value) {
  if (typeof value !== 'string') throw new Error('Enter a website address.');
  let input = value.trim();
  if (!input) throw new Error('Enter a website address.');
  if (input.length > 2048) throw new Error('The URL must be 2,048 characters or fewer.');
  if (/[\u0000-\u0020\u007f]/.test(input)) throw new Error('The URL cannot contain spaces or control characters.');

  // Users often paste escaped schemes from chat or documents: https\\://host.
  const escapedScheme = input.match(/^(https?)[\\/]*:[\\/]+(.*)$/i);
  if (escapedScheme) input = `${escapedScheme[1]}://${escapedScheme[2].replace(/^[\\/]+/, '')}`;

  if (/^[a-z][a-z\d+.-]*:/i.test(input) && !/^https?:\/\//i.test(input)) {
    // A dotted host followed by a port is valid even though it resembles a scheme.
    if (!/^(?:localhost|(?:[a-z\d-]+\.)+[a-z\d-]+):\d+(?:[/?#]|$)/i.test(input)) {
      throw new Error('Only HTTP and HTTPS website addresses are supported.');
    }
  }
  if (!/^https?:\/\//i.test(input)) input = `https://${input}`;

  let parsed;
  try { parsed = new URL(input); } catch { throw new Error('Enter a valid website address, such as https://example.com.'); }
  if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname || parsed.username || parsed.password) {
    throw new Error('Enter a valid HTTP or HTTPS URL without embedded credentials.');
  }
  if (!parsed.hostname.includes('.') && parsed.hostname !== 'localhost') {
    throw new Error('Enter a public website hostname, such as example.com.');
  }
  return parsed.href;
}
