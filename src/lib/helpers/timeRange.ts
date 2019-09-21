import {concat, merge, Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

// timeRange - Function to create Observable that will emit values with specified delays
// Params:
// range - array of objects with special structure [{value: <some value>, delay: <delayInMs>},...]
// isRelative - if true = next emissions is scheduled only after previous is complete (so delays are summarized)
// if false - all values are scheduled at once (delay values are absolute in relation to the moment of subscription)
//
// Usage
// timeRange([
//   {value: 15, delay: 1500}, // 1500ms
//   {value: 15, delay: 2500} // 2500ms
// ])
//
// timeRange([
//   {value: 15, delay: 1500}, // 1500ms
//   {value: 15, delay: 2500} // 1500+2500
// ], true);

export function timeRange(range: any[], isRelative: boolean = false): Observable<any> {
  const obsArray: Observable<any>[] = range.map(item => of(item.value).pipe(delay(item.delay)));
  return isRelative ? concat(...obsArray) : merge(...obsArray);
}
