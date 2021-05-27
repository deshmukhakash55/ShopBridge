import { BehaviorSubject, merge, Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../item.types';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export class ItemsDataSource extends DataSource<Item> {
	public dataSource: BehaviorSubject<Item[]>;
	public paginator: MatPaginator;
	public sort: MatSort;

	constructor(itemsSource: BehaviorSubject<Item[]>) {
		super();
		this.dataSource = itemsSource;
	}

	public connect(): Observable<Item[]> {
		const page = !!this.paginator ? this.paginator.page : observableOf({});
		const sortChange = this.sort ? this.sort.sortChange : observableOf({});
		const dataMutations = [this.dataSource, page, sortChange];

		return merge(...dataMutations).pipe(
			map(() => {
				return this.getPagedData(
					this.getSortedData([...this.dataSource.value])
				);
			})
		);
	}

	public disconnect(): void {}

	private getPagedData(data: Item[]): Item[] {
		const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
		return data.splice(startIndex, this.paginator.pageSize);
	}

	private getSortedData(data: Item[]): Item[] {
		if (!this.sort.active || this.sort.direction === '') {
			return data;
		}

		return data.sort((a, b) => {
			const isAsc = this.sort.direction === 'asc';
			switch (this.sort.active) {
				case 'name':
					return compare(a.name, b.name, isAsc);
				case 'price':
					return compare(+a.price, +b.price, isAsc);
				case 'createdDate':
					return compare(
						new Date(
							a.createdDate.getDate(),
							a.createdDate.getMonth() + 1,
							a.createdDate.getFullYear()
						),
						new Date(
							b.createdDate.getDate(),
							b.createdDate.getMonth() + 1,
							b.createdDate.getFullYear()
						),
						isAsc
					);
				default:
					return 0;
			}
		});
	}
}

function compare(
	a: string | number | Date,
	b: string | number | Date,
	isAsc: boolean
): number {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
