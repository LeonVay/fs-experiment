/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "a7069c739eabb658b08a";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./libs/auth/src/auth.controller.ts":
/*!******************************************!*\
  !*** ./libs/auth/src/auth.controller.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst signin_dto_1 = __webpack_require__(/*! ./dto/signin.dto */ \"./libs/auth/src/dto/signin.dto.ts\");\nconst auth_service_1 = __webpack_require__(/*! ./auth.service */ \"./libs/auth/src/auth.service.ts\");\nlet AuthController = class AuthController {\n    constructor(authService) {\n        this.authService = authService;\n    }\n    async signIn(signInDto) {\n        return this.authService.signIn(signInDto);\n    }\n    async signOut() {\n        return this.authService.signOut();\n    }\n};\n__decorate([\n    common_1.Post('/signin'),\n    __param(0, common_1.Body(common_1.ValidationPipe)),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [signin_dto_1.SignInDto]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"signIn\", null);\n__decorate([\n    common_1.Post('/signout'),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"signOut\", null);\nAuthController = __decorate([\n    common_1.Controller('/auth'),\n    __metadata(\"design:paramtypes\", [auth_service_1.AuthService])\n], AuthController);\nexports.AuthController = AuthController;\n\n\n//# sourceURL=webpack:///./libs/auth/src/auth.controller.ts?");

/***/ }),

/***/ "./libs/auth/src/auth.module.ts":
/*!**************************************!*\
  !*** ./libs/auth/src/auth.module.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config = __webpack_require__(/*! config */ \"config\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst auth_controller_1 = __webpack_require__(/*! ./auth.controller */ \"./libs/auth/src/auth.controller.ts\");\nconst auth_service_1 = __webpack_require__(/*! ./auth.service */ \"./libs/auth/src/auth.service.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst auth_repository_1 = __webpack_require__(/*! ./repository/auth.repository */ \"./libs/auth/src/repository/auth.repository.ts\");\nconst jwt_1 = __webpack_require__(/*! @nestjs/jwt */ \"@nestjs/jwt\");\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst jwt_strategy_1 = __webpack_require__(/*! ./jwt/jwt-strategy */ \"./libs/auth/src/jwt/jwt-strategy.ts\");\nconst jwtConfig = config.get('jwt');\nlet AuthModule = class AuthModule {\n};\nAuthModule = __decorate([\n    common_1.Module({\n        imports: [\n            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),\n            jwt_1.JwtModule.register({\n                secret: process.env.JWT_SECRET || jwtConfig.secret,\n                signOptions: {\n                    expiresIn: process.env.JWT_EXPIRES || jwtConfig.expiresIn\n                }\n            }),\n            typeorm_1.TypeOrmModule.forFeature([auth_repository_1.AuthRepository])\n        ],\n        controllers: [auth_controller_1.AuthController],\n        providers: [\n            auth_service_1.AuthService,\n            jwt_strategy_1.JwtStrategy\n        ],\n        exports: [\n            jwt_strategy_1.JwtStrategy,\n            passport_1.PassportModule\n        ]\n    })\n], AuthModule);\nexports.AuthModule = AuthModule;\n\n\n//# sourceURL=webpack:///./libs/auth/src/auth.module.ts?");

/***/ }),

/***/ "./libs/auth/src/auth.service.ts":
/*!***************************************!*\
  !*** ./libs/auth/src/auth.service.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst auth_repository_1 = __webpack_require__(/*! ./repository/auth.repository */ \"./libs/auth/src/repository/auth.repository.ts\");\nconst jwt_1 = __webpack_require__(/*! @nestjs/jwt */ \"@nestjs/jwt\");\nlet AuthService = class AuthService {\n    constructor(authRepository, jwtService) {\n        this.authRepository = authRepository;\n        this.jwtService = jwtService;\n    }\n    async signIn(signInDto) {\n        const { login } = signInDto;\n        const validated = await this.authRepository.signIn(signInDto);\n        if (!validated) {\n            throw new common_1.UnauthorizedException('Invalid credentials');\n        }\n        const payload = { userName: login };\n        const accessToken = await this.jwtService.sign(payload);\n        return { accessToken };\n    }\n    signOut() {\n        return;\n    }\n};\nAuthService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(auth_repository_1.AuthRepository)),\n    __metadata(\"design:paramtypes\", [auth_repository_1.AuthRepository,\n        jwt_1.JwtService])\n], AuthService);\nexports.AuthService = AuthService;\n\n\n//# sourceURL=webpack:///./libs/auth/src/auth.service.ts?");

/***/ }),

/***/ "./libs/auth/src/decorators/get-user.decorator.ts":
/*!********************************************************!*\
  !*** ./libs/auth/src/decorators/get-user.decorator.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nexports.GetUser = common_1.createParamDecorator((data, request) => {\n    return request.user;\n});\n\n\n//# sourceURL=webpack:///./libs/auth/src/decorators/get-user.decorator.ts?");

/***/ }),

/***/ "./libs/auth/src/dto/signin.dto.ts":
/*!*****************************************!*\
  !*** ./libs/auth/src/dto/signin.dto.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass SignInDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.MinLength(6),\n    class_validator_1.MaxLength(20),\n    __metadata(\"design:type\", String)\n], SignInDto.prototype, \"login\", void 0);\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.IsNotEmpty(),\n    class_validator_1.MinLength(6),\n    class_validator_1.MaxLength(50),\n    class_validator_1.Matches(/[a-zA-Z0-9#!]/, { message: 'Password is too weak.' }),\n    __metadata(\"design:type\", String)\n], SignInDto.prototype, \"password\", void 0);\nexports.SignInDto = SignInDto;\n\n\n//# sourceURL=webpack:///./libs/auth/src/dto/signin.dto.ts?");

/***/ }),

