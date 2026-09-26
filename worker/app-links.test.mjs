import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import worker from './app-links.mjs';

const expectedFingerprint =
  '34:7E:97:AD:AB:C4:67:05:F5:8C:CF:76:D3:D4:9E:41:00:56:12:BC:2F:BA:15:00:72:D7:DF:9C:9A:B4:4B:74';

test('serves Android association without a redirect', async () => {
  const response = await worker.fetch(
    new Request('https://app.moonveilguidance.com/.well-known/assetlinks.json')
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^application\/json/);
  assert.equal(body[0].target.package_name, 'com.tealdev.moonveil');
  assert.deepEqual(body[0].target.sha256_cert_fingerprints, [expectedFingerprint]);
});

test('versioned asset and Worker response stay identical', async () => {
  const versioned = JSON.parse(
    await readFile(new URL('../.well-known/assetlinks.json', import.meta.url), 'utf8')
  );
  const response = await worker.fetch(
    new Request('https://app.moonveilguidance.com/.well-known/assetlinks.json')
  );

  assert.deepEqual(await response.json(), versioned);
});

test('supports HEAD and limits the public surface', async () => {
  const head = await worker.fetch(
    new Request('https://app.moonveilguidance.com/.well-known/assetlinks.json', {
      method: 'HEAD',
    })
  );
  const unknown = await worker.fetch(
    new Request('https://app.moonveilguidance.com/private')
  );
  const post = await worker.fetch(
    new Request('https://app.moonveilguidance.com/app', { method: 'POST' })
  );

  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.equal(unknown.status, 404);
  assert.equal(post.status, 405);
});
