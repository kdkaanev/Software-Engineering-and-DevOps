const {test, expect} = require('@playwright/test')

test('Verify "All Boocs" link is visable', async ({page})=> {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('nav.navbar');
   

    const allBooksLink =  await page.$('a[href="/catalog"]');
    const isLinkVisable = await allBooksLink.isVisible();

    expect(isLinkVisable).toBe(true)

})

test('Verifi "Login" button is visibal', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('nav.navbar');

    const loginButton = await page.$('a[href="/login"]');
    const isVisibalLoginButton = await loginButton.isVisible();

    expect(isVisibalLoginButton).toBe(true);
})

test('Verifi "Register" button is visibal', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isVisibalRegisterButton = await registerButton.isVisible();

    expect(isVisibalRegisterButton).toBe(true);
})



test('Verifi "All Books" lonk is visable after user login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksLink =  await page.$('a[href="/catalog"]');
    const isLinkVisable = await allBooksLink.isVisible();

    expect(isLinkVisable).toBe(true)
})

test('Verify That the "My Books" Link Is Visible', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const myBooksLink =  await page.$('a[href="/profile"]');
    const isLinkVisable = await myBooksLink.isVisible();

    expect(isLinkVisable).toBe(true)
})

test('Verify That the "Add Book" Link Is Visible', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const addBookLink =  await page.$('a[href="/create"]');
    const isLinkVisable = await addBookLink.isVisible();

    expect(isLinkVisable).toBe(true)
})

test('Verify That the Users Email Address Is Visible', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const email =  await page.$('#user');
    const isLinkVisable = await email.isVisible();

    expect(isLinkVisable).toBe(true)
})

test('Login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');

    expect(page.url()).toBe('http://localhost:3000/catalog')
})

test('Login with empty credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a [href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login')
})

test('Submit the Form with Empty Email Input Field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a [href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login')

})

test('Submit the Form with Empty Password Input Field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();

    });
    await page.$('a [href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login')
})