/***/ "./libs/auth/src/index.ts":
/*!********************************!*\
  !*** ./libs/auth/src/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./auth.module */ \"./libs/auth/src/auth.module.ts\"));\n__export(__webpack_require__(/*! ./auth.service */ \"./libs/auth/src/auth.service.ts\"));\n__export(__webpack_require__(/*! ./decorators/get-user.decorator */ \"./libs/auth/src/decorators/get-user.decorator.ts\"));\n__export(__webpack_require__(/*! ./repository/auth.entity.dto */ \"./libs/auth/src/repository/auth.entity.dto.ts\"));\n\n\n//# sourceURL=webpack:///./libs/auth/src/index.ts?");

/***/ }),

/***/ "./libs/auth/src/jwt/jwt-strategy.ts":
/*!*******************************************!*\
  !*** ./libs/auth/src/jwt/jwt-strategy.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config = __webpack_require__(/*! config */ \"config\");\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst passport_jwt_1 = __webpack_require__(/*! passport-jwt */ \"passport-jwt\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst auth_repository_1 = __webpack_require__(/*! ../repository/auth.repository */ \"./libs/auth/src/repository/auth.repository.ts\");\nconst jwtConfig = config.get('jwt');\nlet JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {\n    constructor(authRepository) {\n        super({\n            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),\n            secretOrKey: process.env.JST_SECRET || jwtConfig.secret\n        });\n        this.authRepository = authRepository;\n    }\n    async validate(payload) {\n        const { userName } = payload;\n        const user = await this.authRepository.getUserByName(userName);\n        if (!user) {\n            throw new common_1.UnauthorizedException();\n        }\n        return user;\n    }\n};\nJwtStrategy = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(auth_repository_1.AuthRepository)),\n    __metadata(\"design:paramtypes\", [auth_repository_1.AuthRepository])\n], JwtStrategy);\nexports.JwtStrategy = JwtStrategy;\n\n\n//# sourceURL=webpack:///./libs/auth/src/jwt/jwt-strategy.ts?");

/***/ }),

/***/ "./libs/auth/src/repository/auth.entity.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/auth/src/repository/auth.entity.dto.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst users_1 = __webpack_require__(/*! @backend/users */ \"./libs/users/src/index.ts\");\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nlet AuthEntity = class AuthEntity extends users_1.User {\n    validatePassword() {\n        const secret = bcrypt.hash(this.passwd, this.salt);\n        return secret === this.hash;\n    }\n};\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], AuthEntity.prototype, \"passwd\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], AuthEntity.prototype, \"salt\", void 0);\nAuthEntity = __decorate([\n    typeorm_1.Entity()\n], AuthEntity);\nexports.AuthEntity = AuthEntity;\n\n\n//# sourceURL=webpack:///./libs/auth/src/repository/auth.entity.dto.ts?");

/***/ }),

/***/ "./libs/auth/src/repository/auth.repository.ts":
/*!*****************************************************!*\
  !*** ./libs/auth/src/repository/auth.repository.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst users_1 = __webpack_require__(/*! @backend/users */ \"./libs/users/src/index.ts\");\nconst auth_entity_dto_1 = __webpack_require__(/*! ./auth.entity.dto */ \"./libs/auth/src/repository/auth.entity.dto.ts\");\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nlet AuthRepository = class AuthRepository extends users_1.UsersRepository {\n    constructor() {\n        super();\n    }\n    async getUserByName(name) {\n        return await this.find({ login: name })[0];\n    }\n    async signIn(signInDto) {\n        const { login, password } = signInDto;\n        const exist = await this.getUserByName(login);\n        if (exist && this.validatePassword(password, exist)) {\n            return { userName: exist.login };\n        }\n    }\n    async createSecuredUser(createUserDto) {\n        const created = await this.createUser(createUserDto);\n        const salt = bcrypt.genSalt();\n        created.salt = salt;\n        const hash = this.hashPassword(created.passwd, created.salt);\n        created.hash = hash;\n        try {\n            await created.save();\n        }\n        catch (error) {\n            throw new common_1.InternalServerErrorException('Something wrong.');\n        }\n        return { userName: created.login };\n    }\n    hashPassword(password, salt) {\n        return bcrypt.hash(password, salt);\n    }\n    validatePassword(password, user) {\n        const hash = bcrypt.hash(password, user.salt);\n        return hash === user.hash;\n    }\n};\nAuthRepository = __decorate([\n    typeorm_1.EntityRepository(auth_entity_dto_1.AuthEntity),\n    __metadata(\"design:paramtypes\", [])\n], AuthRepository);\nexports.AuthRepository = AuthRepository;\n\n\n//# sourceURL=webpack:///./libs/auth/src/repository/auth.repository.ts?");

/***/ }),

/***/ "./libs/pipes/projects-statuses-validation.pipe.ts":
/*!*********************************************************!*\
  !*** ./libs/pipes/projects-statuses-validation.pipe.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst projects_1 = __webpack_require__(/*! @backend/projects */ \"./libs/projects/src/index.ts\");\nclass ProjectsStatusesValidationPipe {\n    constructor() {\n        this.availableStatuses = [\n            projects_1.ProjectsStatus.OPEN,\n            projects_1.ProjectsStatus.IN_PROGRESS,\n            projects_1.ProjectsStatus.ON_HOLD,\n            projects_1.ProjectsStatus.CLOSED\n        ];\n    }\n    transform(value) {\n        if (!this.isStatusAvailable(value)) {\n            throw new common_1.BadRequestException(`Wrong project status: ${value}`);\n        }\n        return value;\n    }\n    isStatusAvailable(value) {\n        let indx = this.availableStatuses.indexOf(value);\n        return indx !== -1;\n    }\n}\nexports.ProjectsStatusesValidationPipe = ProjectsStatusesValidationPipe;\n\n\n//# sourceURL=webpack:///./libs/pipes/projects-statuses-validation.pipe.ts?");

