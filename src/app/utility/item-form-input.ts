import { FormControl, Validators } from '@angular/forms';

export const itemInputFormConfig = {
	name: new FormControl('', {
		validators: [Validators.required],
		updateOn: 'change'
	}),
	description: new FormControl('', [Validators.required]),
	price: new FormControl('', [Validators.min(1), Validators.required]),
	image: new FormControl('', [Validators.required])
};
