import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {
    return items.filter(item => {
      let notMatchingField = Object.keys(filter)
        .find(key => item[key].toLocaleLowerCase().includes(filter[key].toLocaleLowerCase()));
      return notMatchingField; // true if matches all fields
    });
  }
}
