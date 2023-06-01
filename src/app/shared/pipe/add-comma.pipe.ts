import { Pipe, PipeTransform } from '@angular/core';
import { Technology } from '../../core/model/technology';

@Pipe({
  name: 'addComma'
})
export class AddCommaPipe implements PipeTransform {

  transform(technology: Technology, index: number, arrayLength: number): string {
    let technologyComma = '';
    if (technology) {
      if ((arrayLength - 1) === index) {
        technologyComma = `${technology.technologyName}`;
      } else {
        technologyComma = `${technology.technologyName},  `;
      }
    }
    
    return technologyComma;
  }

}
