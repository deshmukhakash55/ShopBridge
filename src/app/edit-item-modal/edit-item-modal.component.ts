import { Item } from '../item.types';
import { editItemProgress, editItemStart } from '../store/actions/items.action';
import { FormErrorStateMatcher } from '../utility/form-error-state-matcher';
import { itemInputFormConfig } from '../utility/item-form-input';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

@Component({
	selector: 'edit-item-modal',
	templateUrl: './edit-item-modal.component.html',
	styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent {
	public editFormGroup: FormGroup = new FormGroup(itemInputFormConfig);
	public formErrorStateMatcher: FormErrorStateMatcher =
		new FormErrorStateMatcher();
	constructor(
		private dialogRef: MatDialogRef<EditItemModalComponent>,
		@Inject(MAT_DIALOG_DATA) private item: Item,
		private store: Store
	) {
		this.initializeFormControlValues();
	}

	private initializeFormControlValues(): void {
		this.editFormGroup.controls.name.setValue(this.item.name);
		this.editFormGroup.controls.description.setValue(this.item.description);
		this.editFormGroup.controls.price.setValue(this.item.price);
		this.editFormGroup.controls.image.setValue(this.item.image);
	}

	public saveAndCloseModal(): void {
		const item = this.getUpdatedItem();
		this.store.dispatch(editItemProgress({ id: item.id }));
		this.store.dispatch(editItemStart({ ...item }));
		this.dialogRef.close();
	}

	private getUpdatedItem(): Item {
		return {
			id: this.item.id,
			...this.editFormGroup.value,
			createdDate: this.item.createdDate
		};
	}

	public updateItemImage(event: Event): void {
		const file = (event.target as any).files[0];
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			this.editFormGroup.controls.image.setValue(
				String(fileReader.result)
			);
		};
	}

	public getImageUploadError(): string {
		const imageErrors = this.editFormGroup.controls.image.errors;
		if (!!imageErrors.required) {
			return 'Please choose the image';
		} else {
			return '';
		}
	}

	public getNameError(): string {
		const nameErrors = this.editFormGroup.controls.name.errors;
		if (!!nameErrors.required) {
			return 'Please enter the name for image';
		} else {
			return '';
		}
	}

	public getDescriptionError(): string {
		const descriptionErrors =
			this.editFormGroup.controls.description.errors;
		if (!!descriptionErrors.required) {
			return 'Please enter the description for image';
		} else {
			return '';
		}
	}

	public getPriceError(): string {
		const priceErrors = this.editFormGroup.controls.price.errors;
		if (!!priceErrors.min) {
			return 'Price should be at least 1';
		} else if (!!priceErrors.required) {
			return 'Please enter the price';
		} else {
			return '';
		}
	}

	public shouldShowErrorFor(control: AbstractControl): boolean {
		if (this.formErrorStateMatcher.isErrorState(control as FormControl)) {
			return true;
		}
		return false;
	}

	public resetForm(): void {
		this.editFormGroup.reset();
	}

	public shouldDisableAddButton(): boolean {
		if (this.hasFormErrors()) {
			return true;
		}
		return false;
	}

	private hasFormErrors(): boolean {
		const formErrors = [];
		Object.keys(this.editFormGroup.controls).forEach(
			(controlKey: string) => {
				const controlErrors =
					this.editFormGroup.controls[controlKey].errors;
				if (!controlErrors) {
					return;
				}
				formErrors.push(controlErrors);
			}
		);
		return formErrors.length > 0;
	}

	public getLatestFormErrorForTooltip(): string {
		const controls = this.editFormGroup.controls;
		for (const [key, value] of Object.entries(controls)) {
			if (!!value.errors) {
				if (value.errors.required) {
					return 'Please fill in ' + key;
				} else {
					return 'Price should be atleast 1';
				}
			}
		}
		return '';
	}
}
