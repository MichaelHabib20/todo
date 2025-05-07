import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === 0){
      return 'Pending';
    }else if(value === 1){
      return 'In Progress';
    }else if(value === 2){
      return 'Completed';
    }else{
      return 'Unknown';
    }
  }

}
