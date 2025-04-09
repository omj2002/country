import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  country: any;
  error: string | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.loading = true;
      this.error = null;
      this.countryService.getCountryByName(name).subscribe({
        next: (data: any) => {
          // The API returns an array, so we need to get the first item
          if (Array.isArray(data) && data.length > 0) {
            this.country = data[0];
          } else {
            this.country = data;
          }
          this.loading = false;
          console.log('Country details received:', this.country);
        },
        error: (error) => {
          console.error('Error fetching country details:', error);
          this.error = 'Failed to load country details. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  getLanguages(country: any): string {
    if (!country.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  }

  getCurrencies(country: any): string {
    if (!country.currencies) return 'N/A';
    return Object.values(country.currencies)
      .map((curr: any) => `${curr.name} (${curr.symbol || 'N/A'})`)
      .join(', ');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}