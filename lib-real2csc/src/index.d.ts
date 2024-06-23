export interface Window {
  showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
}
