export interface Tab {
  tabType: TabTypes;
}

export enum TabTypes {
  ApiKey = 'ApiKey',
  Storage = 'Storage',
  Certs = 'Certs',
  Hosting = 'Hosting',
  CloudContainer = 'CloudContainer',
}
