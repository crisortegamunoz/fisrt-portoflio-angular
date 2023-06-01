import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysOfPublished'
})
export class DaysOfPublishedPipe implements PipeTransform {

  transform(date: Date): string {
    let message = '';
    if (date) {
      const today: any = new Date();
      const creationDate: any = new Date(this.getDateToFormat(date));
      const timeDiff = today - creationDate;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      
      if (days === 0) {
        message = 'Publicado recientemente.';
      } else if (days === 1) {
        message = 'Hace un día.';
      } else {
        message = `Hace ${days} días.`;
      }
    }
  
    return message;
  }

  private getDateToFormat(date: Date): string {
    const array = date.toString().split('-');
    return `${array[1]}-${array[2].split('T')[0]}-${array[0]}`;
  }

}
