export interface HandshakeMessage {
  type: string;
  bridgeType: string;
  version: string;
}

export const ChannelPickerMessageType = 'channel-picker-child-initialize';

export const EstablishConnectionMessage = { comlinkInit: true };

export interface ChannelInitializationData extends Omit<HandshakeMessage, 'type'> {
  port: MessagePort;
}

export interface ChannelVersion { bridgeType: string, version: string }

export interface DashboardSDK {
  getInstance(): Promise<string | null>;
  onEnvUpdated(cb: (envData: any) => void): void;
  getChannelVersion(): ChannelVersion;
}