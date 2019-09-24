import {defer, Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

// finalizeWithValue - provides (unlike original finalize from rxjs) source$'s last emitted value (if any) in format {value: <lastValue>}
// If source$ completes with noe emitted value - provide undefined.
// Author - Benlesh, taken here: https://github.com/ReactiveX/rxjs/issues/4803#issuecomment-496711335

export function finalizeWithValue<T>(callback: (value: T|any) => void): (source: Observable<any>) => Observable<T> {
  return (source: Observable<T>): Observable<any> => defer(() => {
    let lastValue: T;
    return source.pipe(
      tap(value => lastValue = value),
      finalize(() => callback(lastValue ? {value: lastValue} : lastValue)),
    );
  });
}
