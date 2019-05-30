# RxJS-toolbox - set of custom operators and handy factory functions for RxJS

## Installation
Install using NPM CLI
```
npm install --save rxjs-toolbox
```

or using Yarn CLI
```
yarn add rxjs-multi-scan
```

### forkJoin-transparent
A combination operator that combines multiple sources and returns their last emitted data as well as percentage of their completion.

### Usage
```typescript
import { ajax } from 'rxjs/ajax';
import { forkJoinTransparent } from 'rxjs-toolbox';
import {tap, filter} from 'rxjs/operators';

const getUserDetails = userIdsList => {
  
  const arrayOfObservables = userIdsList.map(userId =>
    ajax('https://jsonplaceholder.typicode.com/comments/' + userId)
  )
  
  return forkJoinTransparent(arrayOfObservables)
}


const result$ = getUserDetails([1, 2, 15]);

result$.pipe(
  tap((data) => console.log('percentage: ', data)),
  filter(data => data.percentage === 100)
)
.subscribe((data) => console.log('final value: ', data.data));

// Output:
// percentage:  {data: Array(3), percentage: 0}
// percentage:  {data: Array(3), percentage: 33.333333333333336}
// percentage:  {data: Array(3), percentage: 66.66666666666667}
// percentage:  {data: Array(3), percentage: 100}
// final value:  (3) [{…}, {…}, {…}]
```
