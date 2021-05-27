import {
	ActionFailurePayload, AddItemStartPayload, AddItemSuccessPayload,
	DeleteItemProgressPayload, DeleteItemStartPayload, DeleteItemSuccessPayload,
	EditItemProgressPayload, EditItemStartPayload, EditItemSuccessPayload
} from '../../item.types';
import * as itemsActionTypes from './actionTypes/items.actionTypes';
import { createAction, props } from '@ngrx/store';

export const addItemStart = createAction(
	itemsActionTypes.ADD_ITEM_START,
	props<AddItemStartPayload>()
);

export const addItemProgress = createAction(itemsActionTypes.ADD_ITEM_PROGRESS);

export const addItemEnd = createAction(itemsActionTypes.ADD_ITEM_END);

export const addItemSuccess = createAction(
	itemsActionTypes.ADD_ITEM_SUCCESS,
	props<AddItemSuccessPayload>()
);

export const addItemFailure = createAction(
	itemsActionTypes.ADD_ITEM_FAILURE,
	props<ActionFailurePayload>()
);

export const editItemStart = createAction(
	itemsActionTypes.EDIT_ITEM_START,
	props<EditItemStartPayload>()
);

export const editItemProgress = createAction(
	itemsActionTypes.EDIT_ITEM_PROGRESS,
	props<EditItemProgressPayload>()
);

export const editItemEnd = createAction(itemsActionTypes.EDIT_ITEM_END);

export const editItemSuccess = createAction(
	itemsActionTypes.EDIT_ITEM_SUCCESS,
	props<EditItemSuccessPayload>()
);

export const editItemFailure = createAction(
	itemsActionTypes.EDIT_ITEM_FAILURE,
	props<ActionFailurePayload>()
);

export const deleteItemStart = createAction(
	itemsActionTypes.DELETE_ITEM_START,
	props<DeleteItemStartPayload>()
);

export const deleteItemProgress = createAction(
	itemsActionTypes.DELETE_ITEM_PROGRESS,
	props<DeleteItemProgressPayload>()
);

export const deleteItemEnd = createAction(itemsActionTypes.DELETE_ITEM_END);

export const deleteItemSuccess = createAction(
	itemsActionTypes.DELETE_ITEM_SUCCESS,
	props<DeleteItemSuccessPayload>()
);

export const deleteItemFailure = createAction(
	itemsActionTypes.DELETE_ITEM_FAILURE,
	props<ActionFailurePayload>()
);

export const clearAddItemSuccess = createAction(
	itemsActionTypes.CLEAR_ADD_ITEM_SUCCESS
);
