import { wrap, proxy } from 'comlink';
import { DashboardSDK } from './types';
import { getInstance } from './instance';
import { iframeHandshake } from './iframeHandshake';

const BRIDGE_TYPE = 'comlink';
const COMLINK_VERSION = '4.3.1';

const dashboardApiFactory = (port: MessagePort): DashboardSDK => {
  const api = wrap<Pick<DashboardSDK, 'onEnvUpdated'>>(port);
  console.log(window.location.origin, 'initialized comlink');

  const onEnvUpdated = (cb: (params: any) => void) => {
    api.onEnvUpdated(proxy(cb));
  }

  const getChannelVersion = () => ({ bridgeType: BRIDGE_TYPE, version: COMLINK_VERSION });
  
  return {
    getChannelVersion,
    getInstance,
    onEnvUpdated
  };
}

export async function initialize() {
  const port = await iframeHandshake(BRIDGE_TYPE, COMLINK_VERSION);
  return dashboardApiFactory(port);
}