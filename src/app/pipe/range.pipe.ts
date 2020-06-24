import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  transform(value: number): number[] {
    let res=[];
    for (let index = 0; index < value; index++) {
      res.push(index);
    }
    return res;
  }

}
