export interface Tab {
  tabType: TabTypes;
}

export enum TabTypes {
  ApiKey = 'ApiKey',
  Applications = 'Applications',
  Storage = 'Storage',
  Certs = 'Certs',
  Hosting = 'Hosting',
  CloudContainer = 'CloudContainer',
}
