import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {marked} from 'marked';
import { map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private readonly httpClient: HttpClient) {}


  latestContent(): Observable<string> {
    return this.allRawContent().pipe(map(([latest]) => this.render(latest)));
  }

  private allRawContent(): Observable<string[]> {
    const cachedContent = this.cachedContent();
    return cachedContent ?
      of(cachedContent) : 
      this.getMonthOfContent().pipe(
        tap(this.cacheContent)
      );
  }

  private readonly getMonthOfContent = () => {
    const now = Date.now();
    const aMonthAgo = now - 1000 * 60 * 60 * 24 * 30;
    const requestOptions = {
      headers: {
        start: now.toString(),
        end: aMonthAgo.toString()
      }
    };
    return this.httpClient.get<string[]>('https://api.helpfl.click/blog', requestOptions)
  };

  private readonly cacheContent = (content: string[]) => {
    const item = {
      time: Date.now(),
      content
    };
    localStorage.setItem('content', JSON.stringify(item));
  };

  private readonly isLessThan1HourAgo = (time: number): boolean => {
    const anHourAgo = Date.now() - 1000 * 60 * 60;
    return time > anHourAgo;
  }

  private readonly cachedContent = (): string[] | void => {
    const cachedItem = localStorage.getItem('content');
    if (!cachedItem) {
      return;
    }
    const { time, content } = JSON.parse(cachedItem);
    if (this.isLessThan1HourAgo(time)) {
      return content;
    }
  };

  private render(content: string): string {
    return marked.parse(content);
  }
}
