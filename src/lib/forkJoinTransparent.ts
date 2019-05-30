import {merge, Observable} from 'rxjs';
import {map, scan, startWith, takeLast} from 'rxjs/operators';

export interface ForkJoinTransparentData {
    data: any;
    percentage: number;
}

export function forkJoinTransparent(...arrayOfObservables: any[]): Observable<ForkJoinTransparentData> {

    const emptyArray: any[] = Array.from(Array(arrayOfObservables.length));
    const initialValue: ForkJoinTransparentData = {data: emptyArray, percentage: 0};

    const modilefiedObservablesList: Observable<any>[] = arrayOfObservables.map(
        (item, index) => item.pipe(
            takeLast(1),
            map(data => ({data: data, index})),
        ),
    );

    return merge(...modilefiedObservablesList).pipe(
        startWith(initialValue),
        scan((acc: ForkJoinTransparentData, next: { data: any, index }) => {
            const newAcc: ForkJoinTransparentData = {data: [...acc.data], percentage: acc.percentage};

            newAcc.data[next.index] = next.data;
            const definedValues: any[] = newAcc.data.filter(x => !!x);
            newAcc.percentage = definedValues.length * 100 / newAcc.data.length;

            return newAcc;
        }, initialValue),
    );
}
