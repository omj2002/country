import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import { trigger, style, animate, transition } from '@angular/animations';
//mport { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-50px) scale(0.8) rotate(-10deg)',
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
        }),
        animate(
          '1200ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({
            opacity: 1,
            transform: 'translateY(0) scale(1) rotate(0deg)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
          })
        )
      ]),
      transition(':leave', [
        animate(
          '1000ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({
            opacity: 0,
            transform: 'translateY(50px) scale(0.8) rotate(10deg)',
            boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
          })
        )
      ])
    ])
  ]
})
export class CountryListComponent implements OnInit {
  countries: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private countryService: CountryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.loading = true;
    this.error = null;
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        console.log('Total countries received:', data.length); 
        console.log('First few countries:', data.slice(0, 5)); 
        this.countries = data;
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
        this.error = 'Failed to load countries. Please try again.';
        this.loading = false;
      }
    });
  }

  viewCountry(name: string): void {
    this.router.navigate(['/country', name]);
  }

  trackByCountry(index: number, country: any): string {
    return country.name || index.toString();
  }

  onImageError(event: Event, country: any): void {
    console.warn(`Image failed for ${country.name}:`, country.flag);
    (event.target as HTMLImageElement).src = 'assets/placeholder.png';
  }
}