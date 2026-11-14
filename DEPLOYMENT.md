# CyberGuard AI deployment

The frontend is static and currently published on GitHub Pages. The scanner API is a separate Node.js service; GitHub Pages cannot run `server.js`.

## Deploy the API

Deploy this repository as a Node.js web service on a host that supports persistent Node HTTP servers. Set the start command to `npm start` and let the host provide `PORT`. Configure:

```text
CORS_ORIGINS=https://omkarsx.github.io
```

Add any local development origin you use as a comma-separated entry. No third-party API key is required for URL scanning. The URL analyzer makes DNS lookups and a TLS handshake only; it does not fetch page contents.

## Connect GitHub Pages

After the service is deployed with HTTPS, set the `cyberguard-api-base-url` meta tag in `public/index.html` to the service origin (no `/api` suffix):

```html
<meta name="cyberguard-api-base-url" content="https://YOUR-API-HOST.example">
```

The configured origin must be present in the API's `CORS_ORIGINS`. Commit and publish the updated Pages site. Until this value points to a real deployed API, the live scanner reports that its server URL is not configured; it will not display invented scan results.

## Local run

```sh
npm start
```

Open `http://localhost:3000`. The frontend uses the same-origin API automatically for local development.
