(function () {
'use strict';

var globalWindow = window;

var window$1 = globalWindow;
var navigator$1 = globalWindow.navigator;
var document$1 = globalWindow.document;

var history = globalWindow.history;
var location$1 = globalWindow.location;
var $$1 = window$1['jQuery'];

var msDocs = window$1['msDocs'];
var contentLoaded = new Promise(function (resolve) { return $$1(resolve); });

if (typeof CustomEvent !== 'function') {
    window$1.CustomEvent = function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };
    window$1.CustomEvent.prototype = Event.prototype;
}

if (typeof fetch !== 'function') {
    window.fetch = function (url, options) {
        options = options || {};
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(options.method || 'get', url);
            for (var i in options.headers) {
                request.setRequestHeader(i, options.headers[i]);
            }
            request.withCredentials = options.credentials == 'include';
            request.onload = function () {
                resolve(response());
            };
            request.onerror = reject;
            request.send(options.body);
            function response() {
                var keys = [], all = [], headers = {}, header;
                request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, (function (m, key, value) {
                    keys.push(key = key.toLowerCase());
                    all.push([key, value]);
                    header = headers[key];
                    headers[key] = header ? header + "," + value : value;
                }));
                return {
                    ok: (request.status / 200 | 0) == 1,
                    status: request.status,
                    statusText: request.statusText,
                    url: request.responseURL,
                    clone: response,
                    text: function () { return Promise.resolve(request.responseText); },
                    json: function () { return Promise.resolve(request.responseText).then(JSON.parse); },
                    xml: function () { return Promise.resolve(request.responseXML); },
                    blob: function () { return Promise.resolve(new Blob([request.response])); },
                    headers: {
                        keys: function () { return keys; },
                        entries: function () { return all; },
                        get: function (n) { return headers[n.toLowerCase()]; },
                        has: function (n) { return n.toLowerCase() in headers; }
                    }
                };
            }
        });
    };
}
var fetchWithTimeout = function (url, init) {
    var timeout = 30 * 1000;
    return new Promise(function (resolve, reject) {
        fetch(url, init).then(resolve, reject);
        setTimeout(function () { return reject('timeout'); }, timeout);
    });
};

if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var thisArg = arguments[1];
            var k = 0;
            while (k < len) {
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                k++;
            }
            return undefined;
        }
    });
}
if (Array.from === undefined) {
    Array.from = function (x) { return Array.prototype.slice.call(x); };
}

var loc = {
    "africa": "Africa",
    "all": "all",
    "allapis": "All APIs",
    "allPackages": "All Packages",
    "americas": "Americas",
    "apiReference": "{0} API Reference",
    "apiSearchIsUnavailable": "API search is unavailable. Please try again later.",
    "applies.to": "Applies to:",
    "asia": "Asia",
    "askAQuestion": "Ask a question",
    "author.name": "Author Name",
    "azureDisclaimer": "Azure Cloud Shell uses your existing Azure subscriptions. Using Cloud Shell and executing commands will incur associated costs.",
    "back.to.top": "Back to top",
    "breadcrumb": "Breadcrumb",
    "change.page.locale": "Change Page Language",
    "clearfilter": "Clear Filter",
    "clearterm": "Clear Term",
    "close": "Close",
    "cloudShell.accountError": "There was an error accessing your Azure account.",
    "cloudShell.chooseAccount": "Choose one of your Azure accounts.",
    "cloudShell.loggingIn": "Logging into Azure Cloud Shell...",
    "cloudShell.pleaseLogin": "To use the Azure Cloud Shell, please login with your Azure account.",
    "code": "Code",
    "comments": "Comments",
    "continueHere": "Continue Here",
    "contributorGuide": "How to contribute",
    "contributors": "Contributors",
    "cookie.consent.europe": "By using this site you agree to the use of cookies for analytics, personalized content and ads.",
    "copy": "Copy",
    "currentSelection": "Current Selection:",
    "dark": "Dark",
    "description": "Description",
    "disable": "Disable",
    "disclaimer.archive": "This documentation is archived and is not being maintained.",
    "disclaimer.moniker": "This API is not supported in the currently selected framework.",
    "disclaimer.sxs.human": "You can display the English text in a popup window by moving the mouse pointer over the text.",
    "disclaimer.sxs.machine": "This article was translated by machine. You can display the English text in a popup window by moving the mouse pointer over the text.",
    "disclaimer.text": "This content is not available in your language. Here is the English version.",
    "dotnetEditor": ".NET Editor",
    "downloadPdf": "Download PDF",
    "edit": "Edit",
    "editdesc": "Edit This Document",
    "email": "Email",
    "enable": "Enable",
    "error": "Error",
    "europe": "Europe",
    "facebook": "Facebook",
    "feedback": "Feedback",
    "feedbackProduct": "Product Feedback",
    "filter.placeholder": "Filter",
    "filter.text": "Filter",
    "findALanguage": "Find a language",
    "footer.blog": "Blog",
    "getHelp": "Get help",
    "helpMeChoose": "Help me choose",
    "impressum.text": "Impressum",
    "in.this.article": "In this article",
    "intuneFeedback": "Intune Feedback",
    "language": "Language",
    "last.updated": "updated",
    "learnmore": "Learn more",
    "light": "Light",
    "linkedin": "LinkedIn",
    "loading": "Loading...",
    "loadMoreResults": "Load more results",
    "login": "Login",
    "mainNavigation": "Main Navigation",
    "maximize": "Maximize",
    "middleEast": "Middle East",
    "minimize": "Minimize",
    "minuteToRead": "{0} minutes to read",
    "moduleReference": "{0} Module Reference",
    "monikerFallback": "The requested page is not available for {0}. You have been redirected to the closest available version.",
    "more": "More",
    "msdn.redirection.message": "You were redirected to this page from MSDN.  We are in the process of migrating all technical content to docs.microsoft.com.",
    "name": "Name",
    "next": "Next",
    "no.date": "date not available",
    "no.description": "description not available",
    "no.results": "No results",
    "no.search.term": "No search term",
    "noOutput": "No output",
    "null.option.description": "-- Select Value --",
    "onPageNavigation": "On page navigation",
    "options": "Options",
    "output": "Output",
    "pacific": "Pacific",
    "platform": "Platform",
    "previous": "Previous",
    "privacy.statement": "Privacy &amp; Cookies",
    "privacystatement": "Privacy Statement",
    "product": "Product",
    "product.feedback": "To submit product feedback, please visit",
    "quickfilters": "Quick Filters",
    "reportAProductIssue": "Report a product issue",
    "resourcesFooter.startups": "Startups",
    "resourcesFooter.students": "Students",
    "resourcesFooter.title": "Resources",
    "resourcesFooter.videoLearning": "Video Learning",
    "response.code": "Response Code",
    "response.header": "Response Header",
    "restart": "Restart",
    "results.title": "Search results for",
    "rss": "RSS",
    "run": "Run",
    "sample.request": "Sample Request",
    "sample.response": "Sample Response",
    "search": "Search",
    "searchScopeTitle": "Search filter is \"{0}\". Tap to remove.",
    "selectedVersion": "Selected Version",
    "selectLocaleInstructions": "Filter the list of languages by selecting a region or by typing the language name or locale code.",
    "selectVersion": "Select Version",
    "serviceUnavailable": "The service is temporarily unavailable. We are working on it.",
    "share": "Share",
    "sharedArticleSubject": "[Shared Article] {0}",
    "sharedesc": "Share This Document",
    "slack": "Slack",
    "startHere": "Start Here",
    "terms.of.use": "Terms of Use",
    "test.request": "Test Request",
    "theme": "Theme",
    "trademarks": "Trademarks",
    "try.it": "Try It",
    "twitter": "Twitter",
    "version": "Version",
    "view.source": "View Code",
    "worldwide": "Worldwide"
};

var rtlDictionary = {
    'ar-sa': true,
    'he-il': true
};

function detectFeatures() {
    var html = document$1.documentElement;
    var className = html.className.replace('no-js', 'js');
    if (('ontouchstart' in window$1) || window$1.DocumentTouch && document$1 instanceof window$1.DocumentTouch) {
        className += ' hasTouch';
    }
    else {
        className += ' noTouch';
    }
    html.className = className;
}

function detectHighContrast() {
    var div = document$1.createElement('div');
    div.style.cssText = 'position:absolute;top:0;left:-2300px;background-color:#878787';
    div.textContent = 'hc';
    document$1.body.appendChild(div);
    var color = window$1.getComputedStyle(div).backgroundColor.toLowerCase();
    document$1.body.removeChild(div);
    if (color !== '#878787' && color !== 'rgb(135, 135, 135)') {
        document$1.documentElement.className += ' highContrast';
    }
}

function ie10MobileFix() {
    if (navigator$1.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document$1.createElement("style");
        msViewportStyle.appendChild(document$1.createTextNode("@-ms-viewport{width:auto!important}"));
        document$1.getElementsByTagName("head")[0].
            appendChild(msViewportStyle);
    }
}

function fixDate() {
    $$1('time[datetime]').each(function () {
        var dateVal = new Date($$1(this).attr('datetime'));
        $$1(this).text(dateVal.toLocaleDateString(msDocs.data.userLocale, { year: 'numeric', month: '2-digit', day: '2-digit' }));
    });
    $$1(".metadata").removeClass("loading");
}

function pluginDomReadyShield() {
    $$1.fn.oldReady = $$1.fn.ready;
    $$1.fn.ready = function (fn) {
        return $$1.fn.oldReady(function () { try {
            if (fn)
                fn.apply($$1, arguments);
        }
        catch (e) {
            console.error(e);
        } });
    };
}

function pluginLALD() {
    var domReady = false;
    var $document = $$1(document$1);
    var handleAttachment = function (selector, event, arg1, arg2, namespace) {
        var namespacedEvent = event + '.' + namespace;
        var data = arg2 ? arg1 : null;
        var handler = arg2 ? arg2 : arg1;
        if (!domReady) {
            if (data) {
                $document.on(namespacedEvent, selector, data, handler);
            }
            else {
                $document.on(namespacedEvent, selector, handler);
            }
        }
        $$1(function () {
            domReady = true;
            $document.off(namespacedEvent, selector, handler);
            if (namespace === 'lald') {
                if (data) {
                    $$1(selector).on(namespacedEvent, data, handler);
                }
                else {
                    $$1(selector).on(namespacedEvent, handler);
                }
            }
        });
    };
    $$1.lald = function (selector, event, arg1, arg2) {
        handleAttachment(selector, event, arg1, arg2, 'lald');
    };
    $$1.lad = function (selector, event, arg1, arg2) {
        handleAttachment(selector, event, arg1, arg2, 'lad');
    };
}

function pluginAddState() {
    $$1.fn.removeState = function (namespace) {
        $$1(this).each(function () {
            var $this = $$1(this);
            if ($this.attr("class") && $this.attr("class").indexOf(namespace) >= 0) {
                var otherClasses = $$1.grep($this.attr("class").split(" "), function (aClass) {
                    return aClass.lastIndexOf(namespace, 0) !== 0;
                });
                $this.attr("class", otherClasses.join(" "));
            }
        });
        return this;
    };
    $$1.fn.addState = function (namespace, state) {
        this.removeState(namespace);
        this.addClass(namespace + state);
        return this;
    };
    $$1.fn.toggleState = function (namespace, state, switchVal) {
        var $this = $$1(this);
        if (typeof switchVal === "boolean") {
            if (switchVal) {
                $this.addState(namespace, state);
            }
            else {
                $this.removeClass(namespace + state);
            }
            return this;
        }
        if ($this.hasClass(namespace + state)) {
            $this.removeClass(namespace + state);
        }
        else {
            $this.addState(namespace, state);
        }
        return this;
    };
}

function pluginIfThen() {
    $$1.fn.extend({
        ifThen: function () {
            var args = arguments;
            if (args.length < 2) {
                return this;
            }
            for (var i = 0; i < args.length; i = i + 2) {
                if (args[i] && jQuery.isFunction(args[i + 1])) {
                    args[i + 1].call(this);
                    return this;
                }
            }
            if (args.length % 2 && (typeof args[args.length - 1] === "function")) {
                args[args.length - 1].call(this);
            }
            return this;
        }
    });
}

var ProtectedLocalStorage = (function () {
    function ProtectedLocalStorage() {
    }
    ProtectedLocalStorage.prototype.setItem = function (key, data) {
        try {
            return window$1.localStorage.setItem(key, data);
        }
        catch (e) {
            return undefined;
        }
    };
    
    ProtectedLocalStorage.prototype.setJsonItem = function (key, json) {
        try {
            return window$1.localStorage.setItem(key, JSON.stringify(json));
        }
        catch (e) {
            return undefined;
        }
    };
    
    ProtectedLocalStorage.prototype.getItem = function (key) {
        try {
            return window$1.localStorage.getItem(key);
        }
        catch (e) {
            return null;
        }
    };
    
    ProtectedLocalStorage.prototype.getJsonItem = function (key) {
        try {
            return JSON.parse(window$1.localStorage.getItem(key));
        }
        catch (e) {
            return null;
        }
    };
    
    ProtectedLocalStorage.prototype.clear = function () {
        try {
            return window$1.localStorage.clear();
        }
        catch (e) {
            return undefined;
        }
    };
    
    ProtectedLocalStorage.prototype.removeItem = function (key) {
        try {
            return window$1.localStorage.removeItem(key);
        }
        catch (e) {
            return undefined;
        }
    };
    
    Object.defineProperty(ProtectedLocalStorage.prototype, "length", {
        get: function () {
            try {
                return window$1.localStorage.length;
            }
            catch (e) {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    
    ProtectedLocalStorage.prototype.key = function (index) {
        try {
            return window$1.localStorage.key(index);
        }
        catch (e) {
            return null;
        }
    };
    
    return ProtectedLocalStorage;
}());
var localStorage$1 = new ProtectedLocalStorage();
var ProtectedSessionStorage = (function () {
    function ProtectedSessionStorage() {
    }
    ProtectedSessionStorage.prototype.setItem = function (key, data) {
        try {
            return window$1.sessionStorage.setItem(key, data);
        }
        catch (e) {
            return undefined;
        }
    };
    
    ProtectedSessionStorage.prototype.getItem = function (key) {
        try {
            return window$1.sessionStorage.getItem(key);
        }
        catch (e) {
            return null;
        }
    };
    
    ProtectedSessionStorage.prototype.clear = function () {
        try {
            return window$1.sessionStorage.clear();
        }
        catch (e) {
            return undefined;
        }
    };
    
    ProtectedSessionStorage.prototype.removeItem = function (key) {
        try {
            return window$1.sessionStorage.removeItem(key);
        }
        catch (e) {
            return undefined;
        }
    };
    
    Object.defineProperty(ProtectedSessionStorage.prototype, "length", {
        get: function () {
            try {
                return window$1.sessionStorage.length;
            }
            catch (e) {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    
    ProtectedSessionStorage.prototype.key = function (index) {
        try {
            return window$1.sessionStorage.key(index);
        }
        catch (e) {
            return null;
        }
    };
    
    return ProtectedSessionStorage;
}());
var sessionStorage = new ProtectedSessionStorage();
function installProtecedStorage() {
    msDocs.functions.localStorage = localStorage$1;
}

function themeSwitcher() {
    var selectorId = 'theme-selector';
    var storageName = 'theme';
    var classNamespace = 'theme';
    var placeholderClass = 'removedOnload';
    var updateThemeClass = function (currentValue) {
        var wasDark = document$1.documentElement.classList.contains('theme_night');
        var currentTheme = currentValue || localStorage$1.getItem(storageName);
        if (currentTheme && currentTheme.length) {
            currentTheme = currentTheme.replace(classNamespace, '');
            $$1('html').addState(classNamespace, currentTheme);
            if (currentTheme === '_night') {
                currentTheme = 'dark';
            }
            msDocs.data.currentTheme = currentTheme;
        }
        else {
            $$1('html').removeState(classNamespace);
            msDocs.data.currentTheme = 'light';
        }
        var isDark = document$1.documentElement.classList.contains('theme_night');
        if (isDark !== wasDark) {
            document$1.documentElement.dispatchEvent(new CustomEvent('theme-changed', { bubbles: true, detail: { isDark: isDark } }));
        }
    };
    $$1.lald('#' + selectorId, 'change', function (e) {
        var currentValue = $$1(this).val();
        if (currentValue && currentValue.length) {
            localStorage$1.setItem(storageName, currentValue);
        }
        else {
            localStorage$1.removeItem(storageName);
        }
        updateThemeClass(currentValue);
    });
    updateThemeClass();
    $$1(function () {
        var $selector = $$1('#' + selectorId);
        $selector.find('.' + placeholderClass).remove();
        var currentTheme = localStorage$1.getItem(storageName);
        if (currentTheme && currentTheme.length) {
            $selector.val(currentTheme);
        }
    });
}

function sharing() {
    var appendCampaignId = function (shareLink, campaignId) {
        if (shareLink.indexOf('?') === -1) {
            return shareLink + "?WT.mc_id=" + campaignId;
        }
        else {
            return shareLink + "&WT.mc_id=" + campaignId;
        }
    };
    var buildTwitterShareUrl = function (shareLink, message) {
        shareLink = encodeURIComponent(appendCampaignId(shareLink, "docs-twitter"));
        return "https://twitter.com/intent/tweet?original_referer=" + shareLink + "&text=" + encodeURIComponent(message) + "&tw_p=tweetbutton&url=" + shareLink;
    };
    var buildLinkedInShareUrl = function (shareLink) {
        shareLink = encodeURIComponent(appendCampaignId(shareLink, "docs-linkedin"));
        return "https://www.linkedin.com/cws/share?url=" + shareLink;
    };
    var buildEmailShareUrl = function (shareLink) {
        var subject = encodeURIComponent(loc.sharedArticleSubject.replace('{0}', document$1.title));
        var body = encodeURIComponent(document$1.title + "\n\n" + appendCampaignId(shareLink, "docs-email"));
        return "mailto:?subject=" + subject + "&body=" + body;
    };
    var buildFacebookShareUrl = function (shareLink) {
        shareLink = encodeURIComponent(appendCampaignId(shareLink, "docs-facebook"));
        return "https://www.facebook.com/sharer/sharer.php?u=" + shareLink;
    };
    var buildNavigatorShareUrl = function (shareLink) {
        return appendCampaignId(shareLink, "docs-share");
    };
    var buildWeiboShareUrl = function (shareLink, message) {
        shareLink = encodeURIComponent(appendCampaignId(shareLink, "docs-weibo"));
        return "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(message) + "&url=" + shareLink;
    };
    var shareLink = location.origin + location.pathname + location.search;
    var facebookShareUrl = buildFacebookShareUrl(shareLink);
    var twitterShareUrl = buildTwitterShareUrl(shareLink, document$1.title);
    var linkedinShareUrl = buildLinkedInShareUrl(shareLink);
    var emailShareUrl = buildEmailShareUrl(shareLink);
    var navigatorShareUrl = buildNavigatorShareUrl(shareLink);
    $$1(".share-facebook").attr("href", facebookShareUrl);
    $$1(".share-twitter").attr("href", twitterShareUrl);
    $$1(".share-linkedin").attr("href", linkedinShareUrl);
    $$1(".share-email").attr("href", emailShareUrl);
    var weiboShareUrl = buildWeiboShareUrl(shareLink, document$1.title);
    $$1(".share-weibo").attr("href", weiboShareUrl);
    $$1('body').not('.share-container').click(function () {
        $$1('.share-container').hide();
    });
    $$1('.sharebutton').click(function () {
        var nav = navigator;
        if (nav.share) {
            nav.share({
                title: document$1.title,
                url: navigatorShareUrl
            })
                .catch(function (error) {
                dropDownShare();
            });
        }
        else {
            dropDownShare();
        }
        return false;
    });
    var dropDownShare = function () {
        var pos = $$1('.sharebutton').position();
        if ($$1('.mainContainer').attr('dir') !== 'rtl') {
            $$1('.share-container').css('left', pos.left);
        }
        $$1('.share-container').css('top', pos.top + 36);
        $$1('.share-container').toggle();
    };
    $$1('.share-container > li > a').click(function () {
        window$1.open(this.href, '', 'width=600,height=650');
        return false;
    });
}

function showDisclaimer(message) {
    var disclaimer = document$1.createElement('div');
    disclaimer.classList.add('disclaimer');
    disclaimer.appendChild(document$1.createElement('span'));
    disclaimer.firstElementChild.classList.add('disclaimertext');
    disclaimer.firstElementChild.textContent = message;
    var main = document$1.querySelector('main');
    main.insertBefore(disclaimer, main.firstElementChild);
    return disclaimer;
}

var cookieApi;

(function (factory) {
    cookieApi = factory();
}(function () {
    var extend = function () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    };
    function init(converter) {
        var api = function (key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }
            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);
                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                }
                catch (e) { }
                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                }
                else {
                    value = converter.write(value, key);
                }
                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);
                var stringifiedAttributes = '';
                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName];
                }
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }
            if (!key) {
                result = {};
            }
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;
            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');
                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }
                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);
                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        }
                        catch (e) { }
                    }
                    if (key === name) {
                        result = cookie;
                        break;
                    }
                    if (!key) {
                        result[name] = cookie;
                    }
                }
                catch (e) { }
            }
            return result;
        };
        api.set = api;
        api.get = function (key) {
            return api.call(api, key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};
        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };
        api.withConverter = init;
        return api;
    }
    return init(function () { });
}));
var cookies = cookieApi;

