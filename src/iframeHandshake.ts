import { ChannelPickerMessageType, EstablishConnectionMessage } from './types';

export function iframeHandshake(bridgeType: string, version: string): Promise<MessagePort> {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel();
    window.parent.postMessage({ type: ChannelPickerMessageType, bridgeType, version, port: port1 }, '*');
    const initialize = (event: MessageEvent<typeof EstablishConnectionMessage>) => {
      if (event.data.comlinkInit) {
        port2.removeEventListener('message', initialize);
        resolve(port2);
      }
    };
    port2.addEventListener("message", initialize);
  });
}