/***/ }),

/***/ "./libs/projects/src/dto/create-project.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/projects/src/dto/create-project.dto.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass CreateProjectDto {\n}\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    __metadata(\"design:type\", String)\n], CreateProjectDto.prototype, \"name\", void 0);\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    __metadata(\"design:type\", String)\n], CreateProjectDto.prototype, \"description\", void 0);\nexports.CreateProjectDto = CreateProjectDto;\n;\n\n\n//# sourceURL=webpack:///./libs/projects/src/dto/create-project.dto.ts?");

/***/ }),

/***/ "./libs/projects/src/dto/delete-project.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/projects/src/dto/delete-project.dto.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass DeleteProjectDto {\n}\n__decorate([\n    class_validator_1.IsArray(),\n    class_validator_1.IsNotEmpty(),\n    __metadata(\"design:type\", Array)\n], DeleteProjectDto.prototype, \"ids\", void 0);\nexports.DeleteProjectDto = DeleteProjectDto;\n;\n\n\n//# sourceURL=webpack:///./libs/projects/src/dto/delete-project.dto.ts?");

/***/ }),

/***/ "./libs/projects/src/dto/get-projects.dto.ts":
/*!***************************************************!*\
  !*** ./libs/projects/src/dto/get-projects.dto.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst project_interface_1 = __webpack_require__(/*! ../project.interface */ \"./libs/projects/src/project.interface.ts\");\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass GetCretariaDto {\n}\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    __metadata(\"design:type\", String)\n], GetCretariaDto.prototype, \"status\", void 0);\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    __metadata(\"design:type\", String)\n], GetCretariaDto.prototype, \"search\", void 0);\nexports.GetCretariaDto = GetCretariaDto;\n\n\n//# sourceURL=webpack:///./libs/projects/src/dto/get-projects.dto.ts?");

/***/ }),

/***/ "./libs/projects/src/dto/update-project.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/projects/src/dto/update-project.dto.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst project_interface_1 = __webpack_require__(/*! ../project.interface */ \"./libs/projects/src/project.interface.ts\");\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass UpdateProjectDto {\n}\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    __metadata(\"design:type\", String)\n], UpdateProjectDto.prototype, \"status\", void 0);\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    __metadata(\"design:type\", String)\n], UpdateProjectDto.prototype, \"description\", void 0);\nexports.UpdateProjectDto = UpdateProjectDto;\n;\n\n\n//# sourceURL=webpack:///./libs/projects/src/dto/update-project.dto.ts?");

/***/ }),

/***/ "./libs/projects/src/index.ts":
/*!************************************!*\
  !*** ./libs/projects/src/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./projects.module */ \"./libs/projects/src/projects.module.ts\"));\n__export(__webpack_require__(/*! ./projects.service */ \"./libs/projects/src/projects.service.ts\"));\n__export(__webpack_require__(/*! ./project.interface */ \"./libs/projects/src/project.interface.ts\"));\n__export(__webpack_require__(/*! ./dto/create-project.dto */ \"./libs/projects/src/dto/create-project.dto.ts\"));\n__export(__webpack_require__(/*! ./dto/delete-project.dto */ \"./libs/projects/src/dto/delete-project.dto.ts\"));\n__export(__webpack_require__(/*! ./dto/get-projects.dto */ \"./libs/projects/src/dto/get-projects.dto.ts\"));\n__export(__webpack_require__(/*! ./dto/update-project.dto */ \"./libs/projects/src/dto/update-project.dto.ts\"));\n__export(__webpack_require__(/*! ./repository/projects.entity */ \"./libs/projects/src/repository/projects.entity.ts\"));\n__export(__webpack_require__(/*! ./repository/projects.repository */ \"./libs/projects/src/repository/projects.repository.ts\"));\n\n\n//# sourceURL=webpack:///./libs/projects/src/index.ts?");

/***/ }),

/***/ "./libs/projects/src/project.interface.ts":
/*!************************************************!*\
  !*** ./libs/projects/src/project.interface.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ProjectsStatus;\n(function (ProjectsStatus) {\n    ProjectsStatus[\"OPEN\"] = \"Open\";\n    ProjectsStatus[\"IN_PROGRESS\"] = \"In progress\";\n    ProjectsStatus[\"ON_HOLD\"] = \"On hold\";\n    ProjectsStatus[\"CLOSED\"] = \"Closed\";\n})(ProjectsStatus = exports.ProjectsStatus || (exports.ProjectsStatus = {}));\n\n\n//# sourceURL=webpack:///./libs/projects/src/project.interface.ts?");

/***/ }),

