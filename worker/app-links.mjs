const ASSET_LINKS = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'com.tealdev.moonveil',
      sha256_cert_fingerprints: [
        '34:7E:97:AD:AB:C4:67:05:F5:8C:CF:76:D3:D4:9E:41:00:56:12:BC:2F:BA:15:00:72:D7:DF:9C:9A:B4:4B:74',
      ],
    },
  },
];

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'public, max-age=300',
  'x-content-type-options': 'nosniff',
};

const TEXT_HEADERS = {
  'content-type': 'text/plain; charset=utf-8',
  'cache-control': 'public, max-age=300',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer',
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed.\n', {
        status: 405,
        headers: { ...TEXT_HEADERS, allow: 'GET, HEAD' },
      });
    }

    if (url.pathname === '/.well-known/assetlinks.json') {
      return new Response(request.method === 'HEAD' ? null : JSON.stringify(ASSET_LINKS), {
        status: 200,
        headers: JSON_HEADERS,
      });
    }

    if (url.pathname === '/app' || url.pathname.startsWith('/app/')) {
      return new Response(
        request.method === 'HEAD'
          ? null
          : 'Moonveil link. Install or open the Android app to continue.\n',
        { status: 200, headers: TEXT_HEADERS }
      );
    }

    return new Response(request.method === 'HEAD' ? null : 'Not found.\n', {
      status: 404,
      headers: TEXT_HEADERS,
    });
  },
};
