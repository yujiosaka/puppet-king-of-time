"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const omit_1 = __importDefault(require("lodash/omit"));
const pick_1 = __importDefault(require("lodash/pick"));
const PUPPETEER_LAUNCH_OPTIONS = [
    "ignoreHTTPSErrors",
    "headless",
    "executablePath",
    "slowMo",
    "args",
    "ignoreDefaultArgs",
    "handleSIGINT",
    "handleSIGTERM",
    "handleSIGHUP",
    "dumpio",
    "userDataDir",
    "env",
    "devtools",
];
class PuppetKingOfTime {
    _browser;
    _page;
    _options;
    static async launch(options) {
        if (!options.id || !options.password)
            throw new Error("ID and Password should be passed");
        const launchOpts = (0, pick_1.default)(options, PUPPETEER_LAUNCH_OPTIONS);
        launchOpts.args = ['--no-sandbox'];
        const browser = await puppeteer_1.default.launch(launchOpts);
        const page = await browser.newPage();
        const puppetKingOfTimeOptions = (0, omit_1.default)(options, PUPPETEER_LAUNCH_OPTIONS);
        const puppetKingOfTime = new PuppetKingOfTime(browser, page, puppetKingOfTimeOptions);
        await puppetKingOfTime.login();
        return puppetKingOfTime;
    }
    constructor(browser, page, options) {
        this._browser = browser;
        this._page = page;
        this._options = {
            loginUrl: "https://s2.kingtime.jp/independent/recorder/personal/",
            idSelector: "#id",
            passwordSelector: "#password",
            loginSelector: ".btn-control-message",
            clockInSelector: ".record-clock-in",
            clockOutSelector: ".record-clock-out",
            notificationSelector: '#notification_wrapper[style="display: none;"]',
            loginNotificationContent: "データを取得しました",
            clockInNotificationContent: "出勤が完了しました",
            clockOutNotificationContent: "退勤が完了しました",
            timeout: 10000,
            ...options,
        };
    }
    async login() {
        await this._page.goto(this._options.loginUrl);
        await this._page.type(this._options.idSelector, this._options.id);
        await this._page.type(this._options.passwordSelector, this._options.password);
        await Promise.all([
            this._page.waitForFunction((selector, content) => {
                const elem = document.querySelector(selector);
                return elem?.textContent?.includes(content);
            }, {
                timeout: this._options.timeout,
            }, this._options.notificationSelector, this._options.loginNotificationContent),
            this._page.click(this._options.loginSelector),
        ]);
    }
    async clockIn() {
        await Promise.all([
            this._page.waitForFunction((selector, content) => {
                const elem = document.querySelector(selector);
                return elem?.textContent?.includes(content);
            }, {
                timeout: this._options.timeout,
            }, this._options.notificationSelector, this._options.clockInNotificationContent),
            this._page.click(this._options.clockInSelector),
        ]);
    }
    async clockOut() {
        await Promise.all([
            this._page.waitForFunction((selector, content) => {
                const elem = document.querySelector(selector);
                return elem?.textContent?.includes(content);
            }, {
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
exports.default = PuppetKingOfTime;
//# sourceMappingURL=index.js.map