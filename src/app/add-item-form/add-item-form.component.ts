import { ToastrService } from 'ngx-toastr';
import { AddItemStartPayload, Item } from '../item.types';
import {
	addItemProgress, addItemStart, clearAddItemSuccess
} from '../store/actions/items.action';
import { isAddItemSuccessSelector } from '../store/selectors/items.selector';
import { FormErrorStateMatcher } from '../utility/form-error-state-matcher';
import { itemInputFormConfig } from '../utility/item-form-input';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
	selector: 'add-item-form',
	templateUrl: './add-item-form.component.html',
	styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent {
	public addItemFormGroup: FormGroup = new FormGroup(itemInputFormConfig);
	public formErrorStateMatcher: FormErrorStateMatcher =
		new FormErrorStateMatcher();
	@ViewChild('itemImage') public itemImage: ElementRef;

	constructor(private store: Store, private toastrService: ToastrService) {
		this.addItemFormGroup.reset();
		this.setSuccessToastr();
	}

	private setSuccessToastr(): void {
		this.store
			.select(isAddItemSuccessSelector)
			.subscribe((isAddItemSuccess: boolean) => {
				if (isAddItemSuccess) {
					this.store.dispatch(clearAddItemSuccess());
					this.toastrService.success('Item Added Successfully');
				}
			});
	}

	public updateItemImage(event: Event): void {
		const file = (event.target as any).files[0];
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			this.addItemFormGroup.controls.image.setValue(
				String(fileReader.result)
			);
		};
	}

	public addItem(): void {
		const item = this.getNewItem();
		this.store.dispatch(addItemProgress());
		this.store.dispatch(addItemStart({ ...item } as AddItemStartPayload));
		this.addItemFormGroup.reset();
		this.itemImage.nativeElement.value = null;
	}

	private getNewItem(): Partial<Item> {
		return { ...this.addItemFormGroup.value };
	}

	public getImageUploadError(): string {
		const imageErrors = this.addItemFormGroup.controls.image.errors;
		if (!!imageErrors.required) {
			return 'Please choose the image';
		} else {
			return '';
		}
	}

	public getNameError(): string {
		const nameErrors = this.addItemFormGroup.controls.name.errors;
		if (!!nameErrors.required) {
			return 'Please enter the name';
		} else {
			return '';
		}
	}

	public getDescriptionError(): string {
		const descriptionErrors =
			this.addItemFormGroup.controls.description.errors;
		if (!!descriptionErrors.required) {
			return 'Please enter the description';
		} else {
			return '';
		}
	}

	public getPriceError(): string {
		const priceErrors = this.addItemFormGroup.controls.price.errors;
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
		this.addItemFormGroup.reset();
	}

	public shouldDisableAddButton(): boolean {
		if (this.hasFormErrors()) {
			return true;
		}
		return false;
	}

	private hasFormErrors(): boolean {
		const formErrors = [];
		Object.keys(this.addItemFormGroup.controls).forEach(
			(controlKey: string) => {
				const controlErrors =
					this.addItemFormGroup.controls[controlKey].errors;
				if (!controlErrors) {
					return;
				}
				formErrors.push(controlErrors);
			}
		);
		return formErrors.length > 0;
	}

	public getLatestFormErrorForTooltip(): string {
		const controls = this.addItemFormGroup.controls;
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