var localeNames = {
    "id-id": "Bahasa Indonesia",
    "ms-my": "Bahasa Malaysia",
    "ca-es": "Català",
    "cs-cz": "Čeština",
    "da-dk": "Dansk",
    "de-de": "Deutsch",
    "de-at": "Deutsch (Österreich)",
    "de-ch": "Deutsch (Schweiz)",
    "et-ee": "Eesti",
    "en-au": "English (Australia)",
    "en-ca": "English (Canada)",
    "en-in": "English (India)",
    "en-ie": "English (Ireland)",
    "en-my": "English (Malaysia)",
    "en-nz": "English (New Zealand)",
    "en-sg": "English (Singapore)",
    "en-za": "English (South Africa)",
    "en-gb": "English (United Kingdom)",
    "en-us": "English (United States)",
    "es-es": "Español (España)",
    "es-mx": "Español (México)",
    "eu-es": "Euskara",
    "fr-fr": "Français",
    "fr-be": "Français (Belgique)",
    "fr-ca": "Français (Canada)",
    "fr-ch": "Français (Suisse)",
    "gl-es": "Galego",
    "hr-hr": "Hrvatski",
    "is-is": "Íslenska",
    "it-it": "Italiano",
    "it-ch": "italiano (Svizzera)",
    "lv-lv": "Latviešu",
    "lt-lt": "Lietuvių",
    "hu-hu": "Magyar",
    "nl-nl": "Nederlands",
    "nl-be": "Nederlands (België)",
    "nb-no": "Norsk",
    "pl-pl": "Polski",
    "pt-br": "Português (Brasil)",
    "pt-pt": "Português (Portugal)",
    "ro-ro": "Română",
    "sk-sk": "Slovenčina",
    "sl-si": "Slovenski",
    "fi-fi": "Suomi",
    "sv-se": "Svenska",
    "vi-vn": "Tiếng Việt",
    "tr-tr": "Türkçe",
    "el-gr": "Ελληνικά",
    "bg-bg": "Български",
    "kk-kz": "Қазақ",
    "ru-ru": "Русский",
    "sr-cyrl-rs": "Српски (Србија и Црна Гора)",
    "sr-latn-rs": "Srpski (Srbija i Crna Gora)",
    "uk-ua": "Україньска",
    "he-il": "עברית‏",
    "ar-sa": "العربية",
    "hi-in": "हिंदी",
    "th-th": "ไทย",
    "ko-kr": "한국어",
    "zh-tw": "中文 (台灣)",
    "zh-cn": "中文 (中华人民共和国)",
    "zh-hk": "中文 (香港特別行政區)",
    "ja-jp": "日本語"
};
var pathLocaleRegex = /^\/([a-z]{2}-(?:[a-z]{4}-)?[a-z]{2})(\/|$)/i;
var localeCookieName = 'MarketplaceSelectedLocale';
function getLocaleFromPath(path) {
    var match = pathLocaleRegex.exec(path);
    return match === null ? 'en-us' : match[1];
}
function removeLocaleFromPath(path) {
    return path.replace(pathLocaleRegex, '/');
}
function replaceLocaleInPath(path, locale) {
    return path.replace(pathLocaleRegex, "/" + locale + "$2");
}
function setDocumentLocale() {
    var userLocale = msDocs.data.userLocale;
    msDocs.data.userLocaleName = localeNames[userLocale];
    var contentLocale = msDocs.data.contentLocale;
    var contentDir = msDocs.data.contentDir;
    var userDir = 'ltr';
    if (msDocs.data.rtl[userLocale]) {
        userDir = 'rtl';
    }
    $$1('html').attr('lang', userLocale).attr('dir', userDir);
    $$1(function () {
        $$1('html').attr('lang', contentLocale).attr('dir', contentDir);
        $$1('body').attr('lang', userLocale).attr('dir', userDir);
        if (userDir === 'rtl') {
            $$1('.az_h').attr({ 'lang': 'en-us', 'dir': 'ltr' });
        }
        if (contentLocale !== userLocale && /^en/.test(contentLocale) && !/^en/.test(userLocale)
            && (msDocs.data.pageTemplate === 'ContentPage' || msDocs.data.pageTemplate === 'Conceptual')) {
            showDisclaimer(loc['disclaimer.text']);
        }
        setupLocaleLink(userLocale);
    });
}
function setLocaleCookie(locale) {
    cookies.set(localeCookieName, locale, { expires: 365 * 10 });
}
function setupLocaleLink(userLocale) {
    var localeSelector = document.getElementById('locale-selector-link');
    if (!localeSelector) {
        return;
    }
    localeSelector.textContent = localeNames[userLocale];
    var path = "/" + userLocale + "/locale";
    localeSelector.href = path + "?target=" + encodeURIComponent(location.pathname + location.search + location.hash);
}

var metaDictionary;
function readMetaTags() {
    metaDictionary = {};
    var metaTags = document$1.head.querySelectorAll('meta');
    for (var i = 0; i < metaTags.length; i++) {
        var meta = metaTags.item(i);
        if (metaDictionary[meta.name]) {
            metaDictionary[meta.name].push(meta.content);
        }
        else {
            metaDictionary[meta.name] = [meta.content];
        }
    }
}
function getMeta(name) {
    if (metaDictionary === undefined) {
        readMetaTags();
    }
    return metaDictionary[name] === undefined ? undefined : metaDictionary[name][0];
}
function getMetas(name) {
    if (metaDictionary === undefined) {
        readMetaTags();
    }
    return metaDictionary[name] ? metaDictionary[name] : [];
}
function installGetMeta() {
    msDocs.functions.getMeta = getMeta;
    msDocs.functions.getMetas = getMetas;
}

function getParam(name, type) {
    var frag = type === 'hash' ? window$1.location.hash : window$1.location.search;
    if (frag.length > 1) {
        frag = frag.substring(1);
        var cmpstring = name + "=";
        var cmplen = cmpstring.length;
        var temp = frag.split("&");
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].substr(0, cmplen) == cmpstring) {
                return temp[i].substr(cmplen);
            }
        }
    }
    return undefined;
}
function installGetParam() {
    msDocs.functions.getParam = getParam;
}

function parseQueryString(queryString) {
    var match;
    var pl = /\+/g;
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };
    if (queryString === undefined) {
        queryString = location$1.search;
    }
    queryString = queryString.substring(1);
    var urlParams = {};
    while (match = search.exec(queryString)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
    return urlParams;
}
function toQueryString(args) {
    var parts = [];
    for (var name_1 in args) {
        if (args.hasOwnProperty(name_1) && args[name_1] !== '' && args[name_1] !== null && args[name_1] !== undefined) {
            parts.push(encodeURIComponent(name_1) + '=' + encodeURIComponent(args[name_1]));
        }
    }
    return parts.join('&');
}
function updateQueryString(args, usePushState) {
    var current = parseQueryString();
    var changed = false;
    for (var name_2 in args) {
        if (args.hasOwnProperty(name_2) && current[name_2] !== args[name_2]) {
            current[name_2] = args[name_2];
            changed = true;
        }
    }
    if (!changed) {
        return;
    }
    var queryString = toQueryString(current);
    if (queryString.length > 0) {
        queryString = '?' + queryString;
    }
    var url = location$1.protocol + "//" + location$1.host + location$1.pathname + queryString + location$1.hash;
    if (usePushState) {
        history.pushState(current, document$1.title, url);
    }
    else {
        location$1.href = url;
    }
}

function load() {
    var askForCookieConsentInAllLocales = false;
    var isAzure = msDocs.data.brand === 'azure';
    var method = isAzure ? 'GetConsentBanner' : 'GetUHF';
    var args = isAzure ? { locale: msDocs.data.userLocale } : {
        locale: msDocs.data.userLocale,
        headerId: getMeta('uhfHeaderId') || 'MSDocsHeader-DocsL1',
        footerId: getMeta('uhfFooterId') || 'MSDocsFooter',
        partnerId: getMeta('uhfPartnerId'),
        cookieCompliance: askForCookieConsentInAllLocales
    };
    var url = "https://docs.microsoft.com/api/" + method + "?" + toQueryString(args);
    var uhf;
    return fetch(url).then(function (response) { return response.json(); })
        .then(function (u) {
        normalizeUhf(u);
        uhf = u;
        var htmlPrerequisites = [contentLoaded];
        var _loop_1 = function (url_1) {
            var link = document$1.createElement('link');
            link.rel = 'stylesheet';
            link.href = url_1;
            htmlPrerequisites.push(new Promise(function (resolve) { link.onload = resolve; }));
            document$1.head.appendChild(link);
        };
        for (var _i = 0, _a = uhf.cssIncludes; _i < _a.length; _i++) {
            var url_1 = _a[_i];
            _loop_1(url_1);
        }
        return Promise.all(htmlPrerequisites);
    })
        .then(function () {
        var placeholderId = isAzure ? 'lca-cookie-notification' : 'headerAreaHolder';
        var placeholder = document$1.getElementById(placeholderId);
        placeholder.innerHTML = uhf.headerHTML;
        var scriptPromises = [];
        var _loop_2 = function (url_2) {
            var script = document$1.createElement('script');
            script.src = url_2;
            script.defer = true;
            scriptPromises.push(new Promise(function (resolve) { script.onload = resolve; }));
            document$1.head.appendChild(script);
        };
        for (var _i = 0, _a = uhf.javascriptIncludes; _i < _a.length; _i++) {
            var url_2 = _a[_i];
            _loop_2(url_2);
        }
        return Promise.all(scriptPromises);
    });
}
function normalizeUhf(uhf) {
    if (Array.isArray(uhf.javascriptIncludes)) {
        return;
    }
    var html = uhf.javascriptIncludes;
    uhf.javascriptIncludes = [];
    var regex = /src="([^"]+)"/g;
    var match;
    do {
        match = regex.exec(html);
        if (match !== null) {
            uhf.javascriptIncludes.push(match[1]);
        }
    } while (match);
}
function disableSearchSuggestions() {
    var shellOptions = { as: { callback: function () { } } };
    if (window$1.msCommonShell) {
        window$1.msCommonShell.load(shellOptions);
    }
    else {
        window$1.onShellReadyToLoad = function () {
            delete window$1.onShellReadyToLoad;
            window$1.msCommonShell.load(shellOptions);
        };
    }
}
var setHeaderLoaded;
var headerLoaded = new Promise(function (resolve) { return setHeaderLoaded = resolve; });
function initUhf() {
    var _a = msDocs.data, brand = _a.brand, userLocale = _a.userLocale;
    if (brand === 'mooncake') {
        setHeaderLoaded();
        return;
    }
    if (brand !== 'azure') {
        disableSearchSuggestions();
    }
    load().then(function () { return setHeaderLoaded(); });
}

function loadLibrary(url, globalName) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = function () { reject("Failed to load " + url); };
        (document.body || document.head).appendChild(script);
    }).then(function () {
        if (globalName === undefined) {
            return undefined;
        }
        if (window[globalName] === undefined) {
            throw new Error(url + " loaded successfully but " + globalName + " is undefined.");
        }
        return window[globalName];
    });
}

var consentGranted;
var cookieConsent = new Promise(function (resolve) { return consentGranted = resolve; });
var setInitialDisposition;
var initialCookieConsentDisposition = new Promise(function (resolve) { return setInitialDisposition = resolve; });
function initCookieConsent() {
    headerLoaded.then(function () {
        var mscc = window$1.mscc;
        var hasConsent = mscc === undefined || mscc.hasConsent();
        setInitialDisposition(hasConsent);
        if (hasConsent) {
            consentGranted();
        }
        else {
            var unobserve_1 = observeInteractions(mscc);
            mscc.on('consent', function () {
                unobserve_1();
                consentGranted();
            });
        }
    });
}
function observeInteractions(mscc) {
    function processInteraction(_a) {
        var isTrusted = _a.isTrusted, target = _a.target, type = _a.type;
        if (!isTrusted) {
            return;
        }
        if (/input|change/.test(type) && (target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
            mscc.setConsent();
            return;
        }
        if (type === 'click' && target instanceof Element && $(target).closest('button').length > 0) {
            mscc.setConsent();
            return;
        }
    }
    window$1.addEventListener('input', processInteraction, { passive: true });
    window$1.addEventListener('change', processInteraction, { passive: true });
    window$1.addEventListener('click', processInteraction, { passive: true });
    return function () {
        window$1.removeEventListener('input', processInteraction);
        window$1.removeEventListener('change', processInteraction);
        window$1.removeEventListener('click', processInteraction);
    };
}

var contentTags = {
    id: 'id',
    name: 'name',
    type: 'type',
    scenario: 'scn',
    scenarioStep: 'scnstp',
    scenarioStepNumber: 'subnm'
};
var contentAttrs = {
    id: 'data-bi-id',
    name: 'data-bi-name',
    type: 'data-bi-type',
    scenario: 'data-bi-scn',
    scenarioStep: 'data-bi-scnstp',
    scenarioStepNumber: 'data-bi-subnm'
};
var jsllUrl = 'https://az725175.vo.msecnd.net/scripts/jsll-4.js';
var tagMapping = {
    'audience': 'aud',
    'author': 'author',
    'manager': 'manager',
    'ms.assetid': 'asst',
    'ms.author': 'pgauth',
    'ms.contentsource': 'pgpubl',
    'ms.custom': 'custom',
    'ms.date': 'date',
    'depot_name': 'depotname',
    'ms.devlang': 'pgdevlng',
    'gitcommit': 'gitcommit',
    'original_content_git_url': 'giturl',
    'updated_at': 'publishtime',
    'ms.prod': 'product',
    'ms.reviewer': 'reviewer',
    'ms.service': 'pgsrvcs',
    'ms.suite': 'suite',
    'ms.technology': 'technology',
    'ms.tgt_pltfrm': 'pgtrgtplf',
    'ms.topic': 'pgtop',
    'ms.workload': 'workload',
    'ms.search.region': 'searchregion',
    'experimental': 'experimental',
    'experiment_id': 'experiment_id',
    'ms.assigned_experiments': 'assigned_experiments',
    'translationtype': 'translationtype'
};
var notifyJsllReady;
function track() {
    return Promise.all([loadLibrary(jsllUrl, 'awa'), initialCookieConsentDisposition])
        .then(function (_a) {
        var awa = _a[0], hasCookieConsent = _a[1];
        configureJsll(awa, hasCookieConsent);
        trackUnhandledExceptionsUsingWedcs(awa);
        trackSelectElementChange(awa);
        trackPageFocus(awa);
        trackPageVisibility(awa);
        trackPrint(awa);
        trackSecondaryContentScroll(awa);
        trackUnload(awa);
        trackUHFSearch(awa);
        trackCtrlF(awa);
        notifyJsllReady(awa);
    });
}
function configureJsll(awa, hasCookieConsent) {
    var jsllConfig = {
        syncMuid: hasCookieConsent,
        autoCapture: {
            pageView: true,
            onLoad: true,
            click: true,
            scroll: true,
            resize: true,
            jsError: true,
            addin: true,
            msTags: false,
            perf: true,
            assets: false,
            lineage: true
        },
        coreData: {
            appId: {
                'docs.microsoft.com': 'Docs',
                'review.docs.microsoft.com': 'DocsReview',
                'docs.azure.cn': 'DocsCN',
                'developer.microsoft.com': 'DevCenter'
            }[location.hostname] || 'JsllTest',
            pageName: getMeta('document_id') || 'missing document_id',
            market: msDocs.data.userLocale,
            pageType: getMeta('pagetype'),
            pageTags: {}
        }
    };
    var metas = document$1.querySelectorAll('meta');
    for (var i = 0; i < metas.length; i++) {
        var meta = metas.item(i);
        var awaTag = tagMapping[meta.name];
        if (awaTag) {
            jsllConfig.coreData.pageTags[awaTag] = meta.content;
        }
    }
    jsllConfig.coreData.pageTags.contentlocale = msDocs.data.contentLocale;
    jsllConfig.coreData.pageTags.theme = msDocs.data.currentTheme;
    awa.consoleVerbosity = awa.verbosityLevels.WARNING;
    awa.init(jsllConfig);
}
var jsllReady = new Promise(function (resolve) { return notifyJsllReady = resolve; });
function wedcs() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof window$1.MscomCustomEvent === 'function') {
        window$1.MscomCustomEvent.apply(window$1, args);
    }
}
function getName(element) {
    while (element && element.hasAttribute && !element.hasAttribute(contentAttrs.name)) {
        element = element.parentElement;
    }
    if (!element) {
        return '';
    }
    return element.getAttribute(contentAttrs.name);
}
function trackSelectElementChange(awa) {
    function handleChange(event) {
        if (!event.isTrusted || !(event.target instanceof HTMLSelectElement) || !event.target.hasAttribute(contentAttrs.name)) {
            return;
        }
        awa.ct.capturePageAction(event.target, {
            actionType: awa.actionType.OTHER,
            behavior: awa.behavior.OTHER,
            content: {
                event: 'select-value-changed',
                name: getName(event.target),
                value: event.target.value
            }
        });
        wedcs('ms.switcheventtime', new Date().getTime().toString(), 'ms.switcher', event.target.getAttribute(contentAttrs.name).replace(/^select-/, ''), 'ms.switchervalue', event.target.value);
    }
    document$1.addEventListener('change', handleChange, { passive: true });
}
function trackPageFocus(awa) {
    var previousType = '';
    function reportFocusChanged(event) {
        if (!event.isTrusted || previousType === event.type) {
            return;
        }
        previousType = event.type;
        awa.ct.captureContentPageAction({
            actionType: awa.actionType.OTHER,
            behavior: awa.behavior.OTHER,
            content: {
                event: 'page-focus-changed',
                value: event.type
            }
        });
        wedcs('ms.focuseventtime', new Date().getTime().toString(), 'ms.focusorblue', event.type === 'focus' ? 'Focused' : 'Blured');
    }
    var timeout = 0;
    function handleFocusedChanged(event) {
        clearTimeout(timeout);
        timeout = setTimeout(function () { return reportFocusChanged(event); }, 50);
    }
    window$1.addEventListener('focus', handleFocusedChanged, { passive: true });
    window$1.addEventListener('blur', handleFocusedChanged, { passive: true });
}
function trackPageVisibility(awa) {
    function visibilityChanged(event) {
        awa.ct.captureContentPageAction({
            actionType: awa.actionType.OTHER,
            behavior: awa.behavior.OTHER,
            content: {
                event: 'page-visibility-changed',
                value: document$1.hidden ? 'hidden' : 'visible'
            }
        });
        wedcs('ms.page-visibility-changed', document$1.hidden ? 'hidden' : 'visible');
    }
    function attach() {
        document$1.addEventListener('visibilitychange', visibilityChanged, { passive: true });
    }
    document$1.readyState === 'interactive' || document$1.readyState === 'complete' ? attach() : document$1.addEventListener('DOMContentLoaded', attach);
}
function trackPrint(awa) {
    if (!window$1.matchMedia) {
        return;
    }
    window$1.matchMedia('print').addListener(function (m) {
        if (!m.matches) {
            return;
        }
        awa.ct.captureContentPageAction({
            actionType: awa.actionType.OTHER,
            behavior: awa.behavior.PRINT,
            content: {
                event: 'print'
            }
        });
        wedcs('ms.print', 'print');
    });
}
function trackSecondaryContentScroll(awa) {
    function reportScroll(event) {
        if (!event.isTrusted || !(event.target instanceof HTMLElement)) {
            return;
        }
        var _a = event.target.getBoundingClientRect(), width = _a.width, height = _a.height;
        var _b = event.target, scrollLeft = _b.scrollLeft, scrollTop = _b.scrollTop, scrollWidth = _b.scrollWidth, scrollHeight = _b.scrollHeight;
        awa.ct.capturePageAction(event.target, {
            actionType: awa.actionType.OTHER,
            behavior: awa.behavior.OTHER,
            content: {
                event: 'secondary-content-scroll',
                name: getName(event.target),
                viewPortWidth: Math.floor(width),
                viewPortHeight: Math.floor(height),
                contentWidth: Math.floor(scrollWidth),
                contentHeight: Math.floor(scrollHeight),
                horizontalOffset: Math.floor(scrollLeft),
                verticalOffset: Math.floor(scrollTop)
            }
        });
    }
    function handleScroll(event) {
        if (event.target === document$1) {
            return;
        }
        var target = event.target;
        clearTimeout(target.reportScrollTimeout);
        target.reportScrollTimeout = setTimeout(function () { return reportScroll(event); }, 100);
    }
    window$1.addEventListener('scroll', handleScroll, { passive: true, capture: true });
}
function trackUnload(awa) {
    var anchor = false;
    function handleUnload(event) {
        awa.ct.captureContentPageAction({
            actionType: awa.actionType.OTHER,
            behavior: awa.behavior.OTHER,
            content: {
                event: 'unload',
                anchor: anchor
            }
        });
        wedcs('ms.pageclosuretime', new Date().getTime().toString(), 'ms.pageclosure', anchor ? 'redirection' : 'closure');
    }
    function handleClick(event) {
        if (event.target instanceof HTMLAnchorElement) {
            anchor = true;
            setTimeout(function () { return anchor = false; });
        }
    }
    function handleKeyDown(event) {
        if (event.target instanceof HTMLAnchorElement) {
            anchor = true;
            setTimeout(function () { return anchor = false; });
        }
    }
    window$1.addEventListener('keydown', handleKeyDown, { capture: true, passive: true });
    window$1.addEventListener('click', handleClick, { capture: true, passive: true });
    window$1.addEventListener('beforeunload', handleUnload, { passive: true });
}
function trackUHFSearch(awa) {
    function handleSubmit(event) {
        var form = event.target;
        if (form.id !== 'searchForm') {
            return;
        }
        var term = form.querySelector('input[name="search"]').value;
        var submitButtonIsFocused = form.querySelector('#search:focus') !== null;
        awa.ct.capturePageAction(form, {
            actionType: awa.actionType.OTHER,
            behavior: awa.behavior.SEARCH,
            content: {
                event: 'uhf-search',
                value: term,
                submitButton: submitButtonIsFocused
            }
        });
        wedcs('ms.search.term', term, 'ms.search.formSubmitType', submitButtonIsFocused ? '1' : '0');
    }
    window$1.addEventListener('submit', handleSubmit, { passive: true, capture: true });
}
function trackUnhandledExceptionsUsingWedcs(awa) {
    function handleError(event) {
        var args = [];
        if (event.filename === undefined || event.message === undefined) {
            return;
        }
        if (event.error !== null && event.error !== undefined) {
            args.push('ms.error', event.error.toString().substring(0, 100));
        }
        args.push("ms.errormsg", event.message.substring(0, 30));
        args.push("ms.errorsrc", event.filename);
        args.push("ms.errorlineno", event.lineno.toString(10));
        args.push("ms.errorcolno", event.colno.toString(10));
        wedcs.apply(void 0, args);
    }
    window$1.addEventListener('error', handleError, { passive: true });
}
function trackCtrlF(awa) {
    function handleKeyDown(event) {
        if (event.isTrusted && event.keyCode === 70 && event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
            awa.ct.captureContentPageAction({
                actionType: awa.actionType.OTHER,
                behavior: awa.behavior.OTHER,
                content: {
                    event: 'ctrl-f'
                }
            });
            wedcs('ms.ctrl-f', 'ctrl+f');
        }
    }
    window$1.addEventListener('keydown', handleKeyDown, { passive: true });
}

