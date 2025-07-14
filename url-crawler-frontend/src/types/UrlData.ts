export interface UrlData {
    id: number;
    url: string;
    title: string;
    htmlVersion: string;
    internalLinks: number;
    externalLinks: number;
    brokenLinks: number;
    loginForm: boolean;
    status: string;
    brokenLinkDetails?: any[];
}
