# puppet-king-of-time
Have [KING OF TIME](https://www.kingtime.jp) like a puppet on a string

## Features

Powered by Headless Chrome, puppet-king-of-time automatically logs in to [KING OF TIME](https://www.kingtime.jp)'s recorder with your ID/password and allows you to programatically clock in/out for you.

## Getting Started

### Installation

```sh
npm i puppet-king-of-time
```

> **Note**: puppet-king-of-time contains [Puppeteer](https://github.com/GoogleChrome/puppeteer). During installation, it automatically downloads a recent version of Chromium. To skip the download, see [Environment variables](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables).

### Usage

```js
const PuppetKOT = require('puppet-king-of-time');

(async () => {
  // Launch the puppet-king-of-time with your ID/password
  const puppetKOT = await PuppetKOT.launch({ id: 'Your ID', password: 'Your password' });
  // Clock in
  await puppetKOT.clockIn();
  // Clock out
  await puppetKOT.clockOut();
  // Close the puppet-king-of-time
  await puppetKOT.close();
})();
```

## API reference

### Table of Contents

* [class: PuppetKOT](#class-puppetkot)
  * [PuppetKOT.launch([options])](#puppetkotlaunchoptions)
  * [puppetKOT.close()](#puppetkotclose)

## class: PuppetKOT

PuppetKOT provides methods to launch a Chromium instance.

```js
const PuppetKOT = require('puppet-king-of-time');

(async () => {
  const puppetKOT = await PuppetKOT.launch({ id: 'Your ID', password: 'Your password' });
  await puppetKOT.clockIn();
  await puppetKOT.close();
})();
```

### PuppetKOT.launch([options])

* `options` <[Object]>
  * `loginUrl` <[string]> Login url to [KING OF TIME](https://www.kingtime.jp)'s recorder, default to `https://s2.kingtime.jp/independent/recorder/personal/`.
  * `idSelector` <[string]> Login ID input's selector, default to `#id`.
  * `passwordSelector` <[string]> Login password input's selector, default to `#password`.
  * `loginSelector` <[string]> Login button's selector, default to `.btn-control-message`.
  * `clockInSelector` <[string]> Clock in button's selector, default to `.record-clock-in`.
  * `clockOutSelector` <[string]> Clock out button's selector, default to `.record-clock-out`.
  * `id` <[string]> **required**
  * `password` <[string]> **required**
* returns: <[Promise]<[PuppetKOT]>> Promise which resolves to PuppetKOT instance.

The method launches a Chromium instance. The following options are passed to [puppeteer.launch()](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions).

```
ignoreHTTPSErrors, headless, executablePath, slowMo, args, ignoreDefaultArgs, handleSIGINT, handleSIGTERM, handleSIGHUP, dumpio, userDataDir, env, devtools
```

### puppetKOT.clockIn()

* returns: <[Promise]> Promise resolved when clock in button is clicked.

### puppetKOT.clockOut()

* returns: <[Promise]> Promise resolved when clock out button is clicked.

### puppetKOT.close()

* returns: <[Promise]> Promise resolved when the browser is closed.

## Debugging tips

### Launch options

[PuppetKOT.launch()](#puppetkotlaunchoptions)'s options are passed to [puppeteer.launch()](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions). It may be useful to set the `headless` and `slowMo` options so that you can see what is going on.

```js
PuppetKOT.launch({ id: 'Your ID', password: 'Your password', headless: false, slowMo: 10 });
```

### Launch in Docker

Build the container with [this Dockerfile](https://github.com/yujiosaka/puppet-king-of-time/blob/master/Dockerfile):

```sh
docker build -t puppet-king-of-time-linux .
```

Run the container by passing `node -e "<yourscript.js content as a string>"` as the command:

```sh
docker run -i --rm --cap-add=SYS_ADMIN \
  --name puppet-king-of-time puppet-king-of-time-linux \
  node -e "`cat yourscript.js`"
```

[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String"
[PuppetKOT]: #class-puppetkot "PuppetKOT"
