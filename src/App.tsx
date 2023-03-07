import './App.css'
import {marked} from "marked";
import DOMPurify from "dompurify";
import {wrapAsync} from "./promise-wrapper";

export type AppProps = {
  readonly contentServiceUrl: string;
};

export default function App({contentServiceUrl}: AppProps) {
    const content = getContent(contentServiceUrl);
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: renderMarkdown(content)}}/>
      </div>
    );
}

const getContent = wrapAsync('...loading',  async (baseUrl: string) => {
  const cachedContent = getCachedContent();
  if (cachedContent) {
    console.log('using cached content');
    return cachedContent;
  }
  const content = await getContentFromRestApi(baseUrl);
  setCachedContent(content);
  return content;
});

const getContentFromRestApi = async (baseUrl: string): Promise<string> => {
  const now = Date.now();
  const fiveDaysAgo = now - 1000 * 60 * 60 * 24 * 5;
  const url = urlWithQueryParams(baseUrl, {
    end: now.toString(),
    start: fiveDaysAgo.toString()
  });

  const response = await fetch(url);
  const [{content}] = await response.json();
  console.log('using content from rest api' , content);

  return content;
};

const urlWithQueryParams = (url: string, params: Record<string, string>) => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${url}?${queryParams}`;
};

const renderMarkdown = (content: string) => {
  return DOMPurify.sanitize(marked.parse(content));
};

const getCachedContent = () => {
  try {
    const contentJson = localStorage.getItem('content');
    if (!contentJson) {
      return;
    }
    const {content, timestamp}: Content = JSON.parse(contentJson);
    if (expired(timestamp)) {
      return;
    }
    return content;
  } catch (e) {
    console.error(e);
    return;
  }
}

const expired = (timestamp: number) => {
  return timestamp + 1000 * 60 * 60 < Date.now()
};

const setCachedContent = (value: string) => {
  const content: Content = {content: value, timestamp: Date.now()};
  localStorage.setItem('content', JSON.stringify(content));
};

type Content = {
  content: string;
  timestamp: number;
};
