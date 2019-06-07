import {defer, forkJoin, Observable, of, Subject} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

export function forkJoinWithProgress(arrayOfObservables: any[]): Observable<any[]> {

    return defer(() => {
        let counter: number = 0;
        const percent$: Subject<number> = new Subject();

        const modilefiedObservablesList: Observable<any>[] = arrayOfObservables.map(
            (item, index) => item.pipe(
                finalize(() => {
                    const percentValue: number = ++counter * 100 / arrayOfObservables.length;
                    percent$.next(percentValue);
                })));

        const finalResult$: Observable<any[]> = forkJoin(modilefiedObservablesList).pipe(
            tap(() => {
                    percent$.next(100);
                    percent$.complete();
                }));

        return of([finalResult$, percent$.asObservable()]);
    });

}
