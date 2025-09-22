"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultipleImagePickerError = exports.CropReject = exports.CameraError = void 0;
let MultipleImagePickerError = exports.MultipleImagePickerError = /*#__PURE__*/function (MultipleImagePickerError) {
  MultipleImagePickerError[MultipleImagePickerError["CANCELLED"] = 0] = "CANCELLED";
  return MultipleImagePickerError;
}({});
let CameraError = exports.CameraError = /*#__PURE__*/function (CameraError) {
  CameraError[CameraError["INVALID_OUTPUT_FILE"] = 1] = "INVALID_OUTPUT_FILE";
  return CameraError;
}({});
const CropReject = exports.CropReject = {
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