/***/ "./libs/projects/src/projects.controller.ts":
/*!**************************************************!*\
  !*** ./libs/projects/src/projects.controller.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst create_project_dto_1 = __webpack_require__(/*! ./dto/create-project.dto */ \"./libs/projects/src/dto/create-project.dto.ts\");\nconst projects_service_1 = __webpack_require__(/*! ./projects.service */ \"./libs/projects/src/projects.service.ts\");\nconst get_projects_dto_1 = __webpack_require__(/*! ./dto/get-projects.dto */ \"./libs/projects/src/dto/get-projects.dto.ts\");\nconst update_project_dto_1 = __webpack_require__(/*! ./dto/update-project.dto */ \"./libs/projects/src/dto/update-project.dto.ts\");\nconst delete_project_dto_1 = __webpack_require__(/*! ./dto/delete-project.dto */ \"./libs/projects/src/dto/delete-project.dto.ts\");\nconst projects_statuses_validation_pipe_1 = __webpack_require__(/*! libs/pipes/projects-statuses-validation.pipe */ \"./libs/pipes/projects-statuses-validation.pipe.ts\");\nconst project_interface_1 = __webpack_require__(/*! ./project.interface */ \"./libs/projects/src/project.interface.ts\");\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst auth_1 = __webpack_require__(/*! @backend/auth */ \"./libs/auth/src/index.ts\");\nconst users_1 = __webpack_require__(/*! @backend/users */ \"./libs/users/src/index.ts\");\nlet ProjectsController = class ProjectsController {\n    constructor(projectsService) {\n        this.projectsService = projectsService;\n    }\n    getProjects(getCretariaDto, user) {\n        return this.projectsService.getByCriteria(getCretariaDto, user);\n    }\n    getProjectById(id, user) {\n        return this.projectsService.getById(id, user);\n    }\n    createProject(createProjectDto, user) {\n        return this.projectsService.create(createProjectDto, user);\n    }\n    updateProject(id, updateProjectDto, user) {\n        return this.projectsService.updateProject(id, updateProjectDto, user);\n    }\n    updateProjectStatus(id, status, user) {\n        return this.projectsService.updateProjectStatus(id, status, user);\n    }\n    deleteProjects(deleteProjectDto, user) {\n        return this.projectsService.deleteProjects(deleteProjectDto, user);\n    }\n    deleteById(id, user) {\n        return this.projectsService.deleteById(id, user);\n    }\n};\n__decorate([\n    common_1.Get(),\n    common_1.UsePipes(common_1.ValidationPipe),\n    __param(0, common_1.Query()),\n    __param(1, auth_1.GetUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [get_projects_dto_1.GetCretariaDto,\n        users_1.User]),\n    __metadata(\"design:returntype\", Promise)\n], ProjectsController.prototype, \"getProjects\", null);\n__decorate([\n    common_1.Get('/:id'),\n    __param(0, common_1.Param('id', common_1.ParseIntPipe)),\n    __param(1, auth_1.GetUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, users_1.User]),\n    __metadata(\"design:returntype\", Promise)\n], ProjectsController.prototype, \"getProjectById\", null);\n__decorate([\n    common_1.Post('/save'),\n    common_1.UsePipes(common_1.ValidationPipe),\n    __param(0, common_1.Body()),\n    __param(1, auth_1.GetUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [create_project_dto_1.CreateProjectDto,\n        users_1.User]),\n    __metadata(\"design:returntype\", Promise)\n], ProjectsController.prototype, \"createProject\", null);\n__decorate([\n    common_1.Put(':/id'),\n    common_1.UsePipes(common_1.ValidationPipe),\n    __param(0, common_1.Param('id', common_1.ParseIntPipe)),\n    __param(1, common_1.Body()),\n    __param(2, auth_1.GetUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, update_project_dto_1.UpdateProjectDto,\n        users_1.User]),\n    __metadata(\"design:returntype\", Promise)\n], ProjectsController.prototype, \"updateProject\", null);\n__decorate([\n    common_1.Put('/:id/status'),\n    __param(0, common_1.Param('id', common_1.ParseIntPipe)),\n    __param(1, common_1.Body('status', projects_statuses_validation_pipe_1.ProjectsStatusesValidationPipe)),\n    __param(2, auth_1.GetUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, String, users_1.User]),\n    __metadata(\"design:returntype\", Promise)\n], ProjectsController.prototype, \"updateProjectStatus\", null);\n__decorate([\n    common_1.Delete(),\n    common_1.UsePipes(common_1.ValidationPipe),\n    __param(0, common_1.Body()),\n    __param(1, auth_1.GetUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [delete_project_dto_1.DeleteProjectDto,\n        users_1.User]),\n    __metadata(\"design:returntype\", void 0)\n], ProjectsController.prototype, \"deleteProjects\", null);\n__decorate([\n    common_1.Delete('/:id'),\n    __param(0, common_1.Param('id', common_1.ParseIntPipe)),\n    __param(1, auth_1.GetUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, users_1.User]),\n    __metadata(\"design:returntype\", Promise)\n], ProjectsController.prototype, \"deleteById\", null);\nProjectsController = __decorate([\n    common_1.Controller('/projects'),\n    common_1.UseGuards(passport_1.AuthGuard()),\n    __metadata(\"design:paramtypes\", [projects_service_1.ProjectsService])\n], ProjectsController);\nexports.ProjectsController = ProjectsController;\n\n\n//# sourceURL=webpack:///./libs/projects/src/projects.controller.ts?");

/***/ }),

/***/ "./libs/projects/src/projects.module.ts":
/*!**********************************************!*\
  !*** ./libs/projects/src/projects.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst projects_controller_1 = __webpack_require__(/*! ./projects.controller */ \"./libs/projects/src/projects.controller.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst projects_repository_1 = __webpack_require__(/*! ./repository/projects.repository */ \"./libs/projects/src/repository/projects.repository.ts\");\nconst projects_service_1 = __webpack_require__(/*! ./projects.service */ \"./libs/projects/src/projects.service.ts\");\nconst auth_1 = __webpack_require__(/*! @backend/auth */ \"./libs/auth/src/index.ts\");\nlet ProjectsModule = class ProjectsModule {\n};\nProjectsModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forFeature([projects_repository_1.ProjectsRepository]),\n            auth_1.AuthModule\n        ],\n        controllers: [projects_controller_1.ProjectsController],\n        providers: [projects_service_1.ProjectsService],\n    })\n], ProjectsModule);\nexports.ProjectsModule = ProjectsModule;\n\n\n//# sourceURL=webpack:///./libs/projects/src/projects.module.ts?");

/***/ }),

