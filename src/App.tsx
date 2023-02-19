import './App.css'
import {marked} from "marked";
import DOMPurify from "dompurify";
import {wrapAsync} from "./promise-wrapper";

export default function App() {
    const content = getContent();
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: renderMarkdown(content)}}/>
      </div>
    );
}

const getContent = wrapAsync('...loading',  async () => {
  const cachedContent = getCachedContent();
  if (cachedContent) {
    console.log('using cached content');
    return cachedContent;
  }
  const content = await getContentFromRestApi();
  setCachedContent(content);
  return content;
});

const getContentFromRestApi = () => {
  return Promise.resolve("# Hello World");
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
    console.log(e);
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
