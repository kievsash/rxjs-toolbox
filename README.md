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
import { forkJoinWithProgress } from 'rxjs-toolbox';
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
