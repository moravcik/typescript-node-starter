import { ExampleBrowserNgPage } from './app.po';

describe('example-browser-ng App', () => {
  let page: ExampleBrowserNgPage;

  beforeEach(() => {
    page = new ExampleBrowserNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
