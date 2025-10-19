// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"3dtlh":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "4b8ea06834df32e0";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"gH3Lb":[function(require,module,exports,__globalThis) {
var _colyseusJs = require("colyseus.js");
const client = new (0, _colyseusJs.Client)("ws://localhost:2567");
let room = null;
// Phase display management
function showPhase(phaseName) {
    // Hide all phases
    document.querySelectorAll('.phase').forEach((phase)=>{
        phase.classList.remove('active');
    });
    // Show the active phase
    const activePhase = document.getElementById(phaseName + 'Phase');
    if (activePhase) activePhase.classList.add('active');
}
// Connection and basic setup
async function connectToGame() {
    try {
        document.getElementById('status').textContent = "Connecting...";
        room = await client.joinOrCreate("writing_room");
        document.getElementById('status').textContent = `Connected to room: ${room.id}`;
        // Set up room listeners
        setupRoomListeners();
        // Start in lobby phase
        showPhase('lobby');
        updatePlayerList();
    } catch (error) {
        document.getElementById('status').textContent = "Connection failed";
        console.error("Connection failed:", error);
    }
}
function setupRoomListeners() {
    // Phase changes
    room.onMessage("phase_changed", (data)=>{
        console.log("Phase changed to:", data.phase);
        showPhase(data.phase);
        if (data.phase === "writing" && data.prompt) document.getElementById('prompt').textContent = data.prompt;
    });
    // Player management
    room.onMessage("player_joined", (data)=>{
        console.log("Player joined:", data.playerName);
        updatePlayerList();
    });
    // Time updates
    room.onMessage("time_update", (data)=>{
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            // Format as MM:SS
            const formattedTime = `${data.minutes}:${data.seconds < 10 ? '0' : ''}${data.seconds}`;
            timerElement.textContent = `Time remaining: ${formattedTime}`;
            // Optional: Add visual warning when time is low
            if (data.timeRemaining < 30) {
                timerElement.style.color = 'red';
                timerElement.style.fontWeight = 'bold';
            }
        }
    });
    // State changes
    room.onStateChange((state)=>{
        console.log("State updated:", state);
        updatePlayerList();
    });
}
function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    if (room && room.state.players) room.state.players.forEach((player, playerId)=>{
        const playerDiv = document.createElement('div');
        playerDiv.className = `player ${player.isReady ? 'ready' : ''}`;
        playerDiv.textContent = `${player.name} ${player.isReady ? "\u2713 Ready" : '...'}`;
        playerList.appendChild(playerDiv);
    });
}
// Button handlers
document.getElementById('readyBtn').addEventListener('click', ()=>{
    room.send("player_ready");
    document.getElementById('readyBtn').textContent = "Waiting for others...";
    document.getElementById('readyBtn').disabled = true;
});
// Start the connection when page loads
connectToGame();

},{"colyseus.js":"l6SoD"}],"l6SoD":[function(require,module,exports,__globalThis) {
var Buffer = require("62394090e3d8ae5f").Buffer;
// colyseus.js@0.16.21 (@colyseus/schema 3.0.61)
(function(global, factory) {
    factory(exports);
})(this, function(exports1) {
    'use strict';
    function _mergeNamespaces(n, m) {
        m.forEach(function(e) {
            e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function(k) {
                if (k !== 'default' && !(k in n)) {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function() {
                            return e[k];
                        }
                    });
                }
            });
        });
        return Object.freeze(n);
    }
    //
    // Polyfills for legacy environments
    //
    /*
     * Support Android 4.4.x
     */ if (!ArrayBuffer.isView) ArrayBuffer.isView = (a)=>{
        return a !== null && typeof a === 'object' && a.buffer instanceof ArrayBuffer;
    };
    // Define globalThis if not available.
    // https://github.com/colyseus/colyseus.js/issues/86
    if (typeof globalThis === "undefined" && typeof window !== "undefined") // @ts-ignore
    window['globalThis'] = window;
    // Cocos Creator does not provide "FormData"
    // Define a dummy implementation so it doesn't crash
    if (typeof FormData === "undefined") // @ts-ignore
    globalThis['FormData'] = class {
    };
    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    }
    typeof SuppressedError === "function" && SuppressedError;
    var CloseCode;
    (function(CloseCode) {
        CloseCode[CloseCode["CONSENTED"] = 4000] = "CONSENTED";
        CloseCode[CloseCode["DEVMODE_RESTART"] = 4010] = "DEVMODE_RESTART";
    })(CloseCode || (CloseCode = {}));
    class ServerError extends Error {
        constructor(code, message){
            super(message);
            this.name = "ServerError";
            this.code = code;
        }
    }
    class AbortError extends Error {
        constructor(message){
            super(message);
            this.name = "AbortError";
        }
    }
    function getDefaultExportFromCjs(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }
    var umd$1 = {
        exports: {}
    };
    var umd = umd$1.exports;
    var hasRequiredUmd;
    function requireUmd() {
        if (hasRequiredUmd) return umd$1.exports;
        hasRequiredUmd = 1;
        (function(module, exports1) {
            (function(global, factory) {
                factory(exports1);
            })(umd, function(exports1) {
                const SWITCH_TO_STRUCTURE = 255; // (decoding collides with DELETE_AND_ADD + fieldIndex = 63)
                const TYPE_ID = 213;
                /**
    		     * Encoding Schema field operations.
    		     */ exports1.OPERATION = void 0;
                (function(OPERATION) {
                    OPERATION[OPERATION["ADD"] = 128] = "ADD";
                    OPERATION[OPERATION["REPLACE"] = 0] = "REPLACE";
                    OPERATION[OPERATION["DELETE"] = 64] = "DELETE";
                    OPERATION[OPERATION["DELETE_AND_MOVE"] = 96] = "DELETE_AND_MOVE";
                    OPERATION[OPERATION["MOVE_AND_ADD"] = 160] = "MOVE_AND_ADD";
                    OPERATION[OPERATION["DELETE_AND_ADD"] = 192] = "DELETE_AND_ADD";
                    /**
    		         * Collection operations
    		         */ OPERATION[OPERATION["CLEAR"] = 10] = "CLEAR";
                    /**
    		         * ArraySchema operations
    		         */ OPERATION[OPERATION["REVERSE"] = 15] = "REVERSE";
                    OPERATION[OPERATION["MOVE"] = 32] = "MOVE";
                    OPERATION[OPERATION["DELETE_BY_REFID"] = 33] = "DELETE_BY_REFID";
                    OPERATION[OPERATION["ADD_BY_REFID"] = 129] = "ADD_BY_REFID";
                })(exports1.OPERATION || (exports1.OPERATION = {}));
                Symbol.metadata ??= Symbol.for("Symbol.metadata");
                const $track = "~track";
                const $encoder = "~encoder";
                const $decoder = "~decoder";
                const $filter = "~filter";
                const $getByIndex = "~getByIndex";
                const $deleteByIndex = "~deleteByIndex";
                /**
    		     * Used to hold ChangeTree instances whitin the structures
    		     */ const $changes = '~changes';
                /**
    		     * Used to keep track of the type of the child elements of a collection
    		     * (MapSchema, ArraySchema, etc.)
    		     */ const $childType = '~childType';
                /**
    		     * Optional "discard" method for custom types (ArraySchema)
    		     * (Discards changes for next serialization)
    		     */ const $onEncodeEnd = '~onEncodeEnd';
                /**
    		     * When decoding, this method is called after the instance is fully decoded
    		     */ const $onDecodeEnd = "~onDecodeEnd";
                /**
    		     * Metadata
    		     */ const $descriptors = "~descriptors";
                const $numFields = "~__numFields";
                const $refTypeFieldIndexes = "~__refTypeFieldIndexes";
                const $viewFieldIndexes = "~__viewFieldIndexes";
                const $fieldIndexesByViewTag = "$__fieldIndexesByViewTag";
                /**
    		     * Copyright (c) 2018 Endel Dreyer
    		     * Copyright (c) 2014 Ion Drive Software Ltd.
    		     *
    		     * Permission is hereby granted, free of charge, to any person obtaining a copy
    		     * of this software and associated documentation files (the "Software"), to deal
    		     * in the Software without restriction, including without limitation the rights
    		     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    		     * copies of the Software, and to permit persons to whom the Software is
    		     * furnished to do so, subject to the following conditions:
    		     *
    		     * The above copyright notice and this permission notice shall be included in all
    		     * copies or substantial portions of the Software.
    		     *
    		     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    		     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    		     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    		     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    		     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    		     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    		     * SOFTWARE
    		     */ /**
    		     * msgpack implementation highly based on notepack.io
    		     * https://github.com/darrachequesne/notepack
    		     */ let textEncoder;
                // @ts-ignore
                try {
                    textEncoder = new TextEncoder();
                } catch (e) {}
                const _convoBuffer$1 = new ArrayBuffer(8);
                const _int32$1 = new Int32Array(_convoBuffer$1);
                const _float32$1 = new Float32Array(_convoBuffer$1);
                const _float64$1 = new Float64Array(_convoBuffer$1);
                const _int64$1 = new BigInt64Array(_convoBuffer$1);
                const hasBufferByteLength = typeof Buffer !== 'undefined' && Buffer.byteLength;
                const utf8Length = hasBufferByteLength ? Buffer.byteLength // node
                 : function(str, _) {
                    var c = 0, length = 0;
                    for(var i = 0, l = str.length; i < l; i++){
                        c = str.charCodeAt(i);
                        if (c < 0x80) length += 1;
                        else if (c < 0x800) length += 2;
                        else if (c < 0xd800 || c >= 0xe000) length += 3;
                        else {
                            i++;
                            length += 4;
                        }
                    }
                    return length;
                };
                function utf8Write(view, str, it) {
                    var c = 0;
                    for(var i = 0, l = str.length; i < l; i++){
                        c = str.charCodeAt(i);
                        if (c < 0x80) view[it.offset++] = c;
                        else if (c < 0x800) {
                            view[it.offset] = 0xc0 | c >> 6;
                            view[it.offset + 1] = 0x80 | c & 0x3f;
                            it.offset += 2;
                        } else if (c < 0xd800 || c >= 0xe000) {
                            view[it.offset] = 0xe0 | c >> 12;
                            view[it.offset + 1] = 0x80 | c >> 6 & 0x3f;
                            view[it.offset + 2] = 0x80 | c & 0x3f;
                            it.offset += 3;
                        } else {
                            i++;
                            c = 0x10000 + ((c & 0x3ff) << 10 | str.charCodeAt(i) & 0x3ff);
                            view[it.offset] = 0xf0 | c >> 18;
                            view[it.offset + 1] = 0x80 | c >> 12 & 0x3f;
                            view[it.offset + 2] = 0x80 | c >> 6 & 0x3f;
                            view[it.offset + 3] = 0x80 | c & 0x3f;
                            it.offset += 4;
                        }
                    }
                }
                function int8$1(bytes, value, it) {
                    bytes[it.offset++] = value & 255;
                }
                function uint8$1(bytes, value, it) {
                    bytes[it.offset++] = value & 255;
                }
                function int16$1(bytes, value, it) {
                    bytes[it.offset++] = value & 255;
                    bytes[it.offset++] = value >> 8 & 255;
                }
                function uint16$1(bytes, value, it) {
                    bytes[it.offset++] = value & 255;
                    bytes[it.offset++] = value >> 8 & 255;
                }
                function int32$1(bytes, value, it) {
                    bytes[it.offset++] = value & 255;
                    bytes[it.offset++] = value >> 8 & 255;
                    bytes[it.offset++] = value >> 16 & 255;
                    bytes[it.offset++] = value >> 24 & 255;
                }
                function uint32$1(bytes, value, it) {
                    const b4 = value >> 24;
                    const b3 = value >> 16;
                    const b2 = value >> 8;
                    const b1 = value;
                    bytes[it.offset++] = b1 & 255;
                    bytes[it.offset++] = b2 & 255;
                    bytes[it.offset++] = b3 & 255;
                    bytes[it.offset++] = b4 & 255;
                }
                function int64$1(bytes, value, it) {
                    const high = Math.floor(value / Math.pow(2, 32));
                    const low = value >>> 0;
                    uint32$1(bytes, low, it);
                    uint32$1(bytes, high, it);
                }
                function uint64$1(bytes, value, it) {
                    const high = value / Math.pow(2, 32) >> 0;
                    const low = value >>> 0;
                    uint32$1(bytes, low, it);
                    uint32$1(bytes, high, it);
                }
                function bigint64$1(bytes, value, it) {
                    _int64$1[0] = BigInt.asIntN(64, value);
                    int32$1(bytes, _int32$1[0], it);
                    int32$1(bytes, _int32$1[1], it);
                }
                function biguint64$1(bytes, value, it) {
                    _int64$1[0] = BigInt.asIntN(64, value);
                    int32$1(bytes, _int32$1[0], it);
                    int32$1(bytes, _int32$1[1], it);
                }
                function float32$1(bytes, value, it) {
                    _float32$1[0] = value;
                    int32$1(bytes, _int32$1[0], it);
                }
                function float64$1(bytes, value, it) {
                    _float64$1[0] = value;
                    int32$1(bytes, _int32$1[0], it);
                    int32$1(bytes, _int32$1[1], it);
                }
                function boolean$1(bytes, value, it) {
                    bytes[it.offset++] = value ? 1 : 0; // uint8
                }
                function string$1(bytes, value, it) {
                    // encode `null` strings as empty.
                    if (!value) value = "";
                    let length = utf8Length(value, "utf8");
                    let size = 0;
                    // fixstr
                    if (length < 0x20) {
                        bytes[it.offset++] = length | 0xa0;
                        size = 1;
                    } else if (length < 0x100) {
                        bytes[it.offset++] = 0xd9;
                        bytes[it.offset++] = length % 255;
                        size = 2;
                    } else if (length < 0x10000) {
                        bytes[it.offset++] = 0xda;
                        uint16$1(bytes, length, it);
                        size = 3;
                    } else if (length < 0x100000000) {
                        bytes[it.offset++] = 0xdb;
                        uint32$1(bytes, length, it);
                        size = 5;
                    } else throw new Error('String too long');
                    utf8Write(bytes, value, it);
                    return size + length;
                }
                function number$1(bytes, value, it) {
                    if (isNaN(value)) return number$1(bytes, 0, it);
                    else if (!isFinite(value)) return number$1(bytes, value > 0 ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER, it);
                    else if (value !== (value | 0)) {
                        if (Math.abs(value) <= 3.4028235e+38) {
                            _float32$1[0] = value;
                            if (Math.abs(Math.abs(_float32$1[0]) - Math.abs(value)) < 1e-4) {
                                // now we know value is in range for f32 and has acceptable precision for f32
                                bytes[it.offset++] = 0xca;
                                float32$1(bytes, value, it);
                                return 5;
                            }
                        }
                        bytes[it.offset++] = 0xcb;
                        float64$1(bytes, value, it);
                        return 9;
                    }
                    if (value >= 0) {
                        // positive fixnum
                        if (value < 0x80) {
                            bytes[it.offset++] = value & 255; // uint8
                            return 1;
                        }
                        // uint 8
                        if (value < 0x100) {
                            bytes[it.offset++] = 0xcc;
                            bytes[it.offset++] = value & 255; // uint8
                            return 2;
                        }
                        // uint 16
                        if (value < 0x10000) {
                            bytes[it.offset++] = 0xcd;
                            uint16$1(bytes, value, it);
                            return 3;
                        }
                        // uint 32
                        if (value < 0x100000000) {
                            bytes[it.offset++] = 0xce;
                            uint32$1(bytes, value, it);
                            return 5;
                        }
                        // uint 64
                        bytes[it.offset++] = 0xcf;
                        uint64$1(bytes, value, it);
                        return 9;
                    } else {
                        // negative fixnum
                        if (value >= -32) {
                            bytes[it.offset++] = 0xe0 | value + 0x20;
                            return 1;
                        }
                        // int 8
                        if (value >= -128) {
                            bytes[it.offset++] = 0xd0;
                            int8$1(bytes, value, it);
                            return 2;
                        }
                        // int 16
                        if (value >= -32768) {
                            bytes[it.offset++] = 0xd1;
                            int16$1(bytes, value, it);
                            return 3;
                        }
                        // int 32
                        if (value >= -2147483648) {
                            bytes[it.offset++] = 0xd2;
                            int32$1(bytes, value, it);
                            return 5;
                        }
                        // int 64
                        bytes[it.offset++] = 0xd3;
                        int64$1(bytes, value, it);
                        return 9;
                    }
                }
                const encode = {
                    int8: int8$1,
                    uint8: uint8$1,
                    int16: int16$1,
                    uint16: uint16$1,
                    int32: int32$1,
                    uint32: uint32$1,
                    int64: int64$1,
                    uint64: uint64$1,
                    bigint64: bigint64$1,
                    biguint64: biguint64$1,
                    float32: float32$1,
                    float64: float64$1,
                    boolean: boolean$1,
                    string: string$1,
                    number: number$1,
                    utf8Write,
                    utf8Length
                };
                /**
    		     * Copyright (c) 2018 Endel Dreyer
    		     * Copyright (c) 2014 Ion Drive Software Ltd.
    		     *
    		     * Permission is hereby granted, free of charge, to any person obtaining a copy
    		     * of this software and associated documentation files (the "Software"), to deal
    		     * in the Software without restriction, including without limitation the rights
    		     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    		     * copies of the Software, and to permit persons to whom the Software is
    		     * furnished to do so, subject to the following conditions:
    		     *
    		     * The above copyright notice and this permission notice shall be included in all
    		     * copies or substantial portions of the Software.
    		     *
    		     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    		     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    		     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    		     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    		     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    		     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    		     * SOFTWARE
    		     */ // force little endian to facilitate decoding on multiple implementations
                const _convoBuffer = new ArrayBuffer(8);
                const _int32 = new Int32Array(_convoBuffer);
                const _float32 = new Float32Array(_convoBuffer);
                const _float64 = new Float64Array(_convoBuffer);
                const _uint64 = new BigUint64Array(_convoBuffer);
                const _int64 = new BigInt64Array(_convoBuffer);
                function utf8Read(bytes, it, length) {
                    var string = '', chr = 0;
                    for(var i = it.offset, end = it.offset + length; i < end; i++){
                        var byte = bytes[i];
                        if ((byte & 0x80) === 0x00) {
                            string += String.fromCharCode(byte);
                            continue;
                        }
                        if ((byte & 0xe0) === 0xc0) {
                            string += String.fromCharCode((byte & 0x1f) << 6 | bytes[++i] & 0x3f);
                            continue;
                        }
                        if ((byte & 0xf0) === 0xe0) {
                            string += String.fromCharCode((byte & 0x0f) << 12 | (bytes[++i] & 0x3f) << 6 | (bytes[++i] & 0x3f) << 0);
                            continue;
                        }
                        if ((byte & 0xf8) === 0xf0) {
                            chr = (byte & 0x07) << 18 | (bytes[++i] & 0x3f) << 12 | (bytes[++i] & 0x3f) << 6 | (bytes[++i] & 0x3f) << 0;
                            if (chr >= 0x010000) {
                                chr -= 0x010000;
                                string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
                            } else string += String.fromCharCode(chr);
                            continue;
                        }
                        console.error('Invalid byte ' + byte.toString(16));
                    // (do not throw error to avoid server/client from crashing due to hack attemps)
                    // throw new Error('Invalid byte ' + byte.toString(16));
                    }
                    it.offset += length;
                    return string;
                }
                function int8(bytes, it) {
                    return uint8(bytes, it) << 24 >> 24;
                }
                function uint8(bytes, it) {
                    return bytes[it.offset++];
                }
                function int16(bytes, it) {
                    return uint16(bytes, it) << 16 >> 16;
                }
                function uint16(bytes, it) {
                    return bytes[it.offset++] | bytes[it.offset++] << 8;
                }
                function int32(bytes, it) {
                    return bytes[it.offset++] | bytes[it.offset++] << 8 | bytes[it.offset++] << 16 | bytes[it.offset++] << 24;
                }
                function uint32(bytes, it) {
                    return int32(bytes, it) >>> 0;
                }
                function float32(bytes, it) {
                    _int32[0] = int32(bytes, it);
                    return _float32[0];
                }
                function float64(bytes, it) {
                    _int32[0] = int32(bytes, it);
                    _int32[1] = int32(bytes, it);
                    return _float64[0];
                }
                function int64(bytes, it) {
                    const low = uint32(bytes, it);
                    const high = int32(bytes, it) * Math.pow(2, 32);
                    return high + low;
                }
                function uint64(bytes, it) {
                    const low = uint32(bytes, it);
                    const high = uint32(bytes, it) * Math.pow(2, 32);
                    return high + low;
                }
                function bigint64(bytes, it) {
                    _int32[0] = int32(bytes, it);
                    _int32[1] = int32(bytes, it);
                    return _int64[0];
                }
                function biguint64(bytes, it) {
                    _int32[0] = int32(bytes, it);
                    _int32[1] = int32(bytes, it);
                    return _uint64[0];
                }
                function boolean(bytes, it) {
                    return uint8(bytes, it) > 0;
                }
                function string(bytes, it) {
                    const prefix = bytes[it.offset++];
                    let length;
                    if (prefix < 0xc0) // fixstr
                    length = prefix & 0x1f;
                    else if (prefix === 0xd9) length = uint8(bytes, it);
                    else if (prefix === 0xda) length = uint16(bytes, it);
                    else if (prefix === 0xdb) length = uint32(bytes, it);
                    return utf8Read(bytes, it, length);
                }
                function number(bytes, it) {
                    const prefix = bytes[it.offset++];
                    if (prefix < 0x80) // positive fixint
                    return prefix;
                    else if (prefix === 0xca) // float 32
                    return float32(bytes, it);
                    else if (prefix === 0xcb) // float 64
                    return float64(bytes, it);
                    else if (prefix === 0xcc) // uint 8
                    return uint8(bytes, it);
                    else if (prefix === 0xcd) // uint 16
                    return uint16(bytes, it);
                    else if (prefix === 0xce) // uint 32
                    return uint32(bytes, it);
                    else if (prefix === 0xcf) // uint 64
                    return uint64(bytes, it);
                    else if (prefix === 0xd0) // int 8
                    return int8(bytes, it);
                    else if (prefix === 0xd1) // int 16
                    return int16(bytes, it);
                    else if (prefix === 0xd2) // int 32
                    return int32(bytes, it);
                    else if (prefix === 0xd3) // int 64
                    return int64(bytes, it);
                    else if (prefix > 0xdf) // negative fixint
                    return (0xff - prefix + 1) * -1;
                }
                function stringCheck(bytes, it) {
                    const prefix = bytes[it.offset];
                    return(// fixstr
                    prefix < 0xc0 && prefix > 0xa0 || // str 8
                    prefix === 0xd9 || // str 16
                    prefix === 0xda || // str 32
                    prefix === 0xdb);
                }
                const decode = {
                    utf8Read,
                    int8,
                    uint8,
                    int16,
                    uint16,
                    int32,
                    uint32,
                    float32,
                    float64,
                    int64,
                    uint64,
                    bigint64,
                    biguint64,
                    boolean,
                    string,
                    number,
                    stringCheck
                };
                const registeredTypes = {};
                const identifiers = new Map();
                function registerType(identifier, definition) {
                    if (definition.constructor) {
                        identifiers.set(definition.constructor, identifier);
                        registeredTypes[identifier] = definition;
                    }
                    if (definition.encode) encode[identifier] = definition.encode;
                    if (definition.decode) decode[identifier] = definition.decode;
                }
                function getType(identifier) {
                    return registeredTypes[identifier];
                }
                function defineCustomTypes(types) {
                    for(const identifier in types)registerType(identifier, types[identifier]);
                    return (t)=>type(t);
                }
                class TypeContext {
                    /**
    		         * For inheritance support
    		         * Keeps track of which classes extends which. (parent -> children)
    		         */ static{
                        this.inheritedTypes = new Map();
                    }
                    static{
                        this.cachedContexts = new Map();
                    }
                    static register(target) {
                        const parent = Object.getPrototypeOf(target);
                        if (parent !== Schema) {
                            let inherits = TypeContext.inheritedTypes.get(parent);
                            if (!inherits) {
                                inherits = new Set();
                                TypeContext.inheritedTypes.set(parent, inherits);
                            }
                            inherits.add(target);
                        }
                    }
                    static cache(rootClass) {
                        let context = TypeContext.cachedContexts.get(rootClass);
                        if (!context) {
                            context = new TypeContext(rootClass);
                            TypeContext.cachedContexts.set(rootClass, context);
                        }
                        return context;
                    }
                    constructor(rootClass){
                        this.types = {};
                        this.schemas = new Map();
                        this.hasFilters = false;
                        this.parentFiltered = {};
                        if (rootClass) this.discoverTypes(rootClass);
                    }
                    has(schema) {
                        return this.schemas.has(schema);
                    }
                    get(typeid) {
                        return this.types[typeid];
                    }
                    add(schema, typeid = this.schemas.size) {
                        // skip if already registered
                        if (this.schemas.has(schema)) return false;
                        this.types[typeid] = schema;
                        //
                        // Workaround to allow using an empty Schema (with no `@type()` fields)
                        //
                        if (schema[Symbol.metadata] === undefined) Metadata.initialize(schema);
                        this.schemas.set(schema, typeid);
                        return true;
                    }
                    getTypeId(klass) {
                        return this.schemas.get(klass);
                    }
                    discoverTypes(klass, parentType, parentIndex, parentHasViewTag) {
                        if (parentHasViewTag) this.registerFilteredByParent(klass, parentType, parentIndex);
                        // skip if already registered
                        if (!this.add(klass)) return;
                        // add classes inherited from this base class
                        TypeContext.inheritedTypes.get(klass)?.forEach((child)=>{
                            this.discoverTypes(child, parentType, parentIndex, parentHasViewTag);
                        });
                        // add parent classes
                        let parent = klass;
                        while((parent = Object.getPrototypeOf(parent)) && parent !== Schema && // stop at root (Schema)
                        parent !== Function.prototype // stop at root (non-Schema)
                        )this.discoverTypes(parent);
                        const metadata = klass[Symbol.metadata] ??= {};
                        // if any schema/field has filters, mark "context" as having filters.
                        if (metadata[$viewFieldIndexes]) this.hasFilters = true;
                        for(const fieldIndex in metadata){
                            const index = fieldIndex;
                            const fieldType = metadata[index].type;
                            const fieldHasViewTag = metadata[index].tag !== undefined;
                            if (typeof fieldType === "string") continue;
                            if (typeof fieldType === "function") this.discoverTypes(fieldType, klass, index, parentHasViewTag || fieldHasViewTag);
                            else {
                                const type = Object.values(fieldType)[0];
                                // skip primitive types
                                if (typeof type === "string") continue;
                                this.discoverTypes(type, klass, index, parentHasViewTag || fieldHasViewTag);
                            }
                        }
                    }
                    /**
    		         * Keep track of which classes have filters applied.
    		         * Format: `${typeid}-${parentTypeid}-${parentIndex}`
    		         */ registerFilteredByParent(schema, parentType, parentIndex) {
                        const typeid = this.schemas.get(schema) ?? this.schemas.size;
                        let key = `${typeid}`;
                        if (parentType) key += `-${this.schemas.get(parentType)}`;
                        key += `-${parentIndex}`;
                        this.parentFiltered[key] = true;
                    }
                    debug() {
                        let parentFiltered = "";
                        for(const key in this.parentFiltered){
                            const keys = key.split("-").map(Number);
                            const fieldIndex = keys.pop();
                            parentFiltered += `\n\t\t`;
                            parentFiltered += `${key}: ${keys.reverse().map((id, i)=>{
                                const klass = this.types[id];
                                const metadata = klass[Symbol.metadata];
                                let txt = klass.name;
                                if (i === 0) txt += `[${metadata[fieldIndex].name}]`;
                                return `${txt}`;
                            }).join(" -> ")}`;
                        }
                        return `TypeContext ->\n` + `\tSchema types: ${this.schemas.size}\n` + `\thasFilters: ${this.hasFilters}\n` + `\tparentFiltered:${parentFiltered}`;
                    }
                }
                function getNormalizedType(type) {
                    if (Array.isArray(type)) return {
                        array: getNormalizedType(type[0])
                    };
                    else if (typeof type['type'] !== "undefined") return type['type'];
                    else if (isTSEnum(type)) // Detect TS Enum type (either string or number)
                    return Object.keys(type).every((key)=>typeof type[key] === "string") ? "string" : "number";
                    else if (typeof type === "object" && type !== null) {
                        // Handle collection types
                        const collectionType = Object.keys(type).find((k)=>registeredTypes[k] !== undefined);
                        if (collectionType) {
                            type[collectionType] = getNormalizedType(type[collectionType]);
                            return type;
                        }
                    }
                    return type;
                }
                function isTSEnum(_enum) {
                    if (typeof _enum === 'function' && _enum[Symbol.metadata]) return false;
                    const keys = Object.keys(_enum);
                    const numericFields = keys.filter((k)=>/\d+/.test(k));
                    // Check for number enum (has numeric keys and reverse mapping)
                    if (numericFields.length > 0 && numericFields.length === keys.length / 2 && _enum[_enum[numericFields[0]]] == numericFields[0]) return true;
                    // Check for string enum (all values are strings and keys match values)
                    if (keys.length > 0 && keys.every((key)=>typeof _enum[key] === 'string' && _enum[key] === key)) return true;
                    return false;
                }
                const Metadata = {
                    addField (metadata, index, name, type, descriptor) {
                        if (index > 64) throw new Error(`Can't define field '${name}'.\nSchema instances may only have up to 64 fields.`);
                        metadata[index] = Object.assign(metadata[index] || {}, {
                            type: getNormalizedType(type),
                            index,
                            name
                        });
                        // create "descriptors" map
                        Object.defineProperty(metadata, $descriptors, {
                            value: metadata[$descriptors] || {},
                            enumerable: false,
                            configurable: true
                        });
                        if (descriptor) {
                            // for encoder
                            metadata[$descriptors][name] = descriptor;
                            metadata[$descriptors][`_${name}`] = {
                                value: undefined,
                                writable: true,
                                enumerable: false,
                                configurable: true
                            };
                        } else // for decoder
                        metadata[$descriptors][name] = {
                            value: undefined,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        };
                        // map -1 as last field index
                        Object.defineProperty(metadata, $numFields, {
                            value: index,
                            enumerable: false,
                            configurable: true
                        });
                        // map field name => index (non enumerable)
                        Object.defineProperty(metadata, name, {
                            value: index,
                            enumerable: false,
                            configurable: true
                        });
                        // if child Ref/complex type, add to -4
                        if (typeof metadata[index].type !== "string") {
                            if (metadata[$refTypeFieldIndexes] === undefined) Object.defineProperty(metadata, $refTypeFieldIndexes, {
                                value: [],
                                enumerable: false,
                                configurable: true
                            });
                            metadata[$refTypeFieldIndexes].push(index);
                        }
                    },
                    setTag (metadata, fieldName, tag) {
                        const index = metadata[fieldName];
                        const field = metadata[index];
                        // add 'tag' to the field
                        field.tag = tag;
                        if (!metadata[$viewFieldIndexes]) {
                            // -2: all field indexes with "view" tag
                            Object.defineProperty(metadata, $viewFieldIndexes, {
                                value: [],
                                enumerable: false,
                                configurable: true
                            });
                            // -3: field indexes by "view" tag
                            Object.defineProperty(metadata, $fieldIndexesByViewTag, {
                                value: {},
                                enumerable: false,
                                configurable: true
                            });
                        }
                        metadata[$viewFieldIndexes].push(index);
                        if (!metadata[$fieldIndexesByViewTag][tag]) metadata[$fieldIndexesByViewTag][tag] = [];
                        metadata[$fieldIndexesByViewTag][tag].push(index);
                    },
                    setFields (target, fields) {
                        // for inheritance support
                        const constructor = target.prototype.constructor;
                        TypeContext.register(constructor);
                        const parentClass = Object.getPrototypeOf(constructor);
                        const parentMetadata = parentClass && parentClass[Symbol.metadata];
                        const metadata = Metadata.initialize(constructor);
                        // Use Schema's methods if not defined in the class
                        if (!constructor[$track]) constructor[$track] = Schema[$track];
                        if (!constructor[$encoder]) constructor[$encoder] = Schema[$encoder];
                        if (!constructor[$decoder]) constructor[$decoder] = Schema[$decoder];
                        if (!constructor.prototype.toJSON) constructor.prototype.toJSON = Schema.prototype.toJSON;
                        //
                        // detect index for this field, considering inheritance
                        //
                        let fieldIndex = metadata[$numFields] // current structure already has fields defined
                         ?? (parentMetadata && parentMetadata[$numFields] // parent structure has fields defined
                        ) ?? -1; // no fields defined
                        fieldIndex++;
                        for(const field in fields){
                            const type = getNormalizedType(fields[field]);
                            // FIXME: this code is duplicated from @type() annotation
                            const complexTypeKlass = typeof Object.keys(type)[0] === "string" && getType(Object.keys(type)[0]);
                            const childType = complexTypeKlass ? Object.values(type)[0] : type;
                            Metadata.addField(metadata, fieldIndex, field, type, getPropertyDescriptor(`_${field}`, fieldIndex, childType, complexTypeKlass));
                            fieldIndex++;
                        }
                        return target;
                    },
                    isDeprecated (metadata, field) {
                        return metadata[field].deprecated === true;
                    },
                    init (klass) {
                        //
                        // Used only to initialize an empty Schema (Encoder#constructor)
                        // TODO: remove/refactor this...
                        //
                        const metadata = {};
                        klass[Symbol.metadata] = metadata;
                        Object.defineProperty(metadata, $numFields, {
                            value: 0,
                            enumerable: false,
                            configurable: true
                        });
                    },
                    initialize (constructor) {
                        const parentClass = Object.getPrototypeOf(constructor);
                        const parentMetadata = parentClass[Symbol.metadata];
                        let metadata = constructor[Symbol.metadata] ?? Object.create(null);
                        // make sure inherited classes have their own metadata object.
                        if (parentClass !== Schema && metadata === parentMetadata) {
                            metadata = Object.create(null);
                            if (parentMetadata) {
                                //
                                // assign parent metadata to current
                                //
                                Object.setPrototypeOf(metadata, parentMetadata);
                                // $numFields
                                Object.defineProperty(metadata, $numFields, {
                                    value: parentMetadata[$numFields],
                                    enumerable: false,
                                    configurable: true,
                                    writable: true
                                });
                                // $viewFieldIndexes / $fieldIndexesByViewTag
                                if (parentMetadata[$viewFieldIndexes] !== undefined) {
                                    Object.defineProperty(metadata, $viewFieldIndexes, {
                                        value: [
                                            ...parentMetadata[$viewFieldIndexes]
                                        ],
                                        enumerable: false,
                                        configurable: true,
                                        writable: true
                                    });
                                    Object.defineProperty(metadata, $fieldIndexesByViewTag, {
                                        value: {
                                            ...parentMetadata[$fieldIndexesByViewTag]
                                        },
                                        enumerable: false,
                                        configurable: true,
                                        writable: true
                                    });
                                }
                                // $refTypeFieldIndexes
                                if (parentMetadata[$refTypeFieldIndexes] !== undefined) Object.defineProperty(metadata, $refTypeFieldIndexes, {
                                    value: [
                                        ...parentMetadata[$refTypeFieldIndexes]
                                    ],
                                    enumerable: false,
                                    configurable: true,
                                    writable: true
                                });
                                // $descriptors
                                Object.defineProperty(metadata, $descriptors, {
                                    value: {
                                        ...parentMetadata[$descriptors]
                                    },
                                    enumerable: false,
                                    configurable: true,
                                    writable: true
                                });
                            }
                        }
                        constructor[Symbol.metadata] = metadata;
                        return metadata;
                    },
                    isValidInstance (klass) {
                        return klass.constructor[Symbol.metadata] && Object.prototype.hasOwnProperty.call(klass.constructor[Symbol.metadata], $numFields);
                    },
                    getFields (klass) {
                        const metadata = klass[Symbol.metadata];
                        const fields = {};
                        for(let i = 0; i <= metadata[$numFields]; i++)fields[metadata[i].name] = metadata[i].type;
                        return fields;
                    },
                    hasViewTagAtIndex (metadata, index) {
                        return metadata?.[$viewFieldIndexes]?.includes(index);
                    }
                };
                function createChangeSet(queueRootNode) {
                    return {
                        indexes: {},
                        operations: [],
                        queueRootNode
                    };
                }
                // Linked list helper functions
                function createChangeTreeList() {
                    return {
                        next: undefined,
                        tail: undefined
                    };
                }
                function setOperationAtIndex(changeSet, index) {
                    const operationsIndex = changeSet.indexes[index];
                    if (operationsIndex === undefined) changeSet.indexes[index] = changeSet.operations.push(index) - 1;
                    else changeSet.operations[operationsIndex] = index;
                }
                function deleteOperationAtIndex(changeSet, index) {
                    let operationsIndex = changeSet.indexes[index];
                    if (operationsIndex === undefined) {
                        //
                        // if index is not found, we need to find the last operation
                        // FIXME: this is not very efficient
                        //
                        // > See "should allow consecutive splices (same place)" tests
                        //
                        operationsIndex = Object.values(changeSet.indexes).at(-1);
                        index = Object.entries(changeSet.indexes).find(([_, value])=>value === operationsIndex)?.[0];
                    }
                    changeSet.operations[operationsIndex] = undefined;
                    delete changeSet.indexes[index];
                }
                class ChangeTree {
                    constructor(ref){
                        /**
    		             * Whether this structure is parent of a filtered structure.
    		             */ this.isFiltered = false;
                        this.indexedOperations = {};
                        //
                        // TODO:
                        //   try storing the index + operation per item.
                        //   example: 1024 & 1025 => ADD, 1026 => DELETE
                        //
                        // => https://chatgpt.com/share/67107d0c-bc20-8004-8583-83b17dd7c196
                        //
                        this.changes = {
                            indexes: {},
                            operations: []
                        };
                        this.allChanges = {
                            indexes: {},
                            operations: []
                        };
                        /**
    		             * Is this a new instance? Used on ArraySchema to determine OPERATION.MOVE_AND_ADD operation.
    		             */ this.isNew = true;
                        this.ref = ref;
                        this.metadata = ref.constructor[Symbol.metadata];
                        //
                        // Does this structure have "filters" declared?
                        //
                        if (this.metadata?.[$viewFieldIndexes]) {
                            this.allFilteredChanges = {
                                indexes: {},
                                operations: []
                            };
                            this.filteredChanges = {
                                indexes: {},
                                operations: []
                            };
                        }
                    }
                    setRoot(root) {
                        this.root = root;
                        const isNewChangeTree = this.root.add(this);
                        this.checkIsFiltered(this.parent, this.parentIndex, isNewChangeTree);
                        // Recursively set root on child structures
                        if (isNewChangeTree) this.forEachChild((child, _)=>{
                            if (child.root !== root) child.setRoot(root);
                            else root.add(child); // increment refCount
                        });
                    }
                    setParent(parent, root, parentIndex) {
                        this.addParent(parent, parentIndex);
                        // avoid setting parents with empty `root`
                        if (!root) return;
                        const isNewChangeTree = root.add(this);
                        // skip if parent is already set
                        if (root !== this.root) {
                            this.root = root;
                            this.checkIsFiltered(parent, parentIndex, isNewChangeTree);
                        }
                        // assign same parent on child structures
                        if (isNewChangeTree) //
                        // assign same parent on child structures
                        //
                        this.forEachChild((child, index)=>{
                            if (child.root === root) {
                                //
                                // re-assigning a child of the same root, move it next to parent
                                // so encoding order is preserved
                                //
                                root.add(child);
                                root.moveNextToParent(child);
                                return;
                            }
                            child.setParent(this.ref, root, index);
                        });
                    }
                    forEachChild(callback) {
                        //
                        // assign same parent on child structures
                        //
                        if (this.ref[$childType]) {
                            if (typeof this.ref[$childType] !== "string") // MapSchema / ArraySchema, etc.
                            for (const [key, value] of this.ref.entries())callback(value[$changes], this.indexes?.[key] ?? key);
                        } else for (const index of this.metadata?.[$refTypeFieldIndexes] ?? []){
                            const field = this.metadata[index];
                            const value = this.ref[field.name];
                            if (!value) continue;
                            callback(value[$changes], index);
                        }
                    }
                    operation(op) {
                        // operations without index use negative values to represent them
                        // this is checked during .encode() time.
                        if (this.filteredChanges !== undefined) {
                            this.filteredChanges.operations.push(-op);
                            this.root?.enqueueChangeTree(this, 'filteredChanges');
                        } else {
                            this.changes.operations.push(-op);
                            this.root?.enqueueChangeTree(this, 'changes');
                        }
                    }
                    change(index, operation = exports1.OPERATION.ADD) {
                        const isFiltered = this.isFiltered || this.metadata?.[index]?.tag !== undefined;
                        const changeSet = isFiltered ? this.filteredChanges : this.changes;
                        const previousOperation = this.indexedOperations[index];
                        if (!previousOperation || previousOperation === exports1.OPERATION.DELETE) {
                            const op = !previousOperation ? operation : previousOperation === exports1.OPERATION.DELETE ? exports1.OPERATION.DELETE_AND_ADD : operation;
                            //
                            // TODO: are DELETE operations being encoded as ADD here ??
                            //
                            this.indexedOperations[index] = op;
                        }
                        setOperationAtIndex(changeSet, index);
                        if (isFiltered) {
                            setOperationAtIndex(this.allFilteredChanges, index);
                            if (this.root) {
                                this.root.enqueueChangeTree(this, 'filteredChanges');
                                this.root.enqueueChangeTree(this, 'allFilteredChanges');
                            }
                        } else {
                            setOperationAtIndex(this.allChanges, index);
                            this.root?.enqueueChangeTree(this, 'changes');
                        }
                    }
                    shiftChangeIndexes(shiftIndex) {
                        //
                        // Used only during:
                        //
                        // - ArraySchema#unshift()
                        //
                        const changeSet = this.isFiltered ? this.filteredChanges : this.changes;
                        const newIndexedOperations = {};
                        const newIndexes = {};
                        for(const index in this.indexedOperations){
                            newIndexedOperations[Number(index) + shiftIndex] = this.indexedOperations[index];
                            newIndexes[Number(index) + shiftIndex] = changeSet.indexes[index];
                        }
                        this.indexedOperations = newIndexedOperations;
                        changeSet.indexes = newIndexes;
                        changeSet.operations = changeSet.operations.map((index)=>index + shiftIndex);
                    }
                    shiftAllChangeIndexes(shiftIndex, startIndex = 0) {
                        //
                        // Used only during:
                        //
                        // - ArraySchema#splice()
                        //
                        if (this.filteredChanges !== undefined) {
                            this._shiftAllChangeIndexes(shiftIndex, startIndex, this.allFilteredChanges);
                            this._shiftAllChangeIndexes(shiftIndex, startIndex, this.allChanges);
                        } else this._shiftAllChangeIndexes(shiftIndex, startIndex, this.allChanges);
                    }
                    _shiftAllChangeIndexes(shiftIndex, startIndex = 0, changeSet) {
                        const newIndexes = {};
                        let newKey = 0;
                        for(const key in changeSet.indexes)newIndexes[newKey++] = changeSet.indexes[key];
                        changeSet.indexes = newIndexes;
                        for(let i = 0; i < changeSet.operations.length; i++){
                            const index = changeSet.operations[i];
                            if (index > startIndex) changeSet.operations[i] = index + shiftIndex;
                        }
                    }
                    indexedOperation(index, operation, allChangesIndex = index) {
                        this.indexedOperations[index] = operation;
                        if (this.filteredChanges !== undefined) {
                            setOperationAtIndex(this.allFilteredChanges, allChangesIndex);
                            setOperationAtIndex(this.filteredChanges, index);
                            this.root?.enqueueChangeTree(this, 'filteredChanges');
                        } else {
                            setOperationAtIndex(this.allChanges, allChangesIndex);
                            setOperationAtIndex(this.changes, index);
                            this.root?.enqueueChangeTree(this, 'changes');
                        }
                    }
                    getType(index) {
                        return(//
                        // Get the child type from parent structure.
                        // - ["string"] => "string"
                        // - { map: "string" } => "string"
                        // - { set: "string" } => "string"
                        //
                        this.ref[$childType] || // ArraySchema | MapSchema | SetSchema | CollectionSchema
                        this.metadata[index].type // Schema
                        );
                    }
                    getChange(index) {
                        return this.indexedOperations[index];
                    }
                    //
                    // used during `.encode()`
                    //
                    getValue(index, isEncodeAll = false) {
                        //
                        // `isEncodeAll` param is only used by ArraySchema
                        //
                        return this.ref[$getByIndex](index, isEncodeAll);
                    }
                    delete(index, operation, allChangesIndex = index) {
                        if (index === undefined) {
                            try {
                                throw new Error(`@colyseus/schema ${this.ref.constructor.name}: trying to delete non-existing index '${index}'`);
                            } catch (e) {
                                console.warn(e);
                            }
                            return;
                        }
                        const changeSet = this.filteredChanges !== undefined ? this.filteredChanges : this.changes;
                        this.indexedOperations[index] = operation ?? exports1.OPERATION.DELETE;
                        setOperationAtIndex(changeSet, index);
                        deleteOperationAtIndex(this.allChanges, allChangesIndex);
                        const previousValue = this.getValue(index);
                        // remove `root` reference
                        if (previousValue && previousValue[$changes]) //
                        // FIXME: this.root is "undefined"
                        //
                        // This method is being called at decoding time when a DELETE operation is found.
                        //
                        // - This is due to using the concrete Schema class at decoding time.
                        // - "Reflected" structures do not have this problem.
                        //
                        // (The property descriptors should NOT be used at decoding time. only at encoding time.)
                        //
                        this.root?.remove(previousValue[$changes]);
                        //
                        // FIXME: this is looking a ugly and repeated
                        //
                        if (this.filteredChanges !== undefined) {
                            deleteOperationAtIndex(this.allFilteredChanges, allChangesIndex);
                            this.root?.enqueueChangeTree(this, 'filteredChanges');
                        } else this.root?.enqueueChangeTree(this, 'changes');
                        return previousValue;
                    }
                    endEncode(changeSetName) {
                        this.indexedOperations = {};
                        // clear changeset
                        this[changeSetName] = createChangeSet();
                        // ArraySchema and MapSchema have a custom "encode end" method
                        this.ref[$onEncodeEnd]?.();
                        // Not a new instance anymore
                        this.isNew = false;
                    }
                    discard(discardAll = false) {
                        //
                        // > MapSchema:
                        //      Remove cached key to ensure ADD operations is unsed instead of
                        //      REPLACE in case same key is used on next patches.
                        //
                        this.ref[$onEncodeEnd]?.();
                        this.indexedOperations = {};
                        this.changes = createChangeSet(this.changes.queueRootNode);
                        if (this.filteredChanges !== undefined) this.filteredChanges = createChangeSet(this.filteredChanges.queueRootNode);
                        if (discardAll) {
                            // preserve queueRootNode references
                            this.allChanges = createChangeSet(this.allChanges.queueRootNode);
                            if (this.allFilteredChanges !== undefined) this.allFilteredChanges = createChangeSet(this.allFilteredChanges.queueRootNode);
                        }
                    }
                    /**
    		         * Recursively discard all changes from this, and child structures.
    		         * (Used in tests only)
    		         */ discardAll() {
                        const keys = Object.keys(this.indexedOperations);
                        for(let i = 0, len = keys.length; i < len; i++){
                            const value = this.getValue(Number(keys[i]));
                            if (value && value[$changes]) value[$changes].discardAll();
                        }
                        this.discard();
                    }
                    get changed() {
                        return Object.entries(this.indexedOperations).length > 0;
                    }
                    checkIsFiltered(parent, parentIndex, isNewChangeTree) {
                        if (this.root.types.hasFilters) {
                            //
                            // At Schema initialization, the "root" structure might not be available
                            // yet, as it only does once the "Encoder" has been set up.
                            //
                            // So the "parent" may be already set without a "root".
                            //
                            this._checkFilteredByParent(parent, parentIndex);
                            if (this.filteredChanges !== undefined) {
                                this.root?.enqueueChangeTree(this, 'filteredChanges');
                                if (isNewChangeTree) this.root?.enqueueChangeTree(this, 'allFilteredChanges');
                            }
                        }
                        if (!this.isFiltered) {
                            this.root?.enqueueChangeTree(this, 'changes');
                            if (isNewChangeTree) this.root?.enqueueChangeTree(this, 'allChanges');
                        }
                    }
                    _checkFilteredByParent(parent, parentIndex) {
                        // skip if parent is not set
                        if (!parent) return;
                        //
                        // ArraySchema | MapSchema - get the child type
                        // (if refType is typeof string, the parentFiltered[key] below will always be invalid)
                        //
                        const refType = Metadata.isValidInstance(this.ref) ? this.ref.constructor : this.ref[$childType];
                        let parentChangeTree;
                        let parentIsCollection = !Metadata.isValidInstance(parent);
                        if (parentIsCollection) {
                            parentChangeTree = parent[$changes];
                            parent = parentChangeTree.parent;
                            parentIndex = parentChangeTree.parentIndex;
                        } else parentChangeTree = parent[$changes];
                        const parentConstructor = parent.constructor;
                        let key = `${this.root.types.getTypeId(refType)}`;
                        if (parentConstructor) key += `-${this.root.types.schemas.get(parentConstructor)}`;
                        key += `-${parentIndex}`;
                        const fieldHasViewTag = Metadata.hasViewTagAtIndex(parentConstructor?.[Symbol.metadata], parentIndex);
                        this.isFiltered = parent[$changes].isFiltered // in case parent is already filtered
                         || this.root.types.parentFiltered[key] || fieldHasViewTag;
                        //
                        // "isFiltered" may not be imedialely available during `change()` due to the instance not being attached to the root yet.
                        // when it's available, we need to enqueue the "changes" changeset into the "filteredChanges" changeset.
                        //
                        if (this.isFiltered) {
                            this.isVisibilitySharedWithParent = parentChangeTree.isFiltered && typeof refType !== "string" && !fieldHasViewTag && parentIsCollection;
                            if (!this.filteredChanges) {
                                this.filteredChanges = createChangeSet();
                                this.allFilteredChanges = createChangeSet();
                            }
                            if (this.changes.operations.length > 0) {
                                this.changes.operations.forEach((index)=>setOperationAtIndex(this.filteredChanges, index));
                                this.allChanges.operations.forEach((index)=>setOperationAtIndex(this.allFilteredChanges, index));
                                this.changes = createChangeSet();
                                this.allChanges = createChangeSet();
                            }
                        }
                    }
                    /**
    		         * Get the immediate parent
    		         */ get parent() {
                        return this.parentChain?.ref;
                    }
                    /**
    		         * Get the immediate parent index
    		         */ get parentIndex() {
                        return this.parentChain?.index;
                    }
                    /**
    		         * Add a parent to the chain
    		         */ addParent(parent, index) {
                        // Check if this parent already exists in the chain
                        if (this.hasParent((p, _)=>p[$changes] === parent[$changes])) {
                            // if (this.hasParent((p, i) => p[$changes] === parent[$changes] && i === index)) {
                            this.parentChain.index = index;
                            return;
                        }
                        this.parentChain = {
                            ref: parent,
                            index,
                            next: this.parentChain
                        };
                    }
                    /**
    		         * Remove a parent from the chain
    		         * @param parent - The parent to remove
    		         * @returns true if parent was removed
    		         */ removeParent(parent = this.parent) {
                        let current = this.parentChain;
                        let previous = null;
                        while(current){
                            //
                            // FIXME: it is required to check against `$changes` here because
                            // ArraySchema is instance of Proxy
                            //
                            if (current.ref[$changes] === parent[$changes]) {
                                if (previous) previous.next = current.next;
                                else this.parentChain = current.next;
                                return true;
                            }
                            previous = current;
                            current = current.next;
                        }
                        return this.parentChain === undefined;
                    }
                    /**
    		         * Find a specific parent in the chain
    		         */ findParent(predicate) {
                        let current = this.parentChain;
                        while(current){
                            if (predicate(current.ref, current.index)) return current;
                            current = current.next;
                        }
                        return undefined;
                    }
                    /**
    		         * Check if this ChangeTree has a specific parent
    		         */ hasParent(predicate) {
                        return this.findParent(predicate) !== undefined;
                    }
                    /**
    		         * Get all parents as an array (for debugging/testing)
    		         */ getAllParents() {
                        const parents = [];
                        let current = this.parentChain;
                        while(current){
                            parents.push({
                                ref: current.ref,
                                index: current.index
                            });
                            current = current.next;
                        }
                        return parents;
                    }
                }
                function encodeValue(encoder, bytes, type, value, operation, it) {
                    if (typeof type === "string") encode[type]?.(bytes, value, it);
                    else if (type[Symbol.metadata] !== undefined) {
                        //
                        // Encode refId for this instance.
                        // The actual instance is going to be encoded on next `changeTree` iteration.
                        //
                        encode.number(bytes, value[$changes].refId, it);
                        // Try to encode inherited TYPE_ID if it's an ADD operation.
                        if ((operation & exports1.OPERATION.ADD) === exports1.OPERATION.ADD) encoder.tryEncodeTypeId(bytes, type, value.constructor, it);
                    } else //
                    // Encode refId for this instance.
                    // The actual instance is going to be encoded on next `changeTree` iteration.
                    //
                    encode.number(bytes, value[$changes].refId, it);
                }
                /**
    		     * Used for Schema instances.
    		     * @private
    		     */ const encodeSchemaOperation = function(encoder, bytes, changeTree, index, operation, it, _, __, metadata) {
                    // "compress" field index + operation
                    bytes[it.offset++] = (index | operation) & 255;
                    // Do not encode value for DELETE operations
                    if (operation === exports1.OPERATION.DELETE) return;
                    const ref = changeTree.ref;
                    const field = metadata[index];
                    // TODO: inline this function call small performance gain
                    encodeValue(encoder, bytes, metadata[index].type, ref[field.name], operation, it);
                };
                /**
    		     * Used for collections (MapSchema, CollectionSchema, SetSchema)
    		     * @private
    		     */ const encodeKeyValueOperation = function(encoder, bytes, changeTree, index, operation, it) {
                    // encode operation
                    bytes[it.offset++] = operation & 255;
                    // encode index
                    encode.number(bytes, index, it);
                    // Do not encode value for DELETE operations
                    if (operation === exports1.OPERATION.DELETE) return;
                    const ref = changeTree.ref;
                    //
                    // encode "alias" for dynamic fields (maps)
                    //
                    if ((operation & exports1.OPERATION.ADD) === exports1.OPERATION.ADD) {
                        if (typeof ref['set'] === "function") {
                            //
                            // MapSchema dynamic key
                            //
                            const dynamicIndex = changeTree.ref['$indexes'].get(index);
                            encode.string(bytes, dynamicIndex, it);
                        }
                    }
                    const type = ref[$childType];
                    const value = ref[$getByIndex](index);
                    // try { throw new Error(); } catch (e) {
                    //     // only print if not coming from Reflection.ts
                    //     if (!e.stack.includes("src/Reflection.ts")) {
                    //         console.log("encodeKeyValueOperation -> ", {
                    //             ref: changeTree.ref.constructor.name,
                    //             field,
                    //             operation: OPERATION[operation],
                    //             value: value?.toJSON(),
                    //             items: ref.toJSON(),
                    //         });
                    //     }
                    // }
                    // TODO: inline this function call small performance gain
                    encodeValue(encoder, bytes, type, value, operation, it);
                };
                /**
    		     * Used for collections (MapSchema, ArraySchema, etc.)
    		     * @private
    		     */ const encodeArray = function(encoder, bytes, changeTree, field, operation, it, isEncodeAll, hasView) {
                    const ref = changeTree.ref;
                    const useOperationByRefId = hasView && changeTree.isFiltered && typeof changeTree.getType(field) !== "string";
                    let refOrIndex;
                    if (useOperationByRefId) {
                        const item = ref['tmpItems'][field];
                        // Skip encoding if item is undefined (e.g. when clear() is called)
                        if (!item) return;
                        refOrIndex = item[$changes].refId;
                        if (operation === exports1.OPERATION.DELETE) operation = exports1.OPERATION.DELETE_BY_REFID;
                        else if (operation === exports1.OPERATION.ADD) operation = exports1.OPERATION.ADD_BY_REFID;
                    } else refOrIndex = field;
                    // encode operation
                    bytes[it.offset++] = operation & 255;
                    // encode index
                    encode.number(bytes, refOrIndex, it);
                    // Do not encode value for DELETE operations
                    if (operation === exports1.OPERATION.DELETE || operation === exports1.OPERATION.DELETE_BY_REFID) return;
                    const type = changeTree.getType(field);
                    const value = changeTree.getValue(field, isEncodeAll);
                    // console.log({ type, field, value });
                    // console.log("encodeArray -> ", {
                    //     ref: changeTree.ref.constructor.name,
                    //     field,
                    //     operation: OPERATION[operation],
                    //     value: value?.toJSON(),
                    //     items: ref.toJSON(),
                    // });
                    // TODO: inline this function call small performance gain
                    encodeValue(encoder, bytes, type, value, operation, it);
                };
                const DEFINITION_MISMATCH = -1;
                function decodeValue(decoder, operation, ref, index, type, bytes, it, allChanges) {
                    const $root = decoder.root;
                    const previousValue = ref[$getByIndex](index);
                    let value;
                    if ((operation & exports1.OPERATION.DELETE) === exports1.OPERATION.DELETE) {
                        // Flag `refId` for garbage collection.
                        const previousRefId = $root.refIds.get(previousValue);
                        if (previousRefId !== undefined) $root.removeRef(previousRefId);
                        //
                        // Delete operations
                        //
                        if (operation !== exports1.OPERATION.DELETE_AND_ADD) ref[$deleteByIndex](index);
                        value = undefined;
                    }
                    if (operation === exports1.OPERATION.DELETE) ;
                    else if (Schema.is(type)) {
                        const refId = decode.number(bytes, it);
                        value = $root.refs.get(refId);
                        if ((operation & exports1.OPERATION.ADD) === exports1.OPERATION.ADD) {
                            const childType = decoder.getInstanceType(bytes, it, type);
                            if (!value) value = decoder.createInstanceOfType(childType);
                            $root.addRef(refId, value, value !== previousValue || // increment ref count if value has changed
                            operation === exports1.OPERATION.DELETE_AND_ADD && value === previousValue // increment ref count if the same instance is being added again
                            );
                        }
                    } else if (typeof type === "string") //
                    // primitive value (number, string, boolean, etc)
                    //
                    value = decode[type](bytes, it);
                    else {
                        const typeDef = getType(Object.keys(type)[0]);
                        const refId = decode.number(bytes, it);
                        const valueRef = $root.refs.has(refId) ? previousValue || $root.refs.get(refId) : new typeDef.constructor();
                        value = valueRef.clone(true);
                        value[$childType] = Object.values(type)[0]; // cache childType for ArraySchema and MapSchema
                        if (previousValue) {
                            let previousRefId = $root.refIds.get(previousValue);
                            if (previousRefId !== undefined && refId !== previousRefId) {
                                //
                                // enqueue onRemove if structure has been replaced.
                                //
                                const entries = previousValue.entries();
                                let iter;
                                while((iter = entries.next()) && !iter.done){
                                    const [key, value] = iter.value;
                                    // if value is a schema, remove its reference
                                    if (typeof value === "object") {
                                        previousRefId = $root.refIds.get(value);
                                        $root.removeRef(previousRefId);
                                    }
                                    allChanges.push({
                                        ref: previousValue,
                                        refId: previousRefId,
                                        op: exports1.OPERATION.DELETE,
                                        field: key,
                                        value: undefined,
                                        previousValue: value
                                    });
                                }
                            }
                        }
                        $root.addRef(refId, value, valueRef !== previousValue || operation === exports1.OPERATION.DELETE_AND_ADD && valueRef === previousValue);
                    }
                    return {
                        value,
                        previousValue
                    };
                }
                const decodeSchemaOperation = function(decoder, bytes, it, ref, allChanges) {
                    const first_byte = bytes[it.offset++];
                    const metadata = ref.constructor[Symbol.metadata];
                    // "compressed" index + operation
                    const operation = first_byte >> 6 << 6;
                    const index = first_byte % (operation || 255);
                    // skip early if field is not defined
                    const field = metadata[index];
                    if (field === undefined) {
                        console.warn("@colyseus/schema: field not defined at", {
                            index,
                            ref: ref.constructor.name,
                            metadata
                        });
                        return DEFINITION_MISMATCH;
                    }
                    const { value, previousValue } = decodeValue(decoder, operation, ref, index, field.type, bytes, it, allChanges);
                    if (value !== null && value !== undefined) ref[field.name] = value;
                    // add change
                    if (previousValue !== value) allChanges.push({
                        ref,
                        refId: decoder.currentRefId,
                        op: operation,
                        field: field.name,
                        value,
                        previousValue
                    });
                };
                const decodeKeyValueOperation = function(decoder, bytes, it, ref, allChanges) {
                    // "uncompressed" index + operation (array/map items)
                    const operation = bytes[it.offset++];
                    if (operation === exports1.OPERATION.CLEAR) {
                        //
                        // When decoding:
                        // - enqueue items for DELETE callback.
                        // - flag child items for garbage collection.
                        //
                        decoder.removeChildRefs(ref, allChanges);
                        ref.clear();
                        return;
                    }
                    const index = decode.number(bytes, it);
                    const type = ref[$childType];
                    let dynamicIndex;
                    if ((operation & exports1.OPERATION.ADD) === exports1.OPERATION.ADD) {
                        if (typeof ref['set'] === "function") {
                            dynamicIndex = decode.string(bytes, it); // MapSchema
                            ref['setIndex'](index, dynamicIndex);
                        } else dynamicIndex = index; // ArraySchema
                    } else // get dynamic index from "ref"
                    dynamicIndex = ref['getIndex'](index);
                    const { value, previousValue } = decodeValue(decoder, operation, ref, index, type, bytes, it, allChanges);
                    if (value !== null && value !== undefined) {
                        if (typeof ref['set'] === "function") // MapSchema
                        ref['$items'].set(dynamicIndex, value);
                        else if (typeof ref['$setAt'] === "function") // ArraySchema
                        ref['$setAt'](index, value, operation);
                        else if (typeof ref['add'] === "function") {
                            // CollectionSchema && SetSchema
                            const index = ref.add(value);
                            if (typeof index === "number") ref['setIndex'](index, index);
                        }
                    }
                    // add change
                    if (previousValue !== value) allChanges.push({
                        ref,
                        refId: decoder.currentRefId,
                        op: operation,
                        field: "",
                        dynamicIndex,
                        value,
                        previousValue
                    });
                };
                const decodeArray = function(decoder, bytes, it, ref, allChanges) {
                    // "uncompressed" index + operation (array/map items)
                    let operation = bytes[it.offset++];
                    let index;
                    if (operation === exports1.OPERATION.CLEAR) {
                        //
                        // When decoding:
                        // - enqueue items for DELETE callback.
                        // - flag child items for garbage collection.
                        //
                        decoder.removeChildRefs(ref, allChanges);
                        ref.clear();
                        return;
                    } else if (operation === exports1.OPERATION.REVERSE) {
                        ref.reverse();
                        return;
                    } else if (operation === exports1.OPERATION.DELETE_BY_REFID) {
                        // TODO: refactor here, try to follow same flow as below
                        const refId = decode.number(bytes, it);
                        const previousValue = decoder.root.refs.get(refId);
                        index = ref.findIndex((value)=>value === previousValue);
                        ref[$deleteByIndex](index);
                        allChanges.push({
                            ref,
                            refId: decoder.currentRefId,
                            op: exports1.OPERATION.DELETE,
                            field: "",
                            dynamicIndex: index,
                            value: undefined,
                            previousValue
                        });
                        return;
                    } else if (operation === exports1.OPERATION.ADD_BY_REFID) {
                        const refId = decode.number(bytes, it);
                        const itemByRefId = decoder.root.refs.get(refId);
                        // if item already exists, use existing index
                        if (itemByRefId) index = ref.findIndex((value)=>value === itemByRefId);
                        // fallback to use last index
                        if (index === -1 || index === undefined) index = ref.length;
                    } else index = decode.number(bytes, it);
                    const type = ref[$childType];
                    let dynamicIndex = index;
                    const { value, previousValue } = decodeValue(decoder, operation, ref, index, type, bytes, it, allChanges);
                    if (value !== null && value !== undefined && value !== previousValue // avoid setting same value twice (if index === 0 it will result in a "unshift" for ArraySchema)
                    ) // ArraySchema
                    ref['$setAt'](index, value, operation);
                    // add change
                    if (previousValue !== value) allChanges.push({
                        ref,
                        refId: decoder.currentRefId,
                        op: operation,
                        field: "",
                        dynamicIndex,
                        value,
                        previousValue
                    });
                };
                class EncodeSchemaError extends Error {
                }
                function assertType(value, type, klass, field) {
                    let typeofTarget;
                    let allowNull = false;
                    switch(type){
                        case "number":
                        case "int8":
                        case "uint8":
                        case "int16":
                        case "uint16":
                        case "int32":
                        case "uint32":
                        case "int64":
                        case "uint64":
                        case "float32":
                        case "float64":
                            typeofTarget = "number";
                            if (isNaN(value)) console.log(`trying to encode "NaN" in ${klass.constructor.name}#${field}`);
                            break;
                        case "bigint64":
                        case "biguint64":
                            typeofTarget = "bigint";
                            break;
                        case "string":
                            typeofTarget = "string";
                            allowNull = true;
                            break;
                        case "boolean":
                            // boolean is always encoded as true/false based on truthiness
                            return;
                        default:
                            // skip assertion for custom types
                            // TODO: allow custom types to define their own assertions
                            return;
                    }
                    if (typeof value !== typeofTarget && (!allowNull || allowNull && value !== null)) {
                        let foundValue = `'${JSON.stringify(value)}'${value && value.constructor && ` (${value.constructor.name})` || ''}`;
                        throw new EncodeSchemaError(`a '${typeofTarget}' was expected, but ${foundValue} was provided in ${klass.constructor.name}#${field}`);
                    }
                }
                function assertInstanceType(value, type, instance, field) {
                    if (!(value instanceof type)) throw new EncodeSchemaError(`a '${type.name}' was expected, but '${value && value.constructor.name}' was provided in ${instance.constructor.name}#${field}`);
                }
                var _a$4, _b$4;
                const DEFAULT_SORT = (a, b)=>{
                    const A = a.toString();
                    const B = b.toString();
                    if (A < B) return -1;
                    else if (A > B) return 1;
                    else return 0;
                };
                class ArraySchema {
                    static{
                        this[_a$4] = encodeArray;
                    }
                    static{
                        this[_b$4] = decodeArray;
                    }
                    /**
    		         * Determine if a property must be filtered.
    		         * - If returns false, the property is NOT going to be encoded.
    		         * - If returns true, the property is going to be encoded.
    		         *
    		         * Encoding with "filters" happens in two steps:
    		         * - First, the encoder iterates over all "not owned" properties and encodes them.
    		         * - Then, the encoder iterates over all "owned" properties per instance and encodes them.
    		         */ static [(_a$4 = $encoder, _b$4 = $decoder, $filter)](ref, index, view) {
                        return !view || typeof ref[$childType] === "string" || view.isChangeTreeVisible(ref['tmpItems'][index]?.[$changes]);
                    }
                    static is(type) {
                        return(// type format: ["string"]
                        Array.isArray(type) || // type format: { array: "string" }
                        type['array'] !== undefined);
                    }
                    static from(iterable) {
                        return new ArraySchema(...Array.from(iterable));
                    }
                    constructor(...items){
                        this.items = [];
                        this.tmpItems = [];
                        this.deletedIndexes = {};
                        this.isMovingItems = false;
                        Object.defineProperty(this, $childType, {
                            value: undefined,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        });
                        const proxy = new Proxy(this, {
                            get: (obj, prop)=>{
                                if (typeof prop !== "symbol" && // FIXME: d8 accuses this as low performance
                                !isNaN(prop) // https://stackoverflow.com/a/175787/892698
                                ) return this.items[prop];
                                else return Reflect.get(obj, prop);
                            },
                            set: (obj, key, setValue)=>{
                                if (typeof key !== "symbol" && !isNaN(key)) {
                                    if (setValue === undefined || setValue === null) obj.$deleteAt(key);
                                    else {
                                        if (setValue[$changes]) {
                                            assertInstanceType(setValue, obj[$childType], obj, key);
                                            const previousValue = obj.items[key];
                                            if (!obj.isMovingItems) obj.$changeAt(Number(key), setValue);
                                            else {
                                                if (previousValue !== undefined) {
                                                    if (setValue[$changes].isNew) obj[$changes].indexedOperation(Number(key), exports1.OPERATION.MOVE_AND_ADD);
                                                    else if ((obj[$changes].getChange(Number(key)) & exports1.OPERATION.DELETE) === exports1.OPERATION.DELETE) obj[$changes].indexedOperation(Number(key), exports1.OPERATION.DELETE_AND_MOVE);
                                                    else obj[$changes].indexedOperation(Number(key), exports1.OPERATION.MOVE);
                                                } else if (setValue[$changes].isNew) obj[$changes].indexedOperation(Number(key), exports1.OPERATION.ADD);
                                                setValue[$changes].setParent(this, obj[$changes].root, key);
                                            }
                                            if (previousValue !== undefined) // remove root reference from previous value
                                            previousValue[$changes].root?.remove(previousValue[$changes]);
                                        } else obj.$changeAt(Number(key), setValue);
                                        obj.items[key] = setValue;
                                        obj.tmpItems[key] = setValue;
                                    }
                                    return true;
                                } else return Reflect.set(obj, key, setValue);
                            },
                            deleteProperty: (obj, prop)=>{
                                if (typeof prop === "number") obj.$deleteAt(prop);
                                else delete obj[prop];
                                return true;
                            },
                            has: (obj, key)=>{
                                if (typeof key !== "symbol" && !isNaN(Number(key))) return Reflect.has(this.items, key);
                                return Reflect.has(obj, key);
                            }
                        });
                        Object.defineProperty(this, $changes, {
                            value: new ChangeTree(proxy),
                            enumerable: false,
                            writable: true
                        });
                        if (items.length > 0) this.push(...items);
                        return proxy;
                    }
                    set length(newLength) {
                        if (newLength === 0) this.clear();
                        else if (newLength < this.items.length) this.splice(newLength, this.length - newLength);
                        else console.warn("ArraySchema: can't set .length to a higher value than its length.");
                    }
                    get length() {
                        return this.items.length;
                    }
                    push(...values) {
                        let length = this.tmpItems.length;
                        const changeTree = this[$changes];
                        for(let i = 0, l = values.length; i < l; i++, length++){
                            const value = values[i];
                            if (value === undefined || value === null) // skip null values
                            return;
                            else if (typeof value === "object" && this[$childType]) assertInstanceType(value, this[$childType], this, i);
                            changeTree.indexedOperation(length, exports1.OPERATION.ADD, this.items.length);
                            this.items.push(value);
                            this.tmpItems.push(value);
                            //
                            // set value's parent after the value is set
                            // (to avoid encoding "refId" operations before parent's "ADD" operation)
                            //
                            value[$changes]?.setParent(this, changeTree.root, length);
                        }
                        return length;
                    }
                    /**
    		         * Removes the last element from an array and returns it.
    		         */ pop() {
                        let index = -1;
                        // find last non-undefined index
                        for(let i = this.tmpItems.length - 1; i >= 0; i--)// if (this.tmpItems[i] !== undefined) {
                        if (this.deletedIndexes[i] !== true) {
                            index = i;
                            break;
                        }
                        if (index < 0) return undefined;
                        this[$changes].delete(index, undefined, this.items.length - 1);
                        this.deletedIndexes[index] = true;
                        return this.items.pop();
                    }
                    at(index) {
                        // Allow negative indexing from the end
                        if (index < 0) index += this.length;
                        return this.items[index];
                    }
                    // encoding only
                    $changeAt(index, value) {
                        if (value === undefined || value === null) {
                            console.error("ArraySchema items cannot be null nor undefined; Use `deleteAt(index)` instead.");
                            return;
                        }
                        // skip if the value is the same as cached.
                        if (this.items[index] === value) return;
                        const operation = this.items[index] !== undefined ? typeof value === "object" ? exports1.OPERATION.DELETE_AND_ADD // schema child
                         : exports1.OPERATION.REPLACE // primitive
                         : exports1.OPERATION.ADD;
                        const changeTree = this[$changes];
                        changeTree.change(index, operation);
                        //
                        // set value's parent after the value is set
                        // (to avoid encoding "refId" operations before parent's "ADD" operation)
                        //
                        value[$changes]?.setParent(this, changeTree.root, index);
                    }
                    // encoding only
                    $deleteAt(index, operation) {
                        this[$changes].delete(index, operation);
                    }
                    // decoding only
                    $setAt(index, value, operation) {
                        if (index === 0 && operation === exports1.OPERATION.ADD && this.items[index] !== undefined) // handle decoding unshift
                        this.items.unshift(value);
                        else if (operation === exports1.OPERATION.DELETE_AND_MOVE) {
                            this.items.splice(index, 1);
                            this.items[index] = value;
                        } else this.items[index] = value;
                    }
                    clear() {
                        // skip if already clear
                        if (this.items.length === 0) return;
                        // discard previous operations.
                        const changeTree = this[$changes];
                        // remove children references
                        changeTree.forEachChild((childChangeTree, _)=>{
                            changeTree.root?.remove(childChangeTree);
                        });
                        changeTree.discard(true);
                        changeTree.operation(exports1.OPERATION.CLEAR);
                        this.items.length = 0;
                        this.tmpItems.length = 0;
                    }
                    /**
    		         * Combines two or more arrays.
    		         * @param items Additional items to add to the end of array1.
    		         */ // @ts-ignore
                    concat(...items) {
                        return new ArraySchema(...this.items.concat(...items));
                    }
                    /**
    		         * Adds all the elements of an array separated by the specified separator string.
    		         * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
    		         */ join(separator) {
                        return this.items.join(separator);
                    }
                    /**
    		         * Reverses the elements in an Array.
    		         */ // @ts-ignore
                    reverse() {
                        this[$changes].operation(exports1.OPERATION.REVERSE);
                        this.items.reverse();
                        this.tmpItems.reverse();
                        return this;
                    }
                    /**
    		         * Removes the first element from an array and returns it.
    		         */ shift() {
                        if (this.items.length === 0) return undefined;
                        const changeTree = this[$changes];
                        const index = this.tmpItems.findIndex((item)=>item === this.items[0]);
                        const allChangesIndex = this.items.findIndex((item)=>item === this.items[0]);
                        changeTree.delete(index, exports1.OPERATION.DELETE, allChangesIndex);
                        changeTree.shiftAllChangeIndexes(-1, allChangesIndex);
                        this.deletedIndexes[index] = true;
                        return this.items.shift();
                    }
                    /**
    		         * Returns a section of an array.
    		         * @param start The beginning of the specified portion of the array.
    		         * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
    		         */ slice(start, end) {
                        const sliced = new ArraySchema();
                        sliced.push(...this.items.slice(start, end));
                        return sliced;
                    }
                    /**
    		         * Sorts an array.
    		         * @param compareFn Function used to determine the order of the elements. It is expected to return
    		         * a negative value if first argument is less than second argument, zero if they're equal and a positive
    		         * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
    		         * ```ts
    		         * [11,2,22,1].sort((a, b) => a - b)
    		         * ```
    		         */ sort(compareFn = DEFAULT_SORT) {
                        this.isMovingItems = true;
                        const changeTree = this[$changes];
                        const sortedItems = this.items.sort(compareFn);
                        // wouldn't OPERATION.MOVE make more sense here?
                        sortedItems.forEach((_, i)=>changeTree.change(i, exports1.OPERATION.REPLACE));
                        this.tmpItems.sort(compareFn);
                        this.isMovingItems = false;
                        return this;
                    }
                    /**
    		         * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
    		         * @param start The zero-based location in the array from which to start removing elements.
    		         * @param deleteCount The number of elements to remove.
    		         * @param insertItems Elements to insert into the array in place of the deleted elements.
    		         */ splice(start, deleteCount, ...insertItems) {
                        const changeTree = this[$changes];
                        const itemsLength = this.items.length;
                        const tmpItemsLength = this.tmpItems.length;
                        const insertCount = insertItems.length;
                        // build up-to-date list of indexes, excluding removed values.
                        const indexes = [];
                        for(let i = 0; i < tmpItemsLength; i++)if (this.deletedIndexes[i] !== true) indexes.push(i);
                        if (itemsLength > start) {
                            // if deleteCount is not provided, delete all items from start to end
                            if (deleteCount === undefined) deleteCount = itemsLength - start;
                            //
                            // delete operations at correct index
                            //
                            for(let i = start; i < start + deleteCount; i++){
                                const index = indexes[i];
                                changeTree.delete(index, exports1.OPERATION.DELETE);
                                this.deletedIndexes[index] = true;
                            }
                        } else // not enough items to delete
                        deleteCount = 0;
                        // insert operations
                        if (insertCount > 0) {
                            if (insertCount > deleteCount) {
                                console.error("Inserting more elements than deleting during ArraySchema#splice()");
                                throw new Error("ArraySchema#splice(): insertCount must be equal or lower than deleteCount.");
                            }
                            for(let i = 0; i < insertCount; i++){
                                const addIndex = (indexes[start] ?? itemsLength) + i;
                                changeTree.indexedOperation(addIndex, this.deletedIndexes[addIndex] ? exports1.OPERATION.DELETE_AND_ADD : exports1.OPERATION.ADD);
                                // set value's parent/root
                                insertItems[i][$changes]?.setParent(this, changeTree.root, addIndex);
                            }
                        }
                        //
                        // delete exceeding indexes from "allChanges"
                        // (prevent .encodeAll() from encoding non-existing items)
                        //
                        if (deleteCount > insertCount) changeTree.shiftAllChangeIndexes(-(deleteCount - insertCount), indexes[start + insertCount]);
                        //
                        // FIXME: this code block is duplicated on ChangeTree
                        //
                        if (changeTree.filteredChanges !== undefined) changeTree.root?.enqueueChangeTree(changeTree, 'filteredChanges');
                        else changeTree.root?.enqueueChangeTree(changeTree, 'changes');
                        return this.items.splice(start, deleteCount, ...insertItems);
                    }
                    /**
    		         * Inserts new elements at the start of an array.
    		         * @param items  Elements to insert at the start of the Array.
    		         */ unshift(...items) {
                        const changeTree = this[$changes];
                        // shift indexes
                        changeTree.shiftChangeIndexes(items.length);
                        // new index
                        if (changeTree.isFiltered) setOperationAtIndex(changeTree.filteredChanges, this.items.length);
                        else setOperationAtIndex(changeTree.allChanges, this.items.length);
                        // FIXME: should we use OPERATION.MOVE here instead?
                        items.forEach((_, index)=>{
                            changeTree.change(index, exports1.OPERATION.ADD);
                        });
                        this.tmpItems.unshift(...items);
                        return this.items.unshift(...items);
                    }
                    /**
    		         * Returns the index of the first occurrence of a value in an array.
    		         * @param searchElement The value to locate in the array.
    		         * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
    		         */ indexOf(searchElement, fromIndex) {
                        return this.items.indexOf(searchElement, fromIndex);
                    }
                    /**
    		         * Returns the index of the last occurrence of a specified value in an array.
    		         * @param searchElement The value to locate in the array.
    		         * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
    		         */ lastIndexOf(searchElement, fromIndex = this.length - 1) {
                        return this.items.lastIndexOf(searchElement, fromIndex);
                    }
                    every(callbackfn, thisArg) {
                        return this.items.every(callbackfn, thisArg);
                    }
                    /**
    		         * Determines whether the specified callback function returns true for any element of an array.
    		         * @param callbackfn A function that accepts up to three arguments. The some method calls
    		         * the callbackfn function for each element in the array until the callbackfn returns a value
    		         * which is coercible to the Boolean value true, or until the end of the array.
    		         * @param thisArg An object to which the this keyword can refer in the callbackfn function.
    		         * If thisArg is omitted, undefined is used as the this value.
    		         */ some(callbackfn, thisArg) {
                        return this.items.some(callbackfn, thisArg);
                    }
                    /**
    		         * Performs the specified action for each element in an array.
    		         * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
    		         * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
    		         */ forEach(callbackfn, thisArg) {
                        return this.items.forEach(callbackfn, thisArg);
                    }
                    /**
    		         * Calls a defined callback function on each element of an array, and returns an array that contains the results.
    		         * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
    		         * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
    		         */ map(callbackfn, thisArg) {
                        return this.items.map(callbackfn, thisArg);
                    }
                    filter(callbackfn, thisArg) {
                        return this.items.filter(callbackfn, thisArg);
                    }
                    /**
    		         * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
    		         * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
    		         * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
    		         */ reduce(callbackfn, initialValue) {
                        return this.items.reduce(callbackfn, initialValue);
                    }
                    /**
    		         * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
    		         * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
    		         * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
    		         */ reduceRight(callbackfn, initialValue) {
                        return this.items.reduceRight(callbackfn, initialValue);
                    }
                    /**
    		         * Returns the value of the first element in the array where predicate is true, and undefined
    		         * otherwise.
    		         * @param predicate find calls predicate once for each element of the array, in ascending
    		         * order, until it finds one where predicate returns true. If such an element is found, find
    		         * immediately returns that element value. Otherwise, find returns undefined.
    		         * @param thisArg If provided, it will be used as the this value for each invocation of
    		         * predicate. If it is not provided, undefined is used instead.
    		         */ find(predicate, thisArg) {
                        return this.items.find(predicate, thisArg);
                    }
                    /**
    		         * Returns the index of the first element in the array where predicate is true, and -1
    		         * otherwise.
    		         * @param predicate find calls predicate once for each element of the array, in ascending
    		         * order, until it finds one where predicate returns true. If such an element is found,
    		         * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
    		         * @param thisArg If provided, it will be used as the this value for each invocation of
    		         * predicate. If it is not provided, undefined is used instead.
    		         */ findIndex(predicate, thisArg) {
                        return this.items.findIndex(predicate, thisArg);
                    }
                    /**
    		         * Returns the this object after filling the section identified by start and end with value
    		         * @param value value to fill array section with
    		         * @param start index to start filling the array at. If start is negative, it is treated as
    		         * length+start where length is the length of the array.
    		         * @param end index to stop filling the array at. If end is negative, it is treated as
    		         * length+end.
    		         */ fill(value, start, end) {
                        //
                        // TODO
                        //
                        throw new Error("ArraySchema#fill() not implemented");
                    }
                    /**
    		         * Returns the this object after copying a section of the array identified by start and end
    		         * to the same array starting at position target
    		         * @param target If target is negative, it is treated as length+target where length is the
    		         * length of the array.
    		         * @param start If start is negative, it is treated as length+start. If end is negative, it
    		         * is treated as length+end.
    		         * @param end If not specified, length of the this object is used as its default value.
    		         */ copyWithin(target, start, end) {
                        //
                        // TODO
                        //
                        throw new Error("ArraySchema#copyWithin() not implemented");
                    }
                    /**
    		         * Returns a string representation of an array.
    		         */ toString() {
                        return this.items.toString();
                    }
                    /**
    		         * Returns a string representation of an array. The elements are converted to string using their toLocalString methods.
    		         */ toLocaleString() {
                        return this.items.toLocaleString();
                    }
                    /** Iterator */ [Symbol.iterator]() {
                        return this.items[Symbol.iterator]();
                    }
                    static get [Symbol.species]() {
                        return ArraySchema;
                    }
                    /**
    		         * Returns an iterable of key, value pairs for every entry in the array
    		         */ entries() {
                        return this.items.entries();
                    }
                    /**
    		         * Returns an iterable of keys in the array
    		         */ keys() {
                        return this.items.keys();
                    }
                    /**
    		         * Returns an iterable of values in the array
    		         */ values() {
                        return this.items.values();
                    }
                    /**
    		         * Determines whether an array includes a certain element, returning true or false as appropriate.
    		         * @param searchElement The element to search for.
    		         * @param fromIndex The position in this array at which to begin searching for searchElement.
    		         */ includes(searchElement, fromIndex) {
                        return this.items.includes(searchElement, fromIndex);
                    }
                    //
                    // ES2022
                    //
                    /**
    		         * Calls a defined callback function on each element of an array. Then, flattens the result into
    		         * a new array.
    		         * This is identical to a map followed by flat with depth 1.
    		         *
    		         * @param callback A function that accepts up to three arguments. The flatMap method calls the
    		         * callback function one time for each element in the array.
    		         * @param thisArg An object to which the this keyword can refer in the callback function. If
    		         * thisArg is omitted, undefined is used as the this value.
    		         */ // @ts-ignore
                    flatMap(callback, thisArg) {
                        // @ts-ignore
                        throw new Error("ArraySchema#flatMap() is not supported.");
                    }
                    /**
    		         * Returns a new array with all sub-array elements concatenated into it recursively up to the
    		         * specified depth.
    		         *
    		         * @param depth The maximum recursion depth
    		         */ // @ts-ignore
                    flat(depth) {
                        throw new Error("ArraySchema#flat() is not supported.");
                    }
                    findLast() {
                        // @ts-ignore
                        return this.items.findLast.apply(this.items, arguments);
                    }
                    findLastIndex(...args) {
                        // @ts-ignore
                        return this.items.findLastIndex.apply(this.items, arguments);
                    }
                    //
                    // ES2023
                    //
                    with(index, value) {
                        const copy1 = this.items.slice();
                        // Allow negative indexing from the end
                        if (index < 0) index += this.length;
                        copy1[index] = value;
                        return new ArraySchema(...copy1);
                    }
                    toReversed() {
                        return this.items.slice().reverse();
                    }
                    toSorted(compareFn) {
                        return this.items.slice().sort(compareFn);
                    }
                    // @ts-ignore
                    toSpliced(start, deleteCount, ...items) {
                        // @ts-ignore
                        return this.items.toSpliced.apply(copy, arguments);
                    }
                    shuffle() {
                        return this.move((_)=>{
                            let currentIndex = this.items.length;
                            while(currentIndex != 0){
                                let randomIndex = Math.floor(Math.random() * currentIndex);
                                currentIndex--;
                                [this[currentIndex], this[randomIndex]] = [
                                    this[randomIndex],
                                    this[currentIndex]
                                ];
                            }
                        });
                    }
                    /**
    		         * Allows to move items around in the array.
    		         *
    		         * Example:
    		         *     state.cards.move((cards) => {
    		         *         [cards[4], cards[3]] = [cards[3], cards[4]];
    		         *         [cards[3], cards[2]] = [cards[2], cards[3]];
    		         *         [cards[2], cards[0]] = [cards[0], cards[2]];
    		         *         [cards[1], cards[1]] = [cards[1], cards[1]];
    		         *         [cards[0], cards[0]] = [cards[0], cards[0]];
    		         *     })
    		         *
    		         * @param cb
    		         * @returns
    		         */ move(cb) {
                        this.isMovingItems = true;
                        cb(this);
                        this.isMovingItems = false;
                        return this;
                    }
                    [$getByIndex](index, isEncodeAll = false) {
                        //
                        // TODO: avoid unecessary `this.tmpItems` check during decoding.
                        //
                        //    ENCODING uses `this.tmpItems` (or `this.items` if `isEncodeAll` is true)
                        //    DECODING uses `this.items`
                        //
                        return isEncodeAll ? this.items[index] : this.deletedIndexes[index] ? this.items[index] : this.tmpItems[index] || this.items[index];
                    }
                    [$deleteByIndex](index) {
                        this.items[index] = undefined;
                        this.tmpItems[index] = undefined; // TODO: do not try to get "tmpItems" at decoding time.
                    }
                    [$onEncodeEnd]() {
                        this.tmpItems = this.items.slice();
                        this.deletedIndexes = {};
                    }
                    [$onDecodeEnd]() {
                        this.items = this.items.filter((item)=>item !== undefined);
                        this.tmpItems = this.items.slice(); // TODO: do no use "tmpItems" at decoding time.
                    }
                    toArray() {
                        return this.items.slice(0);
                    }
                    toJSON() {
                        return this.toArray().map((value)=>{
                            return typeof value['toJSON'] === "function" ? value['toJSON']() : value;
                        });
                    }
                    //
                    // Decoding utilities
                    //
                    clone(isDecoding) {
                        let cloned;
                        if (isDecoding) {
                            cloned = new ArraySchema();
                            cloned.push(...this.items);
                        } else cloned = new ArraySchema(...this.map((item)=>item[$changes] ? item.clone() : item));
                        return cloned;
                    }
                }
                registerType("array", {
                    constructor: ArraySchema
                });
                var _a$3, _b$3;
                class MapSchema {
                    static{
                        this[_a$3] = encodeKeyValueOperation;
                    }
                    static{
                        this[_b$3] = decodeKeyValueOperation;
                    }
                    /**
    		         * Determine if a property must be filtered.
    		         * - If returns false, the property is NOT going to be encoded.
    		         * - If returns true, the property is going to be encoded.
    		         *
    		         * Encoding with "filters" happens in two steps:
    		         * - First, the encoder iterates over all "not owned" properties and encodes them.
    		         * - Then, the encoder iterates over all "owned" properties per instance and encodes them.
    		         */ static [(_a$3 = $encoder, _b$3 = $decoder, $filter)](ref, index, view) {
                        return !view || typeof ref[$childType] === "string" || view.isChangeTreeVisible((ref[$getByIndex](index) ?? ref.deletedItems[index])[$changes]);
                    }
                    static is(type) {
                        return type['map'] !== undefined;
                    }
                    constructor(initialValues){
                        this.$items = new Map();
                        this.$indexes = new Map();
                        this.deletedItems = {};
                        const changeTree = new ChangeTree(this);
                        changeTree.indexes = {};
                        Object.defineProperty(this, $changes, {
                            value: changeTree,
                            enumerable: false,
                            writable: true
                        });
                        if (initialValues) {
                            if (initialValues instanceof Map || initialValues instanceof MapSchema) initialValues.forEach((v, k)=>this.set(k, v));
                            else for(const k in initialValues)this.set(k, initialValues[k]);
                        }
                        Object.defineProperty(this, $childType, {
                            value: undefined,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        });
                    }
                    /** Iterator */ [Symbol.iterator]() {
                        return this.$items[Symbol.iterator]();
                    }
                    get [Symbol.toStringTag]() {
                        return this.$items[Symbol.toStringTag];
                    }
                    static get [Symbol.species]() {
                        return MapSchema;
                    }
                    set(key, value) {
                        if (value === undefined || value === null) throw new Error(`MapSchema#set('${key}', ${value}): trying to set ${value} value on '${key}'.`);
                        else if (typeof value === "object" && this[$childType]) assertInstanceType(value, this[$childType], this, key);
                        // Force "key" as string
                        // See: https://github.com/colyseus/colyseus/issues/561#issuecomment-1646733468
                        key = key.toString();
                        const changeTree = this[$changes];
                        const isRef = value[$changes] !== undefined;
                        let index;
                        let operation;
                        // IS REPLACE?
                        if (typeof changeTree.indexes[key] !== "undefined") {
                            index = changeTree.indexes[key];
                            operation = exports1.OPERATION.REPLACE;
                            const previousValue = this.$items.get(key);
                            if (previousValue === value) // if value is the same, avoid re-encoding it.
                            return;
                            else if (isRef) {
                                // if is schema, force ADD operation if value differ from previous one.
                                operation = exports1.OPERATION.DELETE_AND_ADD;
                                // remove reference from previous value
                                if (previousValue !== undefined) previousValue[$changes].root?.remove(previousValue[$changes]);
                            }
                            if (this.deletedItems[index]) delete this.deletedItems[index];
                        } else {
                            index = changeTree.indexes[$numFields] ?? 0;
                            operation = exports1.OPERATION.ADD;
                            this.$indexes.set(index, key);
                            changeTree.indexes[key] = index;
                            changeTree.indexes[$numFields] = index + 1;
                        }
                        this.$items.set(key, value);
                        changeTree.change(index, operation);
                        //
                        // set value's parent after the value is set
                        // (to avoid encoding "refId" operations before parent's "ADD" operation)
                        //
                        if (isRef) value[$changes].setParent(this, changeTree.root, index);
                        return this;
                    }
                    get(key) {
                        return this.$items.get(key);
                    }
                    delete(key) {
                        const index = this[$changes].indexes[key];
                        this.deletedItems[index] = this[$changes].delete(index);
                        return this.$items.delete(key);
                    }
                    clear() {
                        const changeTree = this[$changes];
                        // discard previous operations.
                        changeTree.discard(true);
                        changeTree.indexes = {};
                        // remove children references
                        changeTree.forEachChild((childChangeTree, _)=>{
                            changeTree.root?.remove(childChangeTree);
                        });
                        // clear previous indexes
                        this.$indexes.clear();
                        // clear items
                        this.$items.clear();
                        changeTree.operation(exports1.OPERATION.CLEAR);
                    }
                    has(key) {
                        return this.$items.has(key);
                    }
                    forEach(callbackfn) {
                        this.$items.forEach(callbackfn);
                    }
                    entries() {
                        return this.$items.entries();
                    }
                    keys() {
                        return this.$items.keys();
                    }
                    values() {
                        return this.$items.values();
                    }
                    get size() {
                        return this.$items.size;
                    }
                    setIndex(index, key) {
                        this.$indexes.set(index, key);
                    }
                    getIndex(index) {
                        return this.$indexes.get(index);
                    }
                    [$getByIndex](index) {
                        return this.$items.get(this.$indexes.get(index));
                    }
                    [$deleteByIndex](index) {
                        const key = this.$indexes.get(index);
                        this.$items.delete(key);
                        this.$indexes.delete(index);
                    }
                    [$onEncodeEnd]() {
                        const changeTree = this[$changes];
                        // - cleanup changeTree.indexes
                        // - cleanup $indexes
                        for(const indexStr in this.deletedItems){
                            const index = parseInt(indexStr);
                            const key = this.$indexes.get(index);
                            // TODO: refactor this.
                            // it shouldn't be necessary to keep track of indexes both on changeTree and on $indexes
                            delete changeTree.indexes[key];
                            this.$indexes.delete(index);
                        }
                        this.deletedItems = {};
                    }
                    toJSON() {
                        const map = {};
                        this.forEach((value, key)=>{
                            map[key] = typeof value['toJSON'] === "function" ? value['toJSON']() : value;
                        });
                        return map;
                    }
                    //
                    // Decoding utilities
                    //
                    // @ts-ignore
                    clone(isDecoding) {
                        let cloned;
                        if (isDecoding) // client-side
                        cloned = Object.assign(new MapSchema(), this);
                        else {
                            // server-side
                            cloned = new MapSchema();
                            this.forEach((value, key)=>{
                                if (value[$changes]) cloned.set(key, value['clone']());
                                else cloned.set(key, value);
                            });
                        }
                        return cloned;
                    }
                }
                registerType("map", {
                    constructor: MapSchema
                });
                var _a$2, _b$2;
                class CollectionSchema {
                    static{
                        this[_a$2] = encodeKeyValueOperation;
                    }
                    static{
                        this[_b$2] = decodeKeyValueOperation;
                    }
                    /**
    		         * Determine if a property must be filtered.
    		         * - If returns false, the property is NOT going to be encoded.
    		         * - If returns true, the property is going to be encoded.
    		         *
    		         * Encoding with "filters" happens in two steps:
    		         * - First, the encoder iterates over all "not owned" properties and encodes them.
    		         * - Then, the encoder iterates over all "owned" properties per instance and encodes them.
    		         */ static [(_a$2 = $encoder, _b$2 = $decoder, $filter)](ref, index, view) {
                        return !view || typeof ref[$childType] === "string" || view.isChangeTreeVisible((ref[$getByIndex](index) ?? ref.deletedItems[index])[$changes]);
                    }
                    static is(type) {
                        return type['collection'] !== undefined;
                    }
                    constructor(initialValues){
                        this.$items = new Map();
                        this.$indexes = new Map();
                        this.deletedItems = {};
                        this.$refId = 0;
                        this[$changes] = new ChangeTree(this);
                        this[$changes].indexes = {};
                        if (initialValues) initialValues.forEach((v)=>this.add(v));
                        Object.defineProperty(this, $childType, {
                            value: undefined,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        });
                    }
                    add(value) {
                        // set "index" for reference.
                        const index = this.$refId++;
                        const isRef = value[$changes] !== undefined;
                        if (isRef) value[$changes].setParent(this, this[$changes].root, index);
                        this[$changes].indexes[index] = index;
                        this.$indexes.set(index, index);
                        this.$items.set(index, value);
                        this[$changes].change(index);
                        return index;
                    }
                    at(index) {
                        const key = Array.from(this.$items.keys())[index];
                        return this.$items.get(key);
                    }
                    entries() {
                        return this.$items.entries();
                    }
                    delete(item) {
                        const entries = this.$items.entries();
                        let index;
                        let entry;
                        while(entry = entries.next()){
                            if (entry.done) break;
                            if (item === entry.value[1]) {
                                index = entry.value[0];
                                break;
                            }
                        }
                        if (index === undefined) return false;
                        this.deletedItems[index] = this[$changes].delete(index);
                        this.$indexes.delete(index);
                        return this.$items.delete(index);
                    }
                    clear() {
                        const changeTree = this[$changes];
                        // discard previous operations.
                        changeTree.discard(true);
                        changeTree.indexes = {};
                        // remove children references
                        changeTree.forEachChild((childChangeTree, _)=>{
                            changeTree.root?.remove(childChangeTree);
                        });
                        // clear previous indexes
                        this.$indexes.clear();
                        // clear items
                        this.$items.clear();
                        changeTree.operation(exports1.OPERATION.CLEAR);
                    }
                    has(value) {
                        return Array.from(this.$items.values()).some((v)=>v === value);
                    }
                    forEach(callbackfn) {
                        this.$items.forEach((value, key, _)=>callbackfn(value, key, this));
                    }
                    values() {
                        return this.$items.values();
                    }
                    get size() {
                        return this.$items.size;
                    }
                    /** Iterator */ [Symbol.iterator]() {
                        return this.$items.values();
                    }
                    setIndex(index, key) {
                        this.$indexes.set(index, key);
                    }
                    getIndex(index) {
                        return this.$indexes.get(index);
                    }
                    [$getByIndex](index) {
                        return this.$items.get(this.$indexes.get(index));
                    }
                    [$deleteByIndex](index) {
                        const key = this.$indexes.get(index);
                        this.$items.delete(key);
                        this.$indexes.delete(index);
                    }
                    [$onEncodeEnd]() {
                        this.deletedItems = {};
                    }
                    toArray() {
                        return Array.from(this.$items.values());
                    }
                    toJSON() {
                        const values = [];
                        this.forEach((value, key)=>{
                            values.push(typeof value['toJSON'] === "function" ? value['toJSON']() : value);
                        });
                        return values;
                    }
                    //
                    // Decoding utilities
                    //
                    clone(isDecoding) {
                        let cloned;
                        if (isDecoding) // client-side
                        cloned = Object.assign(new CollectionSchema(), this);
                        else {
                            // server-side
                            cloned = new CollectionSchema();
                            this.forEach((value)=>{
                                if (value[$changes]) cloned.add(value['clone']());
                                else cloned.add(value);
                            });
                        }
                        return cloned;
                    }
                }
                registerType("collection", {
                    constructor: CollectionSchema
                });
                var _a$1, _b$1;
                class SetSchema {
                    static{
                        this[_a$1] = encodeKeyValueOperation;
                    }
                    static{
                        this[_b$1] = decodeKeyValueOperation;
                    }
                    /**
    		         * Determine if a property must be filtered.
    		         * - If returns false, the property is NOT going to be encoded.
    		         * - If returns true, the property is going to be encoded.
    		         *
    		         * Encoding with "filters" happens in two steps:
    		         * - First, the encoder iterates over all "not owned" properties and encodes them.
    		         * - Then, the encoder iterates over all "owned" properties per instance and encodes them.
    		         */ static [(_a$1 = $encoder, _b$1 = $decoder, $filter)](ref, index, view) {
                        return !view || typeof ref[$childType] === "string" || view.visible.has((ref[$getByIndex](index) ?? ref.deletedItems[index])[$changes]);
                    }
                    static is(type) {
                        return type['set'] !== undefined;
                    }
                    constructor(initialValues){
                        this.$items = new Map();
                        this.$indexes = new Map();
                        this.deletedItems = {};
                        this.$refId = 0;
                        this[$changes] = new ChangeTree(this);
                        this[$changes].indexes = {};
                        if (initialValues) initialValues.forEach((v)=>this.add(v));
                        Object.defineProperty(this, $childType, {
                            value: undefined,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        });
                    }
                    add(value) {
                        // immediatelly return false if value already added.
                        if (this.has(value)) return false;
                        // set "index" for reference.
                        const index = this.$refId++;
                        if (value[$changes] !== undefined) value[$changes].setParent(this, this[$changes].root, index);
                        const operation = this[$changes].indexes[index]?.op ?? exports1.OPERATION.ADD;
                        this[$changes].indexes[index] = index;
                        this.$indexes.set(index, index);
                        this.$items.set(index, value);
                        this[$changes].change(index, operation);
                        return index;
                    }
                    entries() {
                        return this.$items.entries();
                    }
                    delete(item) {
                        const entries = this.$items.entries();
                        let index;
                        let entry;
                        while(entry = entries.next()){
                            if (entry.done) break;
                            if (item === entry.value[1]) {
                                index = entry.value[0];
                                break;
                            }
                        }
                        if (index === undefined) return false;
                        this.deletedItems[index] = this[$changes].delete(index);
                        this.$indexes.delete(index);
                        return this.$items.delete(index);
                    }
                    clear() {
                        const changeTree = this[$changes];
                        // discard previous operations.
                        changeTree.discard(true);
                        changeTree.indexes = {};
                        // clear previous indexes
                        this.$indexes.clear();
                        // clear items
                        this.$items.clear();
                        changeTree.operation(exports1.OPERATION.CLEAR);
                    }
                    has(value) {
                        const values = this.$items.values();
                        let has = false;
                        let entry;
                        while(entry = values.next()){
                            if (entry.done) break;
                            if (value === entry.value) {
                                has = true;
                                break;
                            }
                        }
                        return has;
                    }
                    forEach(callbackfn) {
                        this.$items.forEach((value, key, _)=>callbackfn(value, key, this));
                    }
                    values() {
                        return this.$items.values();
                    }
                    get size() {
                        return this.$items.size;
                    }
                    /** Iterator */ [Symbol.iterator]() {
                        return this.$items.values();
                    }
                    setIndex(index, key) {
                        this.$indexes.set(index, key);
                    }
                    getIndex(index) {
                        return this.$indexes.get(index);
                    }
                    [$getByIndex](index) {
                        return this.$items.get(this.$indexes.get(index));
                    }
                    [$deleteByIndex](index) {
                        const key = this.$indexes.get(index);
                        this.$items.delete(key);
                        this.$indexes.delete(index);
                    }
                    [$onEncodeEnd]() {
                        this.deletedItems = {};
                    }
                    toArray() {
                        return Array.from(this.$items.values());
                    }
                    toJSON() {
                        const values = [];
                        this.forEach((value, key)=>{
                            values.push(typeof value['toJSON'] === "function" ? value['toJSON']() : value);
                        });
                        return values;
                    }
                    //
                    // Decoding utilities
                    //
                    clone(isDecoding) {
                        let cloned;
                        if (isDecoding) // client-side
                        cloned = Object.assign(new SetSchema(), this);
                        else {
                            // server-side
                            cloned = new SetSchema();
                            this.forEach((value)=>{
                                if (value[$changes]) cloned.add(value['clone']());
                                else cloned.add(value);
                            });
                        }
                        return cloned;
                    }
                }
                registerType("set", {
                    constructor: SetSchema
                });
                const DEFAULT_VIEW_TAG = -1;
                function entity(constructor) {
                    TypeContext.register(constructor);
                    return constructor;
                }
                /**
    		     * [See documentation](https://docs.colyseus.io/state/schema/)
    		     *
    		     * Annotate a Schema property to be serializeable.
    		     * \@type()'d fields are automatically flagged as "dirty" for the next patch.
    		     *
    		     * @example Standard usage, with automatic change tracking.
    		     * ```
    		     * \@type("string") propertyName: string;
    		     * ```
    		     *
    		     * @example You can provide the "manual" option if you'd like to manually control your patches via .setDirty().
    		     * ```
    		     * \@type("string", { manual: true })
    		     * ```
    		     */ // export function type(type: DefinitionType, options?: TypeOptions) {
                //     return function ({ get, set }, context: ClassAccessorDecoratorContext): ClassAccessorDecoratorResult<Schema, any> {
                //         if (context.kind !== "accessor") {
                //             throw new Error("@type() is only supported for class accessor properties");
                //         }
                //         const field = context.name.toString();
                //         //
                //         // detect index for this field, considering inheritance
                //         //
                //         const parent = Object.getPrototypeOf(context.metadata);
                //         let fieldIndex: number = context.metadata[$numFields] // current structure already has fields defined
                //             ?? (parent && parent[$numFields]) // parent structure has fields defined
                //             ?? -1; // no fields defined
                //         fieldIndex++;
                //         if (
                //             !parent && // the parent already initializes the `$changes` property
                //             !Metadata.hasFields(context.metadata)
                //         ) {
                //             context.addInitializer(function (this: Ref) {
                //                 Object.defineProperty(this, $changes, {
                //                     value: new ChangeTree(this),
                //                     enumerable: false,
                //                     writable: true
                //                 });
                //             });
                //         }
                //         Metadata.addField(context.metadata, fieldIndex, field, type);
                //         const isArray = ArraySchema.is(type);
                //         const isMap = !isArray && MapSchema.is(type);
                //         // if (options && options.manual) {
                //         //     // do not declare getter/setter descriptor
                //         //     definition.descriptors[field] = {
                //         //         enumerable: true,
                //         //         configurable: true,
                //         //         writable: true,
                //         //     };
                //         //     return;
                //         // }
                //         return {
                //             init(value) {
                //                 // TODO: may need to convert ArraySchema/MapSchema here
                //                 // do not flag change if value is undefined.
                //                 if (value !== undefined) {
                //                     this[$changes].change(fieldIndex);
                //                     // automaticallty transform Array into ArraySchema
                //                     if (isArray) {
                //                         if (!(value instanceof ArraySchema)) {
                //                             value = new ArraySchema(...value);
                //                         }
                //                         value[$childType] = Object.values(type)[0];
                //                     }
                //                     // automaticallty transform Map into MapSchema
                //                     if (isMap) {
                //                         if (!(value instanceof MapSchema)) {
                //                             value = new MapSchema(value);
                //                         }
                //                         value[$childType] = Object.values(type)[0];
                //                     }
                //                     // try to turn provided structure into a Proxy
                //                     if (value['$proxy'] === undefined) {
                //                         if (isMap) {
                //                             value = getMapProxy(value);
                //                         }
                //                     }
                //                 }
                //                 return value;
                //             },
                //             get() {
                //                 return get.call(this);
                //             },
                //             set(value: any) {
                //                 /**
                //                  * Create Proxy for array or map items
                //                  */
                //                 // skip if value is the same as cached.
                //                 if (value === get.call(this)) {
                //                     return;
                //                 }
                //                 if (
                //                     value !== undefined &&
                //                     value !== null
                //                 ) {
                //                     // automaticallty transform Array into ArraySchema
                //                     if (isArray) {
                //                         if (!(value instanceof ArraySchema)) {
                //                             value = new ArraySchema(...value);
                //                         }
                //                         value[$childType] = Object.values(type)[0];
                //                     }
                //                     // automaticallty transform Map into MapSchema
                //                     if (isMap) {
                //                         if (!(value instanceof MapSchema)) {
                //                             value = new MapSchema(value);
                //                         }
                //                         value[$childType] = Object.values(type)[0];
                //                     }
                //                     // try to turn provided structure into a Proxy
                //                     if (value['$proxy'] === undefined) {
                //                         if (isMap) {
                //                             value = getMapProxy(value);
                //                         }
                //                     }
                //                     // flag the change for encoding.
                //                     this[$changes].change(fieldIndex);
                //                     //
                //                     // call setParent() recursively for this and its child
                //                     // structures.
                //                     //
                //                     if (value[$changes]) {
                //                         value[$changes].setParent(
                //                             this,
                //                             this[$changes].root,
                //                             Metadata.getIndex(context.metadata, field),
                //                         );
                //                     }
                //                 } else if (get.call(this)) {
                //                     //
                //                     // Setting a field to `null` or `undefined` will delete it.
                //                     //
                //                     this[$changes].delete(field);
                //                 }
                //                 set.call(this, value);
                //             },
                //         };
                //     }
                // }
                function view(tag = DEFAULT_VIEW_TAG) {
                    return function(target, fieldName) {
                        const constructor = target.constructor;
                        const parentClass = Object.getPrototypeOf(constructor);
                        const parentMetadata = parentClass[Symbol.metadata];
                        // TODO: use Metadata.initialize()
                        const metadata = constructor[Symbol.metadata] ??= Object.assign({}, constructor[Symbol.metadata], parentMetadata ?? Object.create(null));
                        // const fieldIndex = metadata[fieldName];
                        // if (!metadata[fieldIndex]) {
                        //     //
                        //     // detect index for this field, considering inheritance
                        //     //
                        //     metadata[fieldIndex] = {
                        //         type: undefined,
                        //         index: (metadata[$numFields] // current structure already has fields defined
                        //             ?? (parentMetadata && parentMetadata[$numFields]) // parent structure has fields defined
                        //             ?? -1) + 1 // no fields defined
                        //     }
                        // }
                        Metadata.setTag(metadata, fieldName, tag);
                    };
                }
                function type(type, options) {
                    return function(target, field) {
                        const constructor = target.constructor;
                        if (!type) throw new Error(`${constructor.name}: @type() reference provided for "${field}" is undefined. Make sure you don't have any circular dependencies.`);
                        // Normalize type (enum/collection/etc)
                        type = getNormalizedType(type);
                        // for inheritance support
                        TypeContext.register(constructor);
                        const parentClass = Object.getPrototypeOf(constructor);
                        const parentMetadata = parentClass[Symbol.metadata];
                        const metadata = Metadata.initialize(constructor);
                        let fieldIndex = metadata[field];
                        /**
    		             * skip if descriptor already exists for this field (`@deprecated()`)
    		             */ if (metadata[fieldIndex] !== undefined) {
                            if (metadata[fieldIndex].deprecated) // do not create accessors for deprecated properties.
                            return;
                            else if (metadata[fieldIndex].type !== undefined) // trying to define same property multiple times across inheritance.
                            // https://github.com/colyseus/colyseus-unity3d/issues/131#issuecomment-814308572
                            try {
                                throw new Error(`@colyseus/schema: Duplicate '${field}' definition on '${constructor.name}'.\nCheck @type() annotation`);
                            } catch (e) {
                                const definitionAtLine = e.stack.split("\n")[4].trim();
                                throw new Error(`${e.message} ${definitionAtLine}`);
                            }
                        } else {
                            //
                            // detect index for this field, considering inheritance
                            //
                            fieldIndex = metadata[$numFields] // current structure already has fields defined
                             ?? (parentMetadata && parentMetadata[$numFields] // parent structure has fields defined
                            ) ?? -1; // no fields defined
                            fieldIndex++;
                        }
                        if (options && options.manual) Metadata.addField(metadata, fieldIndex, field, type, {
                            // do not declare getter/setter descriptor
                            enumerable: true,
                            configurable: true,
                            writable: true
                        });
                        else {
                            const complexTypeKlass = typeof Object.keys(type)[0] === "string" && getType(Object.keys(type)[0]);
                            const childType = complexTypeKlass ? Object.values(type)[0] : type;
                            Metadata.addField(metadata, fieldIndex, field, type, getPropertyDescriptor(`_${field}`, fieldIndex, childType, complexTypeKlass));
                        }
                    };
                }
                function getPropertyDescriptor(fieldCached, fieldIndex, type, complexTypeKlass) {
                    return {
                        get: function() {
                            return this[fieldCached];
                        },
                        set: function(value) {
                            const previousValue = this[fieldCached] ?? undefined;
                            // skip if value is the same as cached.
                            if (value === previousValue) return;
                            if (value !== undefined && value !== null) {
                                if (complexTypeKlass) {
                                    // automaticallty transform Array into ArraySchema
                                    if (complexTypeKlass.constructor === ArraySchema && !(value instanceof ArraySchema)) value = new ArraySchema(...value);
                                    // automaticallty transform Map into MapSchema
                                    if (complexTypeKlass.constructor === MapSchema && !(value instanceof MapSchema)) value = new MapSchema(value);
                                    value[$childType] = type;
                                } else if (typeof type !== "string") assertInstanceType(value, type, this, fieldCached.substring(1));
                                else assertType(value, type, this, fieldCached.substring(1));
                                const changeTree = this[$changes];
                                //
                                // Replacing existing "ref", remove it from root.
                                //
                                if (previousValue !== undefined && previousValue[$changes]) {
                                    changeTree.root?.remove(previousValue[$changes]);
                                    this.constructor[$track](changeTree, fieldIndex, exports1.OPERATION.DELETE_AND_ADD);
                                } else this.constructor[$track](changeTree, fieldIndex, exports1.OPERATION.ADD);
                                //
                                // call setParent() recursively for this and its child
                                // structures.
                                //
                                value[$changes]?.setParent(this, changeTree.root, fieldIndex);
                            } else if (previousValue !== undefined) //
                            // Setting a field to `null` or `undefined` will delete it.
                            //
                            this[$changes].delete(fieldIndex);
                            this[fieldCached] = value;
                        },
                        enumerable: true,
                        configurable: true
                    };
                }
                /**
    		     * `@deprecated()` flag a field as deprecated.
    		     * The previous `@type()` annotation should remain along with this one.
    		     */ function deprecated(throws = true) {
                    return function(klass, field) {
                        //
                        // FIXME: the following block of code is repeated across `@type()`, `@deprecated()` and `@unreliable()` decorators.
                        //
                        const constructor = klass.constructor;
                        const parentClass = Object.getPrototypeOf(constructor);
                        const parentMetadata = parentClass[Symbol.metadata];
                        const metadata = constructor[Symbol.metadata] ??= Object.assign({}, constructor[Symbol.metadata], parentMetadata ?? Object.create(null));
                        const fieldIndex = metadata[field];
                        // if (!metadata[field]) {
                        //     //
                        //     // detect index for this field, considering inheritance
                        //     //
                        //     metadata[field] = {
                        //         type: undefined,
                        //         index: (metadata[$numFields] // current structure already has fields defined
                        //             ?? (parentMetadata && parentMetadata[$numFields]) // parent structure has fields defined
                        //             ?? -1) + 1 // no fields defined
                        //     }
                        // }
                        metadata[fieldIndex].deprecated = true;
                        if (throws) {
                            metadata[$descriptors] ??= {};
                            metadata[$descriptors][field] = {
                                get: function() {
                                    throw new Error(`${field} is deprecated.`);
                                },
                                set: function(value) {},
                                enumerable: false,
                                configurable: true
                            };
                        }
                        // flag metadata[field] as non-enumerable
                        Object.defineProperty(metadata, fieldIndex, {
                            value: metadata[fieldIndex],
                            enumerable: false,
                            configurable: true
                        });
                    };
                }
                function defineTypes(target, fields, options) {
                    for(let field in fields)type(fields[field], options)(target.prototype, field);
                    return target;
                }
                function schema(fieldsAndMethods, name, inherits = Schema) {
                    const fields = {};
                    const methods = {};
                    const defaultValues = {};
                    const viewTagFields = {};
                    for(let fieldName in fieldsAndMethods){
                        const value = fieldsAndMethods[fieldName];
                        if (typeof value === "object") {
                            if (value['view'] !== undefined) viewTagFields[fieldName] = typeof value['view'] === "boolean" ? DEFAULT_VIEW_TAG : value['view'];
                            fields[fieldName] = getNormalizedType(value);
                            // If no explicit default provided, handle automatic instantiation for collection types
                            if (!Object.prototype.hasOwnProperty.call(value, 'default')) {
                                // TODO: remove Array.isArray() check. Use ['array'] !== undefined only.
                                if (Array.isArray(value) || value['array'] !== undefined) // Collection: Array → new ArraySchema()
                                defaultValues[fieldName] = new ArraySchema();
                                else if (value['map'] !== undefined) // Collection: Map → new MapSchema()
                                defaultValues[fieldName] = new MapSchema();
                                else if (value['collection'] !== undefined) // Collection: Collection → new CollectionSchema()
                                defaultValues[fieldName] = new CollectionSchema();
                                else if (value['set'] !== undefined) // Collection: Set → new SetSchema()
                                defaultValues[fieldName] = new SetSchema();
                                else if (value['type'] !== undefined && Schema.is(value['type'])) // Direct Schema type: Type → new Type()
                                defaultValues[fieldName] = new value['type']();
                            } else defaultValues[fieldName] = value['default'];
                        } else if (typeof value === "function") {
                            if (Schema.is(value)) {
                                // Direct Schema type: Type → new Type()
                                defaultValues[fieldName] = new value();
                                fields[fieldName] = getNormalizedType(value);
                            } else methods[fieldName] = value;
                        } else fields[fieldName] = getNormalizedType(value);
                    }
                    const getDefaultValues = ()=>{
                        const defaults = {};
                        for(const fieldName in defaultValues){
                            const defaultValue = defaultValues[fieldName];
                            // If the default value has a clone method, use it to get a fresh instance
                            if (defaultValue && typeof defaultValue.clone === 'function') defaults[fieldName] = defaultValue.clone();
                            else // Otherwise, use the value as-is (for primitives and non-cloneable objects)
                            defaults[fieldName] = defaultValue;
                        }
                        return defaults;
                    };
                    const klass = Metadata.setFields(class extends inherits {
                        constructor(...args){
                            args[0] = Object.assign({}, getDefaultValues(), args[0]);
                            super(...args);
                        }
                    }, fields);
                    for(let fieldName in viewTagFields)view(viewTagFields[fieldName])(klass.prototype, fieldName);
                    for(let methodName in methods)klass.prototype[methodName] = methods[methodName];
                    if (name) Object.defineProperty(klass, "name", {
                        value: name
                    });
                    klass.extends = (fields, name)=>schema(fields, name, klass);
                    return klass;
                }
                function getIndent(level) {
                    return new Array(level).fill(0).map((_, i)=>i === level - 1 ? `\u{2514}\u{2500} ` : `   `).join("");
                }
                function dumpChanges(schema) {
                    const $root = schema[$changes].root;
                    const dump = {
                        ops: {},
                        refs: []
                    };
                    // for (const refId in $root.changes) {
                    let current = $root.changes.next;
                    while(current){
                        const changeTree = current.changeTree;
                        // skip if ChangeTree is undefined
                        if (changeTree === undefined) {
                            current = current.next;
                            continue;
                        }
                        const changes = changeTree.indexedOperations;
                        dump.refs.push(`refId#${changeTree.refId}`);
                        for(const index in changes){
                            const op = changes[index];
                            const opName = exports1.OPERATION[op];
                            if (!dump.ops[opName]) dump.ops[opName] = 0;
                            dump.ops[exports1.OPERATION[op]]++;
                        }
                        current = current.next;
                    }
                    return dump;
                }
                var _a, _b;
                /**
    		     * Schema encoder / decoder
    		     */ class Schema {
                    static{
                        this[_a] = encodeSchemaOperation;
                    }
                    static{
                        this[_b] = decodeSchemaOperation;
                    }
                    /**
    		         * Assign the property descriptors required to track changes on this instance.
    		         * @param instance
    		         */ static initialize(instance) {
                        Object.defineProperty(instance, $changes, {
                            value: new ChangeTree(instance),
                            enumerable: false,
                            writable: true
                        });
                        Object.defineProperties(instance, instance.constructor[Symbol.metadata]?.[$descriptors] || {});
                    }
                    static is(type) {
                        return typeof type[Symbol.metadata] === "object";
                    // const metadata = type[Symbol.metadata];
                    // return metadata && Object.prototype.hasOwnProperty.call(metadata, -1);
                    }
                    /**
    		         * Track property changes
    		         */ static [(_a = $encoder, _b = $decoder, $track)](changeTree, index, operation = exports1.OPERATION.ADD) {
                        changeTree.change(index, operation);
                    }
                    /**
    		         * Determine if a property must be filtered.
    		         * - If returns false, the property is NOT going to be encoded.
    		         * - If returns true, the property is going to be encoded.
    		         *
    		         * Encoding with "filters" happens in two steps:
    		         * - First, the encoder iterates over all "not owned" properties and encodes them.
    		         * - Then, the encoder iterates over all "owned" properties per instance and encodes them.
    		         */ static [$filter](ref, index, view) {
                        const metadata = ref.constructor[Symbol.metadata];
                        const tag = metadata[index]?.tag;
                        if (view === undefined) // shared pass/encode: encode if doesn't have a tag
                        return tag === undefined;
                        else if (tag === undefined) // view pass: no tag
                        return true;
                        else if (tag === DEFAULT_VIEW_TAG) // view pass: default tag
                        return view.isChangeTreeVisible(ref[$changes]);
                        else {
                            // view pass: custom tag
                            const tags = view.tags?.get(ref[$changes]);
                            return tags && tags.has(tag);
                        }
                    }
                    // allow inherited classes to have a constructor
                    constructor(...args){
                        //
                        // inline
                        // Schema.initialize(this);
                        //
                        Schema.initialize(this);
                        //
                        // Assign initial values
                        //
                        if (args[0]) Object.assign(this, args[0]);
                    }
                    assign(props) {
                        Object.assign(this, props);
                        return this;
                    }
                    /**
    		         * (Server-side): Flag a property to be encoded for the next patch.
    		         * @param instance Schema instance
    		         * @param property string representing the property name, or number representing the index of the property.
    		         * @param operation OPERATION to perform (detected automatically)
    		         */ setDirty(property, operation) {
                        const metadata = this.constructor[Symbol.metadata];
                        this[$changes].change(metadata[metadata[property]].index, operation);
                    }
                    clone() {
                        const cloned = new this.constructor;
                        const metadata = this.constructor[Symbol.metadata];
                        //
                        // TODO: clone all properties, not only annotated ones
                        //
                        // for (const field in this) {
                        for(const fieldIndex in metadata){
                            // const field = metadata[metadata[fieldIndex]].name;
                            const field = metadata[fieldIndex].name;
                            if (typeof this[field] === "object" && typeof this[field]?.clone === "function") // deep clone
                            cloned[field] = this[field].clone();
                            else // primitive values
                            cloned[field] = this[field];
                        }
                        return cloned;
                    }
                    toJSON() {
                        const obj = {};
                        const metadata = this.constructor[Symbol.metadata];
                        for(const index in metadata){
                            const field = metadata[index];
                            const fieldName = field.name;
                            if (!field.deprecated && this[fieldName] !== null && typeof this[fieldName] !== "undefined") obj[fieldName] = typeof this[fieldName]['toJSON'] === "function" ? this[fieldName]['toJSON']() : this[fieldName];
                        }
                        return obj;
                    }
                    /**
    		         * Used in tests only
    		         * @internal
    		         */ discardAllChanges() {
                        this[$changes].discardAll();
                    }
                    [$getByIndex](index) {
                        const metadata = this.constructor[Symbol.metadata];
                        return this[metadata[index].name];
                    }
                    [$deleteByIndex](index) {
                        const metadata = this.constructor[Symbol.metadata];
                        this[metadata[index].name] = undefined;
                    }
                    /**
    		         * Inspect the `refId` of all Schema instances in the tree. Optionally display the contents of the instance.
    		         *
    		         * @param ref Schema instance
    		         * @param showContents display JSON contents of the instance
    		         * @returns
    		         */ static debugRefIds(ref, showContents = false, level = 0, decoder, keyPrefix = "") {
                        const contents = showContents ? ` - ${JSON.stringify(ref.toJSON())}` : "";
                        const changeTree = ref[$changes];
                        const refId = decoder ? decoder.root.refIds.get(ref) : changeTree.refId;
                        const root = decoder ? decoder.root : changeTree.root;
                        // log reference count if > 1
                        const refCount = root?.refCount?.[refId] > 1 ? ` [\xd7${root.refCount[refId]}]` : '';
                        let output = `${getIndent(level)}${keyPrefix}${ref.constructor.name} (refId: ${refId})${refCount}${contents}\n`;
                        changeTree.forEachChild((childChangeTree, indexOrKey)=>{
                            let key = indexOrKey;
                            if (typeof indexOrKey === 'number' && ref['$indexes']) // MapSchema
                            key = ref['$indexes'].get(indexOrKey) ?? indexOrKey;
                            const keyPrefix = ref['forEach'] !== undefined && key !== undefined ? `["${key}"]: ` : "";
                            output += this.debugRefIds(childChangeTree.ref, showContents, level + 1, decoder, keyPrefix);
                        });
                        return output;
                    }
                    static debugRefIdEncodingOrder(ref, changeSet = 'allChanges') {
                        let encodeOrder = [];
                        let current = ref[$changes].root[changeSet].next;
                        while(current){
                            if (current.changeTree) encodeOrder.push(current.changeTree.refId);
                            current = current.next;
                        }
                        return encodeOrder;
                    }
                    static debugRefIdsFromDecoder(decoder) {
                        return this.debugRefIds(decoder.state, false, 0, decoder);
                    }
                    /**
    		         * Return a string representation of the changes on a Schema instance.
    		         * The list of changes is cleared after each encode.
    		         *
    		         * @param instance Schema instance
    		         * @param isEncodeAll Return "full encode" instead of current change set.
    		         * @returns
    		         */ static debugChanges(instance, isEncodeAll = false) {
                        const changeTree = instance[$changes];
                        const changeSet = isEncodeAll ? changeTree.allChanges : changeTree.changes;
                        const changeSetName = isEncodeAll ? "allChanges" : "changes";
                        let output = `${instance.constructor.name} (${changeTree.refId}) -> .${changeSetName}:\n`;
                        function dumpChangeSet(changeSet) {
                            changeSet.operations.filter((op)=>op).forEach((index)=>{
                                const operation = changeTree.indexedOperations[index];
                                output += `- [${index}]: ${exports1.OPERATION[operation]} (${JSON.stringify(changeTree.getValue(Number(index), isEncodeAll))})\n`;
                            });
                        }
                        dumpChangeSet(changeSet);
                        // display filtered changes
                        if (!isEncodeAll && changeTree.filteredChanges && changeTree.filteredChanges.operations.filter((op)=>op).length > 0) {
                            output += `${instance.constructor.name} (${changeTree.refId}) -> .filteredChanges:\n`;
                            dumpChangeSet(changeTree.filteredChanges);
                        }
                        // display filtered changes
                        if (isEncodeAll && changeTree.allFilteredChanges && changeTree.allFilteredChanges.operations.filter((op)=>op).length > 0) {
                            output += `${instance.constructor.name} (${changeTree.refId}) -> .allFilteredChanges:\n`;
                            dumpChangeSet(changeTree.allFilteredChanges);
                        }
                        return output;
                    }
                    static debugChangesDeep(ref, changeSetName = "changes") {
                        let output = "";
                        const rootChangeTree = ref[$changes];
                        const root = rootChangeTree.root;
                        const changeTrees = new Map();
                        const instanceRefIds = [];
                        let totalOperations = 0;
                        // TODO: FIXME: this method is not working as expected
                        for (const [refId, changes] of Object.entries(root[changeSetName])){
                            const changeTree = root.changeTrees[refId];
                            if (!changeTree) continue;
                            let includeChangeTree = false;
                            let parentChangeTrees = [];
                            let parentChangeTree = changeTree.parent?.[$changes];
                            if (changeTree === rootChangeTree) includeChangeTree = true;
                            else while(parentChangeTree !== undefined){
                                parentChangeTrees.push(parentChangeTree);
                                if (parentChangeTree.ref === ref) {
                                    includeChangeTree = true;
                                    break;
                                }
                                parentChangeTree = parentChangeTree.parent?.[$changes];
                            }
                            if (includeChangeTree) {
                                instanceRefIds.push(changeTree.refId);
                                totalOperations += Object.keys(changes).length;
                                changeTrees.set(changeTree, parentChangeTrees.reverse());
                            }
                        }
                        output += "---\n";
                        output += `root refId: ${rootChangeTree.refId}\n`;
                        output += `Total instances: ${instanceRefIds.length} (refIds: ${instanceRefIds.join(", ")})\n`;
                        output += `Total changes: ${totalOperations}\n`;
                        output += "---\n";
                        // based on root.changes, display a tree of changes that has the "ref" instance as parent
                        const visitedParents = new WeakSet();
                        for (const [changeTree, parentChangeTrees] of changeTrees.entries()){
                            parentChangeTrees.forEach((parentChangeTree, level)=>{
                                if (!visitedParents.has(parentChangeTree)) {
                                    output += `${getIndent(level)}${parentChangeTree.ref.constructor.name} (refId: ${parentChangeTree.refId})\n`;
                                    visitedParents.add(parentChangeTree);
                                }
                            });
                            const changes = changeTree.indexedOperations;
                            const level = parentChangeTrees.length;
                            const indent = getIndent(level);
                            const parentIndex = level > 0 ? `(${changeTree.parentIndex}) ` : "";
                            output += `${indent}${parentIndex}${changeTree.ref.constructor.name} (refId: ${changeTree.refId}) - changes: ${Object.keys(changes).length}\n`;
                            for(const index in changes){
                                const operation = changes[index];
                                output += `${getIndent(level + 1)}${exports1.OPERATION[operation]}: ${index}\n`;
                            }
                        }
                        return `${output}`;
                    }
                }
                /******************************************************************************
    		    Copyright (c) Microsoft Corporation.

    		    Permission to use, copy, modify, and/or distribute this software for any
    		    purpose with or without fee is hereby granted.

    		    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    		    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    		    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    		    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    		    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    		    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    		    PERFORMANCE OF THIS SOFTWARE.
    		    ***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ function __decorate(decorators, target, key, desc) {
                    var c = arguments.length, r = c < 3 ? target : desc, d;
                    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                    return c > 3 && r && Object.defineProperty(target, key, r), r;
                }
                typeof SuppressedError === "function" && SuppressedError;
                class Root {
                    constructor(types){
                        this.types = types;
                        this.nextUniqueId = 0;
                        this.refCount = {};
                        this.changeTrees = {};
                        // all changes
                        this.allChanges = createChangeTreeList();
                        this.allFilteredChanges = createChangeTreeList(); // TODO: do not initialize it if filters are not used
                        // pending changes to be encoded
                        this.changes = createChangeTreeList();
                        this.filteredChanges = createChangeTreeList(); // TODO: do not initialize it if filters are not used
                    }
                    getNextUniqueId() {
                        return this.nextUniqueId++;
                    }
                    add(changeTree) {
                        // Assign unique `refId` to changeTree if it doesn't have one yet.
                        if (changeTree.refId === undefined) changeTree.refId = this.getNextUniqueId();
                        const isNewChangeTree = this.changeTrees[changeTree.refId] === undefined;
                        if (isNewChangeTree) this.changeTrees[changeTree.refId] = changeTree;
                        const previousRefCount = this.refCount[changeTree.refId];
                        if (previousRefCount === 0) {
                            //
                            // When a ChangeTree is re-added, it means that it was previously removed.
                            // We need to re-add all changes to the `changes` map.
                            //
                            const ops = changeTree.allChanges.operations;
                            let len = ops.length;
                            while(len--){
                                changeTree.indexedOperations[ops[len]] = exports1.OPERATION.ADD;
                                setOperationAtIndex(changeTree.changes, len);
                            }
                        }
                        this.refCount[changeTree.refId] = (previousRefCount || 0) + 1;
                        // console.log("ADD", { refId: changeTree.refId, ref: changeTree.ref.constructor.name, refCount: this.refCount[changeTree.refId], isNewChangeTree });
                        return isNewChangeTree;
                    }
                    remove(changeTree) {
                        const refCount = this.refCount[changeTree.refId] - 1;
                        // console.log("REMOVE", { refId: changeTree.refId, ref: changeTree.ref.constructor.name, refCount, needRemove: refCount <= 0 });
                        if (refCount <= 0) {
                            //
                            // Only remove "root" reference if it's the last reference
                            //
                            changeTree.root = undefined;
                            delete this.changeTrees[changeTree.refId];
                            this.removeChangeFromChangeSet("allChanges", changeTree);
                            this.removeChangeFromChangeSet("changes", changeTree);
                            if (changeTree.filteredChanges) {
                                this.removeChangeFromChangeSet("allFilteredChanges", changeTree);
                                this.removeChangeFromChangeSet("filteredChanges", changeTree);
                            }
                            this.refCount[changeTree.refId] = 0;
                            changeTree.forEachChild((child, _)=>{
                                if (child.removeParent(changeTree.ref)) {
                                    if (child.parentChain === undefined || // no parent, remove it
                                    child.parentChain && this.refCount[child.refId] > 0 // parent is still in use, but has more than one reference, remove it
                                    ) this.remove(child);
                                    else if (child.parentChain) // re-assigning a child of the same root, move it next to parent
                                    this.moveNextToParent(child);
                                }
                            });
                        } else {
                            this.refCount[changeTree.refId] = refCount;
                            //
                            // When losing a reference to an instance, it is best to move the
                            // ChangeTree next to its parent in the encoding queue.
                            //
                            // This way, at decoding time, the instance that contains the
                            // ChangeTree will be available before the ChangeTree itself. If the
                            // containing instance is not available, the Decoder will throw
                            // "refId not found" error.
                            //
                            this.recursivelyMoveNextToParent(changeTree);
                        }
                        return refCount;
                    }
                    recursivelyMoveNextToParent(changeTree) {
                        this.moveNextToParent(changeTree);
                        changeTree.forEachChild((child, _)=>this.recursivelyMoveNextToParent(child));
                    }
                    moveNextToParent(changeTree) {
                        if (changeTree.filteredChanges) {
                            this.moveNextToParentInChangeTreeList("filteredChanges", changeTree);
                            this.moveNextToParentInChangeTreeList("allFilteredChanges", changeTree);
                        } else {
                            this.moveNextToParentInChangeTreeList("changes", changeTree);
                            this.moveNextToParentInChangeTreeList("allChanges", changeTree);
                        }
                    }
                    moveNextToParentInChangeTreeList(changeSetName, changeTree) {
                        const changeSet = this[changeSetName];
                        const node = changeTree[changeSetName].queueRootNode;
                        if (!node) return;
                        // Find the parent in the linked list
                        const parent = changeTree.parent;
                        if (!parent || !parent[$changes]) return;
                        const parentNode = parent[$changes][changeSetName]?.queueRootNode;
                        if (!parentNode || parentNode === node) return;
                        // Use cached positions - no iteration needed!
                        const parentPosition = parentNode.position;
                        const childPosition = node.position;
                        // If child is already after parent, no need to move
                        if (childPosition > parentPosition) return;
                        // Child is before parent, so we need to move it after parent
                        // This maintains decoding order (parent before child)
                        // Remove node from current position
                        if (node.prev) node.prev.next = node.next;
                        else changeSet.next = node.next;
                        if (node.next) node.next.prev = node.prev;
                        else changeSet.tail = node.prev;
                        // Insert node right after parent
                        node.prev = parentNode;
                        node.next = parentNode.next;
                        if (parentNode.next) parentNode.next.prev = node;
                        else changeSet.tail = node;
                        parentNode.next = node;
                        // Update positions after the move
                        this.updatePositionsAfterMove(changeSet, node, parentPosition + 1);
                    }
                    enqueueChangeTree(changeTree, changeSet, queueRootNode = changeTree[changeSet].queueRootNode) {
                        // skip
                        if (queueRootNode) return;
                        // Add to linked list if not already present
                        changeTree[changeSet].queueRootNode = this.addToChangeTreeList(this[changeSet], changeTree);
                    }
                    addToChangeTreeList(list, changeTree) {
                        const node = {
                            changeTree,
                            next: undefined,
                            prev: undefined,
                            position: list.tail ? list.tail.position + 1 : 0
                        };
                        if (!list.next) {
                            list.next = node;
                            list.tail = node;
                        } else {
                            node.prev = list.tail;
                            list.tail.next = node;
                            list.tail = node;
                        }
                        return node;
                    }
                    updatePositionsAfterRemoval(list, removedPosition) {
                        // Update positions for all nodes after the removed position
                        let current = list.next;
                        let position = 0;
                        while(current){
                            if (position >= removedPosition) current.position = position;
                            current = current.next;
                            position++;
                        }
                    }
                    updatePositionsAfterMove(list, node, newPosition) {
                        // Recalculate all positions - this is more reliable than trying to be clever
                        let current = list.next;
                        let position = 0;
                        while(current){
                            current.position = position;
                            current = current.next;
                            position++;
                        }
                    }
                    removeChangeFromChangeSet(changeSetName, changeTree) {
                        const changeSet = this[changeSetName];
                        const node = changeTree[changeSetName].queueRootNode;
                        if (node && node.changeTree === changeTree) {
                            const removedPosition = node.position;
                            // Remove the node from the linked list
                            if (node.prev) node.prev.next = node.next;
                            else changeSet.next = node.next;
                            if (node.next) node.next.prev = node.prev;
                            else changeSet.tail = node.prev;
                            // Update positions for nodes that came after the removed node
                            this.updatePositionsAfterRemoval(changeSet, removedPosition);
                            // Clear ChangeTree reference
                            changeTree[changeSetName].queueRootNode = undefined;
                            return true;
                        }
                        return false;
                    }
                }
                class Encoder {
                    static{
                        this.BUFFER_SIZE = typeof Buffer !== "undefined" && Buffer.poolSize || 8192;
                    }
                    constructor(state){
                        this.sharedBuffer = Buffer.allocUnsafe(Encoder.BUFFER_SIZE);
                        //
                        // Use .cache() here to avoid re-creating a new context for every new room instance.
                        //
                        // We may need to make this optional in case of dynamically created
                        // schemas - which would lead to memory leaks
                        //
                        this.context = TypeContext.cache(state.constructor);
                        this.root = new Root(this.context);
                        this.setState(state);
                    // console.log(">>>>>>>>>>>>>>>> Encoder types");
                    // this.context.schemas.forEach((id, schema) => {
                    //     console.log("type:", id, schema.name, Object.keys(schema[Symbol.metadata]));
                    // });
                    }
                    setState(state) {
                        this.state = state;
                        this.state[$changes].setRoot(this.root);
                    }
                    encode(it = {
                        offset: 0
                    }, view, buffer = this.sharedBuffer, changeSetName = "changes", isEncodeAll = changeSetName === "allChanges", initialOffset = it.offset // cache current offset in case we need to resize the buffer
                    ) {
                        const hasView = view !== undefined;
                        const rootChangeTree = this.state[$changes];
                        let current = this.root[changeSetName];
                        while(current = current.next){
                            const changeTree = current.changeTree;
                            if (hasView) {
                                if (!view.isChangeTreeVisible(changeTree)) {
                                    // console.log("MARK AS INVISIBLE:", { ref: changeTree.ref.constructor.name, refId: changeTree.refId, raw: changeTree.ref.toJSON() });
                                    view.invisible.add(changeTree);
                                    continue; // skip this change tree
                                }
                                view.invisible.delete(changeTree); // remove from invisible list
                            }
                            const changeSet = changeTree[changeSetName];
                            const ref = changeTree.ref;
                            // TODO: avoid iterating over change tree if no changes were made
                            const numChanges = changeSet.operations.length;
                            if (numChanges === 0) continue;
                            const ctor = ref.constructor;
                            const encoder = ctor[$encoder];
                            const filter = ctor[$filter];
                            const metadata = ctor[Symbol.metadata];
                            // skip root `refId` if it's the first change tree
                            // (unless it "hasView", which will need to revisit the root)
                            if (hasView || it.offset > initialOffset || changeTree !== rootChangeTree) {
                                buffer[it.offset++] = SWITCH_TO_STRUCTURE & 255;
                                encode.number(buffer, changeTree.refId, it);
                            }
                            for(let j = 0; j < numChanges; j++){
                                const fieldIndex = changeSet.operations[j];
                                if (fieldIndex < 0) {
                                    // "pure" operation without fieldIndex (e.g. CLEAR, REVERSE, etc.)
                                    // encode and continue early - no need to reach $filter check
                                    buffer[it.offset++] = Math.abs(fieldIndex) & 255;
                                    continue;
                                }
                                const operation = isEncodeAll ? exports1.OPERATION.ADD : changeTree.indexedOperations[fieldIndex];
                                //
                                // first pass (encodeAll), identify "filtered" operations without encoding them
                                // they will be encoded per client, based on their view.
                                //
                                // TODO: how can we optimize filtering out "encode all" operations?
                                // TODO: avoid checking if no view tags were defined
                                //
                                if (fieldIndex === undefined || operation === undefined || filter && !filter(ref, fieldIndex, view)) continue;
                                encoder(this, buffer, changeTree, fieldIndex, operation, it, isEncodeAll, hasView, metadata);
                            }
                        }
                        if (it.offset > buffer.byteLength) {
                            // we can assume that n + 1 poolSize will suffice given that we are likely done with encoding at this point
                            // multiples of poolSize are faster to allocate than arbitrary sizes
                            // if we are on an older platform that doesn't implement pooling use 8kb as poolSize (that's the default for node)
                            const newSize = Math.ceil(it.offset / (Buffer.poolSize ?? 8192)) * (Buffer.poolSize ?? 8192);
                            console.warn(`@colyseus/schema buffer overflow. Encoded state is higher than default BUFFER_SIZE. Use the following to increase default BUFFER_SIZE:

    import { Encoder } from "@colyseus/schema";
    Encoder.BUFFER_SIZE = ${Math.round(newSize / 1024)} * 1024; // ${Math.round(newSize / 1024)} KB
`);
                            //
                            // resize buffer and re-encode (TODO: can we avoid re-encoding here?)
                            // -> No we probably can't unless we catch the need for resize before encoding which is likely more computationally expensive than resizing on demand
                            //
                            buffer = Buffer.alloc(newSize, buffer); // fill with buffer here to memcpy previous encoding steps beyond the initialOffset
                            // assign resized buffer to local sharedBuffer
                            if (buffer === this.sharedBuffer) this.sharedBuffer = buffer;
                            return this.encode({
                                offset: initialOffset
                            }, view, buffer, changeSetName, isEncodeAll);
                        } else return buffer.subarray(0, it.offset);
                    }
                    encodeAll(it = {
                        offset: 0
                    }, buffer = this.sharedBuffer) {
                        return this.encode(it, undefined, buffer, "allChanges", true);
                    }
                    encodeAllView(view, sharedOffset, it, bytes = this.sharedBuffer) {
                        const viewOffset = it.offset;
                        // try to encode "filtered" changes
                        this.encode(it, view, bytes, "allFilteredChanges", true, viewOffset);
                        return Buffer.concat([
                            bytes.subarray(0, sharedOffset),
                            bytes.subarray(viewOffset, it.offset)
                        ]);
                    }
                    debugChanges(field) {
                        const rootChangeSet = typeof field === "string" ? this.root[field] : field;
                        let current = rootChangeSet.next;
                        while(current){
                            const changeTree = current.changeTree;
                            const changeSet = changeTree[field];
                            const metadata = changeTree.ref.constructor[Symbol.metadata];
                            console.log("->", {
                                ref: changeTree.ref.constructor.name,
                                refId: changeTree.refId,
                                changes: Object.keys(changeSet).length
                            });
                            for(const index in changeSet){
                                const op = changeSet[index];
                                console.log("  ->", {
                                    index,
                                    field: metadata?.[index],
                                    op: exports1.OPERATION[op]
                                });
                            }
                            current = current.next;
                        }
                    }
                    encodeView(view, sharedOffset, it, bytes = this.sharedBuffer) {
                        const viewOffset = it.offset;
                        // encode visibility changes (add/remove for this view)
                        for (const [refId, changes] of view.changes){
                            const changeTree = this.root.changeTrees[refId];
                            if (changeTree === undefined) {
                                // detached instance, remove from view and skip.
                                // console.log("detached instance, remove from view and skip.", refId);
                                view.changes.delete(refId);
                                continue;
                            }
                            const keys = Object.keys(changes);
                            if (keys.length === 0) continue;
                            const ref = changeTree.ref;
                            const ctor = ref.constructor;
                            const encoder = ctor[$encoder];
                            const metadata = ctor[Symbol.metadata];
                            bytes[it.offset++] = SWITCH_TO_STRUCTURE & 255;
                            encode.number(bytes, changeTree.refId, it);
                            for(let i = 0, numChanges = keys.length; i < numChanges; i++){
                                const index = Number(keys[i]);
                                // workaround when using view.add() on item that has been deleted from state (see test "adding to view item that has been removed from state")
                                const value = changeTree.ref[$getByIndex](index);
                                const operation = value !== undefined && changes[index] || exports1.OPERATION.DELETE;
                                // isEncodeAll = false
                                // hasView = true
                                encoder(this, bytes, changeTree, index, operation, it, false, true, metadata);
                            }
                        }
                        //
                        // TODO: only clear view changes after all views are encoded
                        // (to allow re-using StateView's for multiple clients)
                        //
                        // clear "view" changes after encoding
                        view.changes.clear();
                        // try to encode "filtered" changes
                        this.encode(it, view, bytes, "filteredChanges", false, viewOffset);
                        return Buffer.concat([
                            bytes.subarray(0, sharedOffset),
                            bytes.subarray(viewOffset, it.offset)
                        ]);
                    }
                    discardChanges() {
                        // discard shared changes
                        let current = this.root.changes.next;
                        while(current){
                            current.changeTree.endEncode('changes');
                            current = current.next;
                        }
                        this.root.changes = createChangeTreeList();
                        // discard filtered changes
                        current = this.root.filteredChanges.next;
                        while(current){
                            current.changeTree.endEncode('filteredChanges');
                            current = current.next;
                        }
                        this.root.filteredChanges = createChangeTreeList();
                    }
                    tryEncodeTypeId(bytes, baseType, targetType, it) {
                        const baseTypeId = this.context.getTypeId(baseType);
                        const targetTypeId = this.context.getTypeId(targetType);
                        if (targetTypeId === undefined) {
                            console.warn(`@colyseus/schema WARNING: Class "${targetType.name}" is not registered on TypeRegistry - Please either tag the class with @entity or define a @type() field.`);
                            return;
                        }
                        if (baseTypeId !== targetTypeId) {
                            bytes[it.offset++] = TYPE_ID & 255;
                            encode.number(bytes, targetTypeId, it);
                        }
                    }
                    get hasChanges() {
                        return this.root.changes.next !== undefined || this.root.filteredChanges.next !== undefined;
                    }
                }
                function spliceOne(arr, index) {
                    // manually splice an array
                    if (index === -1 || index >= arr.length) return false;
                    const len = arr.length - 1;
                    for(let i = index; i < len; i++)arr[i] = arr[i + 1];
                    arr.length = len;
                    return true;
                }
                class DecodingWarning extends Error {
                    constructor(message){
                        super(message);
                        this.name = "DecodingWarning";
                    }
                }
                class ReferenceTracker {
                    constructor(){
                        //
                        // Relation of refId => Schema structure
                        // For direct access of structures during decoding time.
                        //
                        this.refs = new Map();
                        this.refIds = new WeakMap();
                        this.refCount = {};
                        this.deletedRefs = new Set();
                        this.callbacks = {};
                        this.nextUniqueId = 0;
                    }
                    getNextUniqueId() {
                        return this.nextUniqueId++;
                    }
                    // for decoding
                    addRef(refId, ref, incrementCount = true) {
                        this.refs.set(refId, ref);
                        this.refIds.set(ref, refId);
                        if (incrementCount) this.refCount[refId] = (this.refCount[refId] || 0) + 1;
                        if (this.deletedRefs.has(refId)) this.deletedRefs.delete(refId);
                    }
                    // for decoding
                    removeRef(refId) {
                        const refCount = this.refCount[refId];
                        if (refCount === undefined) {
                            try {
                                throw new DecodingWarning("trying to remove refId that doesn't exist: " + refId);
                            } catch (e) {
                                console.warn(e);
                            }
                            return;
                        }
                        if (refCount === 0) {
                            try {
                                const ref = this.refs.get(refId);
                                throw new DecodingWarning(`trying to remove refId '${refId}' with 0 refCount (${ref.constructor.name}: ${JSON.stringify(ref)})`);
                            } catch (e) {
                                console.warn(e);
                            }
                            return;
                        }
                        if ((this.refCount[refId] = refCount - 1) <= 0) this.deletedRefs.add(refId);
                    }
                    clearRefs() {
                        this.refs.clear();
                        this.deletedRefs.clear();
                        this.callbacks = {};
                        this.refCount = {};
                    }
                    // for decoding
                    garbageCollectDeletedRefs() {
                        this.deletedRefs.forEach((refId)=>{
                            //
                            // Skip active references.
                            //
                            if (this.refCount[refId] > 0) return;
                            const ref = this.refs.get(refId);
                            //
                            // Ensure child schema instances have their references removed as well.
                            //
                            if (ref.constructor[Symbol.metadata] !== undefined) {
                                const metadata = ref.constructor[Symbol.metadata];
                                for(const index in metadata){
                                    const field = metadata[index].name;
                                    const childRefId = typeof ref[field] === "object" && this.refIds.get(ref[field]);
                                    if (childRefId && !this.deletedRefs.has(childRefId)) this.removeRef(childRefId);
                                }
                            } else if (typeof ref[$childType] === "function") Array.from(ref.values()).forEach((child)=>{
                                const childRefId = this.refIds.get(child);
                                if (!this.deletedRefs.has(childRefId)) this.removeRef(childRefId);
                            });
                            this.refs.delete(refId); // remove ref
                            delete this.refCount[refId]; // remove ref count
                            delete this.callbacks[refId]; // remove callbacks
                        });
                        // clear deleted refs.
                        this.deletedRefs.clear();
                    }
                    addCallback(refId, fieldOrOperation, callback) {
                        if (refId === undefined) {
                            const name = typeof fieldOrOperation === "number" ? exports1.OPERATION[fieldOrOperation] : fieldOrOperation;
                            throw new Error(`Can't addCallback on '${name}' (refId is undefined)`);
                        }
                        if (!this.callbacks[refId]) this.callbacks[refId] = {};
                        if (!this.callbacks[refId][fieldOrOperation]) this.callbacks[refId][fieldOrOperation] = [];
                        this.callbacks[refId][fieldOrOperation].push(callback);
                        return ()=>this.removeCallback(refId, fieldOrOperation, callback);
                    }
                    removeCallback(refId, field, callback) {
                        const index = this.callbacks?.[refId]?.[field]?.indexOf(callback);
                        if (index !== undefined && index !== -1) spliceOne(this.callbacks[refId][field], index);
                    }
                }
                class Decoder {
                    constructor(root, context){
                        this.currentRefId = 0;
                        this.setState(root);
                        this.context = context || new TypeContext(root.constructor);
                    // console.log(">>>>>>>>>>>>>>>> Decoder types");
                    // this.context.schemas.forEach((id, schema) => {
                    //     console.log("type:", id, schema.name, Object.keys(schema[Symbol.metadata]));
                    // });
                    }
                    setState(root) {
                        this.state = root;
                        this.root = new ReferenceTracker();
                        this.root.addRef(0, root);
                    }
                    decode(bytes, it = {
                        offset: 0
                    }, ref = this.state) {
                        const allChanges = [];
                        const $root = this.root;
                        const totalBytes = bytes.byteLength;
                        let decoder = ref['constructor'][$decoder];
                        this.currentRefId = 0;
                        while(it.offset < totalBytes){
                            //
                            // Peek ahead, check if it's a switch to a different structure
                            //
                            if (bytes[it.offset] == SWITCH_TO_STRUCTURE) {
                                it.offset++;
                                ref[$onDecodeEnd]?.();
                                const nextRefId = decode.number(bytes, it);
                                const nextRef = $root.refs.get(nextRefId);
                                //
                                // Trying to access a reference that haven't been decoded yet.
                                //
                                if (!nextRef) {
                                    // throw new Error(`"refId" not found: ${nextRefId}`);
                                    console.error(`"refId" not found: ${nextRefId}`, {
                                        previousRef: ref,
                                        previousRefId: this.currentRefId
                                    });
                                    console.warn("Please report this issue to the developers.");
                                    this.skipCurrentStructure(bytes, it, totalBytes);
                                } else {
                                    ref = nextRef;
                                    decoder = ref.constructor[$decoder];
                                    this.currentRefId = nextRefId;
                                }
                                continue;
                            }
                            const result = decoder(this, bytes, it, ref, allChanges);
                            if (result === DEFINITION_MISMATCH) {
                                console.warn("@colyseus/schema: definition mismatch");
                                this.skipCurrentStructure(bytes, it, totalBytes);
                                continue;
                            }
                        }
                        // FIXME: DRY with SWITCH_TO_STRUCTURE block.
                        ref[$onDecodeEnd]?.();
                        // trigger changes
                        this.triggerChanges?.(allChanges);
                        // drop references of unused schemas
                        $root.garbageCollectDeletedRefs();
                        return allChanges;
                    }
                    skipCurrentStructure(bytes, it, totalBytes) {
                        //
                        // keep skipping next bytes until reaches a known structure
                        // by local decoder.
                        //
                        const nextIterator = {
                            offset: it.offset
                        };
                        while(it.offset < totalBytes){
                            if (bytes[it.offset] === SWITCH_TO_STRUCTURE) {
                                nextIterator.offset = it.offset + 1;
                                if (this.root.refs.has(decode.number(bytes, nextIterator))) break;
                            }
                            it.offset++;
                        }
                    }
                    getInstanceType(bytes, it, defaultType) {
                        let type;
                        if (bytes[it.offset] === TYPE_ID) {
                            it.offset++;
                            const type_id = decode.number(bytes, it);
                            type = this.context.get(type_id);
                        }
                        return type || defaultType;
                    }
                    createInstanceOfType(type) {
                        return new type();
                    }
                    removeChildRefs(ref, allChanges) {
                        const needRemoveRef = typeof ref[$childType] !== "string";
                        const refId = this.root.refIds.get(ref);
                        ref.forEach((value, key)=>{
                            allChanges.push({
                                ref: ref,
                                refId,
                                op: exports1.OPERATION.DELETE,
                                field: key,
                                value: undefined,
                                previousValue: value
                            });
                            if (needRemoveRef) this.root.removeRef(this.root.refIds.get(value));
                        });
                    }
                }
                /**
    		     * Reflection
    		     */ class ReflectionField extends Schema {
                }
                __decorate([
                    type("string")
                ], ReflectionField.prototype, "name", void 0);
                __decorate([
                    type("string")
                ], ReflectionField.prototype, "type", void 0);
                __decorate([
                    type("number")
                ], ReflectionField.prototype, "referencedType", void 0);
                class ReflectionType extends Schema {
                    constructor(){
                        super(...arguments);
                        this.fields = new ArraySchema();
                    }
                }
                __decorate([
                    type("number")
                ], ReflectionType.prototype, "id", void 0);
                __decorate([
                    type("number")
                ], ReflectionType.prototype, "extendsId", void 0);
                __decorate([
                    type([
                        ReflectionField
                    ])
                ], ReflectionType.prototype, "fields", void 0);
                class Reflection extends Schema {
                    constructor(){
                        super(...arguments);
                        this.types = new ArraySchema();
                    }
                    /**
    		         * Encodes the TypeContext of an Encoder into a buffer.
    		         *
    		         * @param encoder Encoder instance
    		         * @param it
    		         * @returns
    		         */ static encode(encoder, it = {
                        offset: 0
                    }) {
                        const context = encoder.context;
                        const reflection = new Reflection();
                        const reflectionEncoder = new Encoder(reflection);
                        // rootType is usually the first schema passed to the Encoder
                        // (unless it inherits from another schema)
                        const rootType = context.schemas.get(encoder.state.constructor);
                        if (rootType > 0) reflection.rootType = rootType;
                        const includedTypeIds = new Set();
                        const pendingReflectionTypes = {};
                        // add type to reflection in a way that respects inheritance
                        // (parent types should be added before their children)
                        const addType = (type)=>{
                            if (type.extendsId === undefined || includedTypeIds.has(type.extendsId)) {
                                includedTypeIds.add(type.id);
                                reflection.types.push(type);
                                const deps = pendingReflectionTypes[type.id];
                                if (deps !== undefined) {
                                    delete pendingReflectionTypes[type.id];
                                    deps.forEach((childType)=>addType(childType));
                                }
                            } else {
                                if (pendingReflectionTypes[type.extendsId] === undefined) pendingReflectionTypes[type.extendsId] = [];
                                pendingReflectionTypes[type.extendsId].push(type);
                            }
                        };
                        context.schemas.forEach((typeid, klass)=>{
                            const type = new ReflectionType();
                            type.id = Number(typeid);
                            // support inheritance
                            const inheritFrom = Object.getPrototypeOf(klass);
                            if (inheritFrom !== Schema) type.extendsId = context.schemas.get(inheritFrom);
                            const metadata = klass[Symbol.metadata];
                            //
                            // FIXME: this is a workaround for inherited types without additional fields
                            // if metadata is the same reference as the parent class - it means the class has no own metadata
                            //
                            if (metadata !== inheritFrom[Symbol.metadata]) for(const fieldIndex in metadata){
                                const index = Number(fieldIndex);
                                const fieldName = metadata[index].name;
                                // skip fields from parent classes
                                if (!Object.prototype.hasOwnProperty.call(metadata, fieldName)) continue;
                                const reflectionField = new ReflectionField();
                                reflectionField.name = fieldName;
                                let fieldType;
                                const field = metadata[index];
                                if (typeof field.type === "string") fieldType = field.type;
                                else {
                                    let childTypeSchema;
                                    //
                                    // TODO: refactor below.
                                    //
                                    if (Schema.is(field.type)) {
                                        fieldType = "ref";
                                        childTypeSchema = field.type;
                                    } else {
                                        fieldType = Object.keys(field.type)[0];
                                        if (typeof field.type[fieldType] === "string") fieldType += ":" + field.type[fieldType]; // array:string
                                        else childTypeSchema = field.type[fieldType];
                                    }
                                    reflectionField.referencedType = childTypeSchema ? context.getTypeId(childTypeSchema) : -1;
                                }
                                reflectionField.type = fieldType;
                                type.fields.push(reflectionField);
                            }
                            addType(type);
                        });
                        // in case there are types that were not added due to inheritance
                        for(const typeid in pendingReflectionTypes)pendingReflectionTypes[typeid].forEach((type)=>reflection.types.push(type));
                        const buf = reflectionEncoder.encodeAll(it);
                        return Buffer.from(buf, 0, it.offset);
                    }
                    /**
    		         * Decodes the TypeContext from a buffer into a Decoder instance.
    		         *
    		         * @param bytes Reflection.encode() output
    		         * @param it
    		         * @returns Decoder instance
    		         */ static decode(bytes, it) {
                        const reflection = new Reflection();
                        const reflectionDecoder = new Decoder(reflection);
                        reflectionDecoder.decode(bytes, it);
                        const typeContext = new TypeContext();
                        // 1st pass, initialize metadata + inheritance
                        reflection.types.forEach((reflectionType)=>{
                            const parentClass = typeContext.get(reflectionType.extendsId) ?? Schema;
                            const schema = class _ extends parentClass {
                            };
                            // register for inheritance support
                            TypeContext.register(schema);
                            // // for inheritance support
                            // Metadata.initialize(schema);
                            typeContext.add(schema, reflectionType.id);
                        }, {});
                        // define fields
                        const addFields = (metadata, reflectionType, parentFieldIndex)=>{
                            reflectionType.fields.forEach((field, i)=>{
                                const fieldIndex = parentFieldIndex + i;
                                if (field.referencedType !== undefined) {
                                    let fieldType = field.type;
                                    let refType = typeContext.get(field.referencedType);
                                    // map or array of primitive type (-1)
                                    if (!refType) {
                                        const typeInfo = field.type.split(":");
                                        fieldType = typeInfo[0];
                                        refType = typeInfo[1]; // string
                                    }
                                    if (fieldType === "ref") Metadata.addField(metadata, fieldIndex, field.name, refType);
                                    else Metadata.addField(metadata, fieldIndex, field.name, {
                                        [fieldType]: refType
                                    });
                                } else Metadata.addField(metadata, fieldIndex, field.name, field.type);
                            });
                        };
                        // 2nd pass, set fields
                        reflection.types.forEach((reflectionType)=>{
                            const schema = typeContext.get(reflectionType.id);
                            // for inheritance support
                            const metadata = Metadata.initialize(schema);
                            const inheritedTypes = [];
                            let parentType = reflectionType;
                            do {
                                inheritedTypes.push(parentType);
                                parentType = reflection.types.find((t)=>t.id === parentType.extendsId);
                            }while (parentType);
                            let parentFieldIndex = 0;
                            inheritedTypes.reverse().forEach((reflectionType)=>{
                                // add fields from all inherited classes
                                // TODO: refactor this to avoid adding fields from parent classes
                                addFields(metadata, reflectionType, parentFieldIndex);
                                parentFieldIndex += reflectionType.fields.length;
                            });
                        });
                        const state = new (typeContext.get(reflection.rootType || 0))();
                        return new Decoder(state, typeContext);
                    }
                }
                __decorate([
                    type([
                        ReflectionType
                    ])
                ], Reflection.prototype, "types", void 0);
                __decorate([
                    type("number")
                ], Reflection.prototype, "rootType", void 0);
                function getDecoderStateCallbacks(decoder) {
                    const $root = decoder.root;
                    const callbacks = $root.callbacks;
                    const onAddCalls = new WeakMap();
                    let currentOnAddCallback;
                    decoder.triggerChanges = function(allChanges) {
                        const uniqueRefIds = new Set();
                        for(let i = 0, l = allChanges.length; i < l; i++){
                            const change = allChanges[i];
                            const refId = change.refId;
                            const ref = change.ref;
                            const $callbacks = callbacks[refId];
                            if (!$callbacks) continue;
                            //
                            // trigger onRemove on child structure.
                            //
                            if ((change.op & exports1.OPERATION.DELETE) === exports1.OPERATION.DELETE && change.previousValue instanceof Schema) {
                                const deleteCallbacks = callbacks[$root.refIds.get(change.previousValue)]?.[exports1.OPERATION.DELETE];
                                for(let i = deleteCallbacks?.length - 1; i >= 0; i--)deleteCallbacks[i]();
                            }
                            if (ref instanceof Schema) {
                                //
                                // Handle schema instance
                                //
                                if (!uniqueRefIds.has(refId)) {
                                    // trigger onChange
                                    const replaceCallbacks = $callbacks?.[exports1.OPERATION.REPLACE];
                                    for(let i = replaceCallbacks?.length - 1; i >= 0; i--)replaceCallbacks[i]();
                                }
                                if ($callbacks.hasOwnProperty(change.field)) {
                                    const fieldCallbacks = $callbacks[change.field];
                                    for(let i = fieldCallbacks?.length - 1; i >= 0; i--)fieldCallbacks[i](change.value, change.previousValue);
                                }
                            } else {
                                //
                                // Handle collection of items
                                //
                                if ((change.op & exports1.OPERATION.DELETE) === exports1.OPERATION.DELETE) {
                                    //
                                    // FIXME: `previousValue` should always be available.
                                    //
                                    if (change.previousValue !== undefined) {
                                        // triger onRemove
                                        const deleteCallbacks = $callbacks[exports1.OPERATION.DELETE];
                                        for(let i = deleteCallbacks?.length - 1; i >= 0; i--)deleteCallbacks[i](change.previousValue, change.dynamicIndex ?? change.field);
                                    }
                                    // Handle DELETE_AND_ADD operations
                                    if ((change.op & exports1.OPERATION.ADD) === exports1.OPERATION.ADD) {
                                        const addCallbacks = $callbacks[exports1.OPERATION.ADD];
                                        for(let i = addCallbacks?.length - 1; i >= 0; i--)addCallbacks[i](change.value, change.dynamicIndex ?? change.field);
                                    }
                                } else if ((change.op & exports1.OPERATION.ADD) === exports1.OPERATION.ADD && change.previousValue !== change.value) {
                                    // triger onAdd
                                    const addCallbacks = $callbacks[exports1.OPERATION.ADD];
                                    for(let i = addCallbacks?.length - 1; i >= 0; i--)addCallbacks[i](change.value, change.dynamicIndex ?? change.field);
                                }
                                // trigger onChange
                                if (change.value !== change.previousValue && // FIXME: see "should not encode item if added and removed at the same patch" test case.
                                // some "ADD" + "DELETE" operations on same patch are being encoded as "DELETE"
                                (change.value !== undefined || change.previousValue !== undefined)) {
                                    const replaceCallbacks = $callbacks[exports1.OPERATION.REPLACE];
                                    for(let i = replaceCallbacks?.length - 1; i >= 0; i--)replaceCallbacks[i](change.value, change.dynamicIndex ?? change.field);
                                }
                            }
                            uniqueRefIds.add(refId);
                        }
                    };
                    function getProxy(metadataOrType, context) {
                        let metadata = context.instance?.constructor[Symbol.metadata] || metadataOrType;
                        let isCollection = context.instance && typeof context.instance['forEach'] === "function" || metadataOrType && typeof metadataOrType[Symbol.metadata] === "undefined";
                        if (metadata && !isCollection) {
                            const onAddListen = function(ref, prop, callback, immediate) {
                                // immediate trigger
                                if (immediate && context.instance[prop] !== undefined && !onAddCalls.has(currentOnAddCallback) // Workaround for https://github.com/colyseus/schema/issues/147
                                ) callback(context.instance[prop], undefined);
                                return $root.addCallback($root.refIds.get(ref), prop, callback);
                            };
                            /**
    		                 * Schema instances
    		                 */ return new Proxy({
                                listen: function listen(prop, callback, immediate = true) {
                                    if (context.instance) return onAddListen(context.instance, prop, callback, immediate);
                                    else {
                                        // collection instance not received yet
                                        let detachCallback = ()=>{};
                                        context.onInstanceAvailable((ref, existing)=>{
                                            detachCallback = onAddListen(ref, prop, callback, immediate && existing && !onAddCalls.has(currentOnAddCallback));
                                        });
                                        return ()=>detachCallback();
                                    }
                                },
                                onChange: function onChange(callback) {
                                    return $root.addCallback($root.refIds.get(context.instance), exports1.OPERATION.REPLACE, callback);
                                },
                                //
                                // TODO: refactor `bindTo()` implementation.
                                // There is room for improvement.
                                //
                                bindTo: function bindTo(targetObject, properties) {
                                    if (!properties) properties = Object.keys(metadata).map((index)=>metadata[index].name);
                                    return $root.addCallback($root.refIds.get(context.instance), exports1.OPERATION.REPLACE, ()=>{
                                        properties.forEach((prop)=>targetObject[prop] = context.instance[prop]);
                                    });
                                }
                            }, {
                                get (target, prop) {
                                    const metadataField = metadata[metadata[prop]];
                                    if (metadataField) {
                                        const instance = context.instance?.[prop];
                                        const onInstanceAvailable = (callback)=>{
                                            const unbind = $(context.instance).listen(prop, (value, _)=>{
                                                callback(value, false);
                                                // FIXME: by "unbinding" the callback here,
                                                // it will not support when the server
                                                // re-instantiates the instance.
                                                //
                                                unbind?.();
                                            }, false);
                                            // has existing value
                                            if ($root.refIds.get(instance) !== undefined) callback(instance, true);
                                        };
                                        return getProxy(metadataField.type, {
                                            // make sure refId is available, otherwise need to wait for the instance to be available.
                                            instance: $root.refIds.get(instance) && instance,
                                            parentInstance: context.instance,
                                            onInstanceAvailable
                                        });
                                    } else // accessing the function
                                    return target[prop];
                                },
                                has (target, prop) {
                                    return metadata[prop] !== undefined;
                                },
                                set (_, _1, _2) {
                                    throw new Error("not allowed");
                                },
                                deleteProperty (_, _1) {
                                    throw new Error("not allowed");
                                }
                            });
                        } else {
                            /**
    		                 * Collection instances
    		                 */ const onAdd = function(ref, callback, immediate) {
                                // Trigger callback on existing items
                                if (immediate) ref.forEach((v, k)=>callback(v, k));
                                return $root.addCallback($root.refIds.get(ref), exports1.OPERATION.ADD, (value, key)=>{
                                    onAddCalls.set(callback, true);
                                    currentOnAddCallback = callback;
                                    callback(value, key);
                                    onAddCalls.delete(callback);
                                    currentOnAddCallback = undefined;
                                });
                            };
                            const onRemove = function(ref, callback) {
                                return $root.addCallback($root.refIds.get(ref), exports1.OPERATION.DELETE, callback);
                            };
                            const onChange = function(ref, callback) {
                                return $root.addCallback($root.refIds.get(ref), exports1.OPERATION.REPLACE, callback);
                            };
                            return new Proxy({
                                onAdd: function(callback, immediate = true) {
                                    //
                                    // https://github.com/colyseus/schema/issues/147
                                    // If parent instance has "onAdd" registered, avoid triggering immediate callback.
                                    //
                                    if (context.instance) return onAdd(context.instance, callback, immediate && !onAddCalls.has(currentOnAddCallback));
                                    else if (context.onInstanceAvailable) {
                                        // collection instance not received yet
                                        let detachCallback = ()=>{};
                                        context.onInstanceAvailable((ref, existing)=>{
                                            detachCallback = onAdd(ref, callback, immediate && existing && !onAddCalls.has(currentOnAddCallback));
                                        });
                                        return ()=>detachCallback();
                                    }
                                },
                                onRemove: function(callback) {
                                    if (context.instance) return onRemove(context.instance, callback);
                                    else if (context.onInstanceAvailable) {
                                        // collection instance not received yet
                                        let detachCallback = ()=>{};
                                        context.onInstanceAvailable((ref)=>{
                                            detachCallback = onRemove(ref, callback);
                                        });
                                        return ()=>detachCallback();
                                    }
                                },
                                onChange: function(callback) {
                                    if (context.instance) return onChange(context.instance, callback);
                                    else if (context.onInstanceAvailable) {
                                        // collection instance not received yet
                                        let detachCallback = ()=>{};
                                        context.onInstanceAvailable((ref)=>{
                                            detachCallback = onChange(ref, callback);
                                        });
                                        return ()=>detachCallback();
                                    }
                                }
                            }, {
                                get (target, prop) {
                                    if (!target[prop]) throw new Error(`Can't access '${prop}' through callback proxy. access the instance directly.`);
                                    return target[prop];
                                },
                                has (target, prop) {
                                    return target[prop] !== undefined;
                                },
                                set (_, _1, _2) {
                                    throw new Error("not allowed");
                                },
                                deleteProperty (_, _1) {
                                    throw new Error("not allowed");
                                }
                            });
                        }
                    }
                    function $(instance) {
                        return getProxy(undefined, {
                            instance
                        });
                    }
                    return $;
                }
                function getRawChangesCallback(decoder, callback) {
                    decoder.triggerChanges = callback;
                }
                class StateView {
                    constructor(iterable = false){
                        this.iterable = iterable;
                        /**
    		             * List of ChangeTree's that are visible to this view
    		             */ this.visible = new WeakSet();
                        /**
    		             * List of ChangeTree's that are invisible to this view
    		             */ this.invisible = new WeakSet();
                        /**
    		             * Manual "ADD" operations for changes per ChangeTree, specific to this view.
    		             * (This is used to force encoding a property, even if it was not changed)
    		             */ this.changes = new Map();
                        if (iterable) this.items = [];
                    }
                    // TODO: allow to set multiple tags at once
                    add(obj, tag = DEFAULT_VIEW_TAG, checkIncludeParent = true) {
                        const changeTree = obj?.[$changes];
                        const parentChangeTree = changeTree.parent;
                        if (!changeTree) {
                            console.warn("StateView#add(), invalid object:", obj);
                            return false;
                        } else if (!parentChangeTree && changeTree.refId !== 0 // allow root object
                        ) /**
    		                 * TODO: can we avoid this?
    		                 *
    		                 * When the "parent" structure has the @view() tag, it is currently
    		                 * not possible to identify it has to be added to the view as well
    		                 * (this.addParentOf() is not called).
    		                 */ throw new Error(`Cannot add a detached instance to the StateView. Make sure to assign the "${changeTree.ref.constructor.name}" instance to the state before calling view.add()`);
                        // FIXME: ArraySchema/MapSchema do not have metadata
                        const metadata = obj.constructor[Symbol.metadata];
                        this.visible.add(changeTree);
                        // add to iterable list (only the explicitly added items)
                        if (this.iterable && checkIncludeParent) this.items.push(obj);
                        // add parent ChangeTree's
                        // - if it was invisible to this view
                        // - if it were previously filtered out
                        if (checkIncludeParent && parentChangeTree) this.addParentOf(changeTree, tag);
                        let changes = this.changes.get(changeTree.refId);
                        if (changes === undefined) {
                            changes = {};
                            // FIXME / OPTIMIZE: do not add if no changes are needed
                            this.changes.set(changeTree.refId, changes);
                        }
                        let isChildAdded = false;
                        //
                        // Add children of this ChangeTree first.
                        // If successful, we must link the current ChangeTree to the child.
                        //
                        changeTree.forEachChild((change, index)=>{
                            // Do not ADD children that don't have the same tag
                            if (metadata && metadata[index].tag !== undefined && metadata[index].tag !== tag) return;
                            if (this.add(change.ref, tag, false)) isChildAdded = true;
                        });
                        // set tag
                        if (tag !== DEFAULT_VIEW_TAG) {
                            if (!this.tags) this.tags = new WeakMap();
                            let tags;
                            if (!this.tags.has(changeTree)) {
                                tags = new Set();
                                this.tags.set(changeTree, tags);
                            } else tags = this.tags.get(changeTree);
                            tags.add(tag);
                            // Ref: add tagged properties
                            metadata?.[$fieldIndexesByViewTag]?.[tag]?.forEach((index)=>{
                                if (changeTree.getChange(index) !== exports1.OPERATION.DELETE) changes[index] = exports1.OPERATION.ADD;
                            });
                        } else if (!changeTree.isNew || isChildAdded) {
                            // new structures will be added as part of .encode() call, no need to force it to .encodeView()
                            const changeSet = changeTree.filteredChanges !== undefined ? changeTree.allFilteredChanges : changeTree.allChanges;
                            const isInvisible = this.invisible.has(changeTree);
                            for(let i = 0, len = changeSet.operations.length; i < len; i++){
                                const index = changeSet.operations[i];
                                if (index === undefined) continue;
                                 // skip "undefined" indexes
                                const op = changeTree.indexedOperations[index] ?? exports1.OPERATION.ADD;
                                const tagAtIndex = metadata?.[index].tag;
                                if (op !== exports1.OPERATION.DELETE && (isInvisible || // if "invisible", include all
                                tagAtIndex === undefined || // "all change" with no tag
                                tagAtIndex === tag // tagged property
                                )) {
                                    changes[index] = op;
                                    isChildAdded = true; // FIXME: assign only once
                                }
                            }
                        }
                        return isChildAdded;
                    }
                    addParentOf(childChangeTree, tag) {
                        const changeTree = childChangeTree.parent[$changes];
                        const parentIndex = childChangeTree.parentIndex;
                        if (!this.visible.has(changeTree)) {
                            // view must have all "changeTree" parent tree
                            this.visible.add(changeTree);
                            // add parent's parent
                            const parentChangeTree = changeTree.parent?.[$changes];
                            if (parentChangeTree && parentChangeTree.filteredChanges !== undefined) this.addParentOf(changeTree, tag);
                        // // parent is already available, no need to add it!
                        // if (!this.invisible.has(changeTree)) { return; }
                        }
                        // add parent's tag properties
                        if (changeTree.getChange(parentIndex) !== exports1.OPERATION.DELETE) {
                            let changes = this.changes.get(changeTree.refId);
                            if (changes === undefined) {
                                changes = {};
                                this.changes.set(changeTree.refId, changes);
                            }
                            if (!this.tags) this.tags = new WeakMap();
                            let tags;
                            if (!this.tags.has(changeTree)) {
                                tags = new Set();
                                this.tags.set(changeTree, tags);
                            } else tags = this.tags.get(changeTree);
                            tags.add(tag);
                            changes[parentIndex] = exports1.OPERATION.ADD;
                        }
                    }
                    remove(obj, tag = DEFAULT_VIEW_TAG, _isClear = false) {
                        const changeTree = obj[$changes];
                        if (!changeTree) {
                            console.warn("StateView#remove(), invalid object:", obj);
                            return this;
                        }
                        this.visible.delete(changeTree);
                        // remove from iterable list
                        if (this.iterable && !_isClear // no need to remove during clear(), as it will be cleared entirely
                        ) spliceOne(this.items, this.items.indexOf(obj));
                        const ref = changeTree.ref;
                        const metadata = ref.constructor[Symbol.metadata]; // ArraySchema/MapSchema do not have metadata
                        let changes = this.changes.get(changeTree.refId);
                        if (changes === undefined) {
                            changes = {};
                            this.changes.set(changeTree.refId, changes);
                        }
                        if (tag === DEFAULT_VIEW_TAG) {
                            // parent is collection (Map/Array)
                            const parent = changeTree.parent;
                            if (parent && !Metadata.isValidInstance(parent) && changeTree.isFiltered) {
                                const parentChangeTree = parent[$changes];
                                let changes = this.changes.get(parentChangeTree.refId);
                                if (changes === undefined) {
                                    changes = {};
                                    this.changes.set(parentChangeTree.refId, changes);
                                } else if (changes[changeTree.parentIndex] === exports1.OPERATION.ADD) //
                                // SAME PATCH ADD + REMOVE:
                                // The 'changes' of deleted structure should be ignored.
                                //
                                this.changes.delete(changeTree.refId);
                                // DELETE / DELETE BY REF ID
                                changes[changeTree.parentIndex] = exports1.OPERATION.DELETE;
                                // Remove child schema from visible set
                                this._recursiveDeleteVisibleChangeTree(changeTree);
                            } else // delete all "tagged" properties.
                            metadata?.[$viewFieldIndexes]?.forEach((index)=>changes[index] = exports1.OPERATION.DELETE);
                        } else // delete only tagged properties
                        metadata?.[$fieldIndexesByViewTag][tag].forEach((index)=>changes[index] = exports1.OPERATION.DELETE);
                        // remove tag
                        if (this.tags && this.tags.has(changeTree)) {
                            const tags = this.tags.get(changeTree);
                            if (tag === undefined) // delete all tags
                            this.tags.delete(changeTree);
                            else {
                                // delete specific tag
                                tags.delete(tag);
                                // if tag set is empty, delete it entirely
                                if (tags.size === 0) this.tags.delete(changeTree);
                            }
                        }
                        return this;
                    }
                    has(obj) {
                        return this.visible.has(obj[$changes]);
                    }
                    hasTag(ob, tag = DEFAULT_VIEW_TAG) {
                        const tags = this.tags?.get(ob[$changes]);
                        return tags?.has(tag) ?? false;
                    }
                    clear() {
                        if (!this.iterable) throw new Error("StateView#clear() is only available for iterable StateView's. Use StateView(iterable: true) constructor.");
                        for(let i = 0, l = this.items.length; i < l; i++)this.remove(this.items[i], DEFAULT_VIEW_TAG, true);
                        // clear items array
                        this.items.length = 0;
                    }
                    isChangeTreeVisible(changeTree) {
                        let isVisible = this.visible.has(changeTree);
                        //
                        // TODO: avoid checking for parent visibility, most of the time it's not needed
                        // See test case: 'should not be required to manually call view.add() items to child arrays without @view() tag'
                        //
                        if (!isVisible && changeTree.isVisibilitySharedWithParent) // console.log("CHECK AGAINST PARENT...", {
                        //     ref: changeTree.ref.constructor.name,
                        //     refId: changeTree.refId,
                        //     parent: changeTree.parent.constructor.name,
                        // });
                        {
                            if (this.visible.has(changeTree.parent[$changes])) {
                                this.visible.add(changeTree);
                                isVisible = true;
                            }
                        }
                        return isVisible;
                    }
                    _recursiveDeleteVisibleChangeTree(changeTree) {
                        changeTree.forEachChild((childChangeTree)=>{
                            this.visible.delete(childChangeTree);
                            this._recursiveDeleteVisibleChangeTree(childChangeTree);
                        });
                    }
                }
                registerType("map", {
                    constructor: MapSchema
                });
                registerType("array", {
                    constructor: ArraySchema
                });
                registerType("set", {
                    constructor: SetSchema
                });
                registerType("collection", {
                    constructor: CollectionSchema
                });
                exports1.$changes = $changes;
                exports1.$childType = $childType;
                exports1.$decoder = $decoder;
                exports1.$deleteByIndex = $deleteByIndex;
                exports1.$encoder = $encoder;
                exports1.$filter = $filter;
                exports1.$getByIndex = $getByIndex;
                exports1.$track = $track;
                exports1.ArraySchema = ArraySchema;
                exports1.ChangeTree = ChangeTree;
                exports1.CollectionSchema = CollectionSchema;
                exports1.Decoder = Decoder;
                exports1.Encoder = Encoder;
                exports1.MapSchema = MapSchema;
                exports1.Metadata = Metadata;
                exports1.Reflection = Reflection;
                exports1.ReflectionField = ReflectionField;
                exports1.ReflectionType = ReflectionType;
                exports1.Schema = Schema;
                exports1.SetSchema = SetSchema;
                exports1.StateView = StateView;
                exports1.TypeContext = TypeContext;
                exports1.decode = decode;
                exports1.decodeKeyValueOperation = decodeKeyValueOperation;
                exports1.decodeSchemaOperation = decodeSchemaOperation;
                exports1.defineCustomTypes = defineCustomTypes;
                exports1.defineTypes = defineTypes;
                exports1.deprecated = deprecated;
                exports1.dumpChanges = dumpChanges;
                exports1.encode = encode;
                exports1.encodeArray = encodeArray;
                exports1.encodeKeyValueOperation = encodeKeyValueOperation;
                exports1.encodeSchemaOperation = encodeSchemaOperation;
                exports1.entity = entity;
                exports1.getDecoderStateCallbacks = getDecoderStateCallbacks;
                exports1.getRawChangesCallback = getRawChangesCallback;
                exports1.registerType = registerType;
                exports1.schema = schema;
                exports1.type = type;
                exports1.view = view;
            });
        })(umd$1, umd$1.exports);
        return umd$1.exports;
    }
    var umdExports = requireUmd();
    class H3TransportTransport {
        constructor(events){
            this.events = events;
            this.isOpen = false;
            this.lengthPrefixBuffer = new Uint8Array(9); // 9 bytes is the maximum length of a length prefix
        }
        connect(url, options = {}) {
            const wtOpts = options.fingerprint && {
                // requireUnreliable: true,
                // congestionControl: "default", // "low-latency" || "throughput"
                serverCertificateHashes: [
                    {
                        algorithm: 'sha-256',
                        value: new Uint8Array(options.fingerprint).buffer
                    }
                ]
            } || undefined;
            this.wt = new WebTransport(url, wtOpts);
            this.wt.ready.then((e)=>{
                console.log("WebTransport ready!", e);
                this.isOpen = true;
                this.unreliableReader = this.wt.datagrams.readable.getReader();
                this.unreliableWriter = this.wt.datagrams.writable.getWriter();
                const incomingBidi = this.wt.incomingBidirectionalStreams.getReader();
                incomingBidi.read().then((stream)=>{
                    this.reader = stream.value.readable.getReader();
                    this.writer = stream.value.writable.getWriter();
                    // immediately write room/sessionId for establishing the room connection
                    this.sendSeatReservation(options.room.roomId, options.sessionId, options.reconnectionToken);
                    // start reading incoming data
                    this.readIncomingData();
                    this.readIncomingUnreliableData();
                }).catch((e)=>{
                    console.error("failed to read incoming stream", e);
                    console.error("TODO: close the connection");
                });
            // this.events.onopen(e);
            }).catch((e)=>{
                // this.events.onerror(e);
                // this.events.onclose({ code: e.closeCode, reason: e.reason });
                console.log("WebTransport not ready!", e);
                this._close();
            });
            this.wt.closed.then((e)=>{
                console.log("WebTransport closed w/ success", e);
                this.events.onclose({
                    code: e.closeCode,
                    reason: e.reason
                });
            }).catch((e)=>{
                console.log("WebTransport closed w/ error", e);
                this.events.onerror(e);
                this.events.onclose({
                    code: e.closeCode,
                    reason: e.reason
                });
            }).finally(()=>{
                this._close();
            });
        }
        send(data) {
            const prefixLength = umdExports.encode.number(this.lengthPrefixBuffer, data.length, {
                offset: 0
            });
            const dataWithPrefixedLength = new Uint8Array(prefixLength + data.length);
            dataWithPrefixedLength.set(this.lengthPrefixBuffer.subarray(0, prefixLength), 0);
            dataWithPrefixedLength.set(data, prefixLength);
            this.writer.write(dataWithPrefixedLength);
        }
        sendUnreliable(data) {
            const prefixLength = umdExports.encode.number(this.lengthPrefixBuffer, data.length, {
                offset: 0
            });
            const dataWithPrefixedLength = new Uint8Array(prefixLength + data.length);
            dataWithPrefixedLength.set(this.lengthPrefixBuffer.subarray(0, prefixLength), 0);
            dataWithPrefixedLength.set(data, prefixLength);
            this.unreliableWriter.write(dataWithPrefixedLength);
        }
        close(code, reason) {
            try {
                this.wt.close({
                    closeCode: code,
                    reason: reason
                });
            } catch (e) {
                console.error(e);
            }
        }
        readIncomingData() {
            return __awaiter(this, void 0, void 0, function*() {
                let result;
                while(this.isOpen){
                    try {
                        result = yield this.reader.read();
                        //
                        // a single read may contain multiple messages
                        // each message is prefixed with its length
                        //
                        const messages = result.value;
                        const it = {
                            offset: 0
                        };
                        do {
                            //
                            // QUESTION: should we buffer the message in case it's not fully read?
                            //
                            const length = umdExports.decode.number(messages, it);
                            this.events.onmessage({
                                data: messages.subarray(it.offset, it.offset + length)
                            });
                            it.offset += length;
                        }while (it.offset < messages.length);
                    } catch (e) {
                        if (e.message.indexOf("session is closed") === -1) console.error("H3Transport: failed to read incoming data", e);
                        break;
                    }
                    if (result.done) break;
                }
            });
        }
        readIncomingUnreliableData() {
            return __awaiter(this, void 0, void 0, function*() {
                let result;
                while(this.isOpen){
                    try {
                        result = yield this.unreliableReader.read();
                        //
                        // a single read may contain multiple messages
                        // each message is prefixed with its length
                        //
                        const messages = result.value;
                        const it = {
                            offset: 0
                        };
                        do {
                            //
                            // QUESTION: should we buffer the message in case it's not fully read?
                            //
                            const length = umdExports.decode.number(messages, it);
                            this.events.onmessage({
                                data: messages.subarray(it.offset, it.offset + length)
                            });
                            it.offset += length;
                        }while (it.offset < messages.length);
                    } catch (e) {
                        if (e.message.indexOf("session is closed") === -1) console.error("H3Transport: failed to read incoming data", e);
                        break;
                    }
                    if (result.done) break;
                }
            });
        }
        sendSeatReservation(roomId, sessionId, reconnectionToken) {
            const it = {
                offset: 0
            };
            const bytes = [];
            umdExports.encode.string(bytes, roomId, it);
            umdExports.encode.string(bytes, sessionId, it);
            if (reconnectionToken) umdExports.encode.string(bytes, reconnectionToken, it);
            this.writer.write(new Uint8Array(bytes).buffer);
        }
        _close() {
            this.isOpen = false;
        }
    }
    var browser;
    var hasRequiredBrowser;
    function requireBrowser() {
        if (hasRequiredBrowser) return browser;
        hasRequiredBrowser = 1;
        browser = function() {
            throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
        };
        return browser;
    }
    var browserExports = requireBrowser();
    var NodeWebSocket = /*@__PURE__*/ getDefaultExportFromCjs(browserExports);
    const WebSocket = globalThis.WebSocket || NodeWebSocket;
    class WebSocketTransport {
        constructor(events){
            this.events = events;
        }
        send(data) {
            this.ws.send(data);
        }
        sendUnreliable(data) {
            console.warn("colyseus.js: The WebSocket transport does not support unreliable messages");
        }
        /**
         * @param url URL to connect to
         * @param headers custom headers to send with the connection (only supported in Node.js. Web Browsers do not allow setting custom headers)
         */ connect(url, headers) {
            try {
                // Node or Bun environments (supports custom headers)
                this.ws = new WebSocket(url, {
                    headers,
                    protocols: this.protocols
                });
            } catch (e) {
                // browser environment (custom headers not supported)
                this.ws = new WebSocket(url, this.protocols);
            }
            this.ws.binaryType = 'arraybuffer';
            this.ws.onopen = this.events.onopen;
            this.ws.onmessage = this.events.onmessage;
            this.ws.onclose = this.events.onclose;
            this.ws.onerror = this.events.onerror;
        }
        close(code, reason) {
            this.ws.close(code, reason);
        }
        get isOpen() {
            return this.ws.readyState === WebSocket.OPEN;
        }
    }
    class Connection {
        constructor(protocol){
            this.events = {};
            switch(protocol){
                case "h3":
                    this.transport = new H3TransportTransport(this.events);
                    break;
                default:
                    this.transport = new WebSocketTransport(this.events);
                    break;
            }
        }
        connect(url, options) {
            this.transport.connect.call(this.transport, url, options);
        }
        send(data) {
            this.transport.send(data);
        }
        sendUnreliable(data) {
            this.transport.sendUnreliable(data);
        }
        close(code, reason) {
            this.transport.close(code, reason);
        }
        get isOpen() {
            return this.transport.isOpen;
        }
    }
    // Use codes between 0~127 for lesser throughput (1 byte)
    exports1.Protocol = void 0;
    (function(Protocol) {
        // Room-related (10~19)
        Protocol[Protocol["HANDSHAKE"] = 9] = "HANDSHAKE";
        Protocol[Protocol["JOIN_ROOM"] = 10] = "JOIN_ROOM";
        Protocol[Protocol["ERROR"] = 11] = "ERROR";
        Protocol[Protocol["LEAVE_ROOM"] = 12] = "LEAVE_ROOM";
        Protocol[Protocol["ROOM_DATA"] = 13] = "ROOM_DATA";
        Protocol[Protocol["ROOM_STATE"] = 14] = "ROOM_STATE";
        Protocol[Protocol["ROOM_STATE_PATCH"] = 15] = "ROOM_STATE_PATCH";
        Protocol[Protocol["ROOM_DATA_SCHEMA"] = 16] = "ROOM_DATA_SCHEMA";
        Protocol[Protocol["ROOM_DATA_BYTES"] = 17] = "ROOM_DATA_BYTES";
    })(exports1.Protocol || (exports1.Protocol = {}));
    exports1.ErrorCode = void 0;
    (function(ErrorCode) {
        ErrorCode[ErrorCode["MATCHMAKE_NO_HANDLER"] = 4210] = "MATCHMAKE_NO_HANDLER";
        ErrorCode[ErrorCode["MATCHMAKE_INVALID_CRITERIA"] = 4211] = "MATCHMAKE_INVALID_CRITERIA";
        ErrorCode[ErrorCode["MATCHMAKE_INVALID_ROOM_ID"] = 4212] = "MATCHMAKE_INVALID_ROOM_ID";
        ErrorCode[ErrorCode["MATCHMAKE_UNHANDLED"] = 4213] = "MATCHMAKE_UNHANDLED";
        ErrorCode[ErrorCode["MATCHMAKE_EXPIRED"] = 4214] = "MATCHMAKE_EXPIRED";
        ErrorCode[ErrorCode["AUTH_FAILED"] = 4215] = "AUTH_FAILED";
        ErrorCode[ErrorCode["APPLICATION_ERROR"] = 4216] = "APPLICATION_ERROR";
    })(exports1.ErrorCode || (exports1.ErrorCode = {}));
    const serializers = {};
    function registerSerializer(id, serializer) {
        serializers[id] = serializer;
    }
    function getSerializer(id) {
        const serializer = serializers[id];
        if (!serializer) throw new Error("missing serializer: " + id);
        return serializer;
    }
    /**
     * The MIT License (MIT)
     *
     * Copyright 2016 Andrey Sitnik <andrey@sitnik.ru>
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy of
     * this software and associated documentation files (the "Software"), to deal in
     * the Software without restriction, including without limitation the rights to
     * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
     * the Software, and to permit persons to whom the Software is furnished to do so,
     * subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
     * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
     * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
     * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
     * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     */ const createNanoEvents = ()=>({
            emit (event, ...args) {
                let callbacks = this.events[event] || [];
                for(let i = 0, length = callbacks.length; i < length; i++)callbacks[i](...args);
            },
            events: {},
            on (event, cb) {
                var _a;
                ((_a = this.events[event]) === null || _a === void 0 ? void 0 : _a.push(cb)) || (this.events[event] = [
                    cb
                ]);
                return ()=>{
                    var _a;
                    this.events[event] = (_a = this.events[event]) === null || _a === void 0 ? void 0 : _a.filter((i)=>cb !== i);
                };
            }
        });
    class EventEmitter {
        constructor(){
            this.handlers = [];
        }
        register(cb, once = false) {
            this.handlers.push(cb);
            return this;
        }
        invoke(...args) {
            this.handlers.forEach((handler)=>handler.apply(this, args));
        }
        invokeAsync(...args) {
            return Promise.all(this.handlers.map((handler)=>handler.apply(this, args)));
        }
        remove(cb) {
            const index = this.handlers.indexOf(cb);
            this.handlers[index] = this.handlers[this.handlers.length - 1];
            this.handlers.pop();
        }
        clear() {
            this.handlers = [];
        }
    }
    function createSignal() {
        const emitter = new EventEmitter();
        function register(cb) {
            return emitter.register(cb, this === null);
        }
        register.once = (cb)=>{
            const callback = function(...args) {
                cb.apply(this, args);
                emitter.remove(callback);
            };
            emitter.register(callback);
        };
        register.remove = (cb)=>emitter.remove(cb);
        register.invoke = (...args)=>emitter.invoke(...args);
        register.invokeAsync = (...args)=>emitter.invokeAsync(...args);
        register.clear = ()=>emitter.clear();
        return register;
    }
    //
    // TODO: use a schema interface, which even having duplicate definitions, it could be used to get the callback proxy.
    // 
    // ```ts
    //     export type SchemaCallbackProxy<RoomState> = (<T extends ISchema>(instance: T) => CallbackProxy<T>);
    //     export function getStateCallbacks<T extends ISchema>(room: Room<T>) {
    // ```
    //
    function getStateCallbacks(room) {
        try {
            // SchemaSerializer
            // @ts-ignore
            return umdExports.getDecoderStateCallbacks(room['serializer'].decoder);
        } catch (e) {
            // NoneSerializer
            return undefined;
        }
    }
    class SchemaSerializer {
        setState(encodedState, it) {
            this.decoder.decode(encodedState, it);
        }
        getState() {
            return this.state;
        }
        patch(patches, it) {
            return this.decoder.decode(patches, it);
        }
        teardown() {
            this.decoder.root.clearRefs();
        }
        handshake(bytes, it) {
            if (this.state) {
                //
                // TODO: validate definitions against concreate this.state instance
                //
                umdExports.Reflection.decode(bytes, it); // no-op
                this.decoder = new umdExports.Decoder(this.state);
            } else {
                // initialize reflected state from server
                this.decoder = umdExports.Reflection.decode(bytes, it);
                this.state = this.decoder.state;
            }
        }
    }
    var decoder;
    try {
        decoder = new TextDecoder();
    } catch (error) {}
    var src;
    var srcEnd;
    var position$1 = 0;
    var currentUnpackr = {};
    var currentStructures;
    var srcString;
    var srcStringStart = 0;
    var srcStringEnd = 0;
    var bundledStrings$1;
    var referenceMap;
    var currentExtensions = [];
    var dataView;
    var defaultOptions = {
        useRecords: false,
        mapsAsObjects: true
    };
    class C1Type {
    }
    const C1 = new C1Type();
    C1.name = 'MessagePack 0xC1';
    var sequentialMode = false;
    var inlineObjectReadThreshold = 2;
    var readStruct;
    // no-eval build
    try {
        new Function('');
    } catch (error) {
        // if eval variants are not supported, do not create inline object readers ever
        inlineObjectReadThreshold = Infinity;
    }
    class Unpackr {
        constructor(options){
            if (options) {
                if (options.useRecords === false && options.mapsAsObjects === undefined) options.mapsAsObjects = true;
                if (options.sequential && options.trusted !== false) {
                    options.trusted = true;
                    if (!options.structures && options.useRecords != false) {
                        options.structures = [];
                        if (!options.maxSharedStructures) options.maxSharedStructures = 0;
                    }
                }
                if (options.structures) options.structures.sharedLength = options.structures.length;
                else if (options.getStructures) {
                    (options.structures = []).uninitialized = true; // this is what we use to denote an uninitialized structures
                    options.structures.sharedLength = 0;
                }
                if (options.int64AsNumber) options.int64AsType = 'number';
            }
            Object.assign(this, options);
        }
        unpack(source, options) {
            if (src) // re-entrant execution, save the state and restore it after we do this unpack
            return saveState(()=>{
                clearSource();
                return this ? this.unpack(source, options) : Unpackr.prototype.unpack.call(defaultOptions, source, options);
            });
            if (!source.buffer && source.constructor === ArrayBuffer) source = typeof Buffer !== 'undefined' ? Buffer.from(source) : new Uint8Array(source);
            if (typeof options === 'object') {
                srcEnd = options.end || source.length;
                position$1 = options.start || 0;
            } else {
                position$1 = 0;
                srcEnd = options > -1 ? options : source.length;
            }
            srcStringEnd = 0;
            srcString = null;
            bundledStrings$1 = null;
            src = source;
            // this provides cached access to the data view for a buffer if it is getting reused, which is a recommend
            // technique for getting data from a database where it can be copied into an existing buffer instead of creating
            // new ones
            try {
                dataView = source.dataView || (source.dataView = new DataView(source.buffer, source.byteOffset, source.byteLength));
            } catch (error) {
                // if it doesn't have a buffer, maybe it is the wrong type of object
                src = null;
                if (source instanceof Uint8Array) throw error;
                throw new Error('Source must be a Uint8Array or Buffer but was a ' + (source && typeof source == 'object' ? source.constructor.name : typeof source));
            }
            if (this instanceof Unpackr) {
                currentUnpackr = this;
                if (this.structures) {
                    currentStructures = this.structures;
                    return checkedRead(options);
                } else if (!currentStructures || currentStructures.length > 0) currentStructures = [];
            } else {
                currentUnpackr = defaultOptions;
                if (!currentStructures || currentStructures.length > 0) currentStructures = [];
            }
            return checkedRead(options);
        }
        unpackMultiple(source, forEach) {
            let values, lastPosition = 0;
            try {
                sequentialMode = true;
                let size = source.length;
                let value = this ? this.unpack(source, size) : defaultUnpackr.unpack(source, size);
                if (forEach) {
                    if (forEach(value, lastPosition, position$1) === false) return;
                    while(position$1 < size){
                        lastPosition = position$1;
                        if (forEach(checkedRead(), lastPosition, position$1) === false) return;
                    }
                } else {
                    values = [
                        value
                    ];
                    while(position$1 < size){
                        lastPosition = position$1;
                        values.push(checkedRead());
                    }
                    return values;
                }
            } catch (error) {
                error.lastPosition = lastPosition;
                error.values = values;
                throw error;
            } finally{
                sequentialMode = false;
                clearSource();
            }
        }
        _mergeStructures(loadedStructures, existingStructures) {
            loadedStructures = loadedStructures || [];
            if (Object.isFrozen(loadedStructures)) loadedStructures = loadedStructures.map((structure)=>structure.slice(0));
            for(let i = 0, l = loadedStructures.length; i < l; i++){
                let structure = loadedStructures[i];
                if (structure) {
                    structure.isShared = true;
                    if (i >= 32) structure.highByte = i - 32 >> 5;
                }
            }
            loadedStructures.sharedLength = loadedStructures.length;
            for(let id in existingStructures || [])if (id >= 0) {
                let structure = loadedStructures[id];
                let existing = existingStructures[id];
                if (existing) {
                    if (structure) (loadedStructures.restoreStructures || (loadedStructures.restoreStructures = []))[id] = structure;
                    loadedStructures[id] = existing;
                }
            }
            return this.structures = loadedStructures;
        }
        decode(source, options) {
            return this.unpack(source, options);
        }
    }
    function checkedRead(options) {
        try {
            if (!currentUnpackr.trusted && !sequentialMode) {
                let sharedLength = currentStructures.sharedLength || 0;
                if (sharedLength < currentStructures.length) currentStructures.length = sharedLength;
            }
            let result;
            if (currentUnpackr.randomAccessStructure && src[position$1] < 0x40 && src[position$1] >= 0x20 && readStruct) ;
            else result = read();
            if (bundledStrings$1) {
                position$1 = bundledStrings$1.postBundlePosition;
                bundledStrings$1 = null;
            }
            if (sequentialMode) // we only need to restore the structures if there was an error, but if we completed a read,
            // we can clear this out and keep the structures we read
            currentStructures.restoreStructures = null;
            if (position$1 == srcEnd) {
                // finished reading this source, cleanup references
                if (currentStructures && currentStructures.restoreStructures) restoreStructures();
                currentStructures = null;
                src = null;
                if (referenceMap) referenceMap = null;
            } else if (position$1 > srcEnd) // over read
            throw new Error('Unexpected end of MessagePack data');
            else if (!sequentialMode) {
                let jsonView;
                try {
                    jsonView = JSON.stringify(result, (_, value)=>typeof value === "bigint" ? `${value}n` : value).slice(0, 100);
                } catch (error) {
                    jsonView = '(JSON view not available ' + error + ')';
                }
                throw new Error('Data read, but end of buffer not reached ' + jsonView);
            }
            // else more to read, but we are reading sequentially, so don't clear source yet
            return result;
        } catch (error) {
            if (currentStructures && currentStructures.restoreStructures) restoreStructures();
            clearSource();
            if (error instanceof RangeError || error.message.startsWith('Unexpected end of buffer') || position$1 > srcEnd) error.incomplete = true;
            throw error;
        }
    }
    function restoreStructures() {
        for(let id in currentStructures.restoreStructures)currentStructures[id] = currentStructures.restoreStructures[id];
        currentStructures.restoreStructures = null;
    }
    function read() {
        let token = src[position$1++];
        if (token < 0xa0) {
            if (token < 0x80) {
                if (token < 0x40) return token;
                else {
                    let structure = currentStructures[token & 0x3f] || currentUnpackr.getStructures && loadStructures()[token & 0x3f];
                    if (structure) {
                        if (!structure.read) structure.read = createStructureReader(structure, token & 0x3f);
                        return structure.read();
                    } else return token;
                }
            } else if (token < 0x90) {
                // map
                token -= 0x80;
                if (currentUnpackr.mapsAsObjects) {
                    let object = {};
                    for(let i = 0; i < token; i++){
                        let key = readKey();
                        if (key === '__proto__') key = '__proto_';
                        object[key] = read();
                    }
                    return object;
                } else {
                    let map = new Map();
                    for(let i = 0; i < token; i++)map.set(read(), read());
                    return map;
                }
            } else {
                token -= 0x90;
                let array = new Array(token);
                for(let i = 0; i < token; i++)array[i] = read();
                if (currentUnpackr.freezeData) return Object.freeze(array);
                return array;
            }
        } else if (token < 0xc0) {
            // fixstr
            let length = token - 0xa0;
            if (srcStringEnd >= position$1) return srcString.slice(position$1 - srcStringStart, (position$1 += length) - srcStringStart);
            if (srcStringEnd == 0 && srcEnd < 140) {
                // for small blocks, avoiding the overhead of the extract call is helpful
                let string = length < 16 ? shortStringInJS(length) : longStringInJS(length);
                if (string != null) return string;
            }
            return readFixedString(length);
        } else {
            let value;
            switch(token){
                case 0xc0:
                    return null;
                case 0xc1:
                    if (bundledStrings$1) {
                        value = read(); // followed by the length of the string in characters (not bytes!)
                        if (value > 0) return bundledStrings$1[1].slice(bundledStrings$1.position1, bundledStrings$1.position1 += value);
                        else return bundledStrings$1[0].slice(bundledStrings$1.position0, bundledStrings$1.position0 -= value);
                    }
                    return C1; // "never-used", return special object to denote that
                case 0xc2:
                    return false;
                case 0xc3:
                    return true;
                case 0xc4:
                    // bin 8
                    value = src[position$1++];
                    if (value === undefined) throw new Error('Unexpected end of buffer');
                    return readBin(value);
                case 0xc5:
                    // bin 16
                    value = dataView.getUint16(position$1);
                    position$1 += 2;
                    return readBin(value);
                case 0xc6:
                    // bin 32
                    value = dataView.getUint32(position$1);
                    position$1 += 4;
                    return readBin(value);
                case 0xc7:
                    // ext 8
                    return readExt(src[position$1++]);
                case 0xc8:
                    // ext 16
                    value = dataView.getUint16(position$1);
                    position$1 += 2;
                    return readExt(value);
                case 0xc9:
                    // ext 32
                    value = dataView.getUint32(position$1);
                    position$1 += 4;
                    return readExt(value);
                case 0xca:
                    value = dataView.getFloat32(position$1);
                    if (currentUnpackr.useFloat32 > 2) {
                        // this does rounding of numbers that were encoded in 32-bit float to nearest significant decimal digit that could be preserved
                        let multiplier = mult10[(src[position$1] & 0x7f) << 1 | src[position$1 + 1] >> 7];
                        position$1 += 4;
                        return (multiplier * value + (value > 0 ? 0.5 : -0.5) >> 0) / multiplier;
                    }
                    position$1 += 4;
                    return value;
                case 0xcb:
                    value = dataView.getFloat64(position$1);
                    position$1 += 8;
                    return value;
                // uint handlers
                case 0xcc:
                    return src[position$1++];
                case 0xcd:
                    value = dataView.getUint16(position$1);
                    position$1 += 2;
                    return value;
                case 0xce:
                    value = dataView.getUint32(position$1);
                    position$1 += 4;
                    return value;
                case 0xcf:
                    if (currentUnpackr.int64AsType === 'number') {
                        value = dataView.getUint32(position$1) * 0x100000000;
                        value += dataView.getUint32(position$1 + 4);
                    } else if (currentUnpackr.int64AsType === 'string') value = dataView.getBigUint64(position$1).toString();
                    else if (currentUnpackr.int64AsType === 'auto') {
                        value = dataView.getBigUint64(position$1);
                        if (value <= BigInt(2) << BigInt(52)) value = Number(value);
                    } else value = dataView.getBigUint64(position$1);
                    position$1 += 8;
                    return value;
                // int handlers
                case 0xd0:
                    return dataView.getInt8(position$1++);
                case 0xd1:
                    value = dataView.getInt16(position$1);
                    position$1 += 2;
                    return value;
                case 0xd2:
                    value = dataView.getInt32(position$1);
                    position$1 += 4;
                    return value;
                case 0xd3:
                    if (currentUnpackr.int64AsType === 'number') {
                        value = dataView.getInt32(position$1) * 0x100000000;
                        value += dataView.getUint32(position$1 + 4);
                    } else if (currentUnpackr.int64AsType === 'string') value = dataView.getBigInt64(position$1).toString();
                    else if (currentUnpackr.int64AsType === 'auto') {
                        value = dataView.getBigInt64(position$1);
                        if (value >= BigInt(-2) << BigInt(52) && value <= BigInt(2) << BigInt(52)) value = Number(value);
                    } else value = dataView.getBigInt64(position$1);
                    position$1 += 8;
                    return value;
                case 0xd4:
                    // fixext 1
                    value = src[position$1++];
                    if (value == 0x72) return recordDefinition(src[position$1++] & 0x3f);
                    else {
                        let extension = currentExtensions[value];
                        if (extension) {
                            if (extension.read) {
                                position$1++; // skip filler byte
                                return extension.read(read());
                            } else if (extension.noBuffer) {
                                position$1++; // skip filler byte
                                return extension();
                            } else return extension(src.subarray(position$1, ++position$1));
                        } else throw new Error('Unknown extension ' + value);
                    }
                case 0xd5:
                    // fixext 2
                    value = src[position$1];
                    if (value == 0x72) {
                        position$1++;
                        return recordDefinition(src[position$1++] & 0x3f, src[position$1++]);
                    } else return readExt(2);
                case 0xd6:
                    // fixext 4
                    return readExt(4);
                case 0xd7:
                    // fixext 8
                    return readExt(8);
                case 0xd8:
                    // fixext 16
                    return readExt(16);
                case 0xd9:
                    // str 8
                    value = src[position$1++];
                    if (srcStringEnd >= position$1) return srcString.slice(position$1 - srcStringStart, (position$1 += value) - srcStringStart);
                    return readString8(value);
                case 0xda:
                    // str 16
                    value = dataView.getUint16(position$1);
                    position$1 += 2;
                    if (srcStringEnd >= position$1) return srcString.slice(position$1 - srcStringStart, (position$1 += value) - srcStringStart);
                    return readString16(value);
                case 0xdb:
                    // str 32
                    value = dataView.getUint32(position$1);
                    position$1 += 4;
                    if (srcStringEnd >= position$1) return srcString.slice(position$1 - srcStringStart, (position$1 += value) - srcStringStart);
                    return readString32(value);
                case 0xdc:
                    // array 16
                    value = dataView.getUint16(position$1);
                    position$1 += 2;
                    return readArray(value);
                case 0xdd:
                    // array 32
                    value = dataView.getUint32(position$1);
                    position$1 += 4;
                    return readArray(value);
                case 0xde:
                    // map 16
                    value = dataView.getUint16(position$1);
                    position$1 += 2;
                    return readMap(value);
                case 0xdf:
                    // map 32
                    value = dataView.getUint32(position$1);
                    position$1 += 4;
                    return readMap(value);
                default:
                    if (token >= 0xe0) return token - 0x100;
                    if (token === undefined) {
                        let error = new Error('Unexpected end of MessagePack data');
                        error.incomplete = true;
                        throw error;
                    }
                    throw new Error('Unknown MessagePack token ' + token);
            }
        }
    }
    const validName = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
    function createStructureReader(structure, firstId) {
        function readObject() {
            // This initial function is quick to instantiate, but runs slower. After several iterations pay the cost to build the faster function
            if (readObject.count++ > inlineObjectReadThreshold) {
                let readObject = structure.read = new Function('r', 'return function(){return ' + (currentUnpackr.freezeData ? 'Object.freeze' : '') + '({' + structure.map((key)=>key === '__proto__' ? '__proto_:r()' : validName.test(key) ? key + ':r()' : '[' + JSON.stringify(key) + ']:r()').join(',') + '})}')(read);
                if (structure.highByte === 0) structure.read = createSecondByteReader(firstId, structure.read);
                return readObject() // second byte is already read, if there is one so immediately read object
                ;
            }
            let object = {};
            for(let i = 0, l = structure.length; i < l; i++){
                let key = structure[i];
                if (key === '__proto__') key = '__proto_';
                object[key] = read();
            }
            if (currentUnpackr.freezeData) return Object.freeze(object);
            return object;
        }
        readObject.count = 0;
        if (structure.highByte === 0) return createSecondByteReader(firstId, readObject);
        return readObject;
    }
    const createSecondByteReader = (firstId, read0)=>{
        return function() {
            let highByte = src[position$1++];
            if (highByte === 0) return read0();
            let id = firstId < 32 ? -(firstId + (highByte << 5)) : firstId + (highByte << 5);
            let structure = currentStructures[id] || loadStructures()[id];
            if (!structure) throw new Error('Record id is not defined for ' + id);
            if (!structure.read) structure.read = createStructureReader(structure, firstId);
            return structure.read();
        };
    };
    function loadStructures() {
        let loadedStructures = saveState(()=>{
            // save the state in case getStructures modifies our buffer
            src = null;
            return currentUnpackr.getStructures();
        });
        return currentStructures = currentUnpackr._mergeStructures(loadedStructures, currentStructures);
    }
    var readFixedString = readStringJS;
    var readString8 = readStringJS;
    var readString16 = readStringJS;
    var readString32 = readStringJS;
    function readStringJS(length) {
        let result;
        if (length < 16) {
            if (result = shortStringInJS(length)) return result;
        }
        if (length > 64 && decoder) return decoder.decode(src.subarray(position$1, position$1 += length));
        const end = position$1 + length;
        const units = [];
        result = '';
        while(position$1 < end){
            const byte1 = src[position$1++];
            if ((byte1 & 0x80) === 0) // 1 byte
            units.push(byte1);
            else if ((byte1 & 0xe0) === 0xc0) {
                // 2 bytes
                const byte2 = src[position$1++] & 0x3f;
                units.push((byte1 & 0x1f) << 6 | byte2);
            } else if ((byte1 & 0xf0) === 0xe0) {
                // 3 bytes
                const byte2 = src[position$1++] & 0x3f;
                const byte3 = src[position$1++] & 0x3f;
                units.push((byte1 & 0x1f) << 12 | byte2 << 6 | byte3);
            } else if ((byte1 & 0xf8) === 0xf0) {
                // 4 bytes
                const byte2 = src[position$1++] & 0x3f;
                const byte3 = src[position$1++] & 0x3f;
                const byte4 = src[position$1++] & 0x3f;
                let unit = (byte1 & 0x07) << 0x12 | byte2 << 0x0c | byte3 << 0x06 | byte4;
                if (unit > 0xffff) {
                    unit -= 0x10000;
                    units.push(unit >>> 10 & 0x3ff | 0xd800);
                    unit = 0xdc00 | unit & 0x3ff;
                }
                units.push(unit);
            } else units.push(byte1);
            if (units.length >= 0x1000) {
                result += fromCharCode.apply(String, units);
                units.length = 0;
            }
        }
        if (units.length > 0) result += fromCharCode.apply(String, units);
        return result;
    }
    function readArray(length) {
        let array = new Array(length);
        for(let i = 0; i < length; i++)array[i] = read();
        if (currentUnpackr.freezeData) return Object.freeze(array);
        return array;
    }
    function readMap(length) {
        if (currentUnpackr.mapsAsObjects) {
            let object = {};
            for(let i = 0; i < length; i++){
                let key = readKey();
                if (key === '__proto__') key = '__proto_';
                object[key] = read();
            }
            return object;
        } else {
            let map = new Map();
            for(let i = 0; i < length; i++)map.set(read(), read());
            return map;
        }
    }
    var fromCharCode = String.fromCharCode;
    function longStringInJS(length) {
        let start = position$1;
        let bytes = new Array(length);
        for(let i = 0; i < length; i++){
            const byte = src[position$1++];
            if ((byte & 0x80) > 0) {
                position$1 = start;
                return;
            }
            bytes[i] = byte;
        }
        return fromCharCode.apply(String, bytes);
    }
    function shortStringInJS(length) {
        if (length < 4) {
            if (length < 2) {
                if (length === 0) return '';
                else {
                    let a = src[position$1++];
                    if ((a & 0x80) > 1) {
                        position$1 -= 1;
                        return;
                    }
                    return fromCharCode(a);
                }
            } else {
                let a = src[position$1++];
                let b = src[position$1++];
                if ((a & 0x80) > 0 || (b & 0x80) > 0) {
                    position$1 -= 2;
                    return;
                }
                if (length < 3) return fromCharCode(a, b);
                let c = src[position$1++];
                if ((c & 0x80) > 0) {
                    position$1 -= 3;
                    return;
                }
                return fromCharCode(a, b, c);
            }
        } else {
            let a = src[position$1++];
            let b = src[position$1++];
            let c = src[position$1++];
            let d = src[position$1++];
            if ((a & 0x80) > 0 || (b & 0x80) > 0 || (c & 0x80) > 0 || (d & 0x80) > 0) {
                position$1 -= 4;
                return;
            }
            if (length < 6) {
                if (length === 4) return fromCharCode(a, b, c, d);
                else {
                    let e = src[position$1++];
                    if ((e & 0x80) > 0) {
                        position$1 -= 5;
                        return;
                    }
                    return fromCharCode(a, b, c, d, e);
                }
            } else if (length < 8) {
                let e = src[position$1++];
                let f = src[position$1++];
                if ((e & 0x80) > 0 || (f & 0x80) > 0) {
                    position$1 -= 6;
                    return;
                }
                if (length < 7) return fromCharCode(a, b, c, d, e, f);
                let g = src[position$1++];
                if ((g & 0x80) > 0) {
                    position$1 -= 7;
                    return;
                }
                return fromCharCode(a, b, c, d, e, f, g);
            } else {
                let e = src[position$1++];
                let f = src[position$1++];
                let g = src[position$1++];
                let h = src[position$1++];
                if ((e & 0x80) > 0 || (f & 0x80) > 0 || (g & 0x80) > 0 || (h & 0x80) > 0) {
                    position$1 -= 8;
                    return;
                }
                if (length < 10) {
                    if (length === 8) return fromCharCode(a, b, c, d, e, f, g, h);
                    else {
                        let i = src[position$1++];
                        if ((i & 0x80) > 0) {
                            position$1 -= 9;
                            return;
                        }
                        return fromCharCode(a, b, c, d, e, f, g, h, i);
                    }
                } else if (length < 12) {
                    let i = src[position$1++];
                    let j = src[position$1++];
                    if ((i & 0x80) > 0 || (j & 0x80) > 0) {
                        position$1 -= 10;
                        return;
                    }
                    if (length < 11) return fromCharCode(a, b, c, d, e, f, g, h, i, j);
                    let k = src[position$1++];
                    if ((k & 0x80) > 0) {
                        position$1 -= 11;
                        return;
                    }
                    return fromCharCode(a, b, c, d, e, f, g, h, i, j, k);
                } else {
                    let i = src[position$1++];
                    let j = src[position$1++];
                    let k = src[position$1++];
                    let l = src[position$1++];
                    if ((i & 0x80) > 0 || (j & 0x80) > 0 || (k & 0x80) > 0 || (l & 0x80) > 0) {
                        position$1 -= 12;
                        return;
                    }
                    if (length < 14) {
                        if (length === 12) return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l);
                        else {
                            let m = src[position$1++];
                            if ((m & 0x80) > 0) {
                                position$1 -= 13;
                                return;
                            }
                            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m);
                        }
                    } else {
                        let m = src[position$1++];
                        let n = src[position$1++];
                        if ((m & 0x80) > 0 || (n & 0x80) > 0) {
                            position$1 -= 14;
                            return;
                        }
                        if (length < 15) return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                        let o = src[position$1++];
                        if ((o & 0x80) > 0) {
                            position$1 -= 15;
                            return;
                        }
                        return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
                    }
                }
            }
        }
    }
    function readOnlyJSString() {
        let token = src[position$1++];
        let length;
        if (token < 0xc0) // fixstr
        length = token - 0xa0;
        else switch(token){
            case 0xd9:
                // str 8
                length = src[position$1++];
                break;
            case 0xda:
                // str 16
                length = dataView.getUint16(position$1);
                position$1 += 2;
                break;
            case 0xdb:
                // str 32
                length = dataView.getUint32(position$1);
                position$1 += 4;
                break;
            default:
                throw new Error('Expected string');
        }
        return readStringJS(length);
    }
    function readBin(length) {
        return currentUnpackr.copyBuffers ? // specifically use the copying slice (not the node one)
        Uint8Array.prototype.slice.call(src, position$1, position$1 += length) : src.subarray(position$1, position$1 += length);
    }
    function readExt(length) {
        let type = src[position$1++];
        if (currentExtensions[type]) {
            let end;
            return currentExtensions[type](src.subarray(position$1, end = position$1 += length), (readPosition)=>{
                position$1 = readPosition;
                try {
                    return read();
                } finally{
                    position$1 = end;
                }
            });
        } else throw new Error('Unknown extension type ' + type);
    }
    var keyCache = new Array(4096);
    function readKey() {
        let length = src[position$1++];
        if (length >= 0xa0 && length < 0xc0) {
            // fixstr, potentially use key cache
            length = length - 0xa0;
            if (srcStringEnd >= position$1) return srcString.slice(position$1 - srcStringStart, (position$1 += length) - srcStringStart);
            else if (!(srcStringEnd == 0 && srcEnd < 180)) return readFixedString(length);
        } else {
            position$1--;
            return asSafeString(read());
        }
        let key = (length << 5 ^ (length > 1 ? dataView.getUint16(position$1) : length > 0 ? src[position$1] : 0)) & 0xfff;
        let entry = keyCache[key];
        let checkPosition = position$1;
        let end = position$1 + length - 3;
        let chunk;
        let i = 0;
        if (entry && entry.bytes == length) {
            while(checkPosition < end){
                chunk = dataView.getUint32(checkPosition);
                if (chunk != entry[i++]) {
                    checkPosition = 0x70000000;
                    break;
                }
                checkPosition += 4;
            }
            end += 3;
            while(checkPosition < end){
                chunk = src[checkPosition++];
                if (chunk != entry[i++]) {
                    checkPosition = 0x70000000;
                    break;
                }
            }
            if (checkPosition === end) {
                position$1 = checkPosition;
                return entry.string;
            }
            end -= 3;
            checkPosition = position$1;
        }
        entry = [];
        keyCache[key] = entry;
        entry.bytes = length;
        while(checkPosition < end){
            chunk = dataView.getUint32(checkPosition);
            entry.push(chunk);
            checkPosition += 4;
        }
        end += 3;
        while(checkPosition < end){
            chunk = src[checkPosition++];
            entry.push(chunk);
        }
        // for small blocks, avoiding the overhead of the extract call is helpful
        let string = length < 16 ? shortStringInJS(length) : longStringInJS(length);
        if (string != null) return entry.string = string;
        return entry.string = readFixedString(length);
    }
    function asSafeString(property) {
        // protect against expensive (DoS) string conversions
        if (typeof property === 'string') return property;
        if (typeof property === 'number' || typeof property === 'boolean' || typeof property === 'bigint') return property.toString();
        if (property == null) return property + '';
        if (currentUnpackr.allowArraysInMapKeys && Array.isArray(property) && property.flat().every((item)=>[
                'string',
                'number',
                'boolean',
                'bigint'
            ].includes(typeof item))) return property.flat().toString();
        throw new Error(`Invalid property type for record: ${typeof property}`);
    }
    // the registration of the record definition extension (as "r")
    const recordDefinition = (id, highByte)=>{
        let structure = read().map(asSafeString); // ensure that all keys are strings and
        // that the array is mutable
        let firstByte = id;
        if (highByte !== undefined) {
            id = id < 32 ? -((highByte << 5) + id) : (highByte << 5) + id;
            structure.highByte = highByte;
        }
        let existingStructure = currentStructures[id];
        // If it is a shared structure, we need to restore any changes after reading.
        // Also in sequential mode, we may get incomplete reads and thus errors, and we need to restore
        // to the state prior to an incomplete read in order to properly resume.
        if (existingStructure && (existingStructure.isShared || sequentialMode)) (currentStructures.restoreStructures || (currentStructures.restoreStructures = []))[id] = existingStructure;
        currentStructures[id] = structure;
        structure.read = createStructureReader(structure, firstByte);
        return structure.read();
    };
    currentExtensions[0] = ()=>{}; // notepack defines extension 0 to mean undefined, so use that as the default here
    currentExtensions[0].noBuffer = true;
    currentExtensions[0x42] = (data)=>{
        // decode bigint
        let length = data.length;
        let value = BigInt(data[0] & 0x80 ? data[0] - 0x100 : data[0]);
        for(let i = 1; i < length; i++){
            value <<= BigInt(8);
            value += BigInt(data[i]);
        }
        return value;
    };
    let errors = {
        Error,
        TypeError,
        ReferenceError
    };
    currentExtensions[0x65] = ()=>{
        let data = read();
        return (errors[data[0]] || Error)(data[1], {
            cause: data[2]
        });
    };
    currentExtensions[0x69] = (data)=>{
        // id extension (for structured clones)
        if (currentUnpackr.structuredClone === false) throw new Error('Structured clone extension is disabled');
        let id = dataView.getUint32(position$1 - 4);
        if (!referenceMap) referenceMap = new Map();
        let token = src[position$1];
        let target;
        // TODO: handle Maps, Sets, and other types that can cycle; this is complicated, because you potentially need to read
        // ahead past references to record structure definitions
        if (token >= 0x90 && token < 0xa0 || token == 0xdc || token == 0xdd) target = [];
        else target = {};
        let refEntry = {
            target
        }; // a placeholder object
        referenceMap.set(id, refEntry);
        let targetProperties = read(); // read the next value as the target object to id
        if (refEntry.used) return Object.assign(target, targetProperties);
        refEntry.target = targetProperties; // the placeholder wasn't used, replace with the deserialized one
        return targetProperties // no cycle, can just use the returned read object
        ;
    };
    currentExtensions[0x70] = (data)=>{
        // pointer extension (for structured clones)
        if (currentUnpackr.structuredClone === false) throw new Error('Structured clone extension is disabled');
        let id = dataView.getUint32(position$1 - 4);
        let refEntry = referenceMap.get(id);
        refEntry.used = true;
        return refEntry.target;
    };
    currentExtensions[0x73] = ()=>new Set(read());
    const typedArrays = [
        'Int8',
        'Uint8',
        'Uint8Clamped',
        'Int16',
        'Uint16',
        'Int32',
        'Uint32',
        'Float32',
        'Float64',
        'BigInt64',
        'BigUint64'
    ].map((type)=>type + 'Array');
    let glbl = typeof globalThis === 'object' ? globalThis : window;
    currentExtensions[0x74] = (data)=>{
        let typeCode = data[0];
        let typedArrayName = typedArrays[typeCode];
        if (!typedArrayName) {
            if (typeCode === 16) {
                let ab = new ArrayBuffer(data.length - 1);
                let u8 = new Uint8Array(ab);
                u8.set(data.subarray(1));
                return ab;
            }
            throw new Error('Could not find typed array for code ' + typeCode);
        }
        // we have to always slice/copy here to get a new ArrayBuffer that is word/byte aligned
        return new glbl[typedArrayName](Uint8Array.prototype.slice.call(data, 1).buffer);
    };
    currentExtensions[0x78] = ()=>{
        let data = read();
        return new RegExp(data[0], data[1]);
    };
    const TEMP_BUNDLE = [];
    currentExtensions[0x62] = (data)=>{
        let dataSize = (data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3];
        let dataPosition = position$1;
        position$1 += dataSize - data.length;
        bundledStrings$1 = TEMP_BUNDLE;
        bundledStrings$1 = [
            readOnlyJSString(),
            readOnlyJSString()
        ];
        bundledStrings$1.position0 = 0;
        bundledStrings$1.position1 = 0;
        bundledStrings$1.postBundlePosition = position$1;
        position$1 = dataPosition;
        return read();
    };
    currentExtensions[0xff] = (data)=>{
        // 32-bit date extension
        if (data.length == 4) return new Date((data[0] * 0x1000000 + (data[1] << 16) + (data[2] << 8) + data[3]) * 1000);
        else if (data.length == 8) return new Date(((data[0] << 22) + (data[1] << 14) + (data[2] << 6) + (data[3] >> 2)) / 1000000 + ((data[3] & 0x3) * 0x100000000 + data[4] * 0x1000000 + (data[5] << 16) + (data[6] << 8) + data[7]) * 1000);
        else if (data.length == 12) return new Date(((data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3]) / 1000000 + ((data[4] & 0x80 ? -281474976710656 : 0) + data[6] * 0x10000000000 + data[7] * 0x100000000 + data[8] * 0x1000000 + (data[9] << 16) + (data[10] << 8) + data[11]) * 1000);
        else return new Date('invalid');
    }; // notepack defines extension 0 to mean undefined, so use that as the default here
    // registration of bulk record definition?
    // currentExtensions[0x52] = () =>
    function saveState(callback) {
        let savedSrcEnd = srcEnd;
        let savedPosition = position$1;
        let savedSrcStringStart = srcStringStart;
        let savedSrcStringEnd = srcStringEnd;
        let savedSrcString = srcString;
        let savedReferenceMap = referenceMap;
        let savedBundledStrings = bundledStrings$1;
        // TODO: We may need to revisit this if we do more external calls to user code (since it could be slow)
        let savedSrc = new Uint8Array(src.slice(0, srcEnd)); // we copy the data in case it changes while external data is processed
        let savedStructures = currentStructures;
        let savedStructuresContents = currentStructures.slice(0, currentStructures.length);
        let savedPackr = currentUnpackr;
        let savedSequentialMode = sequentialMode;
        let value = callback();
        srcEnd = savedSrcEnd;
        position$1 = savedPosition;
        srcStringStart = savedSrcStringStart;
        srcStringEnd = savedSrcStringEnd;
        srcString = savedSrcString;
        referenceMap = savedReferenceMap;
        bundledStrings$1 = savedBundledStrings;
        src = savedSrc;
        sequentialMode = savedSequentialMode;
        currentStructures = savedStructures;
        currentStructures.splice(0, currentStructures.length, ...savedStructuresContents);
        currentUnpackr = savedPackr;
        dataView = new DataView(src.buffer, src.byteOffset, src.byteLength);
        return value;
    }
    function clearSource() {
        src = null;
        referenceMap = null;
        currentStructures = null;
    }
    const mult10 = new Array(147); // this is a table matching binary exponents to the multiplier to determine significant digit rounding
    for(let i = 0; i < 256; i++)mult10[i] = +('1e' + Math.floor(45.15 - i * 0.30103));
    var defaultUnpackr = new Unpackr({
        useRecords: false
    });
    const unpack = defaultUnpackr.unpack;
    defaultUnpackr.unpackMultiple;
    defaultUnpackr.unpack;
    let f32Array = new Float32Array(1);
    new Uint8Array(f32Array.buffer, 0, 4);
    let textEncoder;
    try {
        textEncoder = new TextEncoder();
    } catch (error) {}
    let extensions, extensionClasses;
    const hasNodeBuffer = typeof Buffer !== 'undefined';
    const ByteArrayAllocate = hasNodeBuffer ? function(length) {
        return Buffer.allocUnsafeSlow(length);
    } : Uint8Array;
    const ByteArray = hasNodeBuffer ? Buffer : Uint8Array;
    const MAX_BUFFER_SIZE = hasNodeBuffer ? 0x100000000 : 0x7fd00000;
    let target, keysTarget;
    let targetView;
    let position = 0;
    let safeEnd;
    let bundledStrings = null;
    let writeStructSlots;
    const MAX_BUNDLE_SIZE = 0x5500; // maximum characters such that the encoded bytes fits in 16 bits.
    const hasNonLatin = /[\u0080-\uFFFF]/;
    const RECORD_SYMBOL = Symbol('record-id');
    class Packr extends Unpackr {
        constructor(options){
            super(options);
            this.offset = 0;
            let start;
            let hasSharedUpdate;
            let structures;
            let referenceMap;
            let encodeUtf8 = ByteArray.prototype.utf8Write ? function(string, position) {
                return target.utf8Write(string, position, target.byteLength - position);
            } : textEncoder && textEncoder.encodeInto ? function(string, position) {
                return textEncoder.encodeInto(string, target.subarray(position)).written;
            } : false;
            let packr = this;
            if (!options) options = {};
            let isSequential = options && options.sequential;
            let hasSharedStructures = options.structures || options.saveStructures;
            let maxSharedStructures = options.maxSharedStructures;
            if (maxSharedStructures == null) maxSharedStructures = hasSharedStructures ? 32 : 0;
            if (maxSharedStructures > 8160) throw new Error('Maximum maxSharedStructure is 8160');
            if (options.structuredClone && options.moreTypes == undefined) this.moreTypes = true;
            let maxOwnStructures = options.maxOwnStructures;
            if (maxOwnStructures == null) maxOwnStructures = hasSharedStructures ? 32 : 64;
            if (!this.structures && options.useRecords != false) this.structures = [];
            // two byte record ids for shared structures
            let useTwoByteRecords = maxSharedStructures > 32 || maxOwnStructures + maxSharedStructures > 64;
            let sharedLimitId = maxSharedStructures + 0x40;
            let maxStructureId = maxSharedStructures + maxOwnStructures + 0x40;
            if (maxStructureId > 8256) throw new Error('Maximum maxSharedStructure + maxOwnStructure is 8192');
            let recordIdsToRemove = [];
            let transitionsCount = 0;
            let serializationsSinceTransitionRebuild = 0;
            this.pack = this.encode = function(value, encodeOptions) {
                if (!target) {
                    target = new ByteArrayAllocate(8192);
                    targetView = target.dataView || (target.dataView = new DataView(target.buffer, 0, 8192));
                    position = 0;
                }
                safeEnd = target.length - 10;
                if (safeEnd - position < 0x800) {
                    // don't start too close to the end,
                    target = new ByteArrayAllocate(target.length);
                    targetView = target.dataView || (target.dataView = new DataView(target.buffer, 0, target.length));
                    safeEnd = target.length - 10;
                    position = 0;
                } else position = position + 7 & 0x7ffffff8; // Word align to make any future copying of this buffer faster
                start = position;
                if (encodeOptions & RESERVE_START_SPACE) position += encodeOptions & 0xff;
                referenceMap = packr.structuredClone ? new Map() : null;
                if (packr.bundleStrings && typeof value !== 'string') {
                    bundledStrings = [];
                    bundledStrings.size = Infinity; // force a new bundle start on first string
                } else bundledStrings = null;
                structures = packr.structures;
                if (structures) {
                    if (structures.uninitialized) structures = packr._mergeStructures(packr.getStructures());
                    let sharedLength = structures.sharedLength || 0;
                    if (sharedLength > maxSharedStructures) //if (maxSharedStructures <= 32 && structures.sharedLength > 32) // TODO: could support this, but would need to update the limit ids
                    throw new Error('Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to ' + structures.sharedLength);
                    if (!structures.transitions) {
                        // rebuild our structure transitions
                        structures.transitions = Object.create(null);
                        for(let i = 0; i < sharedLength; i++){
                            let keys = structures[i];
                            if (!keys) continue;
                            let nextTransition, transition = structures.transitions;
                            for(let j = 0, l = keys.length; j < l; j++){
                                let key = keys[j];
                                nextTransition = transition[key];
                                if (!nextTransition) nextTransition = transition[key] = Object.create(null);
                                transition = nextTransition;
                            }
                            transition[RECORD_SYMBOL] = i + 0x40;
                        }
                        this.lastNamedStructuresLength = sharedLength;
                    }
                    if (!isSequential) structures.nextId = sharedLength + 0x40;
                }
                if (hasSharedUpdate) hasSharedUpdate = false;
                let encodingError;
                try {
                    if (packr.randomAccessStructure && value && value.constructor && value.constructor === Object) writeStruct(value);
                    else pack(value);
                    let lastBundle = bundledStrings;
                    if (bundledStrings) writeBundles(start, pack, 0);
                    if (referenceMap && referenceMap.idsToInsert) {
                        let idsToInsert = referenceMap.idsToInsert.sort((a, b)=>a.offset > b.offset ? 1 : -1);
                        let i = idsToInsert.length;
                        let incrementPosition = -1;
                        while(lastBundle && i > 0){
                            let insertionPoint = idsToInsert[--i].offset + start;
                            if (insertionPoint < lastBundle.stringsPosition + start && incrementPosition === -1) incrementPosition = 0;
                            if (insertionPoint > lastBundle.position + start) {
                                if (incrementPosition >= 0) incrementPosition += 6;
                            } else {
                                if (incrementPosition >= 0) {
                                    // update the bundle reference now
                                    targetView.setUint32(lastBundle.position + start, targetView.getUint32(lastBundle.position + start) + incrementPosition);
                                    incrementPosition = -1; // reset
                                }
                                lastBundle = lastBundle.previous;
                                i++;
                            }
                        }
                        if (incrementPosition >= 0 && lastBundle) // update the bundle reference now
                        targetView.setUint32(lastBundle.position + start, targetView.getUint32(lastBundle.position + start) + incrementPosition);
                        position += idsToInsert.length * 6;
                        if (position > safeEnd) makeRoom(position);
                        packr.offset = position;
                        let serialized = insertIds(target.subarray(start, position), idsToInsert);
                        referenceMap = null;
                        return serialized;
                    }
                    packr.offset = position; // update the offset so next serialization doesn't write over our buffer, but can continue writing to same buffer sequentially
                    if (encodeOptions & REUSE_BUFFER_MODE) {
                        target.start = start;
                        target.end = position;
                        return target;
                    }
                    return target.subarray(start, position) // position can change if we call pack again in saveStructures, so we get the buffer now
                    ;
                } catch (error) {
                    encodingError = error;
                    throw error;
                } finally{
                    if (structures) {
                        resetStructures();
                        if (hasSharedUpdate && packr.saveStructures) {
                            let sharedLength = structures.sharedLength || 0;
                            // we can't rely on start/end with REUSE_BUFFER_MODE since they will (probably) change when we save
                            let returnBuffer = target.subarray(start, position);
                            let newSharedData = prepareStructures(structures, packr);
                            if (!encodingError) {
                                if (packr.saveStructures(newSharedData, newSharedData.isCompatible) === false) // get updated structures and try again if the update failed
                                return packr.pack(value, encodeOptions);
                                packr.lastNamedStructuresLength = sharedLength;
                                // don't keep large buffers around
                                if (target.length > 0x40000000) target = null;
                                return returnBuffer;
                            }
                        }
                    }
                    // don't keep large buffers around, they take too much memory and cause problems (limit at 1GB)
                    if (target.length > 0x40000000) target = null;
                    if (encodeOptions & RESET_BUFFER_MODE) position = start;
                }
            };
            const resetStructures = ()=>{
                if (serializationsSinceTransitionRebuild < 10) serializationsSinceTransitionRebuild++;
                let sharedLength = structures.sharedLength || 0;
                if (structures.length > sharedLength && !isSequential) structures.length = sharedLength;
                if (transitionsCount > 10000) {
                    // force a rebuild occasionally after a lot of transitions so it can get cleaned up
                    structures.transitions = null;
                    serializationsSinceTransitionRebuild = 0;
                    transitionsCount = 0;
                    if (recordIdsToRemove.length > 0) recordIdsToRemove = [];
                } else if (recordIdsToRemove.length > 0 && !isSequential) {
                    for(let i = 0, l = recordIdsToRemove.length; i < l; i++)recordIdsToRemove[i][RECORD_SYMBOL] = 0;
                    recordIdsToRemove = [];
                }
            };
            const packArray = (value)=>{
                var length = value.length;
                if (length < 0x10) target[position++] = 0x90 | length;
                else if (length < 0x10000) {
                    target[position++] = 0xdc;
                    target[position++] = length >> 8;
                    target[position++] = length & 0xff;
                } else {
                    target[position++] = 0xdd;
                    targetView.setUint32(position, length);
                    position += 4;
                }
                for(let i = 0; i < length; i++)pack(value[i]);
            };
            const pack = (value)=>{
                if (position > safeEnd) target = makeRoom(position);
                var type = typeof value;
                var length;
                if (type === 'string') {
                    let strLength = value.length;
                    if (bundledStrings && strLength >= 4 && strLength < 0x1000) {
                        if ((bundledStrings.size += strLength) > MAX_BUNDLE_SIZE) {
                            let extStart;
                            let maxBytes = (bundledStrings[0] ? bundledStrings[0].length * 3 + bundledStrings[1].length : 0) + 10;
                            if (position + maxBytes > safeEnd) target = makeRoom(position + maxBytes);
                            let lastBundle;
                            if (bundledStrings.position) {
                                lastBundle = bundledStrings;
                                target[position] = 0xc8; // ext 16
                                position += 3; // reserve for the writing bundle size
                                target[position++] = 0x62; // 'b'
                                extStart = position - start;
                                position += 4; // reserve for writing bundle reference
                                writeBundles(start, pack, 0); // write the last bundles
                                targetView.setUint16(extStart + start - 3, position - start - extStart);
                            } else {
                                target[position++] = 0xd6; // fixext 4
                                target[position++] = 0x62; // 'b'
                                extStart = position - start;
                                position += 4; // reserve for writing bundle reference
                            }
                            bundledStrings = [
                                '',
                                ''
                            ]; // create new ones
                            bundledStrings.previous = lastBundle;
                            bundledStrings.size = 0;
                            bundledStrings.position = extStart;
                        }
                        let twoByte = hasNonLatin.test(value);
                        bundledStrings[twoByte ? 0 : 1] += value;
                        target[position++] = 0xc1;
                        pack(twoByte ? -strLength : strLength);
                        return;
                    }
                    let headerSize;
                    // first we estimate the header size, so we can write to the correct location
                    if (strLength < 0x20) headerSize = 1;
                    else if (strLength < 0x100) headerSize = 2;
                    else if (strLength < 0x10000) headerSize = 3;
                    else headerSize = 5;
                    let maxBytes = strLength * 3;
                    if (position + maxBytes > safeEnd) target = makeRoom(position + maxBytes);
                    if (strLength < 0x40 || !encodeUtf8) {
                        let i, c1, c2, strPosition = position + headerSize;
                        for(i = 0; i < strLength; i++){
                            c1 = value.charCodeAt(i);
                            if (c1 < 0x80) target[strPosition++] = c1;
                            else if (c1 < 0x800) {
                                target[strPosition++] = c1 >> 6 | 0xc0;
                                target[strPosition++] = c1 & 0x3f | 0x80;
                            } else if ((c1 & 0xfc00) === 0xd800 && ((c2 = value.charCodeAt(i + 1)) & 0xfc00) === 0xdc00) {
                                c1 = 0x10000 + ((c1 & 0x03ff) << 10) + (c2 & 0x03ff);
                                i++;
                                target[strPosition++] = c1 >> 18 | 0xf0;
                                target[strPosition++] = c1 >> 12 & 0x3f | 0x80;
                                target[strPosition++] = c1 >> 6 & 0x3f | 0x80;
                                target[strPosition++] = c1 & 0x3f | 0x80;
                            } else {
                                target[strPosition++] = c1 >> 12 | 0xe0;
                                target[strPosition++] = c1 >> 6 & 0x3f | 0x80;
                                target[strPosition++] = c1 & 0x3f | 0x80;
                            }
                        }
                        length = strPosition - position - headerSize;
                    } else length = encodeUtf8(value, position + headerSize);
                    if (length < 0x20) target[position++] = 0xa0 | length;
                    else if (length < 0x100) {
                        if (headerSize < 2) target.copyWithin(position + 2, position + 1, position + 1 + length);
                        target[position++] = 0xd9;
                        target[position++] = length;
                    } else if (length < 0x10000) {
                        if (headerSize < 3) target.copyWithin(position + 3, position + 2, position + 2 + length);
                        target[position++] = 0xda;
                        target[position++] = length >> 8;
                        target[position++] = length & 0xff;
                    } else {
                        if (headerSize < 5) target.copyWithin(position + 5, position + 3, position + 3 + length);
                        target[position++] = 0xdb;
                        targetView.setUint32(position, length);
                        position += 4;
                    }
                    position += length;
                } else if (type === 'number') {
                    if (value >>> 0 === value) {
                        // positive uint
                        if (value < 0x20 || value < 0x80 && this.useRecords === false || value < 0x40 && !this.randomAccessStructure) target[position++] = value;
                        else if (value < 0x100) {
                            target[position++] = 0xcc;
                            target[position++] = value;
                        } else if (value < 0x10000) {
                            target[position++] = 0xcd;
                            target[position++] = value >> 8;
                            target[position++] = value & 0xff;
                        } else {
                            target[position++] = 0xce;
                            targetView.setUint32(position, value);
                            position += 4;
                        }
                    } else if (value >> 0 === value) {
                        if (value >= -32) target[position++] = 0x100 + value;
                        else if (value >= -128) {
                            target[position++] = 0xd0;
                            target[position++] = value + 0x100;
                        } else if (value >= -32768) {
                            target[position++] = 0xd1;
                            targetView.setInt16(position, value);
                            position += 2;
                        } else {
                            target[position++] = 0xd2;
                            targetView.setInt32(position, value);
                            position += 4;
                        }
                    } else {
                        let useFloat32;
                        if ((useFloat32 = this.useFloat32) > 0 && value < 0x100000000 && value >= -2147483648) {
                            target[position++] = 0xca;
                            targetView.setFloat32(position, value);
                            let xShifted;
                            if (useFloat32 < 4 || (xShifted = value * mult10[(target[position] & 0x7f) << 1 | target[position + 1] >> 7]) >> 0 === xShifted) {
                                position += 4;
                                return;
                            } else position--; // move back into position for writing a double
                        }
                        target[position++] = 0xcb;
                        targetView.setFloat64(position, value);
                        position += 8;
                    }
                } else if (type === 'object' || type === 'function') {
                    if (!value) target[position++] = 0xc0;
                    else {
                        if (referenceMap) {
                            let referee = referenceMap.get(value);
                            if (referee) {
                                if (!referee.id) {
                                    let idsToInsert = referenceMap.idsToInsert || (referenceMap.idsToInsert = []);
                                    referee.id = idsToInsert.push(referee);
                                }
                                target[position++] = 0xd6; // fixext 4
                                target[position++] = 0x70; // "p" for pointer
                                targetView.setUint32(position, referee.id);
                                position += 4;
                                return;
                            } else referenceMap.set(value, {
                                offset: position - start
                            });
                        }
                        let constructor = value.constructor;
                        if (constructor === Object) writeObject(value);
                        else if (constructor === Array) packArray(value);
                        else if (constructor === Map) {
                            if (this.mapAsEmptyObject) target[position++] = 0x80;
                            else {
                                length = value.size;
                                if (length < 0x10) target[position++] = 0x80 | length;
                                else if (length < 0x10000) {
                                    target[position++] = 0xde;
                                    target[position++] = length >> 8;
                                    target[position++] = length & 0xff;
                                } else {
                                    target[position++] = 0xdf;
                                    targetView.setUint32(position, length);
                                    position += 4;
                                }
                                for (let [key, entryValue] of value){
                                    pack(key);
                                    pack(entryValue);
                                }
                            }
                        } else {
                            for(let i = 0, l = extensions.length; i < l; i++){
                                let extensionClass = extensionClasses[i];
                                if (value instanceof extensionClass) {
                                    let extension = extensions[i];
                                    if (extension.write) {
                                        if (extension.type) {
                                            target[position++] = 0xd4; // one byte "tag" extension
                                            target[position++] = extension.type;
                                            target[position++] = 0;
                                        }
                                        let writeResult = extension.write.call(this, value);
                                        if (writeResult === value) {
                                            if (Array.isArray(value)) packArray(value);
                                            else writeObject(value);
                                        } else pack(writeResult);
                                        return;
                                    }
                                    let currentTarget = target;
                                    let currentTargetView = targetView;
                                    let currentPosition = position;
                                    target = null;
                                    let result;
                                    try {
                                        result = extension.pack.call(this, value, (size)=>{
                                            // restore target and use it
                                            target = currentTarget;
                                            currentTarget = null;
                                            position += size;
                                            if (position > safeEnd) makeRoom(position);
                                            return {
                                                target,
                                                targetView,
                                                position: position - size
                                            };
                                        }, pack);
                                    } finally{
                                        // restore current target information (unless already restored)
                                        if (currentTarget) {
                                            target = currentTarget;
                                            targetView = currentTargetView;
                                            position = currentPosition;
                                            safeEnd = target.length - 10;
                                        }
                                    }
                                    if (result) {
                                        if (result.length + position > safeEnd) makeRoom(result.length + position);
                                        position = writeExtensionData(result, target, position, extension.type);
                                    }
                                    return;
                                }
                            }
                            // check isArray after extensions, because extensions can extend Array
                            if (Array.isArray(value)) packArray(value);
                            else {
                                // use this as an alternate mechanism for expressing how to serialize
                                if (value.toJSON) {
                                    const json = value.toJSON();
                                    // if for some reason value.toJSON returns itself it'll loop forever
                                    if (json !== value) return pack(json);
                                }
                                // if there is a writeFunction, use it, otherwise just encode as undefined
                                if (type === 'function') return pack(this.writeFunction && this.writeFunction(value));
                                // no extension found, write as plain object
                                writeObject(value);
                            }
                        }
                    }
                } else if (type === 'boolean') target[position++] = value ? 0xc3 : 0xc2;
                else if (type === 'bigint') {
                    if (value < BigInt(1) << BigInt(63) && value >= -(BigInt(1) << BigInt(63))) {
                        // use a signed int as long as it fits
                        target[position++] = 0xd3;
                        targetView.setBigInt64(position, value);
                    } else if (value < BigInt(1) << BigInt(64) && value > 0) {
                        // if we can fit an unsigned int, use that
                        target[position++] = 0xcf;
                        targetView.setBigUint64(position, value);
                    } else {
                        // overflow
                        if (this.largeBigIntToFloat) {
                            target[position++] = 0xcb;
                            targetView.setFloat64(position, Number(value));
                        } else if (this.largeBigIntToString) return pack(value.toString());
                        else if (this.useBigIntExtension && value < BigInt(2) ** BigInt(1023) && value > -(BigInt(2) ** BigInt(1023))) {
                            target[position++] = 0xc7;
                            position++;
                            target[position++] = 0x42; // "B" for BigInt
                            let bytes = [];
                            let alignedSign;
                            do {
                                let byte = value & BigInt(0xff);
                                alignedSign = (byte & BigInt(0x80)) === (value < BigInt(0) ? BigInt(0x80) : BigInt(0));
                                bytes.push(byte);
                                value >>= BigInt(8);
                            }while (!((value === BigInt(0) || value === BigInt(-1)) && alignedSign));
                            target[position - 2] = bytes.length;
                            for(let i = bytes.length; i > 0;)target[position++] = Number(bytes[--i]);
                            return;
                        } else throw new RangeError(value + ' was too large to fit in MessagePack 64-bit integer format, use' + ' useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set' + ' largeBigIntToString to convert to string');
                    }
                    position += 8;
                } else if (type === 'undefined') {
                    if (this.encodeUndefinedAsNil) target[position++] = 0xc0;
                    else {
                        target[position++] = 0xd4; // a number of implementations use fixext1 with type 0, data 0 to denote undefined, so we follow suite
                        target[position++] = 0;
                        target[position++] = 0;
                    }
                } else throw new Error('Unknown type: ' + type);
            };
            const writePlainObject = this.variableMapSize || this.coercibleKeyAsNumber || this.skipValues ? (object)=>{
                // this method is slightly slower, but generates "preferred serialization" (optimally small for smaller objects)
                let keys;
                if (this.skipValues) {
                    keys = [];
                    for(let key in object)if ((typeof object.hasOwnProperty !== 'function' || object.hasOwnProperty(key)) && !this.skipValues.includes(object[key])) keys.push(key);
                } else keys = Object.keys(object);
                let length = keys.length;
                if (length < 0x10) target[position++] = 0x80 | length;
                else if (length < 0x10000) {
                    target[position++] = 0xde;
                    target[position++] = length >> 8;
                    target[position++] = length & 0xff;
                } else {
                    target[position++] = 0xdf;
                    targetView.setUint32(position, length);
                    position += 4;
                }
                let key;
                if (this.coercibleKeyAsNumber) for(let i = 0; i < length; i++){
                    key = keys[i];
                    let num = Number(key);
                    pack(isNaN(num) ? key : num);
                    pack(object[key]);
                }
                else for(let i = 0; i < length; i++){
                    pack(key = keys[i]);
                    pack(object[key]);
                }
            } : (object)=>{
                target[position++] = 0xde; // always using map 16, so we can preallocate and set the length afterwards
                let objectOffset = position - start;
                position += 2;
                let size = 0;
                for(let key in object)if (typeof object.hasOwnProperty !== 'function' || object.hasOwnProperty(key)) {
                    pack(key);
                    pack(object[key]);
                    size++;
                }
                if (size > 0xffff) throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');
                target[objectOffset++ + start] = size >> 8;
                target[objectOffset + start] = size & 0xff;
            };
            const writeRecord = this.useRecords === false ? writePlainObject : options.progressiveRecords && !useTwoByteRecords ? (object)=>{
                let nextTransition, transition = structures.transitions || (structures.transitions = Object.create(null));
                let objectOffset = position++ - start;
                let wroteKeys;
                for(let key in object)if (typeof object.hasOwnProperty !== 'function' || object.hasOwnProperty(key)) {
                    nextTransition = transition[key];
                    if (nextTransition) transition = nextTransition;
                    else {
                        // record doesn't exist, create full new record and insert it
                        let keys = Object.keys(object);
                        let lastTransition = transition;
                        transition = structures.transitions;
                        let newTransitions = 0;
                        for(let i = 0, l = keys.length; i < l; i++){
                            let key = keys[i];
                            nextTransition = transition[key];
                            if (!nextTransition) {
                                nextTransition = transition[key] = Object.create(null);
                                newTransitions++;
                            }
                            transition = nextTransition;
                        }
                        if (objectOffset + start + 1 == position) {
                            // first key, so we don't need to insert, we can just write record directly
                            position--;
                            newRecord(transition, keys, newTransitions);
                        } else insertNewRecord(transition, keys, objectOffset, newTransitions);
                        wroteKeys = true;
                        transition = lastTransition[key];
                    }
                    pack(object[key]);
                }
                if (!wroteKeys) {
                    let recordId = transition[RECORD_SYMBOL];
                    if (recordId) target[objectOffset + start] = recordId;
                    else insertNewRecord(transition, Object.keys(object), objectOffset, 0);
                }
            } : (object)=>{
                let nextTransition, transition = structures.transitions || (structures.transitions = Object.create(null));
                let newTransitions = 0;
                for(let key in object)if (typeof object.hasOwnProperty !== 'function' || object.hasOwnProperty(key)) {
                    nextTransition = transition[key];
                    if (!nextTransition) {
                        nextTransition = transition[key] = Object.create(null);
                        newTransitions++;
                    }
                    transition = nextTransition;
                }
                let recordId = transition[RECORD_SYMBOL];
                if (recordId) {
                    if (recordId >= 0x60 && useTwoByteRecords) {
                        target[position++] = ((recordId -= 0x60) & 0x1f) + 0x60;
                        target[position++] = recordId >> 5;
                    } else target[position++] = recordId;
                } else newRecord(transition, transition.__keys__ || Object.keys(object), newTransitions);
                // now write the values
                for(let key in object)if (typeof object.hasOwnProperty !== 'function' || object.hasOwnProperty(key)) pack(object[key]);
            };
            // create reference to useRecords if useRecords is a function
            const checkUseRecords = typeof this.useRecords == 'function' && this.useRecords;
            const writeObject = checkUseRecords ? (object)=>{
                checkUseRecords(object) ? writeRecord(object) : writePlainObject(object);
            } : writeRecord;
            const makeRoom = (end)=>{
                let newSize;
                if (end > 0x1000000) {
                    // special handling for really large buffers
                    if (end - start > MAX_BUFFER_SIZE) throw new Error('Packed buffer would be larger than maximum buffer size');
                    newSize = Math.min(MAX_BUFFER_SIZE, Math.round(Math.max((end - start) * (end > 0x4000000 ? 1.25 : 2), 0x400000) / 0x1000) * 0x1000);
                } else newSize = (Math.max(end - start << 2, target.length - 1) >> 12) + 1 << 12;
                let newBuffer = new ByteArrayAllocate(newSize);
                targetView = newBuffer.dataView || (newBuffer.dataView = new DataView(newBuffer.buffer, 0, newSize));
                end = Math.min(end, target.length);
                if (target.copy) target.copy(newBuffer, 0, start, end);
                else newBuffer.set(target.slice(start, end));
                position -= start;
                start = 0;
                safeEnd = newBuffer.length - 10;
                return target = newBuffer;
            };
            const newRecord = (transition, keys, newTransitions)=>{
                let recordId = structures.nextId;
                if (!recordId) recordId = 0x40;
                if (recordId < sharedLimitId && this.shouldShareStructure && !this.shouldShareStructure(keys)) {
                    recordId = structures.nextOwnId;
                    if (!(recordId < maxStructureId)) recordId = sharedLimitId;
                    structures.nextOwnId = recordId + 1;
                } else {
                    if (recordId >= maxStructureId) recordId = sharedLimitId;
                    structures.nextId = recordId + 1;
                }
                let highByte = keys.highByte = recordId >= 0x60 && useTwoByteRecords ? recordId - 0x60 >> 5 : -1;
                transition[RECORD_SYMBOL] = recordId;
                transition.__keys__ = keys;
                structures[recordId - 0x40] = keys;
                if (recordId < sharedLimitId) {
                    keys.isShared = true;
                    structures.sharedLength = recordId - 0x3f;
                    hasSharedUpdate = true;
                    if (highByte >= 0) {
                        target[position++] = (recordId & 0x1f) + 0x60;
                        target[position++] = highByte;
                    } else target[position++] = recordId;
                } else {
                    if (highByte >= 0) {
                        target[position++] = 0xd5; // fixext 2
                        target[position++] = 0x72; // "r" record defintion extension type
                        target[position++] = (recordId & 0x1f) + 0x60;
                        target[position++] = highByte;
                    } else {
                        target[position++] = 0xd4; // fixext 1
                        target[position++] = 0x72; // "r" record defintion extension type
                        target[position++] = recordId;
                    }
                    if (newTransitions) transitionsCount += serializationsSinceTransitionRebuild * newTransitions;
                    // record the removal of the id, we can maintain our shared structure
                    if (recordIdsToRemove.length >= maxOwnStructures) recordIdsToRemove.shift()[RECORD_SYMBOL] = 0; // we are cycling back through, and have to remove old ones
                    recordIdsToRemove.push(transition);
                    pack(keys);
                }
            };
            const insertNewRecord = (transition, keys, insertionOffset, newTransitions)=>{
                let mainTarget = target;
                let mainPosition = position;
                let mainSafeEnd = safeEnd;
                let mainStart = start;
                target = keysTarget;
                position = 0;
                start = 0;
                if (!target) keysTarget = target = new ByteArrayAllocate(8192);
                safeEnd = target.length - 10;
                newRecord(transition, keys, newTransitions);
                keysTarget = target;
                let keysPosition = position;
                target = mainTarget;
                position = mainPosition;
                safeEnd = mainSafeEnd;
                start = mainStart;
                if (keysPosition > 1) {
                    let newEnd = position + keysPosition - 1;
                    if (newEnd > safeEnd) makeRoom(newEnd);
                    let insertionPosition = insertionOffset + start;
                    target.copyWithin(insertionPosition + keysPosition, insertionPosition + 1, position);
                    target.set(keysTarget.slice(0, keysPosition), insertionPosition);
                    position = newEnd;
                } else target[insertionOffset + start] = keysTarget[0];
            };
            const writeStruct = (object)=>{
                let newPosition = writeStructSlots(object, target, start, position, structures, makeRoom, (value, newPosition, notifySharedUpdate)=>{
                    if (notifySharedUpdate) return hasSharedUpdate = true;
                    position = newPosition;
                    let startTarget = target;
                    pack(value);
                    resetStructures();
                    if (startTarget !== target) return {
                        position,
                        targetView,
                        target
                    }; // indicate the buffer was re-allocated
                    return position;
                }, this);
                if (newPosition === 0) return writeObject(object);
                position = newPosition;
            };
        }
        useBuffer(buffer) {
            // this means we are finished using our own buffer and we can write over it safely
            target = buffer;
            target.dataView || (target.dataView = new DataView(target.buffer, target.byteOffset, target.byteLength));
            position = 0;
        }
        set position(value) {
            position = value;
        }
        get position() {
            return position;
        }
        set buffer(buffer) {
            target = buffer;
        }
        get buffer() {
            return target;
        }
        clearSharedData() {
            if (this.structures) this.structures = [];
            if (this.typedStructs) this.typedStructs = [];
        }
    }
    extensionClasses = [
        Date,
        Set,
        Error,
        RegExp,
        ArrayBuffer,
        Object.getPrototypeOf(Uint8Array.prototype).constructor /*TypedArray*/ ,
        C1Type
    ];
    extensions = [
        {
            pack (date, allocateForWrite, pack) {
                let seconds = date.getTime() / 1000;
                if ((this.useTimestamp32 || date.getMilliseconds() === 0) && seconds >= 0 && seconds < 0x100000000) {
                    // Timestamp 32
                    let { target, targetView, position } = allocateForWrite(6);
                    target[position++] = 0xd6;
                    target[position++] = 0xff;
                    targetView.setUint32(position, seconds);
                } else if (seconds > 0 && seconds < 0x100000000) {
                    // Timestamp 64
                    let { target, targetView, position } = allocateForWrite(10);
                    target[position++] = 0xd7;
                    target[position++] = 0xff;
                    targetView.setUint32(position, date.getMilliseconds() * 4000000 + (seconds / 1000 / 0x100000000 >> 0));
                    targetView.setUint32(position + 4, seconds);
                } else if (isNaN(seconds)) {
                    if (this.onInvalidDate) {
                        allocateForWrite(0);
                        return pack(this.onInvalidDate());
                    }
                    // Intentionally invalid timestamp
                    let { target, targetView, position } = allocateForWrite(3);
                    target[position++] = 0xd4;
                    target[position++] = 0xff;
                    target[position++] = 0xff;
                } else {
                    // Timestamp 96
                    let { target, targetView, position } = allocateForWrite(15);
                    target[position++] = 0xc7;
                    target[position++] = 12;
                    target[position++] = 0xff;
                    targetView.setUint32(position, date.getMilliseconds() * 1000000);
                    targetView.setBigInt64(position + 4, BigInt(Math.floor(seconds)));
                }
            }
        },
        {
            pack (set, allocateForWrite, pack) {
                if (this.setAsEmptyObject) {
                    allocateForWrite(0);
                    return pack({});
                }
                let array = Array.from(set);
                let { target, position } = allocateForWrite(this.moreTypes ? 3 : 0);
                if (this.moreTypes) {
                    target[position++] = 0xd4;
                    target[position++] = 0x73; // 's' for Set
                    target[position++] = 0;
                }
                pack(array);
            }
        },
        {
            pack (error, allocateForWrite, pack) {
                let { target, position } = allocateForWrite(this.moreTypes ? 3 : 0);
                if (this.moreTypes) {
                    target[position++] = 0xd4;
                    target[position++] = 0x65; // 'e' for error
                    target[position++] = 0;
                }
                pack([
                    error.name,
                    error.message,
                    error.cause
                ]);
            }
        },
        {
            pack (regex, allocateForWrite, pack) {
                let { target, position } = allocateForWrite(this.moreTypes ? 3 : 0);
                if (this.moreTypes) {
                    target[position++] = 0xd4;
                    target[position++] = 0x78; // 'x' for regeXp
                    target[position++] = 0;
                }
                pack([
                    regex.source,
                    regex.flags
                ]);
            }
        },
        {
            pack (arrayBuffer, allocateForWrite) {
                if (this.moreTypes) writeExtBuffer(arrayBuffer, 0x10, allocateForWrite);
                else writeBuffer(hasNodeBuffer ? Buffer.from(arrayBuffer) : new Uint8Array(arrayBuffer), allocateForWrite);
            }
        },
        {
            pack (typedArray, allocateForWrite) {
                let constructor = typedArray.constructor;
                if (constructor !== ByteArray && this.moreTypes) writeExtBuffer(typedArray, typedArrays.indexOf(constructor.name), allocateForWrite);
                else writeBuffer(typedArray, allocateForWrite);
            }
        },
        {
            pack (c1, allocateForWrite) {
                let { target, position } = allocateForWrite(1);
                target[position] = 0xc1;
            }
        }
    ];
    function writeExtBuffer(typedArray, type, allocateForWrite, encode) {
        let length = typedArray.byteLength;
        if (length + 1 < 0x100) {
            var { target, position } = allocateForWrite(4 + length);
            target[position++] = 0xc7;
            target[position++] = length + 1;
        } else if (length + 1 < 0x10000) {
            var { target, position } = allocateForWrite(5 + length);
            target[position++] = 0xc8;
            target[position++] = length + 1 >> 8;
            target[position++] = length + 1 & 0xff;
        } else {
            var { target, position, targetView } = allocateForWrite(7 + length);
            target[position++] = 0xc9;
            targetView.setUint32(position, length + 1); // plus one for the type byte
            position += 4;
        }
        target[position++] = 0x74; // "t" for typed array
        target[position++] = type;
        if (!typedArray.buffer) typedArray = new Uint8Array(typedArray);
        target.set(new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength), position);
    }
    function writeBuffer(buffer, allocateForWrite) {
        let length = buffer.byteLength;
        var target, position;
        if (length < 0x100) {
            var { target, position } = allocateForWrite(length + 2);
            target[position++] = 0xc4;
            target[position++] = length;
        } else if (length < 0x10000) {
            var { target, position } = allocateForWrite(length + 3);
            target[position++] = 0xc5;
            target[position++] = length >> 8;
            target[position++] = length & 0xff;
        } else {
            var { target, position, targetView } = allocateForWrite(length + 5);
            target[position++] = 0xc6;
            targetView.setUint32(position, length);
            position += 4;
        }
        target.set(buffer, position);
    }
    function writeExtensionData(result, target, position, type) {
        let length = result.length;
        switch(length){
            case 1:
                target[position++] = 0xd4;
                break;
            case 2:
                target[position++] = 0xd5;
                break;
            case 4:
                target[position++] = 0xd6;
                break;
            case 8:
                target[position++] = 0xd7;
                break;
            case 16:
                target[position++] = 0xd8;
                break;
            default:
                if (length < 0x100) {
                    target[position++] = 0xc7;
                    target[position++] = length;
                } else if (length < 0x10000) {
                    target[position++] = 0xc8;
                    target[position++] = length >> 8;
                    target[position++] = length & 0xff;
                } else {
                    target[position++] = 0xc9;
                    target[position++] = length >> 24;
                    target[position++] = length >> 16 & 0xff;
                    target[position++] = length >> 8 & 0xff;
                    target[position++] = length & 0xff;
                }
        }
        target[position++] = type;
        target.set(result, position);
        position += length;
        return position;
    }
    function insertIds(serialized, idsToInsert) {
        // insert the ids that need to be referenced for structured clones
        let nextId;
        let distanceToMove = idsToInsert.length * 6;
        let lastEnd = serialized.length - distanceToMove;
        while(nextId = idsToInsert.pop()){
            let offset = nextId.offset;
            let id = nextId.id;
            serialized.copyWithin(offset + distanceToMove, offset, lastEnd);
            distanceToMove -= 6;
            let position = offset + distanceToMove;
            serialized[position++] = 0xd6;
            serialized[position++] = 0x69; // 'i'
            serialized[position++] = id >> 24;
            serialized[position++] = id >> 16 & 0xff;
            serialized[position++] = id >> 8 & 0xff;
            serialized[position++] = id & 0xff;
            lastEnd = offset;
        }
        return serialized;
    }
    function writeBundles(start, pack, incrementPosition) {
        if (bundledStrings.length > 0) {
            targetView.setUint32(bundledStrings.position + start, position + incrementPosition - bundledStrings.position - start);
            bundledStrings.stringsPosition = position - start;
            let writeStrings = bundledStrings;
            bundledStrings = null;
            pack(writeStrings[0]);
            pack(writeStrings[1]);
        }
    }
    function prepareStructures(structures, packr) {
        structures.isCompatible = (existingStructures)=>{
            let compatible = !existingStructures || (packr.lastNamedStructuresLength || 0) === existingStructures.length;
            if (!compatible) packr._mergeStructures(existingStructures);
            return compatible;
        };
        return structures;
    }
    let defaultPackr = new Packr({
        useRecords: false
    });
    defaultPackr.pack;
    defaultPackr.pack;
    const REUSE_BUFFER_MODE = 512;
    const RESET_BUFFER_MODE = 1024;
    const RESERVE_START_SPACE = 2048;
    class Room {
        constructor(name, rootSchema){
            // Public signals
            this.onStateChange = createSignal();
            this.onError = createSignal();
            this.onLeave = createSignal();
            this.onJoin = createSignal();
            this.hasJoined = false;
            this.onMessageHandlers = createNanoEvents();
            this.roomId = null;
            this.name = name;
            this.packr = new Packr();
            // msgpackr workaround: force buffer to be created.
            this.packr.encode(undefined);
            if (rootSchema) {
                this.serializer = new (getSerializer("schema"));
                this.rootSchema = rootSchema;
                this.serializer.state = new rootSchema();
            }
            this.onError((code, message)=>{
                var _a;
                return (_a = console.warn) === null || _a === void 0 ? void 0 : _a.call(console, `colyseus.js - onError => (${code}) ${message}`);
            });
            this.onLeave(()=>this.removeAllListeners());
        }
        connect(endpoint, devModeCloseCallback, room = this, options, headers) {
            const connection = new Connection(options.protocol);
            room.connection = connection;
            connection.events.onmessage = Room.prototype.onMessageCallback.bind(room);
            connection.events.onclose = function(e) {
                var _a;
                if (!room.hasJoined) {
                    (_a = console.warn) === null || _a === void 0 || _a.call(console, `Room connection was closed unexpectedly (${e.code}): ${e.reason}`);
                    room.onError.invoke(e.code, e.reason);
                    return;
                }
                if (e.code === CloseCode.DEVMODE_RESTART && devModeCloseCallback) devModeCloseCallback();
                else {
                    room.onLeave.invoke(e.code, e.reason);
                    room.destroy();
                }
            };
            connection.events.onerror = function(e) {
                var _a;
                (_a = console.warn) === null || _a === void 0 || _a.call(console, `Room, onError (${e.code}): ${e.reason}`);
                room.onError.invoke(e.code, e.reason);
            };
            // FIXME: refactor this.
            if (options.protocol === "h3") {
                const url = new URL(endpoint);
                connection.connect(url.origin, options);
            } else connection.connect(endpoint, headers);
        }
        leave(consented = true) {
            return new Promise((resolve)=>{
                this.onLeave((code)=>resolve(code));
                if (this.connection) {
                    if (consented) {
                        this.packr.buffer[0] = exports1.Protocol.LEAVE_ROOM;
                        this.connection.send(this.packr.buffer.subarray(0, 1));
                    } else this.connection.close();
                } else this.onLeave.invoke(CloseCode.CONSENTED);
            });
        }
        onMessage(type, callback) {
            return this.onMessageHandlers.on(this.getMessageHandlerKey(type), callback);
        }
        send(type, message) {
            const it = {
                offset: 1
            };
            this.packr.buffer[0] = exports1.Protocol.ROOM_DATA;
            if (typeof type === "string") umdExports.encode.string(this.packr.buffer, type, it);
            else umdExports.encode.number(this.packr.buffer, type, it);
            // force packr to use beginning of the buffer
            this.packr.position = 0;
            const data = message !== undefined ? this.packr.pack(message, 2048 + it.offset) // 2048 = RESERVE_START_SPACE
             : this.packr.buffer.subarray(0, it.offset);
            this.connection.send(data);
        }
        sendUnreliable(type, message) {
            const it = {
                offset: 1
            };
            this.packr.buffer[0] = exports1.Protocol.ROOM_DATA;
            if (typeof type === "string") umdExports.encode.string(this.packr.buffer, type, it);
            else umdExports.encode.number(this.packr.buffer, type, it);
            // force packr to use beginning of the buffer
            this.packr.position = 0;
            const data = message !== undefined ? this.packr.pack(message, 2048 + it.offset) // 2048 = RESERVE_START_SPACE
             : this.packr.buffer.subarray(0, it.offset);
            this.connection.sendUnreliable(data);
        }
        sendBytes(type, bytes) {
            const it = {
                offset: 1
            };
            this.packr.buffer[0] = exports1.Protocol.ROOM_DATA_BYTES;
            if (typeof type === "string") umdExports.encode.string(this.packr.buffer, type, it);
            else umdExports.encode.number(this.packr.buffer, type, it);
            // check if buffer needs to be resized
            // TODO: can we avoid this?
            if (bytes.byteLength + it.offset > this.packr.buffer.byteLength) {
                const newBuffer = new Uint8Array(it.offset + bytes.byteLength);
                newBuffer.set(this.packr.buffer);
                this.packr.useBuffer(newBuffer);
            }
            this.packr.buffer.set(bytes, it.offset);
            this.connection.send(this.packr.buffer.subarray(0, it.offset + bytes.byteLength));
        }
        get state() {
            return this.serializer.getState();
        }
        removeAllListeners() {
            this.onJoin.clear();
            this.onStateChange.clear();
            this.onError.clear();
            this.onLeave.clear();
            this.onMessageHandlers.events = {};
            if (this.serializer instanceof SchemaSerializer) // Remove callback references
            this.serializer.decoder.root.callbacks = {};
        }
        onMessageCallback(event) {
            const buffer = new Uint8Array(event.data);
            const it = {
                offset: 1
            };
            const code = buffer[0];
            if (code === exports1.Protocol.JOIN_ROOM) {
                const reconnectionToken = umdExports.decode.utf8Read(buffer, it, buffer[it.offset++]);
                this.serializerId = umdExports.decode.utf8Read(buffer, it, buffer[it.offset++]);
                // Instantiate serializer if not locally available.
                if (!this.serializer) {
                    const serializer = getSerializer(this.serializerId);
                    this.serializer = new serializer();
                }
                if (buffer.byteLength > it.offset && this.serializer.handshake) this.serializer.handshake(buffer, it);
                this.reconnectionToken = `${this.roomId}:${reconnectionToken}`;
                this.hasJoined = true;
                this.onJoin.invoke();
                // acknowledge successfull JOIN_ROOM
                this.packr.buffer[0] = exports1.Protocol.JOIN_ROOM;
                this.connection.send(this.packr.buffer.subarray(0, 1));
            } else if (code === exports1.Protocol.ERROR) {
                const code = umdExports.decode.number(buffer, it);
                const message = umdExports.decode.string(buffer, it);
                this.onError.invoke(code, message);
            } else if (code === exports1.Protocol.LEAVE_ROOM) this.leave();
            else if (code === exports1.Protocol.ROOM_STATE) {
                this.serializer.setState(buffer, it);
                this.onStateChange.invoke(this.serializer.getState());
            } else if (code === exports1.Protocol.ROOM_STATE_PATCH) {
                this.serializer.patch(buffer, it);
                this.onStateChange.invoke(this.serializer.getState());
            } else if (code === exports1.Protocol.ROOM_DATA) {
                const type = umdExports.decode.stringCheck(buffer, it) ? umdExports.decode.string(buffer, it) : umdExports.decode.number(buffer, it);
                const message = buffer.byteLength > it.offset ? unpack(buffer, {
                    start: it.offset
                }) : undefined;
                this.dispatchMessage(type, message);
            } else if (code === exports1.Protocol.ROOM_DATA_BYTES) {
                const type = umdExports.decode.stringCheck(buffer, it) ? umdExports.decode.string(buffer, it) : umdExports.decode.number(buffer, it);
                this.dispatchMessage(type, buffer.subarray(it.offset));
            }
        }
        dispatchMessage(type, message) {
            var _a;
            const messageType = this.getMessageHandlerKey(type);
            if (this.onMessageHandlers.events[messageType]) this.onMessageHandlers.emit(messageType, message);
            else if (this.onMessageHandlers.events['*']) this.onMessageHandlers.emit('*', type, message);
            else (_a = console.warn) === null || _a === void 0 || _a.call(console, `colyseus.js: onMessage() not registered for type '${type}'.`);
        }
        destroy() {
            if (this.serializer) this.serializer.teardown();
        }
        getMessageHandlerKey(type) {
            switch(typeof type){
                // string
                case "string":
                    return type;
                // number
                case "number":
                    return `i${type}`;
                default:
                    throw new Error("invalid message type.");
            }
        }
    }
    var fetch$1 = {};
    var hasRequiredFetch;
    function requireFetch() {
        if (hasRequiredFetch) return fetch$1;
        hasRequiredFetch = 1;
        function apply(src, tar) {
            tar.statusMessage = src.statusText;
            tar.statusCode = src.status;
            tar.data = src.body;
        }
        function send(method, uri, opts) {
            opts = opts || {};
            var timer, aborted, timedout = false, ctrl, tmp = opts.body;
            opts.method = method;
            opts.headers = opts.headers || {};
            if (tmp instanceof FormData) ;
            else if (tmp && typeof tmp == 'object') {
                opts.headers['content-type'] = 'application/json';
                opts.body = JSON.stringify(tmp);
            }
            if (opts.withCredentials) opts.credentials = 'include';
            if (opts.timeout) {
                if (!opts.signal) {
                    ctrl = new AbortController;
                    opts.signal = ctrl.signal;
                }
                timer = setTimeout(function() {
                    timedout = true;
                    ctrl.signal.dispatchEvent(new Event('abort'));
                }, opts.timeout);
            }
            if (opts.signal) opts.signal.addEventListener('abort', function() {
                aborted = true;
            });
            return new Promise((res, rej)=>{
                fetch(uri, opts).then((rr, reply)=>{
                    apply(rr, rr); //=> rr.headers
                    reply = rr.status >= 400 ? rej : res;
                    tmp = rr.headers.get('content-type');
                    if (!tmp || !~tmp.indexOf('application/json')) reply(rr);
                    else rr.text().then((str)=>{
                        try {
                            rr.data = JSON.parse(str, opts.reviver);
                            reply(rr);
                        } catch (err) {
                            err.headers = rr.headers;
                            apply(rr, err);
                            rej(err);
                        }
                    });
                }).catch((err)=>{
                    err.timeout = timedout;
                    err.aborted = aborted && !timedout;
                    rej(err);
                }).finally(()=>{
                    clearTimeout(timer);
                });
            });
        }
        var get = /*#__PURE__*/ send.bind(send, 'GET');
        var post = /*#__PURE__*/ send.bind(send, 'POST');
        var patch = /*#__PURE__*/ send.bind(send, 'PATCH');
        var del = /*#__PURE__*/ send.bind(send, 'DELETE');
        var put = /*#__PURE__*/ send.bind(send, 'PUT');
        fetch$1.del = del;
        fetch$1.get = get;
        fetch$1.patch = patch;
        fetch$1.post = post;
        fetch$1.put = put;
        fetch$1.send = send;
        return fetch$1;
    }
    var fetchExports = requireFetch();
    var index = /*@__PURE__*/ getDefaultExportFromCjs(fetchExports);
    var httpie = /*#__PURE__*/ _mergeNamespaces({
        __proto__: null,
        default: index
    }, [
        fetchExports
    ]);
    class HTTP {
        constructor(client, headers = {}){
            this.client = client;
            this.headers = headers;
        }
        get(path, options = {}) {
            return this.request("get", path, options);
        }
        post(path, options = {}) {
            return this.request("post", path, options);
        }
        del(path, options = {}) {
            return this.request("del", path, options);
        }
        put(path, options = {}) {
            return this.request("put", path, options);
        }
        request(method, path, options = {}) {
            return httpie[method](this.client['getHttpEndpoint'](path), this.getOptions(options)).catch((e)=>{
                var _a;
                if (e.aborted) throw new AbortError("Request aborted");
                const status = e.statusCode; //  || -1
                const message = ((_a = e.data) === null || _a === void 0 ? void 0 : _a.error) || e.statusMessage || e.message; //  || "offline"
                if (!status && !message) throw e;
                throw new ServerError(status, message);
            });
        }
        getOptions(options) {
            // merge default custom headers with user headers
            options.headers = Object.assign({}, this.headers, options.headers);
            if (this.authToken) options.headers['Authorization'] = `Bearer ${this.authToken}`;
            if (typeof cc !== 'undefined' && cc.sys && cc.sys.isNative) ;
            else // always include credentials
            options.withCredentials = true;
            return options;
        }
    }
    /// <reference path="../typings/cocos-creator.d.ts" />
    /**
     * We do not assign 'storage' to window.localStorage immediatelly for React
     * Native compatibility. window.localStorage is not present when this module is
     * loaded.
     */ let storage;
    function getStorage() {
        if (!storage) try {
            storage = typeof cc !== 'undefined' && cc.sys && cc.sys.localStorage ? cc.sys.localStorage // compatibility with cocos creator
             : window.localStorage; // RN does have window object at this point, but localStorage is not defined
        } catch (e) {
        // ignore error
        }
        if (!storage && typeof globalThis.indexedDB !== 'undefined') storage = new IndexedDBStorage();
        if (!storage) // mock localStorage if not available (Node.js or RN environment)
        storage = {
            cache: {},
            setItem: function(key, value) {
                this.cache[key] = value;
            },
            getItem: function(key) {
                this.cache[key];
            },
            removeItem: function(key) {
                delete this.cache[key];
            }
        };
        return storage;
    }
    function setItem(key, value) {
        getStorage().setItem(key, value);
    }
    function removeItem(key) {
        getStorage().removeItem(key);
    }
    function getItem(key, callback) {
        const value = getStorage().getItem(key);
        if (typeof Promise === 'undefined' || // old browsers
        !(value instanceof Promise)) // browser has synchronous return
        callback(value);
        else // react-native is asynchronous
        value.then((id)=>callback(id));
    }
    /**
     * When running in a Web Worker, we need to use IndexedDB to store data.
     */ class IndexedDBStorage {
        constructor(){
            this.dbPromise = new Promise((resolve)=>{
                const request = indexedDB.open('_colyseus_storage', 1);
                request.onupgradeneeded = ()=>request.result.createObjectStore('store');
                request.onsuccess = ()=>resolve(request.result);
            });
        }
        tx(mode, fn) {
            return __awaiter(this, void 0, void 0, function*() {
                const db = yield this.dbPromise;
                const store = db.transaction('store', mode).objectStore('store');
                return fn(store);
            });
        }
        setItem(key, value) {
            return this.tx('readwrite', (store)=>store.put(value, key)).then();
        }
        getItem(key) {
            return __awaiter(this, void 0, void 0, function*() {
                const request = yield this.tx('readonly', (store)=>store.get(key));
                return new Promise((resolve)=>{
                    request.onsuccess = ()=>resolve(request.result);
                });
            });
        }
        removeItem(key) {
            return this.tx('readwrite', (store)=>store.delete(key)).then();
        }
    }
    var _Auth__initialized, _Auth__initializationPromise, _Auth__signInWindow, _Auth__events;
    class Auth {
        constructor(http){
            this.http = http;
            this.settings = {
                path: "/auth",
                key: "colyseus-auth-token"
            };
            _Auth__initialized.set(this, false);
            _Auth__initializationPromise.set(this, void 0);
            _Auth__signInWindow.set(this, undefined);
            _Auth__events.set(this, createNanoEvents());
            getItem(this.settings.key, (token)=>this.token = token);
        }
        set token(token) {
            this.http.authToken = token;
        }
        get token() {
            return this.http.authToken;
        }
        onChange(callback) {
            const unbindChange = __classPrivateFieldGet(this, _Auth__events, "f").on("change", callback);
            if (!__classPrivateFieldGet(this, _Auth__initialized, "f")) __classPrivateFieldSet(this, _Auth__initializationPromise, new Promise((resolve, reject)=>{
                this.getUserData().then((userData)=>{
                    this.emitChange(Object.assign(Object.assign({}, userData), {
                        token: this.token
                    }));
                }).catch((e)=>{
                    // user is not logged in, or service is down
                    this.emitChange({
                        user: null,
                        token: undefined
                    });
                }).finally(()=>{
                    resolve();
                });
            }), "f");
            __classPrivateFieldSet(this, _Auth__initialized, true, "f");
            return unbindChange;
        }
        getUserData() {
            return __awaiter(this, void 0, void 0, function*() {
                if (this.token) return (yield this.http.get(`${this.settings.path}/userdata`)).data;
                else throw new Error("missing auth.token");
            });
        }
        registerWithEmailAndPassword(email, password, options) {
            return __awaiter(this, void 0, void 0, function*() {
                const data = (yield this.http.post(`${this.settings.path}/register`, {
                    body: {
                        email,
                        password,
                        options
                    }
                })).data;
                this.emitChange(data);
                return data;
            });
        }
        signInWithEmailAndPassword(email, password) {
            return __awaiter(this, void 0, void 0, function*() {
                const data = (yield this.http.post(`${this.settings.path}/login`, {
                    body: {
                        email,
                        password
                    }
                })).data;
                this.emitChange(data);
                return data;
            });
        }
        signInAnonymously(options) {
            return __awaiter(this, void 0, void 0, function*() {
                const data = (yield this.http.post(`${this.settings.path}/anonymous`, {
                    body: {
                        options
                    }
                })).data;
                this.emitChange(data);
                return data;
            });
        }
        sendPasswordResetEmail(email) {
            return __awaiter(this, void 0, void 0, function*() {
                return (yield this.http.post(`${this.settings.path}/forgot-password`, {
                    body: {
                        email
                    }
                })).data;
            });
        }
        signInWithProvider(providerName_1) {
            return __awaiter(this, arguments, void 0, function*(providerName, settings = {}) {
                return new Promise((resolve, reject)=>{
                    const w = settings.width || 480;
                    const h = settings.height || 768;
                    // forward existing token for upgrading
                    const upgradingToken = this.token ? `?token=${this.token}` : "";
                    // Capitalize first letter of providerName
                    const title = `Login with ${providerName[0].toUpperCase() + providerName.substring(1)}`;
                    const url = this.http['client']['getHttpEndpoint'](`${settings.prefix || `${this.settings.path}/provider`}/${providerName}${upgradingToken}`);
                    const left = screen.width / 2 - w / 2;
                    const top = screen.height / 2 - h / 2;
                    __classPrivateFieldSet(this, _Auth__signInWindow, window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left), "f");
                    const onMessage = (event)=>{
                        // TODO: it is a good idea to check if event.origin can be trusted!
                        // if (event.origin.indexOf(window.location.hostname) === -1) { return; }
                        // require 'user' and 'token' inside received data.
                        if (event.data.user === undefined && event.data.token === undefined) return;
                        clearInterval(rejectionChecker);
                        __classPrivateFieldGet(this, _Auth__signInWindow, "f").close();
                        __classPrivateFieldSet(this, _Auth__signInWindow, undefined, "f");
                        window.removeEventListener("message", onMessage);
                        if (event.data.error !== undefined) reject(event.data.error);
                        else {
                            resolve(event.data);
                            this.emitChange(event.data);
                        }
                    };
                    const rejectionChecker = setInterval(()=>{
                        if (!__classPrivateFieldGet(this, _Auth__signInWindow, "f") || __classPrivateFieldGet(this, _Auth__signInWindow, "f").closed) {
                            __classPrivateFieldSet(this, _Auth__signInWindow, undefined, "f");
                            reject("cancelled");
                            window.removeEventListener("message", onMessage);
                        }
                    }, 200);
                    window.addEventListener("message", onMessage);
                });
            });
        }
        signOut() {
            return __awaiter(this, void 0, void 0, function*() {
                this.emitChange({
                    user: null,
                    token: null
                });
            });
        }
        emitChange(authData) {
            if (authData.token !== undefined) {
                this.token = authData.token;
                if (authData.token === null) removeItem(this.settings.key);
                else // store key in localStorage
                setItem(this.settings.key, authData.token);
            }
            __classPrivateFieldGet(this, _Auth__events, "f").emit("change", authData);
        }
    }
    _Auth__initialized = new WeakMap(), _Auth__initializationPromise = new WeakMap(), _Auth__signInWindow = new WeakMap(), _Auth__events = new WeakMap();
    /**
     * Discord Embedded App SDK
     * https://github.com/colyseus/colyseus/issues/707
     *
     * All URLs must go through the local proxy from
     * https://<app_id>.discordsays.com/.proxy/<mapped_url>/...
     *
     * URL Mapping Examples:
     *
     * 1. Using Colyseus Cloud:
     *   - /colyseus/{subdomain} -> {subdomain}.colyseus.cloud
     *
     *   Example:
     *     const client = new Client("https://xxxx.colyseus.cloud");
     *
     * -------------------------------------------------------------
     *
     * 2. Using `cloudflared` tunnel:
     *   - /colyseus/ -> <your-cloudflared-url>.trycloudflare.com
     *
     *   Example:
     *     const client = new Client("https://<your-cloudflared-url>.trycloudflare.com");
     *
     * -------------------------------------------------------------
     *
     * 3. Providing a manual /.proxy/your-mapping:
     *   - /your-mapping/ -> your-endpoint.com
     *
     *   Example:
     *     const client = new Client("/.proxy/your-mapping");
     *
     */ function discordURLBuilder(url) {
        var _a;
        const localHostname = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.hostname) || "localhost";
        const remoteHostnameSplitted = url.hostname.split('.');
        const subdomain = !url.hostname.includes("trycloudflare.com") && // ignore cloudflared subdomains
        !url.hostname.includes("discordsays.com") && // ignore discordsays.com subdomains
        remoteHostnameSplitted.length > 2 ? `/${remoteHostnameSplitted[0]}` : '';
        return url.pathname.startsWith("/.proxy") ? `${url.protocol}//${localHostname}${subdomain}${url.pathname}${url.search}` : `${url.protocol}//${localHostname}/.proxy/colyseus${subdomain}${url.pathname}${url.search}`;
    }
    var _a;
    class MatchMakeError extends Error {
        constructor(message, code){
            super(message);
            this.code = code;
            this.name = "MatchMakeError";
            Object.setPrototypeOf(this, MatchMakeError.prototype);
        }
    }
    // - React Native does not provide `window.location`
    // - Cocos Creator (Native) does not provide `window.location.hostname`
    const DEFAULT_ENDPOINT = typeof window !== "undefined" && typeof ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.hostname) !== "undefined" ? `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}${window.location.port && `:${window.location.port}`}` : "ws://127.0.0.1:2567";
    class Client {
        constructor(settings = DEFAULT_ENDPOINT, options){
            var _a, _b;
            if (typeof settings === "string") {
                //
                // endpoint by url
                //
                const url = settings.startsWith("/") ? new URL(settings, DEFAULT_ENDPOINT) : new URL(settings);
                const secure = url.protocol === "https:" || url.protocol === "wss:";
                const port = Number(url.port || (secure ? 443 : 80));
                this.settings = {
                    hostname: url.hostname,
                    pathname: url.pathname,
                    port,
                    secure,
                    searchParams: url.searchParams.toString() || undefined
                };
            } else {
                //
                // endpoint by settings
                //
                if (settings.port === undefined) settings.port = settings.secure ? 443 : 80;
                if (settings.pathname === undefined) settings.pathname = "";
                this.settings = settings;
            }
            // make sure pathname does not end with "/"
            if (this.settings.pathname.endsWith("/")) this.settings.pathname = this.settings.pathname.slice(0, -1);
            this.http = new HTTP(this, (options === null || options === void 0 ? void 0 : options.headers) || {});
            this.auth = new Auth(this.http);
            this.urlBuilder = options === null || options === void 0 ? void 0 : options.urlBuilder;
            //
            // Discord Embedded SDK requires a custom URL builder
            //
            if (!this.urlBuilder && typeof window !== "undefined" && ((_b = (_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.hostname) === null || _b === void 0 ? void 0 : _b.includes("discordsays.com"))) {
                this.urlBuilder = discordURLBuilder;
                console.log("Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder.");
            }
        }
        joinOrCreate(roomName_1) {
            return __awaiter(this, arguments, void 0, function*(roomName, options = {}, rootSchema) {
                return yield this.createMatchMakeRequest('joinOrCreate', roomName, options, rootSchema);
            });
        }
        create(roomName_1) {
            return __awaiter(this, arguments, void 0, function*(roomName, options = {}, rootSchema) {
                return yield this.createMatchMakeRequest('create', roomName, options, rootSchema);
            });
        }
        join(roomName_1) {
            return __awaiter(this, arguments, void 0, function*(roomName, options = {}, rootSchema) {
                return yield this.createMatchMakeRequest('join', roomName, options, rootSchema);
            });
        }
        joinById(roomId_1) {
            return __awaiter(this, arguments, void 0, function*(roomId, options = {}, rootSchema) {
                return yield this.createMatchMakeRequest('joinById', roomId, options, rootSchema);
            });
        }
        /**
         * Re-establish connection with a room this client was previously connected to.
         *
         * @param reconnectionToken The `room.reconnectionToken` from previously connected room.
         * @param rootSchema (optional) Concrete root schema definition
         * @returns Promise<Room>
         */ reconnect(reconnectionToken, rootSchema) {
            return __awaiter(this, void 0, void 0, function*() {
                if (typeof reconnectionToken === "string" && typeof rootSchema === "string") throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");
                const [roomId, token] = reconnectionToken.split(":");
                if (!roomId || !token) throw new Error("Invalid reconnection token format.\nThe format should be roomId:reconnectionToken");
                return yield this.createMatchMakeRequest('reconnect', roomId, {
                    reconnectionToken: token
                }, rootSchema);
            });
        }
        consumeSeatReservation(response, rootSchema, reuseRoomInstance // used in devMode
        ) {
            return __awaiter(this, void 0, void 0, function*() {
                const room = this.createRoom(response.room.name, rootSchema);
                room.roomId = response.room.roomId;
                room.sessionId = response.sessionId;
                const options = {
                    sessionId: room.sessionId
                };
                // forward "reconnection token" in case of reconnection.
                if (response.reconnectionToken) options.reconnectionToken = response.reconnectionToken;
                const targetRoom = reuseRoomInstance || room;
                room.connect(this.buildEndpoint(response.room, options, response.protocol), response.devMode && (()=>__awaiter(this, void 0, void 0, function*() {
                        console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x1F504)} Re-establishing connection with room id '${room.roomId}'...`); // 🔄
                        let retryCount = 0;
                        let retryMaxRetries = 8;
                        const retryReconnection = ()=>__awaiter(this, void 0, void 0, function*() {
                                retryCount++;
                                try {
                                    yield this.consumeSeatReservation(response, rootSchema, targetRoom);
                                    console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x2705)} Successfully re-established connection with room '${room.roomId}'`); // ✅
                                } catch (e) {
                                    if (retryCount < retryMaxRetries) {
                                        console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x1F504)} retrying... (${retryCount} out of ${retryMaxRetries})`); // 🔄
                                        setTimeout(retryReconnection, 2000);
                                    } else console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x274C)} Failed to reconnect. Is your server running? Please check server logs.`); // ❌
                                }
                            });
                        setTimeout(retryReconnection, 2000);
                    })), targetRoom, response, this.http.headers);
                return new Promise((resolve, reject)=>{
                    const onError = (code, message)=>reject(new ServerError(code, message));
                    targetRoom.onError.once(onError);
                    targetRoom['onJoin'].once(()=>{
                        targetRoom.onError.remove(onError);
                        resolve(targetRoom);
                    });
                });
            });
        }
        createMatchMakeRequest(method_1, roomName_1) {
            return __awaiter(this, arguments, void 0, function*(method, roomName, options = {}, rootSchema, reuseRoomInstance) {
                const response = (yield this.http.post(`matchmake/${method}/${roomName}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(options)
                })).data;
                // FIXME: HTTP class is already handling this as ServerError.
                // @ts-ignore
                if (response.error) throw new MatchMakeError(response.error, response.code);
                // forward reconnection token during "reconnect" methods.
                if (method === "reconnect") response.reconnectionToken = options.reconnectionToken;
                return yield this.consumeSeatReservation(response, rootSchema, reuseRoomInstance);
            });
        }
        createRoom(roomName, rootSchema) {
            return new Room(roomName, rootSchema);
        }
        buildEndpoint(room, options = {}, protocol = "ws") {
            let searchParams = this.settings.searchParams || "";
            // forward authentication token
            if (this.http.authToken) options['_authToken'] = this.http.authToken;
            // append provided options
            for(const name in options){
                if (!options.hasOwnProperty(name)) continue;
                searchParams += (searchParams ? '&' : '') + `${name}=${options[name]}`;
            }
            if (protocol === "h3") protocol = "http";
            let endpoint = this.settings.secure ? `${protocol}s://` : `${protocol}://`;
            if (room.publicAddress) endpoint += `${room.publicAddress}`;
            else endpoint += `${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}`;
            const endpointURL = `${endpoint}/${room.processId}/${room.roomId}?${searchParams}`;
            return this.urlBuilder ? this.urlBuilder(new URL(endpointURL)) : endpointURL;
        }
        getHttpEndpoint(segments = '') {
            const path = segments.startsWith("/") ? segments : `/${segments}`;
            let endpointURL = `${this.settings.secure ? "https" : "http"}://${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}${path}`;
            if (this.settings.searchParams) endpointURL += `?${this.settings.searchParams}`;
            return this.urlBuilder ? this.urlBuilder(new URL(endpointURL)) : endpointURL;
        }
        getEndpointPort() {
            return this.settings.port !== 80 && this.settings.port !== 443 ? `:${this.settings.port}` : "";
        }
    }
    Client.VERSION = "0.16.21";
    class NoneSerializer {
        setState(rawState) {}
        getState() {
            return null;
        }
        patch(patches) {}
        teardown() {}
        handshake(bytes) {}
    }
    registerSerializer('schema', SchemaSerializer);
    registerSerializer('none', NoneSerializer);
    exports1.Auth = Auth;
    exports1.Client = Client;
    exports1.MatchMakeError = MatchMakeError;
    exports1.Room = Room;
    exports1.SchemaSerializer = SchemaSerializer;
    exports1.ServerError = ServerError;
    exports1.getStateCallbacks = getStateCallbacks;
    exports1.registerSerializer = registerSerializer;
});

},{"62394090e3d8ae5f":"bCaf4"}],"bCaf4":[function(require,module,exports,__globalThis) {
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */ 'use strict';
const base64 = require("9c62938f1dccc73c");
const ieee754 = require("aceacb6a4531a9d2");
const customInspectSymbol = typeof Symbol === 'function' && typeof Symbol['for'] === 'function' // eslint-disable-line dot-notation
 ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
 : null;
exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
const K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */ Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
function typedArraySupport() {
    // Can typed array instances can be augmented?
    try {
        const arr = new Uint8Array(1);
        const proto = {
            foo: function() {
                return 42;
            }
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
    } catch (e) {
        return false;
    }
}
Object.defineProperty(Buffer.prototype, 'parent', {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.buffer;
    }
});
Object.defineProperty(Buffer.prototype, 'offset', {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.byteOffset;
    }
});
function createBuffer(length) {
    if (length > K_MAX_LENGTH) throw new RangeError('The value "' + length + '" is invalid for option "size"');
    // Return an augmented `Uint8Array` instance
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */ function Buffer(arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') throw new TypeError('The "string" argument must be of type string. Received type number');
        return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192 // not used by this implementation
;
function from(value, encodingOrOffset, length) {
    if (typeof value === 'string') return fromString(value, encodingOrOffset);
    if (ArrayBuffer.isView(value)) return fromArrayView(value);
    if (value == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof SharedArrayBuffer !== 'undefined' && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof value === 'number') throw new TypeError('The "value" argument must not be of type number. Received type number');
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) return Buffer.from(valueOf, encodingOrOffset, length);
    const b = fromObject(value);
    if (b) return b;
    if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === 'function') return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/ Buffer.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
    if (typeof size !== 'number') throw new TypeError('"size" argument must be of type number');
    else if (size < 0) throw new RangeError('The value "' + size + '" is invalid for option "size"');
}
function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) return createBuffer(size);
    if (fill !== undefined) // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string' ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    return createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/ Buffer.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
};
function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */ Buffer.allocUnsafe = function(size) {
    return allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */ Buffer.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
};
function fromString(string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8';
    if (!Buffer.isEncoding(encoding)) throw new TypeError('Unknown encoding: ' + encoding);
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
    return buf;
}
function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for(let i = 0; i < length; i += 1)buf[i] = array[i] & 255;
    return buf;
}
function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
}
function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError('"offset" is outside of buffer bounds');
    if (array.byteLength < byteOffset + (length || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let buf;
    if (byteOffset === undefined && length === undefined) buf = new Uint8Array(array);
    else if (length === undefined) buf = new Uint8Array(array, byteOffset);
    else buf = new Uint8Array(array, byteOffset, length);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
function fromObject(obj) {
    if (Buffer.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) return buf;
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj.length !== undefined) {
        if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) return createBuffer(0);
        return fromArrayLike(obj);
    }
    if (obj.type === 'Buffer' && Array.isArray(obj.data)) return fromArrayLike(obj.data);
}
function checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + ' bytes');
    return length | 0;
}
function SlowBuffer(length) {
    if (+length != length) length = 0;
    return Buffer.alloc(+length);
}
Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    ;
};
Buffer.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for(let i = 0, len = Math.min(x, y); i < len; ++i)if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
    switch(String(encoding).toLowerCase()){
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return true;
        default:
            return false;
    }
};
Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (list.length === 0) return Buffer.alloc(0);
    let i;
    if (length === undefined) {
        length = 0;
        for(i = 0; i < list.length; ++i)length += list[i].length;
    }
    const buffer = Buffer.allocUnsafe(length);
    let pos = 0;
    for(i = 0; i < list.length; ++i){
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
                if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
                buf.copy(buffer, pos);
            } else Uint8Array.prototype.set.call(buffer, buf, pos);
        } else if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
        else buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
};
function byteLength(string, encoding) {
    if (Buffer.isBuffer(string)) return string.length;
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) return string.byteLength;
    if (typeof string !== 'string') throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    // Use a for loop to avoid recursion
    let loweredCase = false;
    for(;;)switch(encoding){
        case 'ascii':
        case 'latin1':
        case 'binary':
            return len;
        case 'utf8':
        case 'utf-8':
            return utf8ToBytes(string).length;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return len * 2;
        case 'hex':
            return len >>> 1;
        case 'base64':
            return base64ToBytes(string).length;
        default:
            if (loweredCase) return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
            ;
            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
    }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
    let loweredCase = false;
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) start = 0;
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) return '';
    if (end === undefined || end > this.length) end = this.length;
    if (end <= 0) return '';
    // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;
    if (end <= start) return '';
    if (!encoding) encoding = 'utf8';
    while(true)switch(encoding){
        case 'hex':
            return hexSlice(this, start, end);
        case 'utf8':
        case 'utf-8':
            return utf8Slice(this, start, end);
        case 'ascii':
            return asciiSlice(this, start, end);
        case 'latin1':
        case 'binary':
            return latin1Slice(this, start, end);
        case 'base64':
            return base64Slice(this, start, end);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return utf16leSlice(this, start, end);
        default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
            encoding = (encoding + '').toLowerCase();
            loweredCase = true;
    }
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
    for(let i = 0; i < len; i += 2)swap(this, i, i + 1);
    return this;
};
Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
    for(let i = 0; i < len; i += 4){
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
    }
    return this;
};
Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
    for(let i = 0; i < len; i += 8){
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
    }
    return this;
};
Buffer.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0) return '';
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
    let str = '';
    const max = exports.INSPECT_MAX_BYTES;
    str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
    if (this.length > max) str += ' ... ';
    return '<Buffer ' + str + '>';
};
if (customInspectSymbol) Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) target = Buffer.from(target, target.offset, target.byteLength);
    if (!Buffer.isBuffer(target)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    if (start === undefined) start = 0;
    if (end === undefined) end = target ? target.length : 0;
    if (thisStart === undefined) thisStart = 0;
    if (thisEnd === undefined) thisEnd = this.length;
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError('out of range index');
    if (thisStart >= thisEnd && start >= end) return 0;
    if (thisStart >= thisEnd) return -1;
    if (start >= end) return 1;
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for(let i = 0; i < len; ++i)if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1;
    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
        encoding = byteOffset;
        byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;
    else if (byteOffset < -2147483648) byteOffset = -2147483648;
    byteOffset = +byteOffset // Coerce to Number.
    ;
    if (numberIsNaN(byteOffset)) // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
    }
    // Normalize val
    if (typeof val === 'string') val = Buffer.from(val, encoding);
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) return -1;
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === 'number') {
        val = val & 0xFF // Search for a byte value [0-255]
        ;
        if (typeof Uint8Array.prototype.indexOf === 'function') {
            if (dir) return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            else return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
        return arrayIndexOf(buffer, [
            val
        ], byteOffset, encoding, dir);
    }
    throw new TypeError('val must be string, number or Buffer');
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
        }
    }
    function read(buf, i) {
        if (indexSize === 1) return buf[i];
        else return buf.readUInt16BE(i * indexSize);
    }
    let i;
    if (dir) {
        let foundIndex = -1;
        for(i = byteOffset; i < arrLength; i++)if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
        }
    } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for(i = byteOffset; i >= 0; i--){
            let found = true;
            for(let j = 0; j < valLength; j++)if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
            }
            if (found) return i;
        }
    }
    return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) length = remaining;
    else {
        length = Number(length);
        if (length > remaining) length = remaining;
    }
    const strLen = string.length;
    if (length > strLen / 2) length = strLen / 2;
    let i;
    for(i = 0; i < length; ++i){
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
        encoding = 'utf8';
        length = this.length;
        offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === undefined) encoding = 'utf8';
        } else {
            encoding = length;
            length = undefined;
        }
    } else throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
    const remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError('Attempt to write outside buffer bounds');
    if (!encoding) encoding = 'utf8';
    let loweredCase = false;
    for(;;)switch(encoding){
        case 'hex':
            return hexWrite(this, string, offset, length);
        case 'utf8':
        case 'utf-8':
            return utf8Write(this, string, offset, length);
        case 'ascii':
        case 'latin1':
        case 'binary':
            return asciiWrite(this, string, offset, length);
        case 'base64':
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return ucs2Write(this, string, offset, length);
        default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
    }
};
Buffer.prototype.toJSON = function toJSON() {
    return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) return base64.fromByteArray(buf);
    else return base64.fromByteArray(buf.slice(start, end));
}
function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while(i < end){
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
        if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch(bytesPerSequence){
                case 1:
                    if (firstByte < 0x80) codePoint = firstByte;
                    break;
                case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                        if (tempCodePoint > 0x7F) codePoint = tempCodePoint;
                    }
                    break;
                case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) codePoint = tempCodePoint;
                    }
                    break;
                case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) codePoint = tempCodePoint;
                    }
            }
        }
        if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
        res.push(codePoint);
        i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000;
