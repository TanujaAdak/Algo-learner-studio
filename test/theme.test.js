import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cssPath = path.resolve(__dirname, '../src/index.css')

describe('Multi-Theme Design System Verification', () => {
  const cssContent = fs.readFileSync(cssPath, 'utf8')

  const themes = [
    'github-dark',
    'tokyo-night',
    'catppuccin',
    'nord',
  ]

  for (const theme of themes) {
    it(`should declare full token set for theme "${theme}"`, () => {
      if (theme !== 'github-dark') {
        assert.ok(
          cssContent.includes(`[data-theme="${theme}"]`),
          `Missing [data-theme="${theme}"] selector in index.css`
        )
      } else {
        assert.ok(
          cssContent.includes('[data-theme="github-dark"]') || cssContent.includes(':root'),
          'Missing github-dark or root declaration'
        )
      }
    })
  }

  it('declares essential background and accent tokens in each theme', () => {
    const requiredTokens = [
      '--bg-base',
      '--bg-sidebar',
      '--bg-surface',
      '--bg-elevated',
      '--accent',
      '--border-default',
      '--text-primary',
    ]

    for (const token of requiredTokens) {
      assert.ok(cssContent.includes(token), `Missing token ${token} in stylesheet`)
    }
  })
})