function addScopeButton() {
    var form = document$1.getElementById('searchForm');
    form.action = "https://docs.microsoft.com/" + msDocs.data.userLocale + "/search/index";
    form.querySelector('button#search').removeAttribute('name');
    var searchInput = form.querySelector('input[name="search"]');
    var rawScope = getMeta('scope');
    var isSearchPage = getMeta('ms.pagetype') === 'search';
    if (isSearchPage) {
        var queryString = parseQueryString();
        rawScope = queryString.scope;
        var searchValue = queryString.search;
        if (searchValue !== undefined && searchValue.length > 0) {
            searchInput.value = searchValue;
        }
    }
    var hideScope = getMeta('hideScope');
    if (hideScope === 'true' || rawScope === undefined || rawScope.length === 0) {
        return;
    }
    var scopes = rawScope.split(',').map(function (s) { return s.trim(); }).filter(function (s) { return s.length; });
    if (scopes.length === 0) {
        return;
    }
    var scope = scopes[scopes.length - 1];
    var scopeInput = document$1.createElement('input');
    scopeInput.name = 'scope';
    scopeInput.value = scope;
    scopeInput.hidden = true;
    var scopeAnchor = document$1.createElement('a');
    scopeAnchor.classList.add('searchScope');
    scopeAnchor.href = '#';
    scopeAnchor.setAttribute('role', 'button');
    scopeAnchor.textContent = scope;
    scopeAnchor.title = loc.searchScopeTitle.replace('{0}', scope);
    scopeAnchor.onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        scopeAnchor.parentElement.removeChild(scopeAnchor);
        scopeInput.parentElement.removeChild(scopeInput);
        searchInput.style.transition = 'padding-left ease .5s';
        searchInput.style.paddingLeft = '';
        jsllReady.then(function (awa) { return awa.ct.capturePageAction(event.target, {
            actionType: awa.actionType.CLICKLEFT,
            behavior: awa.behavior.OTHER,
            content: {
                event: 'uhf-search-scope-removed',
                name: 'uhf-search-scope-link',
                value: scope
            }
        }); });
        wedcs('ms.uhf-search-scope-removed', scope);
    };
    form.appendChild(scopeAnchor);
    form.appendChild(scopeInput);
    searchInput.style.paddingLeft = Math.floor(scopeAnchor.getBoundingClientRect().width + 12).toString() + 'px';
}
if (msDocs.data.brand !== 'mooncake' && msDocs.data.brand !== 'azure') {
    headerLoaded.then(addScopeButton);
}

var monikerChangedEvent = 'moniker-changed';
var readMonikerFromQuery = function () {
    var view = parseQueryString().view;
    return view === undefined ? '' : view;
};
var moniker = readMonikerFromQuery();
function getMoniker() {
    return moniker;
}
function setMoniker(newMoniker) {
    if (newMoniker === moniker) {
        return;
    }
    moniker = newMoniker;
    window$1.dispatchEvent(new CustomEvent(monikerChangedEvent, { detail: { moniker: moniker } }));
}
window$1.addEventListener('popstate', function () { return setMoniker(readMonikerFromQuery()); });

var breakTextRegexDots = /([A-Z]\.|[a-z]\.)([A-Z]|[a-z])/g;
var breakTextRegexCase = /([a-z])([A-Z]+[a-z])/g;
var breakTextReplace = '$1<wbr>$2';
var unbreakTextRegex = /\u200B/g;
function breakText(str, dotsOnly) {
    if (dotsOnly === void 0) { dotsOnly = false; }
    if (!str || str.length === 0) {
        return str;
    }
    str = str.replace(breakTextRegexDots, breakTextReplace);
    if (dotsOnly) {
        return str;
    }
    return str.replace(breakTextRegexCase, breakTextReplace);
}
function unbreakText(str) {
    return str.replace(unbreakTextRegex, '');
}
function supportsWbrElement() {
    var testDiv = document.createElement('div');
    testDiv.style.cssText = "position:fixed;width:1px;line-height:16px;word-wrap:normal;word-break:normal;white-space:normal;border: 1px solid red;top:-1000px";
    testDiv.innerHTML = "x<wbr>x";
    document.body.appendChild(testDiv);
    var supportsWbr = testDiv.clientHeight > 16;
    document.body.removeChild(testDiv);
    return supportsWbr;
}

function polyfillWbrElement() {
    var style = document.createElement('style');
    style.textContent = "wbr::after { content: \"\u200B\"}";
    document.head.appendChild(style);
}
function ensureWbr() {
    addWbrViaClass(document.body);
    if (!supportsWbrElement()) {
        polyfillWbrElement();
    }
}
function addWbrViaClass(element) {
    var xrefs = Array.from(element.querySelectorAll('.break-text > .xref'));
    xrefs.forEach(function (node) {
        if (node.firstElementChild !== null) {
            return;
        }
        var dotsOnly = node.parentElement.classList.contains('dots-only');
        var replacementHTML = breakText(node.textContent.replace(/</g, '&lt;').replace(/>/g, '&gt;'), dotsOnly);
        node.innerHTML = replacementHTML;
    });
}
function cleanText(value) {
    if (value && value.length) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/&amp;lrm;/g, '&lrm;');
    }
    return value;
}
var htmlEscapes = {
    '&': '&amp',
    '<': '&lt',
    '>': '&gt',
    '"': '&quot',
    "'": '&#39'
};
var reUnescapedHtml = /[&<>"']/g;
var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
function escape$1(string) {
    return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, function (chr) { return htmlEscapes[chr]; })
        : string;
}

function getPdfUrl(pdfName) {
    var urlTemplate = getMeta('pdf_url_template');
    if (urlTemplate !== undefined) {
        var branchName = cookies.get('CONTENT_BRANCH');
        if (branchName === undefined) {
            branchName = 'live';
        }
        var url = urlTemplate.replace(/\{branchName\}/, branchName);
        url = url.replace(/\{pdfName\}/, pdfName);
        return url;
    }
    return null;
}
function renderPdfLink(pdfName) {
    var url = getPdfUrl(pdfName);
    if (url === null) {
        return;
    }
    var holder = document$1.querySelector('.pdfDownloadHolder');
    if (!holder) {
        return;
    }
    var a = document$1.createElement('a');
    a.href = url;
    a.textContent = loc.downloadPdf;
    a.setAttribute('ms.cmpnm', 'downloadPdf');
    a.setAttribute(contentAttrs.name, 'downloadPdf');
    holder.style.display = 'block';
    holder.appendChild(a);
}

var apiBase = 'https://docs.microsoft.com/api/';
function fetchPlatform(platformId) {
    return fetchWithTimeout(apiBase + "monikers/platforms/" + encodeURIComponent(platformId))
        .then(function (response) { return response.json(); });
}
function search(platform, moniker, term) {
    var url = apiBase + "apibrowser/" + platform + "/search?api-version=0.2&search=" + encodeURIComponent(term);
    if (moniker !== '') {
        url += "&$filter=monikers/any(t: t eq '" + encodeURIComponent(moniker) + "')";
    }
    return fetchWithTimeout(url).then(function (response) { return response.json(); });
}
function fetchNamespaces(platform, moniker) {
    var namespacesPath = platform === 'dotnet' ? 'namespaces' : 'modules';
    return fetchWithTimeout(apiBase + "apibrowser/" + encodeURIComponent(platform) + "/" + namespacesPath + "?moniker=" + encodeURIComponent(moniker) + "&api-version=0.2")
        .then(function (response) { return response.json(); });
}
function fetchFamilyByMoniker(moniker) {
    return fetchWithTimeout(apiBase + "monikers/families/getfamilybymoniker?moniker=" + encodeURIComponent(moniker) + "&api-version=0.2")
        .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(null);
    })
        .then(function (_a) {
        var family = _a.family;
        if (family && family.products) {
            return family;
        }
        return createFamilyFromMoniker(moniker);
    })
        .catch(function () { return createFamilyFromMoniker(moniker); });
}
function createFamilyFromMoniker(moniker) {
    return {
        displayName: moniker,
        platform: moniker,
        products: [
            {
                displayName: moniker,
                packages: [
                    {
                        displayName: moniker,
                        isDefault: true,
                        moniker: moniker,
                        versionDisplayName: moniker
                    }
                ]
            }
        ]
    };
}

var platformId = getMeta('platform') || getMeta('apiPlatform') || null;
var platformPromise = undefined;
function getPlatform() {
    if (platformPromise === undefined) {
        platformPromise = fetchPlatform(platformId).then(flattenPlatform);
    }
    return platformPromise;
}
function flattenPlatform(platform) {
    var platformId = platform.platformId, displayName = platform.displayName, families = platform.families;
    var packages = [];
    var packagesByMoniker = {};
    var products = [];
    for (var i = 0; i < families.length; i++) {
        var family = families[i];
        for (var j = 0; j < family.products.length; j++) {
            var product = family.products[j];
            products.push(product);
            for (var k = 0; k < product.packages.length; k++) {
                var _a = product.packages[k], moniker = _a.moniker, displayName_1 = _a.displayName, versionDisplayName = _a.versionDisplayName, isDefault = _a.isDefault;
                var pkg = { platform: platform, family: family, product: product, moniker: moniker, displayName: displayName_1, versionDisplayName: versionDisplayName, isDefault: isDefault };
                packages.push(pkg);
                packagesByMoniker[pkg.moniker] = pkg;
            }
        }
    }
    return { platformId: platformId, displayName: displayName, families: families, products: products, packages: packages, packagesByMoniker: packagesByMoniker };
}

var pageMonikers = { any: false };
function readPageMonikers() {
    var tags = getMetas('monikers');
    pageMonikers.any = tags.length > 0;
    for (var i = 0; i < tags.length; i++) {
        pageMonikers[tags[i]] = true;
    }
}
readPageMonikers();
function pageSupportsMoniker(moniker) {
    return moniker !== '' && pageMonikers[moniker] !== undefined;
}

var staticMonikers = [
    { moniker: 'cntk-py', familyDisplayName: 'CNTK', versionDisplayName: 'Latest' },
    { moniker: 'cntk-py-2.2', familyDisplayName: 'CNTK', versionDisplayName: '2.2' },
    { moniker: 'cntk-py-2.1', familyDisplayName: 'CNTK', versionDisplayName: '2.1' },
    { moniker: 'cntk-py-2.0', familyDisplayName: 'CNTK', versionDisplayName: '2.0' },
    { moniker: 'azure-cli-latest', familyDisplayName: 'Azure CLI', versionDisplayName: 'Latest' },
    { moniker: 'azure-cli-2017-03-09-profile', familyDisplayName: 'Azure CLI', versionDisplayName: '2017-03-09-profile' },
];
if (msDocs.data.brand === 'mooncake') {
    staticMonikers.splice(staticMonikers.indexOf(staticMonikers.find(function (m) { return m.moniker === 'azure-cli-2017-03-09-profile'; })), 1);
}
function getStaticFamily(moniker) {
    var match = staticMonikers.find(function (m) { return m.moniker === moniker; });
    if (match === undefined) {
        return null;
    }
    var family = staticMonikers.filter(function (m) { return m.familyDisplayName === match.familyDisplayName; });
    return {
        displayName: match.familyDisplayName,
        platform: match.familyDisplayName,
        products: [
            {
                displayName: match.familyDisplayName,
                packages: family.map(function (m) { return ({
                    displayName: m.familyDisplayName + " " + m.versionDisplayName,
                    isDefault: m === family[0],
                    moniker: m.moniker,
                    versionDisplayName: m.versionDisplayName
                }); })
            }
        ]
    };
}

var familyPromise = undefined;
function getFamily() {
    if (familyPromise === undefined) {
        var moniker = getMoniker();
        var staticFamily = getStaticFamily(moniker);
        familyPromise = staticFamily === null ? fetchFamilyByMoniker(moniker) : Promise.resolve(staticFamily);
    }
    return familyPromise;
}
function findPackageInFamily(family, moniker) {
    for (var _i = 0, _a = family.products; _i < _a.length; _i++) {
        var product = _a[_i];
        for (var _b = 0, _c = product.packages; _b < _c.length; _b++) {
            var pkg = _c[_b];
            if (pkg.moniker === moniker) {
                return pkg;
            }
        }
    }
    return null;
}

var platformConfig = {
    dotnet: {
        validSearchTerm: /^[A-Za-z][A-Za-z0-9.<>,]{2,255}$/,
        namespaceItemType: 'Namespace',
        allApisLabel: loc.allapis,
        resultsHeadingTemplate: loc.apiReference,
        quickFilters: [
            ['netframework-4.7', 'netcore-2.0', 'netstandard-2.0'],
            ['xamarinios-10.8', 'xamarinandroid-7.1', 'xamarinmac-3.0'],
            ['azuremgmtresourcemanager-1.5.0-preview', 'appinsights-2.3.0-beta3', 'aspnetcore-2.0']
        ]
    },
    powershell: {
        validSearchTerm: /^[A-Za-z][A-Za-z0-9.-]{2,255}$/,
        namespaceItemType: 'Module',
        allApisLabel: loc.allPackages,
        resultsHeadingTemplate: loc.moduleReference,
        quickFilters: [
            ['powershell-5.1', 'win10-ps'],
            ['azurermps-4.4.0', 'win-mdop2-ps'],
            ['sqlserver-ps']
        ]
    }
};

var keyCodes = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    home: 36,
    end: 35,
    escape: 27
};

var isMobileDimensions = false;
var singleProduct = false;
function createMonikerPicker(allApis) {
    var _a = initialRender(), element = _a.element, button = _a.button, buttonCaption = _a.buttonCaption, productList = _a.productList;
    var checkEventTarget = function (event) {
        if (event.target instanceof Element && !element.contains(event.target)) {
            collapse();
        }
    };
    var expand = function () {
        document$1.body.removeAttribute('style');
        document$1.documentElement.classList.add('moniker-picker-expanded');
        element.classList.add('expanded');
        button.setAttribute('aria-expanded', 'true');
        window$1.addEventListener('focus', checkEventTarget, { capture: true });
        window$1.addEventListener('click', checkEventTarget);
        window$1.addEventListener('resize', collapse);
    };
    var collapse = function () {
        document$1.documentElement.classList.remove('moniker-picker-expanded');
        element.classList.remove('expanded');
        button.setAttribute('aria-expanded', 'false');
        window$1.removeEventListener('focus', checkEventTarget, { capture: true });
        window$1.removeEventListener('click', checkEventTarget);
        window$1.removeEventListener('resize', collapse);
    };
    var collapseAndFocusButton = function () {
        collapse();
        button.focus();
    };
    finishRenderingAsync(allApis, button, buttonCaption, productList);
    handleMainMenuButtonInteraction(button, productList, expand, collapseAndFocusButton);
    handleKeyboardInteractionInMenu(productList, collapseAndFocusButton);
    handleMenuItemClick(button, productList, collapseAndFocusButton);
    observeScreenDimensions();
    return element;
}
function initialRender() {
    var element = document$1.createElement('div');
    element.classList.add('moniker-picker');
    var buttonId = generateElementId();
    var menuId = generateElementId();
    element.innerHTML = "\n\t\t<button class=\"products\"\n\t\t\t\tid=\"" + buttonId + "\"\n\t\t\t\taria-haspopup=\"true\"\n\t\t\t\taria-controls=\"" + menuId + "\"\n\t\t\t\taria-expanded=\"false\">\n\t\t\t<span class=\"visually-hidden\">" + escape$1(loc.selectVersion) + "</span>\n\t\t\t<span aria-hidden=\"true\"></span>\n\t\t</button>\n\t\t<div\tclass=\"products\"\n\t\t\t\tid=\"" + menuId + "\"\n\t\t\t\trole=\"menu\"\n\t\t\t\taria-labelledby=\"" + buttonId + "\" style=\"z-index: 5000\">\n\t\t\t<span aria-hidden=\"true\">" + escape$1(loc.product) + "</span>\n\t\t\t<ul aria-label=\"" + escape$1(loc.product) + "\"></ul>\n\t\t</div>";
    return {
        element: element,
        button: element.firstElementChild,
        buttonCaption: element.firstElementChild.lastElementChild,
        productList: element.lastElementChild.lastElementChild
    };
}
function finishRenderingAsync(allApis, button, buttonCaption, productList) {
    if (allApis) {
        return getPlatform().then(function (platform) {
            if (platform.packagesByMoniker[getMoniker()] === undefined) {
                setMoniker('');
            }
            var updateCaption = function () {
                var moniker = getMoniker();
                if (moniker === '') {
                    buttonCaption.textContent = platformConfig[platformId].allApisLabel;
                }
                else {
                    buttonCaption.innerHTML = breakText(platform.packagesByMoniker[moniker].displayName);
                }
            };
            window$1.addEventListener(monikerChangedEvent, updateCaption);
            updateCaption();
            renderAllApis(productList);
            for (var _i = 0, _a = platform.families; _i < _a.length; _i++) {
                var family = _a[_i];
                renderProducts(family.products, productList);
            }
        });
    }
    return getFamily().then(function (family) {
        singleProduct = family.products.length === 1;
        if (singleProduct && family.products[0].packages.length === 1) {
            button.disabled = true;
        }
        var updateCaption = function () {
            var moniker = getMoniker();
            buttonCaption.innerHTML = breakText(findPackageInFamily(family, moniker).displayName);
        };
        window$1.addEventListener(monikerChangedEvent, updateCaption);
        updateCaption();
        renderProducts(family.products, productList);
    });
}
function renderAllApis(productList) {
    var displayName = platformConfig[platformId].allApisLabel;
    productList.insertAdjacentHTML('afterbegin', "<li><a role=\"menuitem\" href=\"?view=\" tabindex=\"-1\">" + displayName + "</a></li>");
}
function renderProducts(products, productList) {
    if (singleProduct) {
        productList.previousElementSibling.textContent = loc.version;
        renderPackages(products[0].packages, productList);
        return;
    }
    for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
        var _a = products_1[_i], displayName = _a.displayName, packages = _a.packages;
        var buttonId = generateElementId();
        var menuId = generateElementId();
        var dotsOnly = true;
        productList.insertAdjacentHTML('beforeend', "<li>\n\t\t\t\t<button class=\"versions\"\n\t\t\t\t\t\tid=\"" + buttonId + "\"\n\t\t\t\t\t\trole=\"menuitem\"\n\t\t\t\t\t\taria-haspopup=\"true\"\n\t\t\t\t\t\taria-controls=\"" + menuId + "\"\n\t\t\t\t\t\taria-expanded=\"false\"\n\t\t\t\t\t\ttabindex=\"-1\">\n\t\t\t\t\t" + breakText(displayName, dotsOnly) + "\n\t\t\t\t</button>\n\t\t\t\t<div\tclass=\"versions\"\n\t\t\t\t\t\tid=\"" + menuId + "\"\n\t\t\t\t\t\trole=\"menu\"\n\t\t\t\t\t\taria-labelledby=\"" + buttonId + "\">\n\t\t\t\t\t<span aria-hidden=\"true\">" + escape$1(loc.version) + "</span>\n\t\t\t\t\t<ul aria-label=\"" + escape$1(loc.version) + "\"></ul>\n\t\t\t\t</div>\n\t\t\t</li>");
        var versionsMenu = productList.lastElementChild.lastElementChild;
        var packageList = versionsMenu.lastElementChild;
        renderPackages(packages, packageList);
        if (packages.find(function (pkg) { return /^azurermps/.test(pkg.moniker); })) {
            versionsMenu.insertAdjacentHTML('beforeend', "<p class=\"help-me-choose\"><a href=\"https://aka.ms/pshelpmechoose\">" + escape$1(loc.helpMeChoose) + "</a></p>");
        }
    }
}
function renderPackages(packages, packageList) {
    for (var _i = 0, packages_1 = packages; _i < packages_1.length; _i++) {
        var _a = packages_1[_i], moniker = _a.moniker, isDefault = _a.isDefault, versionDisplayName = _a.versionDisplayName, displayName = _a.displayName;
        packageList.insertAdjacentHTML('beforeend', "<li><a role=\"menuitem\" href=\"?view=" + moniker + "\" aria-label=\"" + displayName + "\" data-default=\"" + isDefault + "\" tabindex=\"-1\">" + escape$1(versionDisplayName) + "</a></li>");
    }
}
function expandProduct(productList, productButton) {
    var current = productList.querySelector('button[aria-expanded="true"]');
    if (current === productButton) {
        return;
    }
    if (current !== null) {
        current.setAttribute('aria-expanded', 'false');
    }
    if (productButton !== null) {
        productButton.setAttribute('aria-expanded', 'true');
    }
}
var nextId = 0;
function generateElementId() {
    return "ax-" + nextId++;
}
function findAnchorByMoniker(container, moniker) {
    return container.querySelector("a[href=\"?view=" + moniker + "\"]");
}
function findAnchorToSelect(productButton) {
    var versionsMenu = productButton.nextElementSibling;
    var current = findAnchorByMoniker(versionsMenu, getMoniker());
    var productDefault = versionsMenu.querySelector('a[href^="?view="][data-default="true"]');
    var first = versionsMenu.querySelector("a[href^=\"?view=\"]");
    return current || productDefault || first;
}
function getProductButton(monikerAnchor) {
    if (monikerAnchor.search === '?view=' || singleProduct) {
        return null;
    }
    return monikerAnchor.parentElement.parentElement.parentElement.previousElementSibling;
}
function handleMainMenuButtonInteraction(button, productList, expand, collapse) {
    var expandAndSelectCurrent = function () {
        expand();
        var moniker = getMoniker();
        var anchor = findAnchorByMoniker(productList, moniker);
        var productButton = getProductButton(anchor);
        expandProduct(productList, productButton);
        setTimeout(function () {
            if (productButton !== null) {
                productButton.scrollIntoView(false);
            }
            anchor.scrollIntoView(false);
            anchor.focus();
        });
    };
    button.addEventListener('click', function (event) {
        var expand = button.getAttribute('aria-expanded') === 'false';
        if (expand) {
            expandAndSelectCurrent();
        }
        else {
            collapse();
        }
    });
    button.addEventListener('keydown', function (event) {
        var expanded = button.getAttribute('aria-expanded') === 'true';
        if (expanded && event.keyCode === keyCodes.up) {
            event.preventDefault();
            collapse();
        }
        else if (!expanded && event.keyCode === keyCodes.down) {
            event.preventDefault();
            expandAndSelectCurrent();
        }
    });
}
function handleKeyboardInteractionInMenu(productList, collapse) {
    productList.addEventListener('keydown', function (event) {
        if (isMobileDimensions) {
            return;
        }
        var target = event.target;
        if (target.getAttribute('role') !== 'menuitem') {
            return;
        }
        var keyCode = event.keyCode;
        var el;
        switch (keyCode) {
            case keyCodes.left:
                if (target instanceof HTMLAnchorElement && target.search !== '?view=') {
                    event.preventDefault();
                    getProductButton(target).focus();
                }
                break;
            case keyCodes.right:
                if (target instanceof HTMLButtonElement && target.hasAttribute('aria-controls')) {
                    event.preventDefault();
                    findAnchorToSelect(target).focus();
                }
                break;
            case keyCodes.up:
            case keyCodes.down:
                event.preventDefault();
                var nextFn = keyCode === keyCodes.up ? 'previousElementSibling' : 'nextElementSibling';
                var firstFn = keyCode === keyCodes.up ? 'lastElementChild' : 'firstElementChild';
                if (target.parentElement[nextFn] === null) {
                    el = target.parentElement.parentElement[firstFn].firstElementChild;
                }
                else {
                    el = target.parentElement[nextFn].firstElementChild;
                }
                el.focus();
                if (el.parentElement.parentElement === productList) {
                    expandProduct(productList, el instanceof HTMLButtonElement ? el : null);
                }
                break;
            case keyCodes.home:
            case keyCodes.end:
                event.preventDefault();
                var fn = keyCode === keyCodes.home ? 'firstElementChild' : 'lastElementChild';
                el = target.parentElement.parentElement[fn].firstElementChild;
                el.focus();
                if (el.parentElement.parentElement === productList) {
                    expandProduct(productList, el instanceof HTMLButtonElement ? el : null);
                }
                break;
            case keyCodes.escape:
                event.preventDefault();
                collapse();
                break;
        }
    });
}
function handleMenuItemClick(button, productList, collapse) {
    productList.addEventListener('click', function (event) {
        var target = event.target;
        if (target.getAttribute('role') !== 'menuitem') {
            return;
        }
        if (target instanceof HTMLAnchorElement) {
            event.preventDefault();
            var moniker = parseQueryString(target.search).view;
            setMoniker(moniker);
            collapse();
            return;
        }
        if (target instanceof HTMLButtonElement) {
            if (isMobileDimensions && target.getAttribute('aria-expanded') === 'true') {
                target.setAttribute('aria-expanded', 'false');
            }
            else {
                expandProduct(productList, target);
            }
            target.focus();
        }
    });
}
function observeScreenDimensions() {
    var mql = window$1.matchMedia('screen and (min-width: 768px), screen and (min-height: 1024px)');
    isMobileDimensions = !mql.matches;
    mql.addListener(function () { return isMobileDimensions = !mql.matches; });
}

