import { $, browser, ExpectedConditions, $$, by, element } from 'protractor';
import { expect } from 'chai';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
  it('Then: test for finish reading', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    const firstRead = items[0].element(by.buttonText('Want to Read'));
    //const firstRemove = items[0].element(by.buttonText('Remove'));
    if(firstRead.isEnabled()) {
      await browser.wait(element(by.buttonText('Want to Read')).click(), 200);
    }
    else {
      await browser.wait(element(by.buttonText('Remove')).click(), 200);
      await browser.wait(element(by.buttonText('Want to Read')).click(), 200);
    } 

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    const readingItems = await $$('[data-testing="reading-item"]');
    const countBefore = readingItems.length;
    await browser.wait(element(by.buttonText('Finished')).click(), 200);

    const readingItemsAfter = await $$('[data-testing="reading-item"]');
    expect(readingItemsAfter.length).to.be.equal(countBefore -1);
  });


  it('Then: Test the add and remove of books to reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    const firstRead = items[0].element(by.buttonText('Want to Read'));
    //const firstRemove = items[0].element(by.buttonText('Remove'));
    if(firstRead.isEnabled()) {
      await browser.wait(element(by.buttonText('Want to Read')).click(), 200);
      await browser.wait(element(by.buttonText('Remove')).click(), 200);
    }
    else {
      await browser.wait(element(by.buttonText('Remove')).click(), 200);
      await browser.wait(element(by.buttonText('Want to Read')).click(), 200);
    }
    expect(items.length).to.be.greaterThan(1, 'At least one book');
    browser.wait(ExpectedConditions.textToBePresentInElementValue(
      $('input[type="search"]'),
      'javascript'
    ), 5000)
  });
});