/***/ "./libs/projects/src/projects.service.ts":
/*!***********************************************!*\
  !*** ./libs/projects/src/projects.service.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst projects_repository_1 = __webpack_require__(/*! ./repository/projects.repository */ \"./libs/projects/src/repository/projects.repository.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nlet ProjectsService = class ProjectsService {\n    constructor(projectsRepository) {\n        this.projectsRepository = projectsRepository;\n    }\n    async getByCriteria(getCriteriaDto, user) {\n        let { status, search } = getCriteriaDto;\n        let requestResult = [];\n        if (!status && search.length === 0) {\n            requestResult = await this.projectsRepository.getAllProjects(user);\n        }\n        requestResult = await this.projectsRepository.getProjectsByCriteria(status, search, user);\n        return requestResult;\n    }\n    async getById(id, user) {\n        return this.projectsRepository.getProjectById(id, user);\n    }\n    async create(createProjectDto, user) {\n        return this.projectsRepository.createProject(createProjectDto, user);\n    }\n    async updateProject(id, patch, user) {\n        return this.projectsRepository.updateProject(id, patch, user);\n    }\n    async updateProjectStatus(id, status, user) {\n        return this.projectsRepository.updateProjectStatus(id, status, user);\n    }\n    async deleteProjects(ids, user) {\n        return this.projectsRepository.deleteProjects(ids, user);\n    }\n    async deleteById(id, user) {\n        return this.projectsRepository.deleteById(id, user);\n    }\n};\nProjectsService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(projects_repository_1.ProjectsRepository)),\n    __metadata(\"design:paramtypes\", [projects_repository_1.ProjectsRepository])\n], ProjectsService);\nexports.ProjectsService = ProjectsService;\n\n\n//# sourceURL=webpack:///./libs/projects/src/projects.service.ts?");

/***/ }),

/***/ "./libs/projects/src/repository/projects.entity.ts":
/*!*********************************************************!*\
  !*** ./libs/projects/src/repository/projects.entity.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst project_interface_1 = __webpack_require__(/*! ../project.interface */ \"./libs/projects/src/project.interface.ts\");\nconst users_1 = __webpack_require__(/*! @backend/users */ \"./libs/users/src/index.ts\");\nlet Projects = class Projects extends typeorm_1.BaseEntity {\n};\n__decorate([\n    typeorm_1.PrimaryGeneratedColumn(),\n    __metadata(\"design:type\", Number)\n], Projects.prototype, \"id\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], Projects.prototype, \"name\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], Projects.prototype, \"description\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], Projects.prototype, \"status\", void 0);\n__decorate([\n    typeorm_1.ManyToOne(type => users_1.User, user => user.projects, { eager: false }),\n    __metadata(\"design:type\", users_1.User)\n], Projects.prototype, \"owner\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", Number)\n], Projects.prototype, \"userId\", void 0);\nProjects = __decorate([\n    typeorm_1.Entity()\n], Projects);\nexports.Projects = Projects;\n\n\n//# sourceURL=webpack:///./libs/projects/src/repository/projects.entity.ts?");

/***/ }),

/***/ "./libs/projects/src/repository/projects.repository.ts":
/*!*************************************************************!*\
  !*** ./libs/projects/src/repository/projects.repository.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst projects_entity_1 = __webpack_require__(/*! ./projects.entity */ \"./libs/projects/src/repository/projects.entity.ts\");\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst project_interface_1 = __webpack_require__(/*! ../project.interface */ \"./libs/projects/src/project.interface.ts\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nlet ProjectsRepository = class ProjectsRepository extends typeorm_1.Repository {\n    constructor() {\n        super();\n        return this;\n    }\n    async getAllProjects(user) {\n        return (await this.find()).filter((project) => project.userId === user.id);\n    }\n    async getProjectsByCriteria(status, search, user) {\n        const query = this.createQueryBuilder('projects');\n        query.where('projects.userId = :userId', { userId: user.id });\n        if (status) {\n            await query.andWhere('projects.status = :status', { status });\n        }\n        if (search) {\n            await query.andWhere('(projects.name LIKE :search OR projects.description)', { search: `%${search}%` });\n        }\n        const projects = await query.getMany();\n        return projects;\n    }\n    async getProjectById(id, user) {\n        let requestResult = this.findOne({ where: { id, userId: user.id } });\n        if (!requestResult) {\n            throw new common_1.NotFoundException(`Project with ID: ${id} not found.`);\n        }\n        return requestResult;\n    }\n    async createProject(createProjectDto, user) {\n        let { name, description } = createProjectDto;\n        let newProject = new projects_entity_1.Projects();\n        newProject.name = name;\n        newProject.description = description;\n        newProject.status = project_interface_1.ProjectsStatus.OPEN;\n        newProject.owner = user;\n        await newProject.save();\n        delete newProject.owner;\n        return newProject;\n    }\n    async updateProject(id, updateProjectDto, user) {\n        let { status, description } = updateProjectDto;\n        let projectToUpdate = await this.getProjectById(id, user);\n        projectToUpdate.status = status;\n        projectToUpdate.description = description;\n        await projectToUpdate.save();\n        return projectToUpdate;\n    }\n    async updateProjectStatus(id, status, user) {\n        let projectToUpdate = await this.getProjectById(id, user);\n        projectToUpdate.status = status;\n        await projectToUpdate.save();\n        return projectToUpdate;\n    }\n    async deleteProjects(deleteProjectsDto, user) {\n        let { ids } = deleteProjectsDto;\n        ids.forEach((id) => this.deleteById(id, user));\n        return;\n    }\n    async deleteById(id, user) {\n        return this.delete({ id, userId: user.id });\n    }\n};\nProjectsRepository = __decorate([\n    typeorm_1.EntityRepository(projects_entity_1.Projects),\n    __metadata(\"design:paramtypes\", [])\n], ProjectsRepository);\nexports.ProjectsRepository = ProjectsRepository;\n\n\n//# sourceURL=webpack:///./libs/projects/src/repository/projects.repository.ts?");

/***/ }),

