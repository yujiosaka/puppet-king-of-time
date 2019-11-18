const Puppeteer = require('puppeteer');
const extend = require('lodash/extend');
const omit = require('lodash/omit');
const pick = require('lodash/pick');

const LAUNCH_OPTIONS = [
  'ignoreHTTPSErrors',
  'headless',
  'executablePath',
  'slowMo',
  'args',
  'ignoreDefaultArgs',
  'handleSIGINT',
  'handleSIGTERM',
  'handleSIGHUP',
  'dumpio',
  'userDataDir',
  'env',
  'devtools',
];

class PuppetKingOfTime {
  static async launch(options = {}) {
    if (!options.id || !options.password) throw new Error('ID/Password should be passed');
    const browser = await Puppeteer.launch(pick(options, LAUNCH_OPTIONS));
    const page = await browser.newPage();
    const puppetKingOfTime = new PuppetKingOfTime(browser, page, omit(options, LAUNCH_OPTIONS));
    await puppetKingOfTime.login();
    return puppetKingOfTime;
  }

  constructor(browser, page, options) {
    this._browser = browser;
    this._page = page;
    this._options = extend({
      loginUrl: 'https://s2.kingtime.jp/independent/recorder/personal/',
      idSelector: '#id',
      passwordSelector: '#password',
      loginSelector: '.btn-control-message',
      clockInSelector: '.record-clock-in',
      clockOutSelector: '.record-clock-out',
      notificationSelector: '#notification_content',
      clockInNotificationContent: '出勤が完了しました。',
      clockOutNotificationContent: '退勤が完了しました。',
      timeout: 10000,
    }, options);
  }

  async login() {
    await this._page.goto(this._options.loginUrl);
    await this._page.type(this._options.idSelector, this._options.id);
    await this._page.type(this._options.passwordSelector, this._options.password);
    await Promise.all([
      this._page.waitFor(this._options.clockInSelector, { timeout: this._options.timeout }),
      this._page.waitFor(this._options.clockOutSelector, { timeout: this._options.timeout }),
      this._page.click(this._options.loginSelector),
    ]);
  }

  async clockIn() {
    await Promise.all([
      this._page.waitFor((selector, content) =>
        document.querySelector(selector).textContent === content, {
        timeout: this._options.timeout,
      }, this._options.notificationSelector, this._options.clockInNotificationContent),
      this._page.click(this._options.clockInSelector),
    ]);
  }

  async clockOut() {
    await Promise.all([
      this._page.waitFor((selector, content) =>
        document.querySelector(selector).textContent === content, {
        timeout: this._options.timeout,
      }, this._options.notificationSelector, this._options.clockOutNotificationContent),
      this._page.click(this._options.clockOutSelector),
    ]);
  }

  async close() {
    await this._page.close();
    await this._browser.close();
  }
}

module.exports = PuppetKingOfTime;
