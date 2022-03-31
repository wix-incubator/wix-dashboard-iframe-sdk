import { ChannelPickerMessageType, EstablishConnectionMessage } from './types';

export function iframeHandshake(bridgeType: string, version: string): Promise<MessagePort> {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel();
    const initialize = (event: MessageEvent<typeof EstablishConnectionMessage>) => {
      if (event.data.comlinkInit) {
        port1.onmessage = null;
        resolve(port1);
      }
    };
    port1.onmessage = initialize;
    window.parent.postMessage({ type: ChannelPickerMessageType, bridgeType, version }, '*', [port2]);
  });
}