/***/ "./libs/users/src/dto/create-user.dto.ts":
/*!***********************************************!*\
  !*** ./libs/users/src/dto/create-user.dto.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass CreateUsersDto {\n}\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    class_validator_1.MinLength(2),\n    class_validator_1.MaxLength(50),\n    __metadata(\"design:type\", String)\n], CreateUsersDto.prototype, \"firstName\", void 0);\n__decorate([\n    class_validator_1.IsOptional(),\n    __metadata(\"design:type\", String)\n], CreateUsersDto.prototype, \"lastName\", void 0);\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    class_validator_1.MinLength(6),\n    class_validator_1.MaxLength(20),\n    __metadata(\"design:type\", String)\n], CreateUsersDto.prototype, \"login\", void 0);\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    class_validator_1.MinLength(6),\n    class_validator_1.MaxLength(30),\n    class_validator_1.Matches(/[a-zA-Z0-9#!]/, { message: 'Password is too weak.' }),\n    __metadata(\"design:type\", String)\n], CreateUsersDto.prototype, \"passwd\", void 0);\nexports.CreateUsersDto = CreateUsersDto;\n\n\n//# sourceURL=webpack:///./libs/users/src/dto/create-user.dto.ts?");

/***/ }),

/***/ "./libs/users/src/dto/delete-user.dto.ts":
/*!***********************************************!*\
  !*** ./libs/users/src/dto/delete-user.dto.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass DeleteUserDto {\n}\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    __metadata(\"design:type\", Array)\n], DeleteUserDto.prototype, \"id\", void 0);\nexports.DeleteUserDto = DeleteUserDto;\n\n\n//# sourceURL=webpack:///./libs/users/src/dto/delete-user.dto.ts?");

/***/ }),

/***/ "./libs/users/src/dto/get-user.dto.ts":
/*!********************************************!*\
  !*** ./libs/users/src/dto/get-user.dto.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass GetUserDto {\n}\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    __metadata(\"design:type\", Number)\n], GetUserDto.prototype, \"id\", void 0);\nexports.GetUserDto = GetUserDto;\n\n\n//# sourceURL=webpack:///./libs/users/src/dto/get-user.dto.ts?");

/***/ }),

/***/ "./libs/users/src/dto/log-in.dto.ts":
/*!******************************************!*\
  !*** ./libs/users/src/dto/log-in.dto.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass LogInDto {\n}\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    __metadata(\"design:type\", String)\n], LogInDto.prototype, \"login\", void 0);\n__decorate([\n    class_validator_1.IsNotEmpty(),\n    __metadata(\"design:type\", String)\n], LogInDto.prototype, \"passwd\", void 0);\nexports.LogInDto = LogInDto;\n\n\n//# sourceURL=webpack:///./libs/users/src/dto/log-in.dto.ts?");

/***/ }),

/***/ "./libs/users/src/dto/update-user.dto.ts":
/*!***********************************************!*\
  !*** ./libs/users/src/dto/update-user.dto.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass UpdateUserDto {\n}\n__decorate([\n    class_validator_1.IsOptional(),\n    __metadata(\"design:type\", String)\n], UpdateUserDto.prototype, \"firstName\", void 0);\n__decorate([\n    class_validator_1.IsOptional(),\n    __metadata(\"design:type\", String)\n], UpdateUserDto.prototype, \"lastName\", void 0);\n__decorate([\n    class_validator_1.IsOptional(),\n    class_validator_1.MinLength(6),\n    class_validator_1.MaxLength(50),\n    __metadata(\"design:type\", String)\n], UpdateUserDto.prototype, \"passwd\", void 0);\nexports.UpdateUserDto = UpdateUserDto;\n\n\n//# sourceURL=webpack:///./libs/users/src/dto/update-user.dto.ts?");

/***/ }),

/***/ "./libs/users/src/index.ts":
/*!*********************************!*\
  !*** ./libs/users/src/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./users.module */ \"./libs/users/src/users.module.ts\"));\n__export(__webpack_require__(/*! ./users.service */ \"./libs/users/src/users.service.ts\"));\n__export(__webpack_require__(/*! ./dto/create-user.dto */ \"./libs/users/src/dto/create-user.dto.ts\"));\n__export(__webpack_require__(/*! ./dto/delete-user.dto */ \"./libs/users/src/dto/delete-user.dto.ts\"));\n__export(__webpack_require__(/*! ./dto/get-user.dto */ \"./libs/users/src/dto/get-user.dto.ts\"));\n__export(__webpack_require__(/*! ./dto/log-in.dto */ \"./libs/users/src/dto/log-in.dto.ts\"));\n__export(__webpack_require__(/*! ./dto/update-user.dto */ \"./libs/users/src/dto/update-user.dto.ts\"));\n__export(__webpack_require__(/*! ./repository/users.entity */ \"./libs/users/src/repository/users.entity.ts\"));\n__export(__webpack_require__(/*! ./repository/users.repository */ \"./libs/users/src/repository/users.repository.ts\"));\n\n\n//# sourceURL=webpack:///./libs/users/src/index.ts?");

/***/ }),

/***/ "./libs/users/src/repository/users.entity.ts":
/*!***************************************************!*\
  !*** ./libs/users/src/repository/users.entity.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst projects_1 = __webpack_require__(/*! @backend/projects */ \"./libs/projects/src/index.ts\");\nlet User = class User extends typeorm_1.BaseEntity {\n};\n__decorate([\n    typeorm_1.PrimaryGeneratedColumn(),\n    __metadata(\"design:type\", Number)\n], User.prototype, \"id\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], User.prototype, \"login\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], User.prototype, \"hash\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], User.prototype, \"firstName\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], User.prototype, \"lastName\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", Boolean)\n], User.prototype, \"activated\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], User.prototype, \"passwd\", void 0);\n__decorate([\n    typeorm_1.OneToMany(type => projects_1.Projects, project => project.owner, { eager: true }),\n    __metadata(\"design:type\", Array)\n], User.prototype, \"projects\", void 0);\nUser = __decorate([\n    typeorm_1.Entity(),\n    typeorm_1.Unique(['login'])\n], User);\nexports.User = User;\n\n\n//# sourceURL=webpack:///./libs/users/src/repository/users.entity.ts?");

