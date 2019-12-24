export interface Tab {
  tabType: TabTypes;
}

export enum TabTypes {
  Storage = 'Storage',
  Certs = 'Certs',
  Hosting = 'Hosting',
  CloudContainer = 'CloudContainer',
}
