import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorty',
  standalone: true
})
export class PriortyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === 0){
      return 'Low';
    }else if(value === 1){
      return 'Medium';
    }else if(value === 2){
      return 'High';
    }else{
      return 'Unknown';
    }
  }

}
