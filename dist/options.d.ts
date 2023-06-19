export interface Options {
    id: string;
    password: string;
    loginUrl: string;
    idSelector: string;
    passwordSelector: string;
    loginSelector: string;
    clockInSelector: string;
    clockOutSelector: string;
    notificationSelector: string;
    loginNotificationContent: string;
    clockInNotificationContent: string;
    clockOutNotificationContent: string;
    timeout: number;
    ignoreHTTPSErrors?: boolean;
    headless?: boolean;
    executablePath?: string;
    slowMo?: number;
    args?: string[];
    ignoreDefaultArgs?: boolean;
    handleSIGINT?: boolean;
    handleSIGTERM?: boolean;
    handleSIGHUP?: boolean;
    dumpio?: boolean;
    userDataDir?: string;
    env?: Record<string, string | undefined>;
    devtools?: boolean;
}
export type PuppetKingOfTimeOptions = Pick<Options, "id" | "password"> & Partial<Omit<Options, "id" | "password">>;
