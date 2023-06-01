import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'importantInfo'
})
export class ImportantInfoPipe implements PipeTransform {

  transform(valid: boolean): string {
    return valid ? 'Sí' : 'No';
  }

}
