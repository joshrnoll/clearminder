import { test, expect } from '@playwright/test'

test('redirects unauthenticated users from /home to /login', async ({ page }) => {
  await page.goto('/home')
  await expect(page).toHaveURL(/\/login/)
})

test('login page renders username input, password input, and login button', async ({ page }) => {
  await page.goto('/login')
  await expect(page.getByPlaceholder('Username')).toBeVisible()
  await expect(page.getByPlaceholder('Password')).toBeVisible()
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
})

test('successful login navigates to /home', async ({ page }) => {
  await page.goto('/login')
  await page.getByPlaceholder('Username').fill('testuser')
  await page.getByPlaceholder('Password').fill('testpass')
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page).toHaveURL(/\/home/, { timeout: 5000 })
})

test('invalid credentials show a login failed alert', async ({ page }) => {
  await page.goto('/login')

  let alertMessage = ''
  page.on('dialog', async dialog => {
    alertMessage = dialog.message()
    await dialog.dismiss()
  })

  await page.getByPlaceholder('Username').fill('nobody')
  await page.getByPlaceholder('Password').fill('badpassword')
  await page.getByRole('button', { name: /login/i }).click()

  await page.waitForTimeout(500)
  expect(alertMessage).toBe('Login failed')
})

test('logout clears session and redirects to /login', async ({ page }) => {
  // Log in first
  await page.goto('/login')
  await page.getByPlaceholder('Username').fill('testuser')
  await page.getByPlaceholder('Password').fill('testpass')
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page).toHaveURL(/\/home/, { timeout: 5000 })

  // Trigger logout via the API directly to avoid UI dependency
  await page.request.fetch('http://localhost:3001/auth/logout')
  await page.goto('/home')
  await expect(page).toHaveURL(/\/login/)
})
