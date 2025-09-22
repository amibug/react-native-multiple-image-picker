export * from './specs/MultipleImagePicker.nitro';
export * from './types';
import { PickerResult, Config, CropResult, CropConfig, PreviewConfig, MediaPreview, CameraConfig, CameraResult } from './types';
type IPromisePicker<T extends Config> = T['selectMode'] extends 'single' ? PickerResult : PickerResult[];
export declare function openPicker<T extends Config>(conf: T): Promise<IPromisePicker<T>>;
export declare function openCropper(image: string, config?: CropConfig): Promise<CropResult>;
export declare function openPreview(media: MediaPreview[] | PickerResult[], index?: number, conf?: PreviewConfig): void;
export declare function openCamera(config?: CameraConfig): Promise<CameraResult>;
export declare const defaultOptions: Config;
//# sourceMappingURL=index.d.ts.map