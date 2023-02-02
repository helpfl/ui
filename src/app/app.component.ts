import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {marked} from 'marked';
import { catchError, EMPTY, map, mergeMap, Observable, of, shareReplay, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private readonly httpClient: HttpClient) {
  }

  private readonly getBlogManifest = (): Observable<Manifest> => {
    return this.httpClient.get<Manifest>('/assets/manifest.json');
  };

  private readonly getLatestBlogPost = () => {
    return this.getBlogManifest().pipe(
      map(({files: [first]}) => first),
      mergeMap((file) => this.httpClient.get(file, {responseType: 'text'})),
    );
  };

  private render(content: string): string {
    return marked.parse(content);
  }

  public readonly latestBlogPost$ = this.getLatestBlogPost().pipe(
    shareReplay(1),
    map(this.render),
  );

}

type Manifest = {files: string[]};