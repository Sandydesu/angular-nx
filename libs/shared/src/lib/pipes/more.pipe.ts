import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'more'
})
export class MorePipe implements PipeTransform {

  transform(value: string, limit = 10, showmaxchar = 9): unknown {
    const ellipsis = '...';
    return (value && value.length > limit) ? `${value.substr(0, showmaxchar)}${ellipsis}` : value;
  }

}
