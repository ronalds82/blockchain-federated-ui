export {};

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] | object }) => Promise<any>;
      on?: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}
