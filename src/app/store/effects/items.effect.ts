import { from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AddItemStartPayload } from 'src/app/item.types';
import * as itemsActionTypes from '../actions/actionTypes/items.actionTypes';
import {
	addItemEnd, addItemFailure, addItemSuccess, deleteItemEnd,
	deleteItemFailure, deleteItemSuccess, editItemEnd, editItemFailure,
	editItemSuccess
} from '../actions/items.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

let uniqueId = 11;

@Injectable()
export class ItemsEffect {
	constructor(private actions: Actions) {}

	public addItemStart = createEffect(() => {
		return this.actions.pipe(
			ofType(itemsActionTypes.ADD_ITEM_START),
			switchMap((item: AddItemStartPayload) => {
				// Delete the item from backend
				return from([
					addItemEnd(),
					addItemSuccess({
						id: uniqueId++,
						...item,
						createdDate: new Date()
					})
				]);
			}),
			catchError((error) =>
				from([addItemEnd(), addItemFailure({ reason: error.message })])
			)
		);
	});

	public deleteItemStart = createEffect(() => {
		return this.actions.pipe(
			ofType(itemsActionTypes.DELETE_ITEM_START),
			switchMap(({ id }) => {
				// Delete the item from backend
				return from([deleteItemEnd(), deleteItemSuccess({ id })]);
			}),
			catchError((error) =>
				from([
					deleteItemEnd(),
					deleteItemFailure({ reason: error.message })
				])
			)
		);
	});

	public editItemStart = createEffect(() => {
		return this.actions.pipe(
			ofType(itemsActionTypes.EDIT_ITEM_START),
			switchMap((item) => {
				// Edit the item from backend
				return from([editItemEnd(), editItemSuccess(item)]);
			}),
			catchError((error) =>
				from([
					editItemEnd(),
					editItemFailure({ reason: error.message })
				])
			)
		);
	});
}
