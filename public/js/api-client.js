const META_NAME = 'cyberguard-api-base-url';

export function apiUrl(path) {
  const configured = document.querySelector(`meta[name="${META_NAME}"]`)?.content?.trim();
  if (configured) {
    let base;
    try { base = new URL(configured); } catch { throw new Error('The configured analysis server URL is invalid.'); }
    if (base.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(base.hostname)) {
      throw new Error('The deployed analysis server must use HTTPS.');
    }
    return new URL(path, base.origin).href;
  }
  if (location.protocol === 'file:' || location.hostname.endsWith('.github.io')) {
    throw new Error('The deployed analysis server URL has not been configured. Ask the site administrator to set cyberguard-api-base-url.');
  }
  return new URL(path, location.origin).href;
}

export async function postJson(path, payload) {
  // Resolve configuration before the network try/catch so setup errors are not
  // mislabeled as network or CORS failures.
  const endpoint = apiUrl(path);
  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
  } catch (error) {
    throw new Error(`Could not reach the analysis server. Check its address, availability, and CORS settings. ${error.message}`);
  }
  let data;
  try { data = await response.json(); } catch {
    throw new Error(`The analysis server returned an unreadable response (HTTP ${response.status}).`);
  }
  if (!response.ok || !data.success) throw new Error(data.error || `The analysis server returned HTTP ${response.status}.`);
  return data;
}
