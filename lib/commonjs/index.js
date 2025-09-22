"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  openPicker: true,
  openCropper: true,
  openPreview: true,
  openCamera: true,
  defaultOptions: true
};
exports.defaultOptions = void 0;
exports.openCamera = openCamera;
exports.openCropper = openCropper;
exports.openPicker = openPicker;
exports.openPreview = openPreview;
var _MultipleImagePicker = require("./specs/MultipleImagePicker.nitro");
Object.keys(_MultipleImagePicker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MultipleImagePicker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MultipleImagePicker[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
var _reactNativeNitroModules = require("react-native-nitro-modules");
var _reactNative = require("react-native");
var _error = require("./types/error");
const Picker = _reactNativeNitroModules.NitroModules.createHybridObject('MultipleImagePicker');
async function openPicker(conf) {
  return new Promise((resolved, rejected) => {
    const config = {
      ...defaultOptions,
      ...conf
    };
    config.primaryColor = (0, _reactNative.processColor)(config.primaryColor);
    config.backgroundDark = (0, _reactNative.processColor)(config.backgroundDark);
    if (config?.theme === 'system') {
      const theme = _reactNative.Appearance.getColorScheme() ?? 'light';
      config.theme = theme;
    }
    config.language = validateLanguage(config.language);
    if (typeof config.crop === 'boolean') {
      config.crop = config.crop ? {
        ratio: []
      } : undefined;
    }
    if (config.crop) config.crop.ratio = config.crop?.ratio ?? [];
    return Picker.openPicker(config, result => {
      resolved(result);
    }, reject => {
      rejected(reject);
    });
  });
}
async function openCropper(image, config) {
  return new Promise((resolved, rejected) => {
    const cropConfig = {
      presentation: 'fullScreenModal',
      language: 'system',
      ratio: [],
      ...config
    };
    cropConfig.language = validateLanguage(cropConfig.language);
    return Picker.openCrop(image, cropConfig, result => {
      resolved(result);
    }, error => {
      rejected(_error.CropReject?.[error] ?? _error.CropReject[0]);
    });
  });
}
function openPreview(media, index = 0, conf) {
  const config = {
    language: conf?.language ?? 'system',
    videoAutoPlay: true,
    ...conf
  };
  if (config?.language && !LANGUAGES.includes(config.language)) {
    config.language = 'system';
  }
  if (media.length === 0) {
    throw new Error('Media is required');
  }
  return Picker.openPreview(media, index, config, config?.onLongPress ?? (() => {}));
}
async function openCamera(config) {
  return new Promise((resolved, rejected) => {
    const cameraConfig = {
      cameraDevice: 'back',
      presentation: 'fullScreenModal',
      language: 'system',
      mediaType: 'all',
      allowLocation: true,
      isSaveSystemAlbum: false,
      ...config
    };
    cameraConfig.color = (0, _reactNative.processColor)(cameraConfig.color ?? primaryColor);
    cameraConfig.language = validateLanguage(cameraConfig.language);
    if (typeof cameraConfig.crop === 'boolean') {
      cameraConfig.crop = cameraConfig.crop ? {
        ratio: []
      } : undefined;
    }
    if (cameraConfig.crop && !cameraConfig.crop?.ratio) cameraConfig.crop.ratio = [];
    return Picker.openCamera(cameraConfig, result => {
      resolved(result);
    }, error => {
      rejected(error);
    });
  });
}
const DEFAULT_COUNT = 20;
const validateLanguage = language => {
  if (!language || !LANGUAGES.includes(language)) {
    return 'system';
  }
  return language;
};
const primaryColor = '#2979ff';
const defaultOptions = exports.defaultOptions = {
  maxSelect: DEFAULT_COUNT,
  maxVideo: DEFAULT_COUNT,
  primaryColor,
  backgroundDark: '#2f2f2f',
  allowedLimit: true,
  numberOfColumn: 3,
  isPreview: true,
  mediaType: 'all',
  selectedAssets: [],
  selectBoxStyle: 'number',
  selectMode: 'multiple',
  presentation: 'fullScreenModal',
  language: 'system',
  theme: 'system',
  isHiddenOriginalButton: false,
  allowSwipeToSelect: true,
  camera: {
    cameraDevice: 'back',
    videoMaximumDuration: 60
  }
};
const LANGUAGES = ['system', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'en', 'th', 'id', 'vi', 'ru', 'de', 'fr', 'ar'];
//# sourceMappingURL=index.js.map