import { Browser, Page } from "puppeteer";
import { Options, PuppetKingOfTimeOptions } from "./options";
export default class PuppetKingOfTime {
    _browser: Browser;
    _page: Page;
    _options: Options;
    static launch(options: PuppetKingOfTimeOptions): Promise<PuppetKingOfTime>;
    constructor(browser: Browser, page: Page, options: PuppetKingOfTimeOptions);
    login(): Promise<void>;
    clockIn(): Promise<void>;
    clockOut(): Promise<void>;
    close(): Promise<void>;
}