/***/ }),

/***/ "./libs/users/src/repository/users.repository.ts":
/*!*******************************************************!*\
  !*** ./libs/users/src/repository/users.repository.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst users_entity_1 = __webpack_require__(/*! ./users.entity */ \"./libs/users/src/repository/users.entity.ts\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nlet UsersRepository = class UsersRepository extends typeorm_1.Repository {\n    async getAllUsers() {\n        return await this.find();\n    }\n    async getUser(id) {\n        const found = await this.findOne({ id });\n        if (!found) {\n            throw new common_1.NotFoundException(`No data found.`);\n        }\n        return found;\n    }\n    async createUser(createUserDto) {\n        const { firstName, lastName, login, passwd } = createUserDto;\n        const newUser = new users_entity_1.User();\n        newUser.firstName = firstName;\n        newUser.lastName = lastName;\n        newUser.login = login;\n        newUser.passwd = passwd;\n        try {\n            await newUser.save();\n        }\n        catch (error) {\n            throw new common_1.InternalServerErrorException('Something wrong.');\n        }\n        return newUser;\n    }\n    async updateUser(id, firstName, passwd, lastName) {\n        const found = await this.getUser(id);\n        found.firstName = firstName;\n        found.passwd = passwd;\n        if (lastName) {\n            found.lastName = lastName;\n        }\n        await found.save();\n        return found;\n    }\n    async deleteUsers(id) {\n        return await this.delete(id);\n    }\n};\nUsersRepository = __decorate([\n    typeorm_1.EntityRepository(users_entity_1.User)\n], UsersRepository);\nexports.UsersRepository = UsersRepository;\n\n\n//# sourceURL=webpack:///./libs/users/src/repository/users.repository.ts?");

/***/ }),

/***/ "./libs/users/src/users.controller.ts":
/*!********************************************!*\
  !*** ./libs/users/src/users.controller.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst users_service_1 = __webpack_require__(/*! ./users.service */ \"./libs/users/src/users.service.ts\");\nconst create_user_dto_1 = __webpack_require__(/*! ./dto/create-user.dto */ \"./libs/users/src/dto/create-user.dto.ts\");\nconst update_user_dto_1 = __webpack_require__(/*! ./dto/update-user.dto */ \"./libs/users/src/dto/update-user.dto.ts\");\nconst delete_user_dto_1 = __webpack_require__(/*! ./dto/delete-user.dto */ \"./libs/users/src/dto/delete-user.dto.ts\");\nlet UsersController = class UsersController {\n    constructor(usersService) {\n        this.usersService = usersService;\n    }\n    getUsers() {\n        return this.usersService.getAllUsers();\n    }\n    getOneUser(id) {\n        return this.usersService.getUser(id);\n    }\n    createUser(createUserDto) {\n        return this.usersService.createUser(createUserDto);\n    }\n    updateUser(id, updateUserDto) {\n        return this.usersService.updateUser(id, updateUserDto);\n    }\n    deleteUsers(deleteUserDto) {\n        return this.usersService.deleteUsers(deleteUserDto);\n    }\n};\n__decorate([\n    common_1.Get(),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", Promise)\n], UsersController.prototype, \"getUsers\", null);\n__decorate([\n    common_1.Get('/:id'),\n    __param(0, common_1.Param('id')),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number]),\n    __metadata(\"design:returntype\", Promise)\n], UsersController.prototype, \"getOneUser\", null);\n__decorate([\n    common_1.Post(),\n    common_1.UsePipes(common_1.ValidationPipe),\n    __param(0, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [create_user_dto_1.CreateUsersDto]),\n    __metadata(\"design:returntype\", Promise)\n], UsersController.prototype, \"createUser\", null);\n__decorate([\n    common_1.Patch('/:id'),\n    __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, update_user_dto_1.UpdateUserDto]),\n    __metadata(\"design:returntype\", Promise)\n], UsersController.prototype, \"updateUser\", null);\n__decorate([\n    common_1.Delete(),\n    __param(0, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [delete_user_dto_1.DeleteUserDto]),\n    __metadata(\"design:returntype\", Promise)\n], UsersController.prototype, \"deleteUsers\", null);\nUsersController = __decorate([\n    common_1.Controller('users'),\n    __metadata(\"design:paramtypes\", [users_service_1.UsersService])\n], UsersController);\nexports.UsersController = UsersController;\n\n\n//# sourceURL=webpack:///./libs/users/src/users.controller.ts?");

/***/ }),

/***/ "./libs/users/src/users.module.ts":
/*!****************************************!*\
  !*** ./libs/users/src/users.module.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst users_controller_1 = __webpack_require__(/*! ./users.controller */ \"./libs/users/src/users.controller.ts\");\nconst users_service_1 = __webpack_require__(/*! ./users.service */ \"./libs/users/src/users.service.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst users_repository_1 = __webpack_require__(/*! ./repository/users.repository */ \"./libs/users/src/repository/users.repository.ts\");\nlet UsersModule = class UsersModule {\n};\nUsersModule = __decorate([\n    common_1.Module({\n        imports: [typeorm_1.TypeOrmModule.forFeature([users_repository_1.UsersRepository])],\n        controllers: [users_controller_1.UsersController],\n        providers: [users_service_1.UsersService],\n    })\n], UsersModule);\nexports.UsersModule = UsersModule;\n\n\n//# sourceURL=webpack:///./libs/users/src/users.module.ts?");

/***/ }),

