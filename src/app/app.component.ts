import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { marked } from 'marked';
import {  map, Observable, pluck, shareReplay } from 'rxjs';
import * as Zod from 'zod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private readonly httpClient: HttpClient) {
  }
  private readonly getLatestBlogPost = () => {
    const url = 'https://api.helpfl.click/blog'
    const end = Date.now();
    const start = end - 1000 * 60 * 60 * 24 * 30
    return this.httpClient.get<BlogPost[]>(url, {
      params: {
        start: start.toString(),
        end: end.toString(),
      }
    });
  };

  private render = (observable: Observable<string>): Observable<string> => {
    return observable.pipe(
      map((markdown) => marked(markdown)),
    );
  };

  public readonly latestBlogPost$ = this.getLatestBlogPost().pipe(
    pick(0),
    pick('content'),
    this.render,
    shareReplay(1),
  );
}


export type BlogPost = Zod.infer<typeof blogPostValidation>;

const blogPostValidation = Zod.object({
    date: Zod.number(),
    content: Zod.string(),
    id: Zod.string(),
    name: Zod.string()
});



const pick = <T, K extends keyof T>(key: K) => (observable: Observable<T>): Observable<T[K]> => {
  return observable.pipe(
    map(({[key]: value}) => value),
  );
};

