import IpfsHttpClient from 'ipfs-http-client';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    IpfsHttpClient: typeof IpfsHttpClient
  }
}
