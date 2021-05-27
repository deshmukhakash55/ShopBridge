import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class FormErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null): boolean {
		return !!(
			control &&
			control.invalid &&
			(control.dirty || control.touched)
		);
	}
}
