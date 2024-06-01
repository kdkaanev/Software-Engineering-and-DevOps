const {test, expect} = require('@playwright/test');


test('user can add a task', async ({page}) => {
    //add task
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Buy milk');
    await page.click('#add-task')

    const taskTest = await page.textContent('.task');

    expect(taskTest).toContain('Buy milk');
})
test ('user can delete task', async ({page}) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Buy milk');
    await page.click('#add-task');
    await page.click('.task .delete-task');

    const tasks = await page.$$eval('.task', tasks => tasks.map(task => task.textContent));

    expect(tasks).not.toContain('Buy milk')
})
test ('user can complate task', async ({page}) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Buy milk');
    await page.click('#add-task');
    await page.click('.task .task-complete');

    const completedTask = await page.$('.task.completed')

    expect(completedTask).not.toBeNull();
});

test ('user can filter task' , async ({page}) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Buy milk');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    await page.selectOption('#filter', 'Completed');

    const incompletedTask = await page.$('.task:not(.completed)');

    expect(incompletedTask).toBeNull


})