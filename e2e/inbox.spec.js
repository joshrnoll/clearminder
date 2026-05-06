import { test, expect } from '@playwright/test'

async function login(page, username = 'testuser', password = 'testpass') {
  await page.goto('/login')
  await page.getByPlaceholder('Username').fill(username)
  await page.getByPlaceholder('Password').fill(password)
  await page.getByRole('button', { name: /login/i }).click()
  await page.waitForURL(/\/home/, { timeout: 5000 })
}

test('add-inbox page renders content input and add button', async ({ page }) => {
  await login(page)
  await page.goto('/add-inbox')
  await expect(page.getByPlaceholder("What's on your mind?")).toBeVisible()
  await expect(page.getByRole('button', { name: /add/i })).toBeVisible()
})

test('submitting an inbox item shows a success notification', async ({ page }) => {
  await login(page)
  await page.goto('/add-inbox')

  await page.getByPlaceholder("What's on your mind?").fill('Call dentist')
  await page.getByRole('button', { name: /add/i }).click()

  await expect(page.getByText('Item added to inbox!')).toBeVisible({ timeout: 5000 })
})

test('form resets after successful submission', async ({ page }) => {
  await login(page)
  await page.goto('/add-inbox')

  const input = page.getByPlaceholder("What's on your mind?")
  await input.fill('Buy groceries')
  await page.getByRole('button', { name: /add/i }).click()

  await expect(page.getByText('Item added to inbox!')).toBeVisible({ timeout: 5000 })
  await expect(input).toHaveValue('')
})

test('added item appears in the inbox list on the home page', async ({ page }) => {
  await login(page)
  await page.goto('/add-inbox')

  const content = `Test item ${Date.now()}`
  await page.getByPlaceholder("What's on your mind?").fill(content)
  await page.getByRole('button', { name: /add/i }).click()
  await expect(page.getByText('Item added to inbox!')).toBeVisible({ timeout: 5000 })

  await page.goto('/home')
  await expect(page.getByText(content)).toBeVisible({ timeout: 5000 })
})
