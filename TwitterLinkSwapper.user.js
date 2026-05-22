// ==UserScript==
// @name         Swap x.com copy link to fxtwitter
// @namespace    https://github.com/ReeceDonovan/TwitterLinkSwapper
// @version      1.0
// @description  Replace `x` to `fxtwitter` when clicking 'Copy Link'
// @author       ReeceDonovan
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://tweetdeck.twitter.com/*
// @match        https://x.com/*
// @icon         https://abs.twimg.com/favicons/twitter.2.ico
// @license      BSD-3-Clause
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  document.addEventListener("copy", (event) => {
    const copiedText = getCopiedText(event);
    if (!isValidTwitterUrl(copiedText)) {
      return;
    }

    const swappedUrl = copiedText
      .replace(/(twitter|x)\.com/, "fxtwitter.com")
      .replace(/\?s=20$/, "");

    if (event.clipboardData) {
      event.clipboardData.setData("text/plain", swappedUrl);
      event.preventDefault();
      return;
    }

    navigator.clipboard.writeText(swappedUrl).catch((error) => {
      console.error("Error replacing URL:", error);
    });
  });

  function getCopiedText(event) {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      return selection;
    }

    return event.clipboardData?.getData("text/plain").trim() || "";
  }

  function isValidTwitterUrl(url) {
    const urlRegex = /^https?:\/\/(www\.)?(twitter|x)\.com\/.+\/status\/\d+/;
    return urlRegex.test(url);
  }
})();
