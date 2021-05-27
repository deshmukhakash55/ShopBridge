import {
	ActionFailurePayload, AddItemSuccessPayload, DeleteItemSuccessPayload,
	EditItemSuccessPayload, Item, ItemsState
} from '../../item.types';
import * as itemsActions from '../actions/items.action';
import { createReducer, on } from '@ngrx/store';

const items: Item[] = [
	{
		id: 1,
		name: 'Pen',
		description: 'For writing awesome articles',
		price: 10,
		image: '../../../../assets/pen.png',
		createdDate: new Date(2012, 4, 12)
	},
	{
		id: 2,
		name: 'Headphones',
		description: 'For hearsing awesome music',
		price: 1000,
		image: '../../../../assets/pen.png',
		createdDate: new Date(2021, 5, 15)
	},
	{
		id: 3,
		name: 'Cadbury Silk',
		description: 'Sweetness in life',
		price: 600,
		image: '../../../../assets/pen.png',
		createdDate: new Date(2020, 7, 12)
	},
	{
		id: 4,
		name: 'Pen drive',
		description: 'Store the important docs',
		price: 800,
		image: '../../../../assets/pen.png',
		createdDate: new Date(2020, 4, 23)
	},
	{
		id: 5,
		name: 'Hard disk',
		description: 'Store huge volumes of data',
		price: 1500,
		image: '../../../../assets/pen.png',
		createdDate: new Date(2021, 4, 22)
	},
	{
		id: 6,
		name: 'Mouse',
		description: `Let's start gaming`,
		price: 1200,
		image: '../../../../assets/pen.png',
		createdDate: new Date(2019, 4, 18)
	},
	{
		id: 7,
		name: 'IPhone X',
		description: `Apple's most trusted product`,
		price: 50000,
		image: '../../../../assets/pen.png',
		createdDate: new Date(2020, 5, 5)
	},
	{
		id: 8,
		name: 'Trimmer',
		description: 'Trim your beard with awesome trimmer',
		price: 3000,
		image: '../../../../assets/pen.png',
		createdDate: new Date(2019, 4, 20)
	},
	{
		id: 9,
		name: 'Pillow',
		description: 'Soft pillows for bed',
		price: 400,
		image: '../../../../assets/pen.png',
		createdDate: new Date(2020, 8, 12)
	},
	{
		id: 10,
		name: 'Sheets',
		description: 'Sheets for bed',
		price: 200,
		image: '../../../../assets/pen.png',
		createdDate: new Date(2021, 4, 12)
	}
];

const initialState: ItemsState = {
	items,
	isAddItemProgress: false,
	isAddItemSuccess: false,
	isAddItemFailure: false,
	addItemFailureReason: '',
	isEditItemProgress: false,
	isEditItemSuccess: false,
	isEditItemFailure: false,
	editItemFailureReason: '',
	editItemId: null,
	isDeleteItemProgress: false,
	isDeleteItemSuccess: false,
	isDeleteItemFailure: false,
	deleteItemFailureReason: '',
	deleteItemId: null
};

let uniqueId = 11;

export const itemsReducer = createReducer(
	initialState,
	on(itemsActions.addItemProgress, (state: ItemsState) => ({
		...state,
		isAddItemProgress: true,
		isAddItemSuccess: false,
		isAddItemFailure: false,
		addItemFailureReason: ''
	})),
	on(itemsActions.addItemEnd, (state: ItemsState) => ({
		...state,
		isAddItemProgress: false
	})),
	on(
		itemsActions.addItemFailure,
		(state: ItemsState, actionFailurePayload: ActionFailurePayload) => ({
			...state,
			isAddItemSuccess: false,
			isAddItemFailure: true,
			addItemFailureReason: actionFailurePayload.reason
		})
	),
	on(
		itemsActions.addItemSuccess,
		(state: ItemsState, addItemSuccessPayload: AddItemSuccessPayload) => ({
			...state,
			items: [
				{ id: uniqueId++, ...addItemSuccessPayload },
				...state.items
			],
			isAddItemSuccess: true,
			isAddItemFailure: false,
			addItemFailureReason: ''
		})
	),
	on(itemsActions.editItemProgress, (state: ItemsState, { id }) => ({
		...state,
		isEditItemProgress: true,
		isEditItemSuccess: false,
		isEditItemFailure: false,
		editItemFailureReason: '',
		editItemId: id
	})),
	on(itemsActions.editItemEnd, (state: ItemsState) => ({
		...state,
		isEditItemProgress: false,
		editItemId: null
	})),
	on(
		itemsActions.editItemFailure,
		(state: ItemsState, actionFailurePayload: ActionFailurePayload) => ({
			...state,
			isEditItemSuccess: false,
			isEditItemFailure: true,
			editItemFailureReason: actionFailurePayload.reason
		})
	),
	on(
		itemsActions.editItemSuccess,
		(state: ItemsState, editItemSuccessPayload: EditItemSuccessPayload) => {
			const updatedItemIndex = state.items.findIndex(
				(item: Item) => item.id === editItemSuccessPayload.id
			);
			const updatedItems = [...state.items];
			updatedItems[updatedItemIndex] = { ...editItemSuccessPayload };
			return {
				...state,
				items: [...updatedItems],
				isEditItemSuccess: true,
				isEditItemFailure: false,
				editItemFailureReason: ''
			};
		}
	),
	on(itemsActions.deleteItemProgress, (state: ItemsState, { id }) => ({
		...state,
		isDeleteItemProgress: true,
		isDeleteItemSuccess: false,
		isDeleteItemFailure: false,
		deleteItemFailureReason: '',
		deleteItemId: id
	})),
	on(itemsActions.deleteItemEnd, (state: ItemsState) => ({
		...state,
		isDeleteItemProgress: false,
		deleteItemId: null
	})),
	on(
		itemsActions.deleteItemFailure,
		(state: ItemsState, actionFailurePayload: ActionFailurePayload) => ({
			...state,
			isDeleteItemSuccess: false,
			isDeleteItemFailure: true,
			deleteItemFailureReason: actionFailurePayload.reason
		})
	),
	on(
		itemsActions.deleteItemSuccess,
		(
			state: ItemsState,
			deleteItemSuccessPayload: DeleteItemSuccessPayload
		) => {
			const updatedItems = state.items.filter(
				(item: Item) => item.id !== deleteItemSuccessPayload.id
			);
			return {
				...state,
				items: [...updatedItems],
				isDeleteItemSuccess: true,
				isDeleteItemFailure: false,
				deleteItemFailureReason: ''
			};
		}
	),
	on(itemsActions.clearAddItemSuccess, (state: ItemsState) => ({
		...state,
		isAddItemSuccess: false
	}))
);