function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    ;
    // Decode in chunks to avoid "call stack size exceeded".
    let res = '';
    let i = 0;
    while(i < len)res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    return res;
}
function asciiSlice(buf, start, end) {
    let ret = '';
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i] & 0x7F);
    return ret;
}
function latin1Slice(buf, start, end) {
    let ret = '';
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i]);
    return ret;
}
function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = '';
    for(let i = start; i < end; ++i)out += hexSliceLookupTable[buf[i]];
    return out;
}
function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = '';
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for(let i = 0; i < bytes.length - 1; i += 2)res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    return res;
}
Buffer.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) start = 0;
    } else if (start > len) start = len;
    if (end < 0) {
        end += len;
        if (end < 0) end = 0;
    } else if (end > len) end = len;
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, Buffer.prototype);
    return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */ function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    return val;
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset + --byteLength];
    let mul = 1;
    while(byteLength > 0 && (mul *= 0x100))val += this[offset + --byteLength] * mul;
    return val;
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
};
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
};
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const lo = first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 256 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
});
Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
});
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let i = byteLength;
    let mul = 1;
    let val = this[offset + --i];
    while(i > 0 && (mul *= 0x100))val += this[offset + --i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const val = this[offset + 4] + this[offset + 5] * 256 + this[offset + 6] * 2 ** 16 + (last << 24 // Overflow
    );
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
});
Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last);
});
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
}
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let i = byteLength - 1;
    let mul = 1;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
}
function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
}
Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'));
});
Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'));
});
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = byteLength - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -128);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    if (value < 0) value = 0xffffffff + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
});
Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
});
function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
    if (offset < 0) throw new RangeError('Index out of range');
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -340282346638528860000000000000000000000);
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    // Fatal error conditions
    if (targetStart < 0) throw new RangeError('targetStart out of bounds');
    if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
    if (end < 0) throw new RangeError('sourceEnd out of bounds');
    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) end = target.length - targetStart + start;
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
    else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    return len;
};
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
        if (typeof start === 'string') {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === 'string') {
            encoding = end;
            end = this.length;
        }
        if (encoding !== undefined && typeof encoding !== 'string') throw new TypeError('encoding must be a string');
        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) throw new TypeError('Unknown encoding: ' + encoding);
        if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === 'utf8' && code < 128 || encoding === 'latin1') // Fast path: If `val` fits into a single byte, use that numeric value.
            val = code;
        }
    } else if (typeof val === 'number') val = val & 255;
    else if (typeof val === 'boolean') val = Number(val);
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) throw new RangeError('Out of range index');
    if (end <= start) return this;
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    let i;
    if (typeof val === 'number') for(i = start; i < end; ++i)this[i] = val;
    else {
        const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        const len = bytes.length;
        if (len === 0) throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        for(i = 0; i < end - start; ++i)this[i + start] = bytes[i % len];
    }
    return this;
};
// CUSTOM ERRORS
// =============
// Simplified versions from Node, changed for Buffer-only usage
const errors = {};
function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
        constructor(){
            super();
            Object.defineProperty(this, 'message', {
                value: getMessage.apply(this, arguments),
                writable: true,
                configurable: true
            });
            // Add the error code to the name to include it in the stack trace.
            this.name = `${this.name} [${sym}]`;
            // Access the stack to generate the error message including the error code
            // from the name.
            this.stack // eslint-disable-line no-unused-expressions
            ;
            // Reset the name to the actual name.
            delete this.name;
        }
        get code() {
            return sym;
        }
        set code(value) {
            Object.defineProperty(this, 'code', {
                configurable: true,
                enumerable: true,
                value,
                writable: true
            });
        }
        toString() {
            return `${this.name} [${sym}]: ${this.message}`;
        }
    };
}
E('ERR_BUFFER_OUT_OF_BOUNDS', function(name) {
    if (name) return `${name} is outside of buffer bounds`;
    return 'Attempt to access memory outside buffer bounds';
}, RangeError);
E('ERR_INVALID_ARG_TYPE', function(name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
}, TypeError);
E('ERR_OUT_OF_RANGE', function(str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) received = addNumericalSeparator(String(input));
    else if (typeof input === 'bigint') {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) received = addNumericalSeparator(received);
        received += 'n';
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg;
}, RangeError);
function addNumericalSeparator(val) {
    let res = '';
    let i = val.length;
    const start = val[0] === '-' ? 1 : 0;
    for(; i >= start + 4; i -= 3)res = `_${val.slice(i - 3, i)}${res}`;
    return `${val.slice(0, i)}${res}`;
}
// CHECK FUNCTIONS
// ===============
function checkBounds(buf, offset, byteLength) {
    validateNumber(offset, 'offset');
    if (buf[offset] === undefined || buf[offset + byteLength] === undefined) boundsError(offset, buf.length - (byteLength + 1));
}
function checkIntBI(value, min, max, buf, offset, byteLength) {
    if (value > max || value < min) {
        const n = typeof min === 'bigint' ? 'n' : '';
        let range;
        if (byteLength > 3) {
            if (min === 0 || min === BigInt(0)) range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
            else range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` + `${(byteLength + 1) * 8 - 1}${n}`;
        } else range = `>= ${min}${n} and <= ${max}${n}`;
        throw new errors.ERR_OUT_OF_RANGE('value', range, value);
    }
    checkBounds(buf, offset, byteLength);
}
function validateNumber(value, name) {
    if (typeof value !== 'number') throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value);
}
function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value);
    }
    if (length < 0) throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', `>= ${type ? 1 : 0} and <= ${length}`, value);
}
// HELPER FUNCTIONS
// ================
const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split('=')[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return '';
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while(str.length % 4 !== 0)str = str + '=';
    return str;
}
function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for(let i = 0; i < length; ++i){
        codePoint = string.charCodeAt(i);
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                // valid lead
                leadSurrogate = codePoint;
                continue;
            }
            // 2 leads in a row
            if (codePoint < 0xDC00) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
            }
            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) // valid bmp char, but last char was a lead
        {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }
        leadSurrogate = null;
        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
        } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else throw new Error('Invalid code point');
    }
    return bytes;
}
function asciiToBytes(str) {
    const byteArray = [];
    for(let i = 0; i < str.length; ++i)// Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
    return byteArray;
}
function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
    let i;
    for(i = 0; i < length; ++i){
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
    }
    return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function numberIsNaN(obj) {
    // For IE11 support
    return obj !== obj // eslint-disable-line no-self-compare
    ;
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = function() {
    const alphabet = '0123456789abcdef';
    const table = new Array(256);
    for(let i = 0; i < 16; ++i){
        const i16 = i * 16;
        for(let j = 0; j < 16; ++j)table[i16 + j] = alphabet[i] + alphabet[j];
    }
    return table;
}();
// Return not function with Error if BigInt not supported
function defineBigIntMethod(fn) {
    return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn;
}
function BufferBigIntNotDefined() {
    throw new Error('BigInt not supported');
}

},{"9c62938f1dccc73c":"9I2RJ","aceacb6a4531a9d2":"geXY6"}],"9I2RJ":[function(require,module,exports,__globalThis) {
'use strict';
exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf('=');
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join('');
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
    }
    return parts.join('');
}

},{}],"geXY6":[function(require,module,exports,__globalThis) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ exports.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for(; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for(; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
    if (e === 0) e = 1 - eBias;
    else if (e === eMax) return m ? NaN : (s ? -1 : 1) * Infinity;
    else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) value += rt / c;
        else value += rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }
    for(; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);
    e = e << mLen | m;
    eLen += mLen;
    for(; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);
    buffer[offset + i - d] |= s * 128;
};

},{}]},["3dtlh","gH3Lb"], "gH3Lb", "parcelRequire29c8", {})

//# sourceMappingURL=client.34df32e0.js.map