function affix() {
    var main = document$1.querySelector('main');
    var left = document$1.getElementById('sidebarContent');
    var right = document$1.getElementById('page-actions-content');
    var footer = document$1.querySelector('.footerContainer');
    var isFixedHeight = document$1.documentElement.classList.contains('isFixedHeight');
    if (isFixedHeight) {
        var header = document$1.querySelector('#headerAreaHolder');
        var mainContainer = document$1.querySelector('.mainContainer');
        var pageActions = document$1.querySelector('.pageActions');
        var sidebar = document$1.querySelector('.sidebar');
    }
    
    if (left === null && right === null && !isFixedHeight) {
        return;
    }
    function update() {
        var footerContainerMarginTop = 24;
        var viewportHeight = document$1.documentElement.offsetHeight;
        var top = Math.max(0, main.getBoundingClientRect().top);
        var bottom = Math.max(0, viewportHeight - footer.getBoundingClientRect().top) + footerContainerMarginTop;
        if (!isFixedHeight) {
            if (left !== null) {
                left.style.position = '';
                left.style.top = top + "px";
                left.style.bottom = bottom + "px";
            }
            if (right !== null) {
                right.style.position = '';
                right.style.top = top + "px";
                right.style.bottom = bottom + "px";
                right.style.overflowY = '';
            }
        }
        else if (window$1.matchMedia("(min-width: 767px)").matches) {
            var breadcrumbs = document$1.querySelector('.breadcrumbs');
            var hasTerminal = document$1.querySelector('html').classList.contains('hasTerminal');
            var footerHeight = footer ? footer.getBoundingClientRect().height : 0;
            var headerHeight = header ? header.getBoundingClientRect().height : 0;
            var breadcrumbsHeight = breadcrumbs ? breadcrumbs.getBoundingClientRect().height : 0;
            var mainTopMargin = main ? parseInt(window$1.getComputedStyle(main).marginTop.replace(/[^-\d\.]/g, '')) : 0;
            var mainContainerHeight = Math.floor(viewportHeight - footerHeight - headerHeight);
            var columnHeightStr = '100%';
            if (hasTerminal) {
                columnHeightStr = mainContainerHeight - breadcrumbsHeight - mainTopMargin + "px";
                pageActions.style.height = null;
            }
            else if (window$1.matchMedia("(min-width: 1200px)").matches || hasTerminal) {
                columnHeightStr = mainContainerHeight - breadcrumbsHeight + "px";
                pageActions.style.height = columnHeightStr;
            }
            else {
                columnHeightStr = mainContainerHeight - breadcrumbsHeight - (pageActions ? pageActions.getBoundingClientRect().height : 0) - mainTopMargin + "px";
                pageActions.style.height = null;
            }
            mainContainer.style.height = mainContainerHeight + "px";
            main.style.height = columnHeightStr;
            sidebar.style.height = columnHeightStr;
        }
        else {
            pageActions.style.height = null;
            mainContainer.style.height = null;
            main.style.height = null;
            sidebar.style.height = null;
        }
    }
    var animationFrame = 0;
    function scheduleUpdate() {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(update);
    }
    window$1.addEventListener('scroll', scheduleUpdate, { passive: true });
    window$1.addEventListener('resize', scheduleUpdate, { passive: true });
    window$1.addEventListener('content-update', scheduleUpdate);
    update();
    window$1.addEventListener('load', update, false);
    window$1.addEventListener('DOMContentLoaded', update, false);
}
function notifyContentUpdated() {
    window$1.dispatchEvent(new CustomEvent('content-update'));
}

function renderInTopicTOC() {
    var containers = Array.from(document$1.querySelectorAll('.doc-outline'));
    if (containers.length === 0) {
        return;
    }
    var headings = Array.from(document$1.querySelectorAll('#main h2'))
        .filter(function (h) { return h.offsetParent !== null; });
    var minHeadings = msDocs.data.pageTemplate === 'NamespaceListPage' ? 2 : 1;
    var hide = headings.length < minHeadings;
    containers.forEach(function (container) {
        container.hidden = hide;
        if (container.lastElementChild.nodeName === 'OL') {
            container.removeChild(container.lastElementChild);
        }
    });
    if (hide) {
        return;
    }
    var ol = document$1.createElement('ol');
    for (var _i = 0, headings_1 = headings; _i < headings_1.length; _i++) {
        var heading = headings_1[_i];
        var text = heading.innerText;
        if (heading.id.length === 0) {
            heading.id = text.replace(/\s+/g, '_');
        }
        var a = document$1.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = text;
        var li = document$1.createElement('li');
        li.appendChild(a);
        ol.appendChild(li);
    }
    containers.forEach(function (container, index) { return container.appendChild(index === 0 ? ol : ol.cloneNode(true)); });
}

function filterContentByMoniker() {
    var moniker = getMoniker();
    if (!pageSupportsMoniker(moniker)) {
        return false;
    }
    processDataMoniker(moniker);
    processLinks(moniker);
    renderInTopicTOC();
    notifyContentUpdated();
    return true;
}
var monikerStyle = document.createElement('style');
document.head.appendChild(monikerStyle);
function processDataMoniker(moniker) {
    monikerStyle.textContent = "\n\t\t[data-moniker]:not([data-moniker~='" + moniker + "']) {\n\t\t\tdisplay: none !important;\n\t\t}\n\t";
    var addId = document.querySelectorAll("[data-moniker~='" + moniker + "'] [data-id]");
    for (var i = 0; i < addId.length; i++) {
        var element = addId.item(i);
        element.id = element.getAttribute('data-id');
    }
    var removeId = document.querySelectorAll("[data-moniker]:not([data-moniker~='" + moniker + "']) [id]");
    for (var i = 0; i < removeId.length; i++) {
        var element = removeId.item(i);
        element.setAttribute('data-id', element.id);
        element.removeAttribute('id');
    }
}
function processLinks(moniker) {
    var links = document.querySelectorAll('a[href*="view="]:not([role="menuitem"])');
    var i = links.length;
    while (i--) {
        var a = links.item(i);
        if (a.search === '') {
            continue;
        }
        var query = parseQueryString(a.search);
        if (query.view === undefined) {
            continue;
        }
        query.view = moniker;
        a.search = toQueryString(query);
    }
}

var fallbackDisclaimer;
function displayMonikerFallbackMessage() {
    removeMonikerFallbackMessage();
    var fallbackFromMoniker = parseQueryString().viewFallbackFrom;
    if (fallbackFromMoniker === undefined) {
        return Promise.resolve();
    }
    return getFamily().then(function (family) {
        var pkg = findPackageInFamily(family, fallbackFromMoniker);
        return pkg ? pkg.displayName : fallbackFromMoniker;
    }, function () { return fallbackFromMoniker; }).then(function (displayName) {
        fallbackDisclaimer = showDisclaimer(loc.monikerFallback.replace('{0}', displayName));
    });
}
function removeMonikerFallbackMessage() {
    if (fallbackDisclaimer) {
        fallbackDisclaimer.parentElement.removeChild(fallbackDisclaimer);
        fallbackDisclaimer = null;
    }
}

function canHandleClientSide(moniker) {
    return pageMonikers[moniker] !== undefined || msDocs.data.pageTemplate === 'ApiBrowserPage';
}
function monikerChangedHandler() {
    var moniker = getMoniker();
    var isClientSide = canHandleClientSide(moniker);
    updateQueryString({ view: moniker, viewFallbackFrom: null }, isClientSide);
    if (isClientSide) {
        removeMonikerFallbackMessage();
        filterContentByMoniker();
    }
}
function handleMonikerChange() {
    window$1.addEventListener(monikerChangedEvent, monikerChangedHandler);
}

var apiSearchTermChangedEvent = 'api-search-term-changed';
var term = '';
function getTerm() {
    return term;
}
function setTerm(newTerm) {
    if (newTerm === term) {
        return;
    }
    term = newTerm;
    if (msDocs.data.pageTemplate === 'ApiBrowserPage') {
        var usePushState = true;
        updateQueryString({ term: term }, usePushState);
    }
    window.dispatchEvent(new CustomEvent(apiSearchTermChangedEvent, { detail: { term: term } }));
}
function readTermFromQueryString() {
    var term = parseQueryString().term;
    return term === undefined ? '' : term.trim();
}
if (msDocs.data.pageTemplate === 'ApiBrowserPage') {
    term = readTermFromQueryString();
    window.addEventListener('popstate', function () { return setTerm(readTermFromQueryString()); });
}

var blockName = 'api-search-field';
function createSearchField() {
    var form = document$1.createElement('form');
    form.classList.add(blockName);
    form.setAttribute('ms.cmpnm', blockName);
    form.setAttribute(contentAttrs.name, blockName);
    form.action = 'javascript:';
    form.addEventListener('submit', function (event) { return event.preventDefault(); });
    var label = document$1.createElement('label');
    var labelSpan = document$1.createElement('span');
    labelSpan.classList.add('visually-hidden');
    labelSpan.textContent = loc.search;
    label.appendChild(labelSpan);
    form.appendChild(label);
    var input = document$1.createElement('input');
    input.type = 'search';
    input.value = getTerm();
    input.placeholder = loc.search;
    label.appendChild(input);
    var clearAnchor = document$1.createElement('a');
    clearAnchor.href = '#';
    clearAnchor.title = loc.clearterm;
    clearAnchor.classList.add('clear');
    clearAnchor.addEventListener('click', function (event) {
        event.preventDefault();
        input.value = '';
        input.dispatchEvent(new CustomEvent('change', { bubbles: true }));
    });
    label.appendChild(clearAnchor);
    var updateEmpty = function () {
        if (input.value === '') {
            input.classList.add('empty');
        }
        else {
            input.classList.remove('empty');
        }
    };
    updateEmpty();
    var timeout = 0;
    var handleInput = function (event) {
        updateEmpty();
        clearTimeout(timeout);
        timeout = setTimeout(function () { return setTerm(input.value); }, 500);
    };
    input.addEventListener('change', handleInput);
    input.addEventListener('input', handleInput);
    window$1.addEventListener(apiSearchTermChangedEvent, function () {
        var term = getTerm();
        if (input.value === term) {
            return;
        }
        input.value = term;
        updateEmpty();
    });
    return form;
}

