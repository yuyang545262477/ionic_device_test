export interface CameraInterface {

  getPictureFromCamera();

  getPictureFromLibrary();

  switchToSetting(): Promise<string>;
}
