"use strict";

export let MultipleImagePickerError = /*#__PURE__*/function (MultipleImagePickerError) {
  MultipleImagePickerError[MultipleImagePickerError["CANCELLED"] = 0] = "CANCELLED";
  return MultipleImagePickerError;
}({});
export let CameraError = /*#__PURE__*/function (CameraError) {
  CameraError[CameraError["INVALID_OUTPUT_FILE"] = 1] = "INVALID_OUTPUT_FILE";
  return CameraError;
}({});
export const CropReject = {
  0: {
    code: 0,
    message: 'Invalid Image'
  },
  1: {
    code: 1,
    message: 'User Cancelled'
  }
};
//# sourceMappingURL=error.js.map