
export interface BrokenLink {
  id: number;
  link: string;
  statusCode: number;
}
export interface UrlData {
  id: number;
  URL: string;
  title: string;
  htmlVersion: string;
  internalLinks: number;
  externalLinks: number;
  brokenLinks: number;
  loginForm: boolean;
  status: string;
  brokenLinkDetails: BrokenLink[];
}