var config = platformConfig[platformId];
var containers = [];
function addResultsContainer(container, renderHeading) {
    containers.push({ container: container, renderHeading: renderHeading });
}
function renderResults(platform, results, moreUrl) {
    document$1.documentElement.classList.add('api-search-has-results');
    var _loop_1 = function (container, renderHeading) {
        container.innerHTML = '';
        if (results.length === 0) {
            container.textContent = loc['no.results'];
            return { value: void 0 };
        }
        if (renderHeading) {
            renderResultsHeading(container, platform);
        }
        var table = document$1.createElement('table');
        table.classList.add('api-search-results');
        table.setAttribute('ms.cmpnm', 'api-search-results');
        table.setAttribute(contentAttrs.name, 'api-search-results');
        var thead = document$1.createElement('thead');
        table.appendChild(thead);
        var theadrow = document$1.createElement('tr');
        thead.appendChild(theadrow);
        var th = document$1.createElement('th');
        th.textContent = loc.name;
        theadrow.appendChild(th);
        th = document$1.createElement('th');
        th.textContent = loc.description;
        theadrow.appendChild(th);
        var tbody = document$1.createElement('tbody');
        table.appendChild(tbody);
        appendResultsToTable(tbody, results);
        container.appendChild(table);
        if (moreUrl && renderHeading) {
            var moreButton_1 = document$1.createElement('button');
            moreButton_1.classList.add('more-button');
            moreButton_1.classList.add('secondary-action');
            moreButton_1.textContent = loc.loadMoreResults;
            moreButton_1.setAttribute(contentAttrs.name, 'api-browser-load-more-results');
            moreButton_1.addEventListener('click', function () {
                fetchWithTimeout(moreUrl).then(function (response) { return response.json(); })
                    .then(function (result) {
                    moreUrl = result['@nextLink'];
                    if (moreUrl === undefined) {
                        container.removeChild(moreButton_1);
                    }
                    appendResultsToTable(tbody, result.results);
                });
                wedcs('ms.api-browser-load-more-results');
            });
            container.appendChild(moreButton_1);
        }
    };
    for (var _i = 0, containers_1 = containers; _i < containers_1.length; _i++) {
        var _a = containers_1[_i], container = _a.container, renderHeading = _a.renderHeading;
        var state_1 = _loop_1(container, renderHeading);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
function appendResultsToTable(tbody, results) {
    var moniker = getMoniker();
    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var resultType = result.itemKind || result.itemType || config.namespaceItemType;
        var tr = document$1.createElement('tr');
        tbody.appendChild(tr);
        var td = document$1.createElement('td');
        var a = document$1.createElement('a');
        a.setAttribute('ms.title', result.displayName);
        a.href = processUrl(result.url, moniker);
        a.innerHTML = breakText(result.displayName);
        var s = document$1.createElement('span');
        s.textContent = ' ' + resultType;
        td.appendChild(a);
        td.appendChild(s);
        tr.appendChild(td);
        td = document$1.createElement('td');
        td.textContent = result.description;
        tr.appendChild(td);
        tr.appendChild(td);
    }
}
function displayLoadingIndicator() {
    document$1.documentElement.classList.add('api-search-has-results');
    for (var _i = 0, containers_2 = containers; _i < containers_2.length; _i++) {
        var container = containers_2[_i].container;
        container.innerHTML = "\n\t\t\t<div class=\"c-progress f-indeterminate-regional\" role=\"progressbar\" aria-valuetext=\"Loading...\" tabindex=\"0\" aria-label=\"indeterminate regional progress bar\">\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t</div>";
    }
}
function renderText(text) {
    document$1.documentElement.classList.add('api-search-has-results');
    for (var _i = 0, containers_3 = containers; _i < containers_3.length; _i++) {
        var container = containers_3[_i].container;
        container.textContent = text;
    }
}
function clearResults() {
    document$1.documentElement.classList.remove('api-search-has-results');
    for (var _i = 0, containers_4 = containers; _i < containers_4.length; _i++) {
        var container = containers_4[_i].container;
        container.innerHTML = '';
    }
}
function renderResultsHeading(container, platform) {
    var moniker = getMoniker();
    var displayName;
    var versionDisplayName;
    if (moniker === '') {
        displayName = platform.displayName;
        versionDisplayName = null;
    }
    else {
        var pkg = platform.packagesByMoniker[moniker];
        displayName = pkg.product.displayName;
        versionDisplayName = pkg.versionDisplayName;
    }
    var heading = document$1.createElement('h2');
    heading.classList.add('api-search-results-heading');
    heading.innerHTML = config.resultsHeadingTemplate.replace('{0}', displayName);
    if (versionDisplayName !== null) {
        heading.innerHTML += " <span class=\"moniker-version\">version " + escape$1(versionDisplayName) + "</span>";
    }
    container.appendChild(heading);
}
function processUrl(url, moniker) {
    if (moniker !== '' && !/[?&]view=/i.test(url)) {
        var _a = url.split('#'), path = _a[0], hash = _a[1];
        hash = hash === undefined ? '' : '#' + hash;
        url = path + "?view=" + encodeURIComponent(moniker) + hash;
    }
    if (/^https:\/\/docs.microsoft.com/.test(url)) {
        url = url.substr('https://docs.microsoft.com'.length);
    }
    return url;
}

function initApiSearch() {
    window$1.addEventListener(apiSearchTermChangedEvent, doApiSearch);
    window$1.addEventListener(monikerChangedEvent, doApiSearch);
    if (msDocs.data.pageTemplate === 'ApiBrowserPage') {
        doApiSearch();
    }
}
var previousSearch = '';
function doApiSearch() {
    var term = getTerm();
    var moniker = getMoniker();
    var currentSearch = term + "/" + moniker;
    if (currentSearch === previousSearch) {
        return;
    }
    previousSearch = currentSearch;
    if (msDocs.data.pageTemplate === 'ApiBrowserPage' && moniker !== '' && term === '') {
        displayLoadingIndicator();
        return Promise.all([fetchNamespaces(platformId, moniker), getPlatform()])
            .then(function (_a) {
            var result = _a[0], platform = _a[1];
            if (currentSearch !== previousSearch) {
                return;
            }
            if (result.apiItems.length === 0) {
                renderText('No namespaces');
                return;
            }
            renderResults(platform, result.apiItems, null);
        }, function (error) {
            renderText(loc.apiSearchIsUnavailable);
        });
    }
    if (term.length < 3) {
        clearResults();
        return Promise.resolve();
    }
    if (!platformConfig[platformId].validSearchTerm.test(term)) {
        return getPlatform().then(function (platform) { return renderResults(platform, [], null); });
    }
    displayLoadingIndicator();
    return Promise.all([search(platformId, moniker, term), getPlatform()])
        .then(function (_a) {
        var result = _a[0], platform = _a[1];
        if (currentSearch !== previousSearch) {
            return;
        }
        bi(moniker, term, result.results.length);
        renderResults(platform, result.results, result['@nextLink']);
    }, function (error) {
        renderText(loc.apiSearchIsUnavailable);
    });
}
function bi(moniker, term, results) {
    jsllReady.then(function (awa) { return awa.ct.captureContentPageAction({
        actionType: awa.actionType.OTHER,
        behavior: awa.behavior.SEARCH,
        content: {
            event: 'api-browser-search',
            moniker: moniker,
            term: term,
            results: results
        }
    }); });
    wedcs('ms.apisearch.moniker', moniker, 'ms.apisearch.term', term, 'ms.apisearch.results', results.toString(10));
}

var pageTemplate = msDocs.data.pageTemplate;
var pageType = getMeta('pagetype');
var useMonikerPicker = pageMonikers.any && msDocs.data.pageTemplate !== 'HubPage'
    || pageTemplate === 'Conceptual' && pageType === 'Reference' && platformId !== null
    || pageTemplate === 'Conceptual' && pageType === 'Conceptual' && platformId === 'powershell'
    || msDocs.data.forceVersionPicker || parseQueryString()['force-version-picker'] !== undefined;
var useApiSearch = pageTemplate === 'Reference' && platformId !== null
    || pageTemplate === 'Conceptual' && pageType === 'Reference' && platformId !== null;
function setupToc() {
    if (!useMonikerPicker && !useApiSearch) {
        return;
    }
    var filterHolder = document.querySelector('.filterHolder');
    var menuNavDiv = document.getElementById('menu-nav');
    if (filterHolder === null || menuNavDiv === null) {
        return;
    }
    if (useMonikerPicker) {
        handleMonikerChange();
        var picker = createMonikerPicker(false);
        filterHolder.appendChild(picker);
        var picker2 = createMonikerPicker(false);
        menuNavDiv.appendChild(picker2);
    }
    if (useApiSearch) {
        initApiSearch();
        var renderHeading = false;
        var searchField = createSearchField();
        filterHolder.appendChild(searchField);
        var toc = document.querySelector('.toc');
        var resultsContainer = document.createElement('div');
        toc.appendChild(resultsContainer);
        addResultsContainer(resultsContainer, renderHeading);
        var searchField2 = createSearchField();
        menuNavDiv.appendChild(searchField2);
        var resultsContainer2 = document.createElement('div');
        menuNavDiv.appendChild(resultsContainer2);
        addResultsContainer(resultsContainer2, renderHeading);
    }
}

function normalizeToc(toc) {
    if (Array.isArray(toc)) {
        return toc;
    }
    if (Array.isArray(toc.items)) {
        return toc.items;
    }
    return [];
}
function createToc() {
    var urlTocQueryName = 'toc';
    var urlTocMetaName = 'toc_rel';
    var urlBcQueryName = 'bc';
    var urlBcMetaName = 'breadcrumb_path';
    var pagetypeMetaName = 'pagetype';
    var selectedClass = 'selected';
    var selectedHolderClass = 'selectedHolder';
    var rotateClass = 'rotate';
    var noSubsClass = 'noSubs';
    var noSibsClass = 'noSibs';
    var filterClassName = 'tocFilter';
    var emptyFilterClassName = 'emptyFilter';
    var emptyFilterMessageClassName = 'emptyFilterMessage';
    var hideFocusClass = 'hideFocus';
    var groupClass = 'group';
    var tocHolderSelector = '.toc';
    var filterHolderSelector = '.filterHolder';
    var breadcrumbClass = 'breadcrumbs';
    var eventNamespace = 'msDocs';
    var mTocSubNodeIndent = '&nbsp;&nbsp;&nbsp;';
    var noLinkClass = 'noLink';
    var mTocDropdownSelector = '#menu-nav > .mobilenavi > select';
    var isTouchEvent = false;
    var timeout = 10000;
    var otherTocDelay = 510;
    var relativeCanonicalUrl = '';
    var relativeCanonicalUrlNoQuery = '';
    var relativeCanonicalUrlNoQueryWithHash;
    var relativeCanonicalUrlUniformIndexWithHash;
    var relativeCanonicalUrlUniformIndex = '';
    var tocUrl = '';
    var tocFolder = '';
    var bcUrl = '';
    var bcFolder = '';
    var locale = '';
    var locationFolder = '';
    var $savedToc;
    var tocJson = [];
    var nodes_to_expand = [];
    var hasNodesToExpand = false;
    var tocQueryUrl = msDocs.functions.getParam(urlTocQueryName);
    var tocMetaUrl = msDocs.functions.getMeta(urlTocMetaName);
    var hasMoniker = false;
    var view = msDocs.functions.getParam('view');
    var monikerParams = '';
    if (view && view.length) {
        hasMoniker = true;
        view = view.toLowerCase();
        view = view.replace(/[^\w.|-]+/g, '');
        monikerParams = 'view=' + view;
    }
    var bcQueryUrl = msDocs.functions.getParam(urlBcQueryName);
    if (bcQueryUrl) {
        bcQueryUrl = decodeURIComponent(bcQueryUrl);
    }
    var bcMetaUrl = msDocs.functions.getMeta(urlBcMetaName);
    var pagetype = msDocs.functions.getMeta(pagetypeMetaName);
    var tocBestMatch = [];
    var tocFinished = $$1.Deferred();
    var bcFinished = $$1.Deferred();
    function scrollSelectedNodeIntoView() {
        var selectedNode = document$1.querySelector(".toc ." + selectedClass);
        if (selectedNode === null) {
            return;
        }
        var alignToTop = true;
        selectedNode.scrollIntoView(alignToTop);
    }
    tocFinished.then(function () { return setTimeout(scrollSelectedNodeIntoView); });
    var resolveRelativePath = function (path, folder) {
        if (!path || !path.length) {
            return path;
        }
        if (typeof folder !== 'string') {
            folder = locationFolder;
        }
        var firstChar = path.charAt(0);
        if (firstChar === '/') {
            if ((path.charAt(6) === '/') && (path.charAt(3) === '-')) {
                return path;
            }
            return '/' + locale + path;
        }
        if ((path.substr(0, 7) === 'http://') || (path.substr(0, 8) === 'https://')) {
            return path;
        }
        if (firstChar !== '.') {
            return '/' + locale + folder + '/' + path;
        }
        if (path.substr(0, 3) === '../') {
            return resolveRelativePath(path.substr(3), getFolder(folder));
        }
        if (path.substr(0, 2) === './') {
            return '/' + locale + folder + '/' + path.substr(2);
        }
        return path;
    };
    var removeQueryString = function (path) {
        if (path && path.length) {
            var index = path.indexOf('?');
            if (index > 0) {
                var hashIndex = path.indexOf('#');
                if (hashIndex === -1) {
                    path = path.substring(0, index);
                }
                else {
                    path = path.substring(0, index) + path.substring(hashIndex);
                }
            }
        }
        return path;
    };
    var getUniformIndex = function (path) {
        if (path && path.length) {
            path = removeQueryString(path);
            if ((path.charAt(path.length - 1) == '/') || (path.indexOf('/#') > 0)) {
                return path;
            }
            var whackIndex = path.lastIndexOf('/');
            var indexIndex = path.indexOf('index', whackIndex);
            if (indexIndex > 0) {
                var hashIndex = path.indexOf('#');
                if (hashIndex === -1) {
                    if (indexIndex == path.length - 5) {
                        return path.substring(0, indexIndex);
                    }
                    var dotIndex = path.indexOf('.', whackIndex);
                    if (dotIndex > 0) {
                        path = path.substring(0, dotIndex);
                        if (path.substring(path.length - 6) == '/index') {
                            return path.substring(0, path.length - 5);
                        }
                    }
                }
                else {
                    var hash = path.substring(hashIndex);
                    path = path.substring(0, hashIndex);
                    if (indexIndex == path.length - 5) {
                        return path.substring(0, indexIndex) + hash;
                    }
                    var dotIndex = path.indexOf('.', whackIndex);
                    if (dotIndex > 0) {
                        path = path.substring(0, dotIndex);
                        if (path.substring(path.length - 6) == '/index') {
                            return path.substring(0, path.length - 5) + hash;
                        }
                    }
                }
            }
        }
        return '';
    };
    var getRelativeCanonicalUrl = function (removeTheQueryString) {
        var canonicalUrl = $$1('link[rel="canonical"]').attr('href');
        if (canonicalUrl && canonicalUrl.length) {
            if ((canonicalUrl.substr(0, 7) === 'http://') || (canonicalUrl.substr(0, 8) === 'https://')) {
                canonicalUrl = canonicalUrl.substring(canonicalUrl.indexOf('//') + 2);
                canonicalUrl = canonicalUrl.substring(canonicalUrl.indexOf('/'));
            }
        }
        else {
            canonicalUrl = document$1.location.pathname;
        }
        canonicalUrl = removeLocaleFromPath(canonicalUrl);
        if (removeTheQueryString) {
            canonicalUrl = removeQueryString(canonicalUrl);
        }
        return canonicalUrl;
    };
    var getFolder = function (path) {
        return path.substring(0, path.lastIndexOf('/'));
    };
    var thisIsMe = function (href) {
        if (href && href.length) {
            var hrefNoQuery = removeQueryString(removeLocaleFromPath(href.toLowerCase()));
            if (relativeCanonicalUrlNoQuery === hrefNoQuery) {
                return true;
            }
            if (relativeCanonicalUrlNoQueryWithHash && (relativeCanonicalUrlNoQueryWithHash === hrefNoQuery)) {
                return true;
            }
            if (relativeCanonicalUrlUniformIndex) {
                var hrefUniformIndex = getUniformIndex(hrefNoQuery);
                if (hrefUniformIndex.length > 0) {
                    if (relativeCanonicalUrlUniformIndex === hrefUniformIndex) {
                        return true;
                    }
                    if (relativeCanonicalUrlUniformIndexWithHash && (relativeCanonicalUrlUniformIndexWithHash === hrefUniformIndex)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    msDocs.functions.toggleAriaExpanded = function (el) {
        var $el = $$1(el);
        var $tempEl;
        var tempHeight;
        var hasGrandKids = false;
        var $ulKids = $el.children('ul');
        if ($el.attr('aria-expanded') == 'true') {
            $el.addClass(rotateClass).children('ul').each(function (i, el) {
                var $tempEl = $$1(el);
                $tempEl.css({ 'height': $tempEl.height() }).animate({ 'height': 0 }, 200, function () {
                    $$1(this).css('height', '');
                    $el.attr('aria-expanded', 'false').removeClass(rotateClass);
                });
            });
            $ulKids.find('li').css('display', 'none');
        }
        else {
            $el.attr('aria-expanded', 'true');
            $ulKids.find('li').css('display', '');
            $ulKids.each(function (i, el) {
                var $tempEl = $$1(el);
                tempHeight = $tempEl.height();
                $tempEl.css({ 'height': '0' }).animate({ 'height': tempHeight }, 200, function () {
                    $$1(this).css('height', '');
                });
            });
        }
    };
    msDocs.functions.stopSomePropagation = function (e, direction) {
        switch (direction) {
            case 'top':
                if (isTouchEvent) {
                    if (e.offsetY > 20) {
                        e.stopPropagation();
                    }
                }
                else {
                    e.stopPropagation();
                }
                break;
            case 'left':
                if (isTouchEvent) {
                    if (e.offsetX > 15) {
                        e.stopPropagation();
                    }
                }
                else {
                    e.stopPropagation();
                }
                break;
        }
    };
    var drawToc = function (json) {
        var createTocNode = function (node, ul, nodeMap, isRoot) {
            var aNode;
            var href;
            var pieces;
            var aCleanTitle;
            var displayName;
            nodeMap.push(-1);
            ul.setAttribute('aria-treegrid', 'true');
            ul.setAttribute('onclick', 'msDocs.functions.stopSomePropagation(event, "top")');
            for (var i = 0; i < node.length; i++) {
                aNode = node[i];
                aCleanTitle = cleanText(aNode.toc_title);
                if (aNode.displayName && aNode.displayName.length) {
                    displayName = cleanText(aNode.displayName);
                }
                else {
                    displayName = "";
                }
                nodeMap[nodeMap.length - 1] = i;
                var nextNode = document$1.createElement('li');
                var titleHolder;
                if (aNode.href && aNode.href.length) {
                    href = aNode.href;
                    titleHolder = document$1.createElement('a');
                    if (i == 0) {
                        titleHolder.setAttribute('onclick', 'msDocs.functions.stopSomePropagation(event, "left")');
                    }
                    titleHolder.setAttribute('tabindex', '0');
                    if (aNode.thisIsMe) {
                        titleHolder.classList.add(selectedClass);
                        titleHolder.setAttribute('data-showme', 'true');
                        if (!nodeMap.length || (tocBestMatch.length < nodeMap.length)) {
                            tocBestMatch = nodeMap.slice(0);
                        }
                    }
                    if (hasMoniker || aNode.maintainContext) {
                        pieces = href.split('#');
                        titleHolder.setAttribute('href', pieces[0] + ((pieces[0].indexOf('?') > -1) ? '&' : '?') + (aNode.maintainContext ? maintainContextParams + (hasMoniker ? '&' : '') : '') + (hasMoniker ? monikerParams : '') + (pieces[1] ? '#' + pieces[1] : ''));
                    }
                    else {
                        titleHolder.setAttribute('href', href);
                    }
                }
                else {
                    titleHolder = document$1.createElement('span');
                }
                if (aNode.expanded) {
                    titleHolder.setAttribute('data-showme', 'true');
                }
                titleHolder.setAttribute('data-text', aCleanTitle.toLowerCase() + " " + displayName.toLowerCase());
                titleHolder.innerHTML = breakText(aCleanTitle);
                nextNode.appendChild(titleHolder);
                if (aNode.newGroup) {
                    nextNode.classList.add(groupClass);
                }
                if (aNode.monikers !== undefined && aNode.monikers.length) {
                    nextNode.setAttribute('data-moniker', aNode.monikers.join(' '));
                }
                if (aNode.children && aNode.children.length) {
                    nextNode.setAttribute('aria-expanded', 'false');
                    nextNode.setAttribute('tabindex', '0');
                    nextNode.setAttribute('aria-treeitem', 'true');
                    nextNode.setAttribute('onclick', 'event.stopPropagation();msDocs.functions.toggleAriaExpanded(this)');
                    var hasGrandKids = false;
                    for (var j = 0; j < aNode.children.length; j++) {
                        if (aNode.children[j].children && aNode.children[j].children.length) {
                            hasGrandKids = true;
                            break;
                        }
                    }
                    if (!hasGrandKids) {
                        nextNode.classList.add(noSubsClass);
                    }
                    var nextUL = document$1.createElement('ul');
                    createTocNode(aNode.children, nextUL, nodeMap.slice(0), false);
                    nextNode.appendChild(nextUL);
                }
                ul.appendChild(nextNode);
            }
        };
        var createFilter = function () {
            var $filter = $$1('<form>')
                .addClass(filterClassName)
                .submit(function (e) {
                e.preventDefault();
            })
                .append($$1('<input>')
                .attr('placeholder', loc['filter.placeholder'])
                .attr('aria-label', loc['filter.text'])
                .attr('type', 'search')
                .keypress(function (e) {
                if (e.which === 13) {
                    e.preventDefault();
                    return;
                }
            })
                .keyup(function () {
                filterToc(this);
            }))
                .append($$1('<a>')
                .attr('href', '#')
                .attr('title', loc.clearfilter)
                .addClass('clearInput')
                .html('<span class="visually-hidden">' + loc.clearfilter + '</span>')
                .on('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var ipt = $$1('.' + filterClassName + ' input[type=search]');
                ipt.val('');
                filterToc(ipt);
            }));
            var $noResults = $$1('<div>')
                .addClass(emptyFilterMessageClassName)
                .html(loc['no.results']);
            return [$filter, $noResults];
        };
        var maintainContextParams = urlTocQueryName + '=' + encodeURIComponent(resolveRelativePath(tocUrl)) + '&' + urlBcQueryName + '=' + encodeURIComponent(resolveRelativePath(bcUrl));
        var toc = document$1.createElement('ul');
        createTocNode(json, toc, [], true);
        var $toc = $$1(toc);
        $toc.find('.' + selectedClass).parent().addClass(selectedHolderClass);
        $toc.find('[data-showme]').parents('li[aria-expanded="false"]').attr('aria-expanded', 'true');
        $toc.on('touchstart pointerdown MSPointerDown', function (e) {
            if (e.type == 'touchstart' || (((e.type == 'pointerdown') || (e.type == 'MSPointerDown')) && (e.originalEvent.pointerType == 'touch'))) {
                isTouchEvent = true;
                setTimeout(function () {
                    isTouchEvent = false;
                }, 700);
            }
        })
            .on('mousedown', function (e) {
            $$1(this).addClass(hideFocusClass);
        })
            .on('mouseup', function (e) {
            $$1(e.target).blur().parent().blur();
            $$1(this).removeClass(hideFocusClass);
        })
            .on('keydown', 'a', function (e) {
            if (e.which === 13) {
                document$1.location.href = $$1(e.target).attr('href');
                e.stopPropagation();
                return false;
            }
        })
            .on('keydown', 'li', function (e) {
            if (e.which === 13 && !$toc.hasClass(noSibsClass)) {
                e.stopPropagation();
                msDocs.functions.toggleAriaExpanded($$1(this));
            }
        });
        if (json.length == 1) {
            $toc.addClass(noSibsClass);
            $toc.children('li').attr('aria-expanded', 'true').off('click.' + eventNamespace).removeAttr('tabindex');
        }
        var arrfilter;
        if (!useApiSearch) {
            arrfilter = createFilter();
        }
        $$1(function () {
            $$1(tocHolderSelector).attr('role', 'application')[0].appendChild(toc);
            if (!useApiSearch) {
                $$1(filterHolderSelector).append(arrfilter);
            }
            tocFinished.resolve();
        });
    };
    var drawMToc = function (json) {
        var createMTocNode = function (node, indent, $mToc) {
            var aNode;
            var href;
            var pieces;
            for (var i = 0; i < node.length; i++) {
                aNode = node[i];
                $mToc
                    .append($$1('<option>')
                    .html(indent + cleanText(aNode.toc_title))
                    .ifThen((aNode.href && aNode.href.length), function () {
                    href = aNode.href;
                    if (hasMoniker || aNode.maintainContext) {
                        pieces = href.split('#');
                        this.attr('value', pieces[0] + ((pieces[0].indexOf('?') > -1) ? '&' : '?') + (aNode.maintainContext ? maintainContextParams + (hasMoniker ? '&' : '') : '') + (hasMoniker ? monikerParams : '') + (pieces[1] ? '#' + pieces[1] : ''));
                    }
                    else {
                        this.attr('value', href);
                    }
                    if (aNode.thisIsMe) {
                        this.attr('selected', 'selected');
                    }
                }, function () {
                    this.addClass(noLinkClass);
                })
                    .ifThen((aNode.monikers !== undefined && aNode.monikers.length), function () {
                    this.attr('data-moniker', aNode.monikers.join(' '));
                }))
                    .ifThen((aNode.children && aNode.children.length), function () {
                    createMTocNode(aNode.children, indent + mTocSubNodeIndent, $mToc);
                });
            }
        };
        var maintainContextParams = urlTocQueryName + '=' + encodeURIComponent(resolveRelativePath(tocUrl)) + '&' + urlBcQueryName + '=' + encodeURIComponent(resolveRelativePath(bcUrl));
        var $mToc = $$1('<select>')
            .on('change', function () {
            var target = $$1(this).find('option:selected').attr('value');
            if (target && target.length) {
                $$1(location).attr('href', target);
            }
        });
        createMTocNode(json, '', $mToc);
        $$1(function () {
            $$1(mTocDropdownSelector).replaceWith($mToc);
        });
    };
    var filterToc = function (inputField) {
        var val = cleanText($$1(inputField).val().toLowerCase());
        var $tocHolder = $$1(tocHolderSelector);
        var $filterHolder = $$1(filterHolderSelector);
        $filterHolder.removeClass(emptyFilterClassName);
        if (val && val.length) {
            $$1('.' + filterClassName).addClass('clearFilter');
            var resultIsEmpty = true;
            var $currentToc = $tocHolder.children('ul[aria-treegrid="true"]').detach();
            if (!$savedToc) {
                $savedToc = $currentToc.clone(true, true);
            }
            $currentToc.find('li').css('display', 'none').filter('[aria-expanded]').attr('aria-expanded', 'false');
            var $this;
            $currentToc.find('a, span').each(function (a) {
                $this = $$1(this);
                if ($this.attr('data-text').indexOf(val) !== -1) {
                    resultIsEmpty = false;
                    $this.parents('li').css('display', '').filter('[aria-expanded]').not($this.parent()).attr('aria-expanded', 'true');
                }
            });
            $tocHolder.append($currentToc);
            if (resultIsEmpty) {
                $filterHolder.addClass(emptyFilterClassName);
            }
        }
        else if ($savedToc) {
            $$1('.' + filterClassName).removeClass('clearFilter');
            $tocHolder.children('ul[aria-treegrid="true"]').replaceWith($savedToc);
            $savedToc = null;
        }
    };
    var getDataFromToc = function (tocJson, nodeName) {
        if (tocJson && tocJson.length && nodeName && nodeName.length && tocJson[0][nodeName] && tocJson[0][nodeName].length) {
            return tocJson[0][nodeName];
        }
        return null;
    };
    var gatherAllTocFiles = function (pageTocJson, pageTocFolder) {
        var uniRefTocUrl = getDataFromToc(tocJson, 'universal_ref_toc');
        var uniConTocUrl = getDataFromToc(tocJson, 'universal_conceptual_toc');
        var moniker = getMoniker();
        var addMonikerToUrl = function (aUrl, moniker) {
            if (aUrl && aUrl.length) {
                var newMonikerTerm = 'view=' + moniker;
                var qMark = aUrl.indexOf('?');
                var qMarkPlus1 = qMark + 1;
                var terms = [];
                var swapped = false;
                if ((qMark > 0) && (qMarkPlus1 != aUrl.length)) {
                    terms = aUrl.substring(qMarkPlus1).split('&');
                    for (var i = 0; i < terms.length; i++) {
                        if (terms[i].indexOf('view=') === 0) {
                            terms[i] = newMonikerTerm;
                            swapped = true;
                        }
                    }
                }
                else {
                    if (qMarkPlus1 != aUrl.length) {
                        aUrl = aUrl + '?';
                    }
                    qMarkPlus1 = aUrl.length;
                }
                if (!swapped) {
                    terms.push(newMonikerTerm);
                }
                aUrl = aUrl.substring(0, qMarkPlus1) + terms.join('&');
            }
            return aUrl;
        };
        var updateAllHrefs = function (json, folder, checkThisIsMe) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].href) {
                    json[i].href = resolveRelativePath(json[i].href, folder);
                    if (checkThisIsMe && thisIsMe(json[i].href)) {
                        json[i].thisIsMe = true;
                    }
                    if (hasNodesToExpand) {
                        for (var j = 0; j < nodes_to_expand.length; j++) {
                            if (nodes_to_expand[j] === json[i].href) {
                                json[i].expanded = true;
                            }
                        }
                    }
                }
                if (json[i].children) {
                    updateAllHrefs(json[i].children, folder, checkThisIsMe);
                }
            }
        };
        var drawTocBasedOnWidth = function (completeTocJson) {
            tocJson = completeTocJson;
            if (window$1.matchMedia("(max-width: 768px)").matches) {
                drawMToc(completeTocJson);
                $$1(function () {
                    setTimeout(function () {
                        drawToc(completeTocJson);
                    }, otherTocDelay);
                });
            }
            else {
                drawToc(completeTocJson);
                $$1(function () {
                    setTimeout(function () {
                        drawMToc(completeTocJson);
                    }, otherTocDelay);
                });
            }
        };
        if (uniRefTocUrl || uniConTocUrl) {
            var uniRefTocFinished = $$1.Deferred();
            var uniConTocFinished = $$1.Deferred();
            if (moniker) {
                uniRefTocUrl = addMonikerToUrl(uniRefTocUrl, moniker);
                uniConTocUrl = addMonikerToUrl(uniConTocUrl, moniker);
            }
            uniRefTocUrl = resolveRelativePath(uniRefTocUrl, tocFolder);
            uniConTocUrl = resolveRelativePath(uniConTocUrl, tocFolder);
            if (uniRefTocUrl) {
                $$1.ajax({
                    url: uniRefTocUrl,
                    dataType: 'json',
                    timeout: timeout
                }).done(function (data, textStatus, jqXHR) {
                    var uniRefTocFolder = getFolder(removeLocaleFromPath(resolveRelativePath(uniRefTocUrl)));
                    var uniRefTocJson = normalizeToc(jqXHR.responseJSON);
                    updateAllHrefs(uniRefTocJson, uniRefTocFolder);
                    uniRefTocFinished.resolve(uniRefTocJson);
                }).fail(function () {
                    uniRefTocFinished.resolve(null);
                });
            }
            else {
                uniRefTocFinished.resolve(null);
            }
            if (uniConTocUrl) {
                $$1.ajax({
                    url: uniConTocUrl,
                    dataType: 'json',
                    timeout: timeout
                }).done(function (data, textStatus, jqXHR) {
                    var uniConTocFolder = getFolder(removeLocaleFromPath(resolveRelativePath(uniConTocUrl)));
                    var uniConTocJson = normalizeToc(jqXHR.responseJSON);
                    updateAllHrefs(uniConTocJson, uniConTocFolder);
                    uniConTocFinished.resolve(uniConTocJson);
                }).fail(function () {
                    uniConTocFinished.resolve(null);
                });
            }
            else {
                uniConTocFinished.resolve(null);
            }
            updateAllHrefs(pageTocJson, pageTocFolder, true);
            $$1.when(uniRefTocFinished, uniConTocFinished).then(function (uniRefTocJson, uniConTocJson) {
                var combinedToc;
                var matchAndMerge = function (hrefToMatch, json, childJson) {
                    for (var i = 0; i < json.length; i++) {
                        if (json[i].href === hrefToMatch) {
                            json[i] = childJson;
                            break;
                        }
                        if (json[i].children) {
                            matchAndMerge(hrefToMatch, json[i].children, childJson);
                        }
                    }
                };
                if (uniRefTocJson && uniConTocJson) {
                    uniRefTocJson[0].newGroup = true;
                    var hrefToMatch = pageTocJson[0].href;
                    matchAndMerge(hrefToMatch, uniRefTocJson, pageTocJson[0]);
                    combinedToc = uniConTocJson.concat(uniRefTocJson);
                }
                else if (uniConTocJson) {
                    pageTocJson[0].newGroup = true;
                    combinedToc = uniConTocJson.concat(pageTocJson);
                }
                else if (uniRefTocJson) {
                    uniRefTocJson[0].newGroup = true;
                    combinedToc = pageTocJson.concat(uniRefTocJson);
                }
                else {
                    combinedToc = pageTocJson;
                }
                drawTocBasedOnWidth(combinedToc);
            });
        }
        else {
            updateAllHrefs(pageTocJson, pageTocFolder, true);
            drawTocBasedOnWidth(pageTocJson);
        }
    };
    var getTocData = function (url, fallbackToMeta) {
        $$1.ajax({
            url: url,
            dataType: 'json',
            timeout: timeout
        })
            .done(function (data, textStatus, jqXHR) {
            tocUrl = resolveRelativePath(url);
            tocFolder = getFolder(removeLocaleFromPath(tocUrl));
            tocJson = normalizeToc(jqXHR.responseJSON);
            gatherAllTocFiles(tocJson, tocFolder);
            var pdfName = getDataFromToc(tocJson, 'pdf_name');
            if (pdfName && pdfName.length) {
                $$1(function () { return renderPdfLink(pdfName); });
            }
        })
            .fail(function () {
            if (fallbackToMeta && tocMetaUrl && tocMetaUrl.length) {
                getTocData(tocMetaUrl);
            }
            
        });
    };
    var extendBc = function () {
        var $breadcrumbs = $$1('.' + breadcrumbClass);
        var addNodeToBc = function (node, bestMatch) {
            var href = node.href;
            var aCleanTitle = breakText(cleanText(node.toc_title));
            var pieces;
            $breadcrumbs.ifThen(node.thisIsMe || !href || !href.length || (!bestMatch.length && (relativeCanonicalUrlUniformIndex === getUniformIndex(node.href).toLowerCase())), function () {
                this.append($$1('<li>').html(aCleanTitle));
            }, function () {
                href = resolveRelativePath(href, tocFolder);
                this.append($$1('<li>').append($$1('<a>')
                    .ifThen(hasMoniker, function () {
                    pieces = href.split('#');
                    this.attr('href', pieces[0] + ((pieces[0].indexOf('?') > -1) ? '&' : '?') + monikerParams + (pieces[1] ? '#' + pieces[1] : ''));
                }, function () {
                    this.attr('href', href);
                })
                    .html(aCleanTitle)));
            });
            if (bestMatch.length && node.children && node.children.length) {
                addNodeToBc(node.children[bestMatch.shift()], bestMatch);
            }
        };
        if (tocBestMatch.length) {
            addNodeToBc(tocJson[tocBestMatch.shift()], tocBestMatch);
        }
    };
    var drawBc = function (json) {
        var relativeCanonicaFolder = getFolder(relativeCanonicalUrlNoQuery) + '/';
        var bestMatch = [];
        var $breadcrumbsContainer = $$1('<ul></ul>');
        var node;
        var nodeHrefNoQuery;
        var findBestMatch = function (json, nodeMap) {
            nodeMap.push(-1);
            for (var i = 0; i < json.length; i++) {
                node = json[i];
                nodeMap[nodeMap.length - 1] = i;
                if (!nodeMap.length || (bestMatch.length < nodeMap.length)) {
                    if (node.href) {
                        nodeHrefNoQuery = node.href.split('?')[0].toLowerCase();
                        if (relativeCanonicaFolder.indexOf(nodeHrefNoQuery) === 0 || relativeCanonicalUrlNoQuery === nodeHrefNoQuery) {
                            bestMatch = nodeMap.slice(0);
                        }
                    }
                }
                if (node.children && node.children.length) {
                    findBestMatch(node.children, nodeMap.slice(0));
                }
            }
        };
        var makeDisplayHtml = function ($breadcrumbs, node, bestMatch) {
            var href = node.homepage || node.href || '';
            var aCleanTitle = breakText(cleanText(node.toc_title));
            var pieces;
            $breadcrumbs.ifThen(!href || !href.length || (!bestMatch.length && (relativeCanonicalUrlUniformIndex === getUniformIndex(node.href).toLowerCase())), function () {
                this.append($$1('<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">').append($$1('<span itemprop="name">').html(aCleanTitle)));
            }, function () {
                href = resolveRelativePath(href, bcFolder);
                this.append($$1('<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">').append($$1('<a itemprop="item">')
                    .ifThen(hasMoniker, function () {
                    pieces = href.split('#');
                    this.attr('href', pieces[0] + ((pieces[0].indexOf('?') > -1) ? '&' : '?') + monikerParams + (pieces[1] ? '#' + pieces[1] : ''));
                }, function () {
                    this.attr('href', href);
                })
                    .html(aCleanTitle)));
            });
            if (bestMatch.length && node.children && node.children.length) {
                makeDisplayHtml($breadcrumbs, node.children[bestMatch.shift()], bestMatch);
            }
        };
        findBestMatch(json, []);
        if (bestMatch.length) {
            makeDisplayHtml($breadcrumbsContainer, json[bestMatch.shift()], bestMatch);
        }
        $$1(function () {
            var $breadcrumbs = $$1('.' + breadcrumbClass).empty();
            $breadcrumbsContainer.children().appendTo($breadcrumbs);
            bcFinished.resolve();
        });
    };
    var getBcData = function (url, fallbackToMeta) {
        var hideBc = msDocs.functions.getMeta('hide_bc');
        if (hideBc === undefined || hideBc !== 'true') {
            $$1.ajax({
                url: resolveRelativePath(url),
                dataType: 'json',
                timeout: timeout
            })
                .done(function (data, textStatus, jqXHR) {
                bcFolder = getFolder(removeLocaleFromPath(bcUrl));
                drawBc(normalizeToc(jqXHR.responseJSON));
            })
                .fail(function () {
                if (fallbackToMeta && bcMetaUrl && bcMetaUrl.length) {
                    getBcData(bcMetaUrl);
                }
                
            });
        }
    };
    locale = getLocaleFromPath(document$1.location.pathname);
    locationFolder = getFolder(removeLocaleFromPath(document$1.location.pathname));
    if (document$1.documentElement.classList.contains('hasSidebar')) {
        nodes_to_expand = msDocs.functions.getMetas('nodes_to_expand');
        if (nodes_to_expand.length) {
            for (var i = 0; i < nodes_to_expand.length; i++) {
                nodes_to_expand[i] = resolveRelativePath(nodes_to_expand[i]);
            }
            hasNodesToExpand = true;
        }
        relativeCanonicalUrl = getRelativeCanonicalUrl();
        relativeCanonicalUrlNoQuery = getRelativeCanonicalUrl(true).toLowerCase();
        relativeCanonicalUrlUniformIndex = getUniformIndex(relativeCanonicalUrlNoQuery);
        if (document$1.location.hash) {
            relativeCanonicalUrlNoQueryWithHash = relativeCanonicalUrlNoQuery + document$1.location.hash;
            relativeCanonicalUrlUniformIndexWithHash = relativeCanonicalUrlUniformIndex + document$1.location.hash;
        }
        if (tocQueryUrl && tocQueryUrl.length) {
            tocQueryUrl = decodeURIComponent(tocQueryUrl);
            tocQueryUrl = resolveRelativePath(tocQueryUrl);
            getTocData(tocQueryUrl, true);
        }
        else if (tocMetaUrl && tocMetaUrl.length) {
            getTocData(tocMetaUrl);
        }
    }
    if (bcQueryUrl && bcQueryUrl.length) {
        bcUrl = bcQueryUrl;
        getBcData(bcQueryUrl, true);
    }
    else if (bcMetaUrl && bcMetaUrl.length) {
        bcUrl = bcMetaUrl;
        getBcData(bcMetaUrl);
    }
    else {
        bcUrl = '';
    }
    if (msDocs.settings.extendBreadcrumb) {
        $$1(function () {
            $$1.when(tocFinished, bcFinished).done(function () {
                extendBc();
            });
        });
    }
}

var clipboardCopySupported = document$1.queryCommandSupported && document$1.queryCommandSupported('copy');
function clipboardCopy(text, owner) {
    if (!clipboardCopySupported) {
        return false;
    }
    var txt = document$1.createElement('textarea');
    txt.setAttribute(contentAttrs.name, getName(owner));
    txt.textContent = text;
    txt.classList.add('visually-hidden');
    document$1.body.appendChild(txt);
    txt.select();
    try {
        return document$1.execCommand('copy');
    }
    catch (ex) {
        return false;
    }
    finally {
        document$1.body.removeChild(txt);
    }
}
var unprintable = false;
function interceptCopy() {
    function handleCopy(event) {
        var value = window$1.getSelection().toString();
        var cleanValue = unbreakText(value);
        if (clipboardCopySupported && value !== cleanValue && !unprintable) {
            unprintable = true;
            clipboardCopy(cleanValue, event.target);
            return;
        }
        jsllReady.then(function (awa) { return awa.ct.capturePageAction(event.target, {
            actionType: awa.actionType.OTHER,
            behavior: awa.behavior.COPY,
            content: {
                event: 'copy',
                name: getName(event.target),
                value: value,
                unprintable: unprintable
            }
        }); });
        wedcs('ms.copyeventtime', new Date().getTime().toString(), 'ms.copycontent', value.substr(0, 20), 'ms.copycontentlength', value.length.toString(), 'ms.copyunprintable', unprintable.toString());
        unprintable = false;
    }
    document$1.addEventListener('copy', handleCopy, { passive: true });
}

var interactiveTypes = {};

var globalScriptTag = document.querySelector("script[src*='/global.min.js']");
function relativeToGlobal(relativePath, includeVersionArg) {
    if (globalScriptTag) {
        if (includeVersionArg) {
            return globalScriptTag.src.replace('js/global.min.js', relativePath);
        }
        else {
            return globalScriptTag.src.replace(/js\/global\.min.*$/, relativePath);
        }
    }
    return relativePath;
}

var workerUrl = relativeToGlobal('js/worker.js', true);
var worker = new Worker(workerUrl);
var languageFriendlyNames = {
    'vb': 'VB',
    'csharp': 'C#',
    'cs': 'C#',
    'dotnetcli': '.NET Console',
    'fsharp': 'F#',
    'azurecli': 'Azure CLI',
    'azurepowershell': 'Azure PowerShell',
    'http': 'HTTP',
    'json': 'JSON',
    'cpp': 'C++',
    'java': 'Java',
    'objc': 'Objective-C',
    'ruby': 'Ruby',
    'php': 'PHP',
    'powershell': 'PowerShell',
    'js': 'JavaScript',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'azcopy': 'AzCopy',
    'python': 'Python',
    'nodejs': 'NodeJS',
    'xaml': 'XAML',
    'xml': 'XML',
    'sql': 'SQL',
    'swift': 'Swift',
    'md': 'Markdown'
};
var cookieDevLang = 'proglang';
var devLangInfo = {
    selectionAvailable: false,
    userLang: undefined,
    defaultLang: undefined,
    langs: []
};
var noToggleClassName = 'noToggle';
var codeLangIsToggleQuery = 'code[class*="lang-"]:not(.' + noToggleClassName + ')';
var spanLangIsToggleQuery = 'span[class*="lang-"]:not(.' + noToggleClassName + ')';
var codeHeaderIsToggleQuery = 'div.codeHeader[class*="lang-"]:not(.' + noToggleClassName + ')';
function highlightCodeBlock(block, isFromWorker) {
    addCodeHeader(block, msDocs.data.contentDir, devLangInfo);
    highlightLines(block);
    notifyContentUpdated();
}
function highlightLines(block) {
    if (block.innerHTML === "") {
        return;
    }
    var lines = block.innerHTML.split('\n');
    var queryString = block.getAttribute('highlight-lines');
    if (!queryString) {
        return;
    }
    var ranges = queryString.split(',');
    for (var j = 0, range; range = ranges[j++];) {
        var found = range.match(/^(\d+)\-(\d+)?$/);
        var start = 0;
        var end = 0;
        if (found) {
            start = +found[1];
            end = +found[2];
            if (isNaN(end) || end > lines.length) {
                end = lines.length;
            }
        }
        else {
            if (isNaN(range)) {
                continue;
            }
            start = +range;
            end = start;
        }
        if (start <= 0 || end <= 0 || start > end || start > lines.length) {
            continue;
        }
        lines[start - 1] = '<span class="line-highlight">' + lines[start - 1];
        lines[end - 1] = lines[end - 1] + '</span>';
    }
    block.innerHTML = lines.join('\n');
}
function runHighlightWorker() {
    var blocks = [];
    var rawTexts = [];
    $('pre code').each(function (i, block) {
        block.setAttribute(contentAttrs.name, 'code-block');
        blocks.push(block);
        var contents = block.innerHTML;
        contents = contents.replace(/<br>/gi, '\n');
        block.innerHTML = contents;
        rawTexts.push(block.textContent);
        var language = block.className || "";
        if (language === 'azurepowershell') {
            language = 'powershell';
        }
        rawTexts.push(language);
    });
    worker.onmessage = function (event) {
        var len = event.data.length;
        for (var i = 0; i < len; i++) {
            if (event.data[i] !== '--') {
                blocks[i].innerHTML = event.data[i];
            }
            highlightCodeBlock(blocks[i], true);
        }
    };
    worker.postMessage(rawTexts);
}
function getLanguageClass(className) {
    return (/(?:^| )(lang-[^ $]+)/.exec(className) || [])[1] || '';
}
function getLanguageName(languageClass) {
    var languageId = languageClass.length === 0 ? '' : languageClass.substr(5);
    return languageFriendlyNames[languageId] || languageId || '';
}
function getLanguageNameRtlHtml(languageName, contentDir) {
    if (contentDir == 'rtl') {
        return languageName.replace(/(^|\s|\>)(C#|F#|C\+\+)(\s*|[.!?;:]*)(\<|[\n\r]|$)/gi, '$1$2&lrm;$3$4');
    }
    return languageName;
}
function addCodeHeader(code, contentDir, devLangInfo) {
    var pre = code.parentElement;
    if (!pre) {
        return;
    }
    var header = document$1.createElement('div');
    header.classList.add('codeHeader');
    header.setAttribute(contentAttrs.name, 'code-header');
    var languageClass = getLanguageClass(code.className);
    if (languageClass.length > 0) {
        header.classList.add(languageClass);
    }
    var languageName = document$1.createElement('span');
    languageName.classList.add('language');
    languageName.innerHTML = getLanguageNameRtlHtml(getLanguageName(languageClass), contentDir);
    header.appendChild(languageName);
    if (clipboardCopySupported) {
        var copyButton = document$1.createElement('button');
        copyButton.classList.add('action');
        copyButton.classList.add('copy');
        copyButton.innerHTML = '<span>' + loc.copy + '</span>';
        copyButton.addEventListener('click', function () {
            copyCodeBlockToClipboard(code, languageClass);
        });
        copyButton.setAttribute(contentAttrs.name, 'copy');
        header.appendChild(copyButton);
    }
    var interactiveTypeId = code.getAttribute('data-interactive') || code.parentElement.getAttribute('data-interactive');
    var interactiveType = interactiveTypes[interactiveTypeId];
    if (interactiveType) {
        var buttonConfig = interactiveType.activateButtonConfig;
        var activateButton_1 = document$1.createElement('button');
        activateButton_1.classList.add('action');
        activateButton_1.classList.add(buttonConfig.iconClass);
        var span = document$1.createElement('span');
        span.textContent = buttonConfig.name;
        activateButton_1.appendChild(span);
        for (var _i = 0, _a = buttonConfig.attributes; _i < _a.length; _i++) {
            var attr = _a[_i];
            activateButton_1.setAttribute(attr.name, attr.value);
        }
        activateButton_1.addEventListener('click', function () {
            activateButton_1.classList.add('busy');
            activateButton_1.disabled = true;
            interactiveType.activateCodeBlock(pre)
                .catch(function () { })
                .then(function () {
                activateButton_1.classList.remove('busy');
                activateButton_1.disabled = false;
            });
            wedcs('ms.code-header-try-it', interactiveTypeId);
        });
        activateButton_1.setAttribute(contentAttrs.name, 'code-header-try-it-' + interactiveTypeId);
        header.appendChild(activateButton_1);
    }
    if (devLangInfo.selectionAvailable) {
        var isToggable = !code.classList.contains(noToggleClassName)
            && devLangInfo.langs.indexOf(languageClass) !== -1;
        if (isToggable) {
            if (devLangInfo.userLang !== undefined) {
                header.hidden = languageClass !== devLangInfo.userLang;
            }
            else {
                header.hidden = languageClass !== devLangInfo.defaultLang;
            }
        }
        else {
            header.classList.add(noToggleClassName);
        }
    }
    pre.classList.remove('loading');
    pre.parentElement.insertBefore(header, pre);
}
function copyCodeBlockToClipboard(codeBlock, langClass) {
    var text = codeBlock.textContent.trim();
    if (langClass.toLowerCase() === 'lang-powershell') {
        text = text.replace(/\bPS [a-z]:\\>\s?/gi, '');
    }
    return clipboardCopy(text, codeBlock);
}
var initDevLangSelector = function (devLangs) {
    var $selector = $("#lang-selector");
    if ($selector.length) {
        if (devLangInfo.userLang !== undefined) {
            $selector.val(devLangInfo.userLang);
        }
        else {
            $selector.val(devLangInfo.defaultLang);
        }
        var selectedDevLang = $selector.val();
        if (selectedDevLang) {
            updateCodeTags();
            updateSpanTags();
            toggleDevLang(selectedDevLang);
        }
        $selector.change(function () {
            var newUserDevLang = $selector.val();
            toggleDevLang(newUserDevLang);
            localStorage$1.setItem(cookieDevLang, newUserDevLang);
        });
    }
};
var tagHasDevLangAndNoToggle = function ($el) {
    if ($el) {
        var className = $el.attr('class');
        if (typeof className === 'undefined') {
            return true;
        }
        else if (className && className.indexOf('lang-') !== -1) {
            var isFound = false;
            for (var i = 0; i < devLangInfo.langs.length; i++) {
                if ($el.hasClass(devLangInfo.langs[i])) {
                    isFound = true;
                    break;
                }
            }
            return !isFound;
        }
    }
    return true;
};
var updateCodeTags = function () {
    var isFound = false;
    var $this = null;
    $('code[class*="lang"]').each(function (index) {
        isFound = false;
        $this = $(this);
        for (var i = 0; i < devLangInfo.langs.length; i++) {
            if ($this.hasClass(devLangInfo.langs[i])) {
                isFound = true;
                break;
            }
        }
        if (!isFound) {
            $this.addClass(noToggleClassName);
        }
        else {
            var $prev = $this.prev();
            var $next = $this.next();
            var prevName = $prev[0] ? $prev[0].tagName.toLowerCase() : '';
            var nextName = $next[0] ? $next[0].tagName.toLowerCase() : '';
            if (prevName !== 'code' && nextName !== 'code') {
                var $parent = $this.parent('pre');
                if ($parent) {
                    $prev = $parent.prev();
                    $next = $parent.next();
                    prevName = $prev[0] ? $prev[0].tagName.toLowerCase() : '';
                    nextName = $next[0] ? $next[0].tagName.toLowerCase() : '';
                    if (prevName !== 'pre' && nextName !== 'pre') {
                        $this.addClass(noToggleClassName);
                    }
                    else {
                        var noToggleCount = 0;
                        if (prevName === 'pre') {
                            var $child = $($prev.children()[0]);
                            if ($child && $child.hasClass(noToggleClassName)) {
                                noToggleCount++;
                            }
                        }
                        else {
                            noToggleCount++;
                        }
                        if (nextName === 'pre') {
                            if (tagHasDevLangAndNoToggle($($next.children()[0]))) {
                                noToggleCount++;
                            }
                        }
                        else {
                            noToggleCount++;
                        }
                        if (noToggleCount === 2) {
                            $this.addClass(noToggleClassName);
                        }
                    }
                }
            }
        }
    });
};
var updateSpanTags = function () {
    var isFound = false;
    var $this = null;
    $('span[class*="lang"]').each(function (index) {
        isFound = false;
        $this = $(this);
        for (var i = 0; i < devLangInfo.langs.length; i++) {
            if ($this.hasClass(devLangInfo.langs[i])) {
                isFound = true;
                break;
            }
        }
        if (!isFound) {
            $this.addClass(noToggleClassName);
        }
        else {
            var $prev = $this.prev();
            var $next = $this.next();
            var prevName = $prev[0] ? $prev[0].tagName.toLowerCase() : '';
            var nextName = $next[0] ? $next[0].tagName.toLowerCase() : '';
            if (prevName !== 'span' && nextName !== 'span') {
                $this.addClass(noToggleClassName);
            }
            else {
                var noToggleCount = 0;
                if (prevName === 'span') {
                    if ($prev.attr('class').indexOf('lang-') !== -1 && $prev.hasClass(noToggleClassName)) {
                        noToggleCount++;
                    }
                }
                else {
                    noToggleCount++;
                }
                if (nextName === 'span') {
                    if (tagHasDevLangAndNoToggle($next)) {
                        noToggleCount++;
                    }
                }
                else {
                    noToggleCount++;
                }
                if (noToggleCount === 2) {
                    $this.addClass(noToggleClassName);
                }
            }
        }
    });
};
var toggleDevLang = function (devLang) {
    $(codeLangIsToggleQuery).prop('hidden', true).parent('pre').prop('hidden', false);
    $(spanLangIsToggleQuery).prop('hidden', true);
    $(codeHeaderIsToggleQuery).prop('hidden', true);
    $('.' + devLang).prop('hidden', false);
    $('code[class*="lang"]').each(function () {
        if (!$(this).parent('pre').find(':visible').length) {
            $(this).parent('pre').prop('hidden', true);
        }
    });
};
function makeCodeBlocks() {
    devLangInfo.selectionAvailable = $("#lang-selector").length > 0;
    if (devLangInfo.selectionAvailable) {
        devLangInfo.userLang = localStorage$1.getItem(cookieDevLang);
        if (msDocs.settings.defaultDevLang) {
            devLangInfo.defaultLang = "lang-" + msDocs.settings.defaultDevLang;
        }
        var langOptions = $("#lang-selector option");
        if (langOptions.length) {
            var userFound = false;
            var defaultFound = false;
            var devLang = '';
            for (var i = 0; i < langOptions.length; i++) {
                devLang = $(langOptions[i]).val();
                if (devLang === devLangInfo.userLang) {
                    userFound = true;
                }
                if (devLang === devLangInfo.defaultLang) {
                    defaultFound = true;
                }
                devLangInfo.langs.push(devLang);
            }
            if (!userFound) {
                devLangInfo.userLang = undefined;
            }
            if (!defaultFound) {
                devLangInfo.defaultLang = $(langOptions[0]).val();
            }
        }
        initDevLangSelector(devLangInfo.langs);
    }
    runHighlightWorker();
}

function getPlatform$1() {
    var navigatorPlatforms = {
        'iPhone': 'ios',
        'iPad': 'ios',
        'iPod': 'ios',
        'Macintosh': 'macos',
        'MacIntel': 'macos',
        'MacPPC': 'macos',
        'Mac68K': 'macos',
        'Win32': 'windows',
        'Win64': 'windows',
        'Windows': 'windows',
        'WinCE': 'windows',
    };
    var platform = navigatorPlatforms[navigator.platform];
    if (platform !== undefined) {
        return platform;
    }
    if (/Android/.test(navigator.userAgent)) {
        return 'android';
    }
    if (/Linux/.test(navigator.platform)) {
        return 'linux';
    }
    return null;
}
function isPlatform(s) {
    return /android|ios|linux|macos|windows/.test(s);
}
var platform = getPlatform$1();
var platformStorageKey = 'preferred-platform';
function getPreferredPlatform() {
    var raw = localStorage$1.getItem(platformStorageKey);
    if (raw !== null && isPlatform(raw)) {
        return raw;
    }
    return null;
}
var preferredPlatform = getPreferredPlatform();
function setPreferredPlatform(platform) {
    localStorage$1.setItem(platformStorageKey, platform);
}

var Tab = (function () {
    function Tab(li, a, section) {
        this.li = li;
        this.a = a;
        this.section = section;
    }
    Object.defineProperty(Tab.prototype, "tabId", {
        get: function () { return this.a.getAttribute('data-tab'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "condition", {
        get: function () { return this.a.getAttribute('data-condition'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "visible", {
        get: function () { return !this.li.hasAttribute('hidden'); },
        set: function (value) {
            if (value) {
                this.li.removeAttribute('hidden');
                this.li.removeAttribute('aria-hidden');
            }
            else {
                this.li.setAttribute('hidden', 'hidden');
                this.li.setAttribute('aria-hidden', 'true');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "selected", {
        get: function () { return !this.section.hasAttribute('hidden'); },
        set: function (value) {
            if (value) {
                this.a.setAttribute('aria-selected', 'true');
                this.a.tabIndex = 0;
                this.section.removeAttribute('hidden');
                this.section.removeAttribute('aria-hidden');
            }
            else {
                this.a.setAttribute('aria-selected', 'false');
                this.a.tabIndex = -1;
                this.section.setAttribute('hidden', 'hidden');
                this.section.setAttribute('aria-hidden', 'true');
            }
        },
        enumerable: true,
        configurable: true
    });
    Tab.prototype.focus = function () {
        this.a.focus();
    };
    return Tab;
}());
function updateVisibilityAndSelection(group, state) {
    var anySelected = false;
    var platformTab;
    var firstVisibleTab;
    for (var _i = 0, _a = group.tabs; _i < _a.length; _i++) {
        var tab = _a[_i];
        tab.visible = tab.condition === null || state.selectedTabs.indexOf(tab.condition) !== -1;
        if (tab.visible) {
            if (!firstVisibleTab) {
                firstVisibleTab = tab;
            }
            if (!platformTab && tab.tabId === (preferredPlatform || platform)) {
                platformTab = tab;
            }
        }
        tab.selected = tab.visible && state.selectedTabs.indexOf(tab.tabId) !== -1;
        anySelected = anySelected || tab.selected;
    }
    if (!anySelected) {
        for (var _b = 0, _c = group.tabs; _b < _c.length; _b++) {
            var tab_1 = _c[_b];
            var index = state.selectedTabs.indexOf(tab_1.tabId);
            if (index === -1) {
                continue;
            }
            state.selectedTabs.splice(index, 1);
        }
        var tab = platformTab || firstVisibleTab;
        tab.selected = true;
        state.selectedTabs.push(tab.tabId);
    }
}
function initTabGroup(element, state) {
    var group = { tabs: [] };
    var li = element.firstElementChild.firstElementChild;
    while (li) {
        var a = li.firstElementChild;
        a.setAttribute(contentAttrs.name, 'tab');
        a.setAttribute('ms.cmpnm', 'tab');
        var section = document$1.getElementById(a.getAttribute('aria-controls'));
        var tab = new Tab(li, a, section);
        group.tabs.push(tab);
        li = li.nextElementSibling;
    }
    updateVisibilityAndSelection(group, state);
    element.setAttribute(contentAttrs.name, 'tab-group');
    element.setAttribute('ms.cmpgrp', 'tab-group');
    element.tabGroup = group;
    state.groups.push(group);
}
function initTabs() {
    var queryStringTabs = readTabsQueryStringParam();
    var elements = document$1.querySelectorAll('.tabGroup');
    var state = { groups: [], selectedTabs: [] };
    for (var i = 0; i < elements.length; i++) {
        initTabGroup(elements.item(i), state);
    }
    if (state.groups.length === 0) {
        return state;
    }
    document$1.body.addEventListener('click', function (event) { return handleClick(event, state); });
    document$1.body.addEventListener('keydown', function (event) { return handleKeyDown(event, state); });
    selectTabs(queryStringTabs);
    updateTabsQueryStringParam(state);
    return state;
}
function getTabInfoFromEvent(event) {
    if (!(event.target instanceof HTMLAnchorElement)) {
        return null;
    }
    var tabId = event.target.getAttribute('data-tab');
    if (tabId === null) {
        return null;
    }
    var group = event.target.parentElement.parentElement.parentElement.tabGroup;
    return { tabId: tabId, group: group, anchor: event.target };
}
function handleClick(event, state) {
    var info = getTabInfoFromEvent(event);
    if (info === null) {
        return;
    }
    event.preventDefault();
    var tabId = info.tabId, group = info.group;
    if (state.selectedTabs.indexOf(tabId) !== -1) {
        return;
    }
    var originalTop = info.anchor.getBoundingClientRect().top;
    var previousTabId = group.tabs.filter(function (t) { return t.selected; })[0].tabId;
    state.selectedTabs.splice(state.selectedTabs.indexOf(previousTabId), 1, tabId);
    updateTabsQueryStringParam(state);
    for (var _i = 0, _a = state.groups; _i < _a.length; _i++) {
        var group_1 = _a[_i];
        updateVisibilityAndSelection(group_1, state);
    }
    if (isPlatform(tabId)) {
        setPreferredPlatform(tabId);
    }
    var top = info.anchor.getBoundingClientRect().top;
    if (top !== originalTop && event instanceof MouseEvent) {
        window$1.scrollTo(0, window$1.pageYOffset + top - originalTop);
    }
}
function handleKeyDown(event, state) {
    var info = getTabInfoFromEvent(event);
    if (info === null) {
        return;
    }
    var tabId = info.tabId, group = info.group;
    var key = event.which;
    if (!event.altKey && (key === keyCodes.left || key === keyCodes.right || key === keyCodes.home || key === keyCodes.end)) {
        event.preventDefault();
        var isLeft = key === keyCodes.left || key === keyCodes.home;
        var index = void 0;
        if (event.ctrlKey || key === keyCodes.home || key === keyCodes.end) {
            var increment = isLeft ? 1 : -1;
            index = isLeft ? 0 : group.tabs.length - 1;
            while (!group.tabs[index].visible) {
                index += increment;
            }
        }
        else {
            var increment = isLeft ? -1 : 1;
            index = isLeft ? group.tabs.length - 1 : 0;
            while (group.tabs[index].tabId !== tabId || !group.tabs[index].visible) {
                index += increment;
            }
            do {
                index += increment;
                if (index === -1) {
                    index = group.tabs.length - 1;
                }
                else if (index === group.tabs.length) {
                    index = 0;
                }
            } while (!group.tabs[index].visible);
        }
        group.tabs[index].focus();
        return;
    }
}
function selectTabs(tabIds) {
    for (var _i = 0, tabIds_1 = tabIds; _i < tabIds_1.length; _i++) {
        var tabId = tabIds_1[_i];
        var a = document$1.querySelector(".tabGroup > ul > li > a[data-tab=\"" + tabId + "\"]:not([hidden])");
        if (a === null) {
            return;
        }
        a.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    }
}
function readTabsQueryStringParam() {
    var qs = parseQueryString();
    var t = qs.tabs;
    if (t === undefined || t === '') {
        return [];
    }
    return t.split(',');
}
function updateTabsQueryStringParam(state) {
    var qs = parseQueryString();
    qs.tabs = state.selectedTabs.join();
    var url = location$1.protocol + "//" + location$1.host + location$1.pathname + "?" + toQueryString(qs) + location$1.hash;
    if (location$1.href === url) {
        return;
    }
    history.replaceState({}, document$1.title, url);
}

var DockPanel = (function () {
    function DockPanel() {
        var _this = this;
        this.element = document.createElement('div');
        this.element.id = 'dockpanel';
        this.element.tabIndex = -1;
        this.element.classList.add('dockpanel');
        this.element.setAttribute('aria-role', 'application');
        this.element.setAttribute('aria-hidden', 'true');
        var headerContainer = document.createElement('div');
        headerContainer.classList.add('dockpanel-header');
        this.element.appendChild(headerContainer);
        this.titleElement = document.createElement('h2');
        headerContainer.appendChild(this.titleElement);
        var minimize = document.createElement('button');
        minimize.classList.add('flat-button');
        minimize.classList.add('minimize');
        minimize.innerHTML = '<span class="visually-hidden">' + loc.minimize + '</span>';
        minimize.title = loc.minimize;
        minimize.setAttribute(contentAttrs.name, 'minimize');
        minimize.onclick = function () { return _this.minimize(); };
        headerContainer.appendChild(minimize);
        var close = document.createElement('button');
        close.classList.add('flat-button');
        close.classList.add('close');
        close.innerHTML = '<span class="visually-hidden">' + loc.close + '</span>';
        close.title = loc.close;
        close.setAttribute(contentAttrs.name, 'close');
        close.onclick = function () { return _this.close(); };
        headerContainer.appendChild(close);
        this.bodyElement = document.createElement('div');
        this.bodyElement.classList.add('dockpanel-body');
        this.element.appendChild(this.bodyElement);
        document.body.appendChild(this.element);
    }
    DockPanel.prototype.maximize = function () {
        this.element.classList.add('dockpanel-maximized');
        this.element.setAttribute('aria-hidden', 'false');
        this.bodyElement.focus();
    };
    DockPanel.prototype.minimize = function () {
        this.element.classList.remove('dockpanel-maximized');
        this.element.setAttribute('aria-hidden', 'true');
    };
    Object.defineProperty(DockPanel.prototype, "component", {
        get: function () {
            return this.comp;
        },
        set: function (value) {
            var _this = this;
            this.titleElement.textContent = '';
            this.bodyElement.innerHTML = '';
            this.element.removeAttribute(contentAttrs.name);
            while (this.titleElement.previousElementSibling) {
                this.titleElement.parentElement.removeChild(this.titleElement.previousElementSibling);
            }
            if (this.comp) {
                this.comp.dispose();
            }
            this.comp = value;
            if (value === null) {
                return;
            }
            this.titleElement.textContent = value.title;
            this.bodyElement.appendChild(value.element);
            this.element.setAttribute(contentAttrs.name, value.biName);
            value.commands.forEach(function (c) { return _this.createCommandElement(c); });
        },
        enumerable: true,
        configurable: true
    });
    DockPanel.prototype.createCommandElement = function (command) {
        var el = document.createElement(command.type);
        el.classList.add('flat-button');
        el.classList.add(command.className);
        el.innerHTML = '<span class="visually-hidden">' + command.name + '</span>';
        el.title = command.name;
        if (command.type === 'a') {
            el.setAttribute('href', command.href);
            el.setAttribute('target', '_blank');
        }
        else {
            el.onclick = command.execute;
        }
        this.titleElement.parentElement.insertBefore(el, this.titleElement);
    };
    DockPanel.prototype.close = function () {
        var _this = this;
        this.minimize();
        setTimeout(function () { return _this.component = null; }, 100);
    };
    DockPanel.prototype.internals = function () {
        return {
            element: this.element,
            titleElement: this.titleElement,
            bodyElement: this.bodyElement
        };
    };
    return DockPanel;
}());
var dockPanel = null;
function getDockPanel() {
    if (dockPanel === null) {
        dockPanel = new DockPanel();
    }
    return dockPanel;
}

var cliPageOrigin = 'https://ux.console.azure.com';
var cliPageUrl = cliPageOrigin + "/index.html?trustedAuthority=" + location$1.origin + "&embed=true";
var powershellArg = '&feature.azureconsole.ostype=windows';
var loginReturnUrl = relativeToGlobal('azure-cli-authorized.html', false);
var CloudShell = (function () {
    function CloudShell(isPowerShell, requestClose) {
        var _this = this;
        this.isPowerShell = isPowerShell;
        this.requestClose = requestClose;
        this.title = 'Azure Cloud Shell';
        this.biName = 'azure-cli';
        this.commands = [
            {
                type: 'button',
                className: 'refresh',
                name: loc.restart,
                biName: 'restart',
                execute: function () { return _this.restart(); }
            },
            {
                type: 'a',
                className: 'feedback',
                name: loc.feedback,
                biName: 'feedback',
                href: 'https://aka.ms/cloudshellfeedback'
            },
        ];
        this.messageHandler = function (_a) {
            var _b = _a.data, signature = _b.signature, type = _b.type, audience = _b.audience, origin = _a.origin;
            if (origin !== cliPageOrigin || signature !== 'portalConsole') {
                return;
            }
            if (type === 'getToken') {
                if (audience !== '') {
                    return;
                }
                if (_this.token) {
                    _this.replyToken();
                    return;
                }
                _this.loadToken();
                return;
            }
            if (type === 'close') {
                _this.requestClose();
                return;
            }
        };
        window$1.addEventListener('message', this.messageHandler);
        this.element = document$1.createElement('div');
        this.element.classList.add('cloud-shell');
        this.element.classList.add(isPowerShell ? 'powershell' : 'cli');
        this.element.innerHTML = "\n            <div class=\"message-container\">\n                <h3></h3>\n                <div class=\"c-progress f-indeterminate-local f-progress-large\" role=\"progressbar\" tabindex=\"0\" aria-valuetext=\"" + loc['cloudShell.loggingIn'] + "\" aria-label=\"" + loc['cloudShell.loggingIn'] + "\">\n                    <span></span>\n                    <span></span>\n                    <span></span>\n                    <span></span>\n                    <span></span>\n                </div>\n                <a " + contentAttrs.name + "=\"login\" class=\"cloud-shell-login\" href=\"#\" hidden>\n                    " + loc.login + "\n                </a>\n                <div class=\"cloud-shell-tokens\" hidden>\n                </div>\n                <p>" + loc.azureDisclaimer + "</p>\n            </div>";
        this.messageContainer = this.element.firstElementChild;
        this.consoleFrame = document$1.createElement('iframe');
        this.consoleFrame.classList.add('cli-frame');
        this.consoleFrame.hidden = true;
        this.consoleFrame.frameBorder = '0';
        this.consoleFrame.src = cliPageUrl + (isPowerShell ? powershellArg : '');
        this.element.appendChild(this.consoleFrame);
        this.message = {};
        this.message.header = this.messageContainer.firstElementChild;
        this.message.progress = this.message.header.nextElementSibling;
        this.message.loginAnchor = this.message.progress.nextElementSibling;
        this.message.tokens = this.message.loginAnchor.nextElementSibling;
        this.message.description = this.message.tokens.nextElementSibling;
        var loginWindow = null;
        window$1.azureCliAuthorized = function (query) {
            if (loginWindow === null) {
                return;
            }
            loginWindow.close();
            loginWindow = null;
            _this.showLoggingIn();
            _this.loadToken();
            jsllReady.then(function (awa) {
                return awa.ct.capturePageAction(_this.element, {
                    behavior: awa.behavior.COMPLETEPROCESS,
                    actionType: awa.actionType.OTHER,
                    contentTags: (_a = {},
                        _a[contentTags.scenario] = 'azure-cli-login',
                        _a[contentTags.scenarioStep] = 'authorized',
                        _a)
                });
                var _a;
            });
            wedcs('ms.azure-cli-login', 'authorized');
        };
        this.message.loginAnchor.addEventListener('click', function (event) {
            event.preventDefault();
            loginWindow = window$1.open("https://token.docs.microsoft.com/signin?returnUrl=" + encodeURIComponent(loginReturnUrl), '_blank');
            jsllReady.then(function (awa) {
                return awa.ct.capturePageAction(_this.element, {
                    behavior: awa.behavior.PROCESSCHECKPOINT,
                    actionType: awa.actionType.CLICKLEFT,
                    contentTags: (_a = {},
                        _a[contentTags.scenario] = 'azure-cli-login',
                        _a[contentTags.scenarioStep] = 'login',
                        _a)
                });
                var _a;
            });
            wedcs('ms.azure-cli-login', 'login');
        });
        this.showLoggingIn();
    }
    CloudShell.prototype.restart = function () {
        if (this.consoleFrame.hidden) {
            return;
        }
        this.consoleFrame.contentWindow.postMessage({
            signature: 'portalConsole',
            type: 'restart'
        }, cliPageOrigin);
    };
    CloudShell.prototype.dispose = function () {
        window$1.azureCliAuthorized = null;
        window$1.removeEventListener('message', this.messageHandler);
        this.requestClose = null;
    };
    CloudShell.prototype.showLoggingIn = function () {
        this.messageContainer.hidden = false;
        this.consoleFrame.hidden = true;
        this.message.header.textContent = loc['cloudShell.loggingIn'];
        this.message.progress.hidden = false;
        this.message.loginAnchor.hidden = true;
        this.message.tokens.hidden = true;
        this.message.description.textContent = loc.azureDisclaimer;
        this.message.description.hidden = false;
    };
    CloudShell.prototype.showLoginButton = function () {
        var _this = this;
        this.messageContainer.hidden = false;
        this.consoleFrame.hidden = true;
        this.message.header.textContent = loc['cloudShell.pleaseLogin'];
        this.message.progress.hidden = true;
        this.message.loginAnchor.hidden = false;
        this.message.tokens.hidden = true;
        this.message.description.textContent = loc.azureDisclaimer;
        this.message.description.hidden = false;
        jsllReady.then(function (awa) {
            return awa.ct.capturePageAction(_this.element, {
                behavior: awa.behavior.STARTPROCESS,
                actionType: awa.actionType.CLICKLEFT,
                contentTags: (_a = {},
                    _a[contentTags.scenario] = 'azure-cli-login',
                    _a[contentTags.scenarioStep] = 'login-prompt',
                    _a)
            });
            var _a;
        });
        wedcs('ms.azure-cli-login', 'login-prompt');
    };
    CloudShell.prototype.showTokenSelector = function (tokens) {
        var _this = this;
        this.messageContainer.hidden = false;
        this.consoleFrame.hidden = true;
        this.message.header.textContent = loc['cloudShell.chooseAccount'];
        this.message.progress.hidden = true;
        this.message.loginAnchor.hidden = true;
        this.message.tokens.hidden = false;
        this.message.description.textContent = loc.azureDisclaimer;
        this.message.description.hidden = false;
        this.message.tokens.innerHTML = '';
        var _loop_1 = function (i) {
            var token = tokens[i];
            var button = document$1.createElement('button');
            button.appendChild(document$1.createElement('span'));
            button.firstElementChild.textContent = token.display_name;
            button.appendChild(document$1.createElement('span'));
            button.lastElementChild.textContent = token.default_domain;
            button.setAttribute(contentAttrs.name, 'token');
            button.addEventListener('click', function () {
                _this.token = token.access_token;
                _this.replyToken();
            });
            this_1.message.tokens.appendChild(button);
        };
        var this_1 = this;
        for (var i = 0; i < tokens.length; i++) {
            _loop_1(i);
        }
    };
    CloudShell.prototype.showError = function (message) {
        this.messageContainer.hidden = false;
        this.consoleFrame.hidden = true;
        this.message.header.textContent = loc.error;
        this.message.progress.hidden = true;
        this.message.loginAnchor.hidden = true;
        this.message.tokens.hidden = true;
        this.message.description.textContent = message;
        this.message.description.hidden = false;
    };
    CloudShell.prototype.replyToken = function () {
        this.consoleFrame.contentWindow.postMessage({
            signature: 'portalConsole',
            type: 'postToken',
            audience: '',
            message: 'Bearer ' + this.token
        }, cliPageOrigin);
        this.messageContainer.hidden = true;
        this.consoleFrame.hidden = false;
    };
    CloudShell.prototype.loadToken = function () {
        var _this = this;
        fetch('https://token.docs.microsoft.com/accesstokens', { method: 'POST', mode: 'cors', credentials: 'include' })
            .then(function (response) {
            if (response.ok) {
                return response.json().then(function (tokens) {
                    if (tokens.length === 0) {
                        _this.showError('Error logging in');
                        return;
                    }
                    if (tokens.length === 1) {
                        _this.token = tokens[0].access_token;
                        _this.replyToken();
                        return;
                    }
                    _this.showTokenSelector(tokens);
                });
            }
            if (response.status === 401) {
                _this.showLoginButton();
                return;
            }
            _this.showError('Error logging in');
        })
            .catch(function (err) {
            if (err.toString() === 'TypeMismatchError') {
                _this.showLoginButton();
                return;
            }
            throw err;
        });
    };
    CloudShell.prototype.internals = function () {
        return {
            message: this.message,
            messageContainer: this.messageContainer,
            consoleFrame: this.consoleFrame
        };
    };
    return CloudShell;
}());
function showCloudShell(isPowerShell) {
    var dockPanel = getDockPanel();
    var current = dockPanel.component;
    if (current && current instanceof CloudShell && current.isPowerShell === isPowerShell) {
        dockPanel.maximize();
    }
    else {
        dockPanel.component = new CloudShell(isPowerShell, function () { return dockPanel.close(); });
        setTimeout(function () { return dockPanel.maximize(); });
    }
    return Promise.resolve();
}
function createForTutorial(isPowerShell) {
    var cloudShell = new CloudShell(isPowerShell, function () { });
    var panel = document$1.createElement('div');
    panel.classList.add('tutorial-panel');
    var header = document$1.createElement('div');
    header.classList.add('panel-header');
    panel.appendChild(header);
    var restartButton = document$1.createElement('button');
    restartButton.onclick = function () { return cloudShell.restart(); };
    restartButton.classList.add('flat-button');
    restartButton.classList.add('refresh');
    header.appendChild(restartButton);
    var h2 = document$1.createElement('h2');
    h2.textContent = cloudShell.title;
    header.appendChild(h2);
    var screenReaderSpan = document$1.createElement('span');
    screenReaderSpan.classList.add('visually-hidden');
    screenReaderSpan.textContent = loc.restart;
    restartButton.appendChild(screenReaderSpan);
    cloudShell.element.classList.add('panel-body');
    panel.appendChild(cloudShell.element);
    return panel;
}
var activateButtonConfig = {
    name: loc['try.it'],
    iconClass: 'tryIt',
    attributes: [
        { name: 'aria-haspopup', value: 'true' },
        { name: 'aria-controls', value: 'dockpanel' }
    ]
};
interactiveTypes['azurecli'] = {
    activateButtonConfig: activateButtonConfig,
    activateCodeBlock: function () { return showCloudShell(false); },
    createForTutorial: function () { return createForTutorial(false); }
};
interactiveTypes['azurepowershell'] = {
    activateButtonConfig: activateButtonConfig,
    activateCodeBlock: function () { return showCloudShell(true); },
    createForTutorial: function () { return createForTutorial(true); }
};

function scrollTo(y, duration) {
    var startingY = window.pageYOffset;
    var diff = y - startingY;
    var start;
    function step(timestamp) {
        if (!start) {
            start = timestamp;
        }
        var elapsed = timestamp - start;
        var targetPercentComplete = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startingY + diff * targetPercentComplete);
        if (elapsed < duration) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

var dotNetOnlineOrigin = 'https://try.dot.net';
interactiveTypes['csharp'] = {
    activateButtonConfig: {
        name: loc.run,
        iconClass: 'run',
        attributes: []
    },
    activateCodeBlock: function (codeBlock) { return activateCodeBlock(codeBlock, 'csharp'); },
    createForTutorial: function () {
        var dotnetOnline = new DotNetOnline('csharp', '');
        var panel = document$1.createElement('div');
        panel.classList.add('tutorial-panel');
        var header = document$1.createElement('div');
        header.classList.add('panel-header');
        panel.appendChild(header);
        var h2 = document$1.createElement('h2');
        h2.innerHTML = '&lrm;' + dotnetOnline.title;
        header.appendChild(h2);
        var runButton = document$1.createElement('button');
        runButton.classList.add('run');
        runButton.classList.add('action');
        runButton.onclick = function () {
            runButton.classList.add('busy');
            dotnetOnline.run()
                .catch(function () { })
                .then(function () {
                runButton.classList.remove('busy');
            });
        };
        var runSpan = document$1.createElement('span');
        runSpan.textContent = loc.run;
        runButton.appendChild(runSpan);
        header.appendChild(runButton);
        dotnetOnline.element.classList.add('panel-body');
        panel.appendChild(dotnetOnline.element);
        runButton.hidden = true;
        dotnetOnline.ready.then(function () {
            runButton.hidden = false;
        });
        return panel;
    }
};
var activatedCodeBlocks = [];
function activateCodeBlock(codeBlock, language) {
    var instance = activatedCodeBlocks.find(function (x) { return x.element.parentElement === codeBlock.parentElement; });
    if (instance) {
        return instance.run();
    }
    var _a = wrapCodeBlock(codeBlock), blockWrapper = _a.wrapper, codeBody = _a.body;
    var _b = blockWrapper.getBoundingClientRect(), height = _b.height, top = _b.top;
    blockWrapper.style.cssText = "height: " + height + "px";
    var viewportHeight = document$1.documentElement.clientHeight;
    var targetHeight = Math.min(height + 91, Math.floor(viewportHeight * 0.85));
    var scrollAmount = Math.floor(viewportHeight - top - targetHeight - 12);
    if (scrollAmount < 0) {
        scrollTo(window$1.pageYOffset - scrollAmount, 200);
    }
    instance = new DotNetOnline(language, codeBlock.textContent.trim());
    activatedCodeBlocks.push(instance);
    codeBody.appendChild(instance.element);
    return instance.ready.then(function () {
        blockWrapper.classList.add('interactive');
        blockWrapper.style.cssText = "height: " + targetHeight + "px";
        setTimeout(function () {
            instance.focus();
            codeBlock.style.display = 'none';
        }, 500);
        return instance.run();
    });
}
function wrapCodeBlock(codeBlock) {
    var header = codeBlock.previousElementSibling;
    if (!header.classList.contains('codeHeader')) {
        throw new Error('Code block header is missing.');
    }
    var wrapper = document$1.createElement('div');
    wrapper.classList.add('codeBlock');
    header.parentElement.insertBefore(wrapper, header);
    header.parentElement.removeChild(header);
    wrapper.appendChild(header);
    var body = document$1.createElement('div');
    body.classList.add('codeBody');
    wrapper.appendChild(body);
    codeBlock.parentElement.removeChild(codeBlock);
    body.appendChild(codeBlock);
    return { wrapper: wrapper, header: header, body: body };
}
var DotNetOnline = (function () {
    function DotNetOnline(language, code) {
        var _this = this;
        this.language = language;
        this.code = code;
        this.title = loc.dotnetEditor;
        this.pendingMessages = {};
        this.configured = false;
        this.messageHandler = function (_a) {
            var data = _a.data, origin = _a.origin, source = _a.source;
            if (origin !== dotNetOnlineOrigin || source !== _this.editor.contentWindow || !_this.pendingMessages[data.type]) {
                return;
            }
            var pendingMessage = _this.pendingMessages[data.type];
            delete _this.pendingMessages[data.type];
            clearTimeout(pendingMessage.timeoutId);
            pendingMessage.resolve(data);
        };
        this.themeHandler = function (event) {
            _this.setTheme();
        };
        this.element = document$1.createElement('div');
        this.element.classList.add('dotnet-online');
        this.element.innerHTML = "\n\t\t\t<iframe class=\"editor\" src=\"" + dotNetOnlineOrigin + "/editor?hostOrigin=" + encodeURIComponent(location.origin) + "&waitForConfiguration=true&debug=true\"></iframe>\n\t\t\t<div class=\"c-progress f-indeterminate-local f-progress-large\" role=\"progressbar\" tabindex=\"0\" aria-valuetext=\"" + loc.loading + "\" aria-label=\"" + loc.loading + "\">\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t</div>\n\t\t\t<div class=\"output\">\n\t\t\t\t<div class=\"panel-header\">\n\t\t\t\t\t<h2>" + escape$1(loc.output) + "</h2>\n\t\t\t\t</div>\n\t\t\t\t<pre></pre>\n\t\t\t</div>";
        this.editor = this.element.firstElementChild;
        this.output = this.element.lastElementChild.lastElementChild;
        var loader = this.editor.nextElementSibling;
        var outputPanel = this.element.lastElementChild;
        window$1.addEventListener('message', this.messageHandler);
        window$1.addEventListener('theme-changed', this.themeHandler);
        loader.hidden = false;
        outputPanel.hidden = true;
        this.ready = this.waitForMessage('HostListenerReady')
            .then(function () { return Promise.all([_this.setCode(code), _this.setTheme()]); })
            .then(function () { return _this.showEditor(); })
            .then(function () { loader.hidden = true; outputPanel.hidden = false; });
    }
    DotNetOnline.prototype.waitForMessage = function (type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var timeoutId = setTimeout(function () {
                delete _this.pendingMessages[type];
                reject('timeout');
            }, 30 * 1000);
            _this.pendingMessages[type] = { resolve: resolve, timeoutId: timeoutId };
        });
    };
    DotNetOnline.prototype.setTheme = function () {
        var isDark = document$1.documentElement.classList.contains('theme_night');
        var theme = isDark ? 'vs-dark' : 'vs-light';
        this.editor.contentWindow.postMessage({ type: 'configureMonacoEditor', editorOptions: { theme: theme, scrollBeyondLastLine: true, minimap: { enabled: false } }, theme: theme }, dotNetOnlineOrigin);
        return Promise.resolve();
    };
    DotNetOnline.prototype.setCode = function (code) {
        this.editor.contentWindow.postMessage({ type: 'setSourceCode', sourceCode: code }, dotNetOnlineOrigin);
        return this.waitForMessage('CodeModified');
    };
    DotNetOnline.prototype.showEditor = function () {
        this.editor.contentWindow.postMessage({ type: 'showEditor' }, dotNetOnlineOrigin);
        return this.waitForMessage('MonacoEditorReady');
    };
    DotNetOnline.prototype.focus = function () {
        this.editor.contentWindow.postMessage({ type: 'focusEditor' }, dotNetOnlineOrigin);
        return Promise.resolve();
    };
    DotNetOnline.prototype.run = function () {
        var _this = this;
        if (this.runPromise) {
            return this.runPromise;
        }
        this.output.classList.remove('error');
        this.output.textContent = '';
        var interval = setInterval(function () {
            _this.output.textContent += '.';
            if (_this.output.textContent.length > 3) {
                _this.output.textContent = '';
            }
        }, 200);
        this.editor.contentWindow.postMessage({ type: 'run' }, dotNetOnlineOrigin);
        this.runPromise = this.waitForMessage('RunCompleted')
            .then(function (result) {
            _this.runPromise = null;
            clearInterval(interval);
            switch (result.outcome) {
                case 'CompilationError':
                    _this.output.classList.add('error');
                    _this.output.textContent = result.output.join('\n');
                    break;
                case 'Exception':
                    _this.output.classList.add('error');
                    _this.output.textContent = 'An exception occurred.\n' + result.output.join('\n');
                    break;
                case 'Success':
                    _this.output.classList.remove('error');
                    var output = result.output.join('\n');
                    if (output.length === 0) {
                        output = loc.noOutput;
                    }
                    _this.output.textContent = output;
                    break;
                default:
                    throw new Error("Unexpected run result: " + _this.output);
            }
        });
        this.runPromise.catch(function (reason) {
            clearInterval(interval);
            _this.runPromise = null;
            _this.output.classList.add('error');
            _this.output.textContent = loc.serviceUnavailable;
            console.error(reason);
        });
        return this.runPromise;
    };
    DotNetOnline.prototype.dispose = function () {
        window$1.removeEventListener('message', this.messageHandler);
        window$1.removeEventListener('theme-changed', this.themeHandler);
    };
    return DotNetOnline;
}());

var blockName$1 = 'api-search-quick-filter';
function createQuickFilter() {
    var blockDiv = document$1.createElement('div');
    blockDiv.classList.add(blockName$1);
    blockDiv.setAttribute('ms.cmpnm', blockName$1);
    blockDiv.setAttribute(contentAttrs.name, blockName$1);
    var heading = document$1.createElement('h2');
    heading.textContent = loc.quickfilters;
    heading.classList.add('api-search-heading');
    blockDiv.appendChild(heading);
    getPlatform().then(function (platform) {
        var columns = platformConfig[platformId].quickFilters;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            var columnDiv = document$1.createElement('div');
            blockDiv.appendChild(columnDiv);
            var _loop_1 = function (moniker) {
                var pkg = platform.packagesByMoniker[moniker];
                if (!pkg) {
                    console.warn("Quick Filter: no package with moniker \"" + moniker + "\" was found.");
                    return "continue";
                }
                var button = document$1.createElement('button');
                button.innerHTML = breakText(pkg.displayName);
                button.addEventListener('click', function (event) {
                    jsllReady.then(function (awa) { return awa.ct.capturePageAction(button, {
                        actionType: awa.actionType.OTHER,
                        behavior: awa.behavior.OTHER,
                        content: {
                            event: 'api-browser-quickfilter',
                            value: pkg.moniker
                        }
                    }); });
                    wedcs('ms.quickfilter', pkg.moniker);
                    setMoniker(pkg.moniker);
                });
                columnDiv.appendChild(button);
            };
            for (var _a = 0, column_1 = column; _a < column_1.length; _a++) {
                var moniker = column_1[_a];
                _loop_1(moniker);
            }
        }
    });
    return blockDiv;
}

function apiBrowserPage() {
    if (msDocs.data.pageTemplate !== 'ApiBrowserPage') {
        return;
    }
    handleMonikerChange();
    initApiSearch();
    var contentDiv = document$1.querySelector('.content');
    var searchFieldContainer = document$1.createElement('div');
    searchFieldContainer.classList.add('api-browser-search-field-container');
    contentDiv.appendChild(searchFieldContainer);
    var allApis = true;
    searchFieldContainer.appendChild(createMonikerPicker(allApis));
    searchFieldContainer.appendChild(createSearchField());
    searchFieldContainer.appendChild(createQuickFilter());
    var resultsContainer = document$1.createElement('div');
    resultsContainer.classList.add('api-browser-results-container');
    contentDiv.appendChild(resultsContainer);
    var renderHeading = true;
    addResultsContainer(resultsContainer, renderHeading);
    var updateStatus = function () {
        var method = getMoniker() === '' && getTerm() === '' ? 'remove' : 'add';
        document$1.documentElement.classList[method]('has-moniker-or-term');
    };
    updateStatus();
    window.addEventListener(monikerChangedEvent, updateStatus);
    window.addEventListener(apiSearchTermChangedEvent, updateStatus);
}

function isExperimentEnabled(name) {
    if (location.hostname === 'localhost') {
        return Promise.resolve(false);
    }
    return fetch('/_api/experiment', { mode: 'cors' })
        .then(function (res) { return res.ok ? res.json().then(function (_a) {
        var features = _a.features;
        return features.indexOf(name) !== -1;
    }) : false; })
        .catch(function () { return false; });
}

function productFeedbackExperiment() {
    var developerCommunityLink = document$1.querySelector('.product-feedback a[href^="https://developercommunity.visualstudio.com"]');
    if (developerCommunityLink) {
        developerCommunityLink.firstElementChild.textContent = loc.reportAProductIssue;
    }
    var gitterLink = document$1.querySelector('.product-feedback a[href^="https://gitter.im/Microsoft/extendvs"]');
    if (gitterLink !== null) {
        gitterLink.firstElementChild.textContent = loc.askAQuestion;
    }
}
isExperimentEnabled('f25d62fd-8225-4a').then(function (enabled) {
    if (!enabled) {
        return;
    }
    $$1(productFeedbackExperiment);
});

function impressum() {
    var url = {
        'de-de': '//www.microsoft.com/de-de/corporate/rechtliche-hinweise/impressum.aspx',
        'de-ch': '//www.microsoft.com/switzerland/microsoft-schweiz/de/unternehmen/impressum.mspx',
        'de-at': '//www.microsoft.com/de-at/unternehmen/rechtliches/impressum-corp.aspx'
    }[msDocs.data.userLocale];
    if (url === undefined) {
        return;
    }
    document$1.getElementById('impressum-link').href = url;
    document$1.getElementById('impressum-section').hidden = false;
}

if (msDocs.data.pageTemplate === "Home") {
    $(function () {
        var dirLink = document.querySelector(".home-greeting-container a[href='#docs-directory']");
        dirLink.addEventListener("click", function (e) {
            e.preventDefault();
            var directoryOffset = document.querySelector("#docs-directory").getBoundingClientRect().top;
            scrollTo(directoryOffset, 500);
        });
    });
}

if (msDocs.data.clicktale) {
    Promise.all([cookieConsent, contentLoaded])
        .then(function () { return loadLibrary('https://cdnssl.clicktale.net/www32/ptc/78a0ae88-af64-436a-9729-c30d90de7d5e.js'); });
}
if (getMeta('twitterWidgets') === 'true') {
    Promise.all([cookieConsent, contentLoaded])
        .then(function () { return loadLibrary('https://platform.twitter.com/widgets.js'); });
}

var isArchived = getMeta('is_archived') === 'true';
function showArchiveDisclaimer() {
    if (isArchived) {
        showDisclaimer(loc['disclaimer.archive']);
    }
}

var ratingPageTemplates = ['Conceptual', 'LandingPage', 'NamespaceListPage', 'Reference', 'Rest', 'Tutorial'];
if (!isArchived && ratingPageTemplates.indexOf(msDocs.data.pageTemplate) !== -1) {
    cookieConsent.then(function () {
        var userLocaleMetaTag = document$1.createElement('meta');
        userLocaleMetaTag.name = 'rating.locale';
        userLocaleMetaTag.content = msDocs.data.userLocale;
        document$1.head.appendChild(userLocaleMetaTag);
        var environment = location.hostname === 'docs.microsoft.com' || location.hostname === 'docs.azure.cn' ? 'prod' : 'int';
        var openFeedbackOptions = {
            environment: environment,
            containerElementId: 'openFeedbackContainer',
            siteNameMetaName: 'site_name',
            documentMetaName: 'document_id',
            localeMetaName: userLocaleMetaTag.name,
            responsiveRule: '(min-width: 1024px)',
            propertyBag: {}
        };
        var assetId = getMeta('ms.assetid');
        if (assetId !== undefined) {
            openFeedbackOptions.propertyBag['ms.assetid'] = assetId;
        }
        window.openFeedbackOptions = openFeedbackOptions;
        loadLibrary('/_chrome/rating/open-rating.entry.min.js');
    });
}

msDocs.loc = loc;
msDocs.data.rtl = rtlDictionary;
msDocs.data.interactiveTypes = interactiveTypes;
msDocs.functions.showDisclaimer = showDisclaimer;
msDocs.data.jsllReady = jsllReady;
msDocs.data.cookieConsent = cookieConsent;
msDocs.data.isArchived = isArchived;
msDocs.functions.wedcs = wedcs;
msDocs.functions.notifyContentUpdated = notifyContentUpdated;
msDocs.functions.escape = escape$1;
msDocs.functions.cookies = cookies;
msDocs.functions.makeCodeBlocks = makeCodeBlocks;
msDocs.functions.loadLibrary = loadLibrary;
msDocs.functions.replaceLocaleInPath = replaceLocaleInPath;
msDocs.functions.setLocaleCookie = setLocaleCookie;
msDocs.functions.parseQueryString = parseQueryString;
installGetMeta();
detectFeatures();
$$1(detectHighContrast);
ie10MobileFix();
$$1(fixDate);
pluginDomReadyShield();
pluginLALD();
pluginAddState();
pluginIfThen();
themeSwitcher();
$$1(sharing);
setDocumentLocale();
installGetParam();
installProtecedStorage();
initUhf();
createToc();
$$1(setupToc);
if (pageSupportsMoniker(getMoniker())) {
    $$1(filterContentByMoniker);
}
else {
    $$1(renderInTopicTOC);
}
$$1(displayMonikerFallbackMessage);
$$1(showArchiveDisclaimer);
$$1(affix);
$$1(initTabs);
track();
interceptCopy();
$$1(apiBrowserPage);
$$1(impressum);
initCookieConsent();
$$1(ensureWbr);

}());
