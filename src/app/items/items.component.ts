import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Item } from '../item.types';
import {
	deleteItemProgress, deleteItemStart
} from '../store/actions/items.action';
import {
	allItemsSelector, editItemIdSelector
} from '../store/selectors/items.selector';
import { ItemsDataSource } from './items-datasource';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import {
	EditItemModalComponent
} from '../edit-item-modal/edit-item-modal.component';

@Component({
	selector: 'items',
	templateUrl: './items.component.html',
	styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements AfterViewInit, OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatTable) table: MatTable<Item>;
	public dataSourceObservable: BehaviorSubject<Item[]> = new BehaviorSubject(
		[]
	);
	public editNoteIdSource: Observable<number>;
	public deleteNoteIdSource: Observable<number>;
	public dataSource: ItemsDataSource;
	public dataLength: number;
	public displayedColumns = [
		'image',
		'name',
		'description',
		'price',
		'actions',
		'createdDate'
	];

	public isHandset: Observable<boolean>;

	constructor(
		private store: Store,
		private matDialog: MatDialog,
		private breakpointObserver: BreakpointObserver
	) {}

	public ngOnInit(): void {
		this.initializeSources();
		this.initializeIsHandsetObservable();
	}

	private initializeSources(): void {
		this.store.select(allItemsSelector).subscribe((items: Item[]) => {
			this.dataLength = items.length;
			this.dataSourceObservable.next(items);
		});
		this.editNoteIdSource = this.store.select(editItemIdSelector);
		this.deleteNoteIdSource = this.store.select(editItemIdSelector);
	}

	private initializeIsHandsetObservable(): void {
		this.isHandset = this.breakpointObserver
			.observe(Breakpoints.Handset)
			.pipe(
				map((result) => result.matches),
				shareReplay()
			);
		this.isHandset.subscribe((isDeviceHandset: boolean) => {
			if (isDeviceHandset) {
				this.displayedColumns = [
					'name',
					'description',
					'price',
					'actions'
				];
			} else {
				this.displayedColumns = [
					'image',
					'name',
					'description',
					'price',
					'actions',
					'createdDate'
				];
			}
		});
	}

	public ngAfterViewInit(): void {
		setTimeout(() => {
			this.setTableDatasource();
		});
	}

	private setTableDatasource(): void {
		this.dataSource = new ItemsDataSource(this.dataSourceObservable);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public deleteItem(id: number): void {
		this.store.dispatch(deleteItemProgress({ id }));
		this.store.dispatch(deleteItemStart({ id }));
	}

	public openEditItemModal(item: Item): void {
		this.matDialog.open(EditItemModalComponent, {
			width: '50%',
			data: item
		});
	}
}
