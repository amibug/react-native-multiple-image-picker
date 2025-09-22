"use strict";

export * from './specs/MultipleImagePicker.nitro';
export * from './types';
import { NitroModules } from 'react-native-nitro-modules';
import { processColor, Appearance } from 'react-native';
import { CropReject } from './types/error';
const Picker = NitroModules.createHybridObject('MultipleImagePicker');
export async function openPicker(conf) {
  return new Promise((resolved, rejected) => {
    const config = {
      ...defaultOptions,
      ...conf
    };
    config.primaryColor = processColor(config.primaryColor);
    config.backgroundDark = processColor(config.backgroundDark);
    if (config?.theme === 'system') {
      const theme = Appearance.getColorScheme() ?? 'light';
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
export async function openCropper(image, config) {
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
      rejected(CropReject?.[error] ?? CropReject[0]);
    });
  });
}
export function openPreview(media, index = 0, conf) {
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
export async function openCamera(config) {
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
    cameraConfig.color = processColor(cameraConfig.color ?? primaryColor);
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
export const defaultOptions = {
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