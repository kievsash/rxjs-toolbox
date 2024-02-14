import {first, mapTo, mergeMap, Observable} from 'rxjs';

/**
 * I found an interesting #rxjs custom operator in auth0-angular interceptor codebase: waitUntil
 * https://github.com/auth0/auth0-angular/blob/v2.2.3/projects/auth0-angular/src/lib/auth.interceptor.ts
 * It holds until the param observable emits - and then switches to the source
 */
export const waitUntil =
  <TSignal>(signal$: Observable<TSignal>) =>
    <TSource>(source$: Observable<TSource>) =>
      source$.pipe(mergeMap((value) => signal$.pipe(first(), mapTo(value))));
