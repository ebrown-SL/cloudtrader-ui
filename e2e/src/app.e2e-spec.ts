import { AppPage } from './app.po';
import { browser, logging, by, element } from 'protractor';

describe('Mock app login', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateToBase();
    expect(page.getTitleText()).toEqual('Cloud Trader');
  });

  it('should detect username', () => {
    page.navigateToBase();
    expect(page.detectUsername()).toEqual('Username');
  });

  it('should detect password', () => {
    page.navigateToBase();
    expect(page.detectPassword()).toEqual('Password');
  });

  it('should be able to register', async () => {
    page.nagivateToRegister();
    element(by.id('username-control')).sendKeys('test');
    element(by.id('password-control')).sendKeys('test');
    await element(by.className('btn btn-primary btn-block')).click();
    // We expect a redirect if registration returns successfully
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
  });

  it('should be able to log in', async () => {
    page.navigateToBase();
    element(by.id('username-control')).sendKeys('test');
    element(by.id('password-control')).sendKeys('test');
    await element(by.className('btn btn-primary btn-block')).click();
    // We expect a redirect to homepage if login returns successfully
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
