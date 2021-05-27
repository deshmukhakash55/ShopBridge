import { ItemsState } from '../../item.types';
import { createSelector } from '@ngrx/store';

const itemsStateSelector = (state: { items: ItemsState }) => state.items;

export const allItemsSelector = createSelector(
	itemsStateSelector,
	(itemsState: ItemsState) => itemsState.items
);

export const editItemIdSelector = createSelector(
	itemsStateSelector,
	(itemsState: ItemsState) => itemsState.editItemId
);

export const deleteItemIdSelector = createSelector(
	itemsStateSelector,
	(itemsState: ItemsState) => itemsState.deleteItemId
);

export const isAddItemSuccessSelector = createSelector(
	itemsStateSelector,
	(itemsState: ItemsState) => itemsState.isAddItemSuccess
);
