import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
	public isHandset: Observable<boolean>;

	constructor(private breakpointObserver: BreakpointObserver) {
		this.initializeIsHandsetObservable();
	}

	private initializeIsHandsetObservable(): void {
		this.isHandset = this.breakpointObserver
			.observe(Breakpoints.Handset)
			.pipe(
				map((result) => result.matches),
				shareReplay()
			);
	}
}
