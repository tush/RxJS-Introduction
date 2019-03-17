import { Observable, from, fromEvent } from 'rxjs'
import { pluck, timeInterval, map } from 'rxjs/operators'

let num = [2, 4, 6, 8, 10];

let numObservable$ = from(num);

let observer = {
    next: (value) => console.log(value),
    error: (err) => console.log(`ERROR: ${err}`),
    complete: () => console.log('All Done.')
};

//numObservable$.subscribe(observer);


numObservable$.subscribe(
    (value) => console.log(value),
    (err) => console.log(`ERROR: ${err}`),
    () => console.log('All Done.')
);


let evenNumbers$ = Observable.create(subscriber => {
    for(let currNum of num) {
        if(currNum % 2 === 0) {
            subscriber.next('evenNumbers' + currNum);
        } else {
            subscriber.error('Value is not even');
        }
    }
    subscriber.complete();
});

evenNumbers$.subscribe(
    (value) => console.log(value),
    (err) => console.log(`ERROR: ${err}`),
    () => console.log('All Done.')
);


let clicks$ = fromEvent(document, 'click');

clicks$.pipe(
    pluck('clientX'),
    timeInterval(),
    map(clickInfo => `${clickInfo.interval / 1000} seconds (${clickInfo.value})`)
).subscribe(
    (value) => console.log(value),
    (err) => console.log(`ERROR: ${err}`),
    () => console.log('All Done.')
);

