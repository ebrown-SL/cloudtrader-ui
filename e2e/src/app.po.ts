import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToBase(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  nagivateToRegister(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/register`) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  detectUsername(): Promise<string> {
    return element(by.id('username-control')).getAttribute(
      'placeholder'
    ) as Promise<string>;
  }

  detectPassword(): Promise<string> {
    return element(by.id('password-control')).getAttribute(
      'placeholder'
    ) as Promise<string>;
  }
}
