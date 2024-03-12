import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { environment } from 'src/app/environments/environments';

@Injectable({ providedIn: 'root' })
export class GraphqlService {
  private _apollo: Apollo;
  private _link: ApolloLink;
  private _cache: InMemoryCache;

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private _router: Router
  ) {
    this._apollo = apollo;
    this._cache = new InMemoryCache();

    const http = httpLink.create({
      uri: environment.apiUrl
    });

    // Handle operational and network errors
    const error = onError(({ graphQLErrors, networkError }) => {
      if (!environment.production) {
        if (graphQLErrors) {
          console.error('graphqlErrors: ', graphQLErrors);
        }
        if (networkError) {
          console.error('networkErrors ', networkError);
        }
      }

      if (networkError && networkError.message.includes('401 Unauthorized')) {
        document.cookie = 'AJU-TOKEN=; path=/; expires=Wed, 01 Jan 2025 00:00:01 GMT;';
        this._router.navigate(['/'], { queryParams: { returnUrl: window.location.pathname } });
      }
    });

    this._link = ApolloLink.from([error, http as ApolloLink]);
  }

  create(): void {
    this._apollo.create({
      link: this._link,
      cache: this._cache,
      connectToDevTools: true
    });
  }
}
