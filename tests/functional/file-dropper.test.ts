import { test, expect, Page } from '@playwright/test'
import { createFixture } from './fixtures'

test('homepage has title and instructions', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('File Hasher')
  await expect(page.locator('.file-drop')).toContainText(
    `Drag'n'drop a file here or click to select one from your device`
  )
})

test('supports selecting a file', async ({ page }) => {
  await page.goto('/')
  const { filePath } = await createFixture('test.txt', 1)
  await page.locator('input[type=file]').setInputFiles(filePath)
  await expect(page.locator('.file-drop')).toContainText('test.txt')
  await expect(page.locator('button')).toHaveJSProperty('disabled', false)
  await expect(page.locator('button')).toHaveText('Generate hash')
})

const assertResult = async (
  page: Page,
  fileName: string,
  size: string,
  hash: string,
  description?: string
) => {
  await expect(page.getByTestId('hash-result')).toContainText(`File${fileName}`)
  await expect(page.getByTestId('hash-result')).toContainText(`Size${size}`)
  if (description) {
    await expect(page.getByTestId('hash-result')).toContainText(
      `Description${description}`
    )
  }
  await expect(page.getByTestId('hash-result')).toContainText(
    `Sha 256 hash${hash}`
  )
}

test('shows loading indicator and generates a hash', async ({ page }) => {
  await page.goto('/')
  const fileName = 'test.mp4'
  const { filePath, hash } = await createFixture(fileName, 65)
  await page.locator('input[type=file]').setInputFiles(filePath)
  await page.locator('button').click()
  await expect(page.locator('button')).toHaveJSProperty('disabled', true)
  await expect(page.getByText('Working... ')).toBeVisible()
  await assertResult(page, fileName, '65MB', hash)
})

test('supports small files', async ({ page }) => {
  await page.goto('/')
  const fileName = 'small-file.txt'
  const { filePath, hash } = await createFixture(fileName, 1)
  await page.locator('input[type=file]').setInputFiles(filePath)
  await page.locator('button').click()
  await assertResult(page, fileName, '1MB', hash)
})

test('supports large files', async ({ page }) => {
  await page.goto('/')
  const fileName = 'large-file.bin'
  const { filePath, hash } = await createFixture(fileName, 200)
  await page.locator('input[type=file]').setInputFiles(filePath)
  await page.locator('button').click()
  await assertResult(page, fileName, '200MB', hash)
})

test('supports a description', async ({ page }) => {
  await page.goto('/')
  const fileName = 'small-file.txt'
  const description = 'This is a description'
  const { filePath, hash } = await createFixture(fileName, 1)
  await page.locator('input[type=file]').setInputFiles(filePath)
  await page.locator('button').click()
  await page.locator('textarea').fill(description)
  await assertResult(page, fileName, '1MB', hash, description)
})
