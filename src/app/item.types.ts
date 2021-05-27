export type AddItemStartPayload = {
	name: string;
	description: string;
	price: number;
	image: string;
};

export type AddItemSuccessPayload = {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	createdDate: Date;
};

export type ActionFailurePayload = {
	reason: string;
};

export type EditItemStartPayload = {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	createdDate: Date;
};

export type EditItemSuccessPayload = {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	createdDate: Date;
};

export type DeleteItemStartPayload = {
	id: number;
};

export type DeleteItemSuccessPayload = {
	id: number;
};

export type EditItemProgressPayload = {
	id: number;
};

export type DeleteItemProgressPayload = {
	id: number;
};

export type Item = {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	createdDate: Date;
};

export type ItemsState = {
	items: Item[];
	isAddItemProgress: boolean;
	isAddItemSuccess: boolean;
	isAddItemFailure: boolean;
	addItemFailureReason: string;
	isEditItemProgress: boolean;
	isEditItemSuccess: boolean;
	isEditItemFailure: boolean;
	editItemFailureReason: string;
	editItemId: number;
	isDeleteItemProgress: boolean;
	isDeleteItemSuccess: boolean;
	isDeleteItemFailure: boolean;
	deleteItemFailureReason: string;
	deleteItemId: number;
};
