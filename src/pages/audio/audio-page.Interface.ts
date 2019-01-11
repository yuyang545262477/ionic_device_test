export interface AudioPageInterface {

  files: string[];

  recordStart();

  recording();

  recordingEnd();

  playAudio(fileName: string);

  storageFileName();

  getFileName();
}
