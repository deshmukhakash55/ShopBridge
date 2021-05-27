import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { ItemsEffect } from './store/effects/items.effect';
import { itemsReducer } from './store/reducers/items.reducer';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
	EditItemModalComponent
} from './edit-item-modal/edit-item-modal.component';
import { ItemsComponent } from './items/items.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HumanizePipe } from './pipes/humanize.pipe';

@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		NavbarComponent,
		ItemsComponent,
		EditItemModalComponent,
		AddItemFormComponent,
		HumanizePipe
	],
	imports: [
		BrowserModule,
		CommonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatCardModule,
		FormsModule,
		MatTooltipModule,
		ReactiveFormsModule,
		MatInputModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		StoreModule.forRoot({ items: itemsReducer }, {}),
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		LayoutModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production
		}),
		ToastrModule.forRoot({
			timeOut: 5000,
			positionClass: 'toast-bottom-right',
			preventDuplicates: true
		}),
		EffectsModule.forRoot([ItemsEffect])
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
