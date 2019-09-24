# RxJS-toolbox - set of custom operators and handy factory functions for RxJS

## Installation
Install using NPM CLI
```
npm install --save rxjs-toolbox
```

### forkJoin-transparent
A combination operator that combines multiple sources and returns their last emitted data as well as percentage of their completion.

### Usage

#### forkJoinWithProgress
```typescript
import { ajax } from 'rxjs/ajax';
import { merge } from 'rxjs';
`import { forkJoinWithProgress } from 'rxjs-toolbox';`
import {tap, mergeMap, ignoreElements} from 'rxjs/operators';

const getUserDetails = userIdsList => {
  
  const arrayOfObservables = userIdsList.map(userId =>
    ajax('https://jsonplaceholder.typicode.com/comments/' + userId)
  )
  
  return forkJoinWithProgress(arrayOfObservables)
}


const result$ = getUserDetails([1, 2, 15]);

result$.pipe(
  mergeMap(([finalResult, progress]) => merge(
    progress.pipe(
      tap((value) => console.log(`${value} completed`)),
      ignoreElements()
    ),
    finalResult
  ))
).subscribe(values => console.log(values), console.warn);

// Output:
// 33.333333333333336 completed
// 66.66666666666667 completed
// 100 completed
// final value:  (3) [{…}, {…}, {…}]
```

#### Helper functions
##### timeRange
 Function to create Observable that will emit values with specified delays
######Params:
*range* - array of objects with special structure [{value: <some value>, delay: <delayInMs>},...]

*isRelative* - if true = next emissions is scheduled only after previous is complete (so delays are summarized).

if false - all values are scheduled at once (delay values are absolute in relation to the moment of subscription)

```typescript
 const range$ = timeRange([
   {value: 15, delay: 1500}, // 1500ms
   {value: 15, delay: 2500} // 2500ms
 ])

  const range2$ = timeRange([
   {value: 15, delay: 1500}, // 1500ms
   {value: 15, delay: 2500} // 1500+2500
 ], true);

```

##### finalizeWithValue
Provides (unlike original [finalize](https://rxjs.dev/api/operators/finalize) from RxJS) source$'s last emitted value (if any) in format {value: <lastValue>}
If source$ completes with noe emitted value - provide undefined.
Author - Ben Lesh, taken [here](https://github.com/ReactiveX/rxjs/issues/4803#issuecomment-496711335)

```typescript

from([1,3]).pipe(
  finalizeWithValue((lastEmittedValue) => console.log(lastEmittedValue)) // 3
)

```

### Want to learn RxJS?
Try my ["Hands-on RxJS for Web Development"](https://www.udemy.com/course/hands-on-rxjs-for-web-development/) video-course!
