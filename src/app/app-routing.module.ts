import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
	{
		path: 'items',
		component: ItemsComponent,
		pathMatch: 'full'
	},
	{
		path: 'add',
		component: AddItemFormComponent,
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: 'add'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
