import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'humanize'
})
export class HumanizePipe implements PipeTransform {
	public transform(date: Date): string {
		return (
			date.getDate().toString().padStart(2, '0') +
			'/' +
			(date.getMonth() + 1).toString().padStart(2, '0') +
			'/' +
			date.getFullYear().toString().padStart(4, '0')
		);
	}
}