/***/ "./libs/users/src/users.service.ts":
/*!*****************************************!*\
  !*** ./libs/users/src/users.service.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst users_repository_1 = __webpack_require__(/*! ./repository/users.repository */ \"./libs/users/src/repository/users.repository.ts\");\nlet UsersService = class UsersService {\n    constructor(usersRepository) {\n        this.usersRepository = usersRepository;\n    }\n    async getAllUsers() {\n        return await this.usersRepository.getAllUsers();\n    }\n    async getUser(id) {\n        return this.usersRepository.getUser(id);\n    }\n    async createUser(createUserDto) {\n        return await this.usersRepository.createUser(createUserDto);\n    }\n    async updateUser(id, updateUserDto) {\n        const { firstName, lastName, passwd } = updateUserDto;\n        const found = await this.usersRepository.updateUser(id, firstName, passwd, lastName);\n        return { firstName: found.firstName, login: found.login };\n    }\n    async deleteUsers(deleteUsersDto) {\n        const { id } = deleteUsersDto;\n        return await this.usersRepository.deleteUsers(id);\n    }\n};\nUsersService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(users_repository_1.UsersRepository)),\n    __metadata(\"design:paramtypes\", [users_repository_1.UsersRepository])\n], UsersService);\nexports.UsersService = UsersService;\n\n\n//# sourceURL=webpack:///./libs/users/src/users.service.ts?");

/***/ }),

/***/ "./src/app.controller.ts":
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst app_service_1 = __webpack_require__(/*! ./app.service */ \"./src/app.service.ts\");\nlet AppController = class AppController {\n    constructor(appService) {\n        this.appService = appService;\n    }\n    getHello() {\n        return this.appService.getHello();\n    }\n};\n__decorate([\n    common_1.Get(),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", String)\n], AppController.prototype, \"getHello\", null);\nAppController = __decorate([\n    common_1.Controller(),\n    __metadata(\"design:paramtypes\", [app_service_1.AppService])\n], AppController);\nexports.AppController = AppController;\n\n\n//# sourceURL=webpack:///./src/app.controller.ts?");

/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst app_controller_1 = __webpack_require__(/*! ./app.controller */ \"./src/app.controller.ts\");\nconst app_service_1 = __webpack_require__(/*! ./app.service */ \"./src/app.service.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst projects_1 = __webpack_require__(/*! @backend/projects */ \"./libs/projects/src/index.ts\");\nconst users_1 = __webpack_require__(/*! @backend/users */ \"./libs/users/src/index.ts\");\nconst auth_1 = __webpack_require__(/*! @backend/auth */ \"./libs/auth/src/index.ts\");\nlet AppModule = class AppModule {\n};\nAppModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forRoot({\n                type: 'sqlite',\n                database: 'tmp/db.sql',\n                entities: [\n                    projects_1.Projects,\n                    users_1.User,\n                    auth_1.AuthEntity\n                ],\n                logging: true,\n                synchronize: true\n            }),\n            projects_1.ProjectsModule,\n            users_1.UsersModule,\n            auth_1.AuthModule\n        ],\n        controllers: [app_controller_1.AppController],\n        providers: [app_service_1.AppService],\n    })\n], AppModule);\nexports.AppModule = AppModule;\n\n\n//# sourceURL=webpack:///./src/app.module.ts?");

/***/ }),

/***/ "./src/app.service.ts":
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nlet AppService = class AppService {\n    getHello() {\n        return 'Hello World!';\n    }\n};\nAppService = __decorate([\n    common_1.Injectable()\n], AppService);\nexports.AppService = AppService;\n\n\n//# sourceURL=webpack:///./src/app.service.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config = __webpack_require__(/*! config */ \"config\");\nconst core_1 = __webpack_require__(/*! @nestjs/core */ \"@nestjs/core\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst app_module_1 = __webpack_require__(/*! ./app.module */ \"./src/app.module.ts\");\nasync function bootstrap() {\n    const server = process.env.SERVER_PORT || config.get('server');\n    const app = await core_1.NestFactory.create(app_module_1.AppModule);\n    const options = new swagger_1.DocumentBuilder()\n        .setTitle('Experimental BE example')\n        .setDescription('The API description')\n        .setVersion('1.0')\n        .addTag('API')\n        .build();\n    const document = swagger_1.SwaggerModule.createDocument(app, options);\n    swagger_1.SwaggerModule.setup('api', app, document);\n    await app.listen(server.port);\n    if (true) {\n        module.hot.accept();\n        module.hot.dispose(() => app.close());\n    }\n}\nbootstrap();\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ 0:
/*!************************************************!*\
  !*** multi webpack/hot/poll?100 ./src/main.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"webpack/hot/poll?100\");\nmodule.exports = __webpack_require__(/*! ./src/main.ts */\"./src/main.ts\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/common\");\n\n//# sourceURL=webpack:///external_%22@nestjs/common%22?");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/core\");\n\n//# sourceURL=webpack:///external_%22@nestjs/core%22?");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/jwt\");\n\n//# sourceURL=webpack:///external_%22@nestjs/jwt%22?");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/passport\");\n\n//# sourceURL=webpack:///external_%22@nestjs/passport%22?");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/swagger\");\n\n//# sourceURL=webpack:///external_%22@nestjs/swagger%22?");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/typeorm\");\n\n//# sourceURL=webpack:///external_%22@nestjs/typeorm%22?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"class-validator\");\n\n//# sourceURL=webpack:///external_%22class-validator%22?");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"config\");\n\n//# sourceURL=webpack:///external_%22config%22?");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-jwt\");\n\n//# sourceURL=webpack:///external_%22passport-jwt%22?");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"typeorm\");\n\n//# sourceURL=webpack:///external_%22typeorm%22?");

/***/ }),

/***/ "webpack/hot/poll?100":
/*!***************************************!*\
  !*** external "webpack/hot/poll?100" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack/hot/poll?100\");\n\n//# sourceURL=webpack:///external_%22webpack/hot/poll?");

/***/ })

/******/ });