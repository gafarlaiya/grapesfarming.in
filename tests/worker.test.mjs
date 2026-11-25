import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.js';

const mockEnv = {
  ASSETS: {
    async fetch() {
      return new Response('<html><body>ok</body></html>', {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    },
  },
};

test('301 canonical redirect from grapesfarming.com, www, and grapefarming spellings', async () => {
  const alternates = [
    'https://grapesfarming.com/fertilizer-schedule-and-calculator/?unit=guntha',
    'https://www.grapesfarming.com/diseases-and-pests/',
    'https://www.grapesfarming.in/april-and-october-pruning/',
    'https://grapefarming.in/varieties-and-rootstocks/',
    'https://grapefarming.com/mr/draksha-sheti/',
  ];

  for (const inputUrl of alternates) {
    const res = await worker.fetch(new Request(inputUrl), mockEnv);
    assert.equal(res.status, 301, `Expected 301 for ${inputUrl}`);
    const location = res.headers.get('location');
    const parsedInput = new URL(inputUrl);
    assert.equal(
      location,
      `https://grapesfarming.in${parsedInput.pathname}${parsedInput.search}`,
      `Expected canonical destination for ${inputUrl}`
    );
  }
});

test('Automatic X-Robots-Tag: noindex, nofollow on *.workers.dev and *.pages.dev previews', async () => {
  const previewUrls = [
    'https://grapesfarming-in.demo.workers.dev/',
    'https://preview-123.grapesfarming.pages.dev/diseases-and-pests/',
  ];

  for (const previewUrl of previewUrls) {
    const res = await worker.fetch(new Request(previewUrl), mockEnv);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('x-robots-tag'), 'noindex, nofollow');
  }
});

test('Production grapesfarming.in does NOT set noindex header', async () => {
  const res = await worker.fetch(new Request('https://grapesfarming.in/'), mockEnv);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('x-robots-tag'), null);
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
});
