// Global window extensions used across components
interface Window {
  __playSound?: (type: string) => void;
  webkitAudioContext?: typeof AudioContext;
}