import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string | number, limit: number = 20): string {
    if (!value) return '';
    
    const stringValue = value.toString();
    if (stringValue.length <= limit) return stringValue;
    
    return stringValue.slice(0, limit) + '...';
  }

}
