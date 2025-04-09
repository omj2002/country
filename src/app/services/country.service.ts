import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // Mock data to avoid CORS issues
  private mockCountries = [
    {
      name: "Afghanistan",
      nativeName: "افغانستان",
      capital: "Kabul",
      population: 27657145,
      region: "Asia",
      subregion: "Southern Asia",
      flag: "https://flagcdn.com/w320/af.png",
      languages: {
        pas: "Pashto",
        uz: "Uzbek",
        tk: "Turkmen"
      },
      currencies: {
        AFN: {
          name: "Afghan afghani",
          symbol: "؋"
        }
      }
    },
    {
      name: "Albania",
      nativeName: "Shqipëria",
      capital: "Tirana",
      population: 2837743,
      region: "Europe",
      subregion: "Southern Europe",
      flag: "https://flagcdn.com/w320/al.png",
      languages: {
        sqi: "Albanian"
      },
      currencies: {
        ALL: {
          name: "Albanian lek",
          symbol: "L"
        }
      }
    },
    {
      name: "Algeria",
      nativeName: "الجزائر",
      capital: "Algiers",
      population: 44616624,
      region: "Africa",
      subregion: "Northern Africa",
      flag: "https://flagcdn.com/w320/dz.png",
      languages: {
        ara: "Arabic"
      },
      currencies: {
        DZD: {
          name: "Algerian dinar",
          symbol: "د.ج"
        }
      }
    },
    {
      name: "Andorra",
      nativeName: "Andorra",
      capital: "Andorra la Vella",
      population: 77265,
      region: "Europe",
      subregion: "Southern Europe",
      flag: "https://flagcdn.com/w320/ad.png",
      languages: {
        cat: "Catalan"
      },
      currencies: {
        EUR: {
          name: "Euro",
          symbol: "€"
        }
      }
    },
    {
      name: "Angola",
      nativeName: "Angola",
      capital: "Luanda",
      population: 32866272,
      region: "Africa",
      subregion: "Middle Africa",
      flag: "https://flagcdn.com/w320/ao.png",
      languages: {
        por: "Portuguese"
      },
      currencies: {
        AOA: {
          name: "Angolan kwanza",
          symbol: "Kz"
        }
      }
    },
    {
      name: "Argentina",
      nativeName: "Argentina",
      capital: "Buenos Aires",
      population: 45195774,
      region: "Americas",
      subregion: "South America",
      flag: "https://flagcdn.com/w320/ar.png",
      languages: {
        grn: "Guarani",
        spa: "Spanish"
      },
      currencies: {
        ARS: {
          name: "Argentine peso",
          symbol: "$"
        }
      }
    },
    {
      name: "Australia",
      nativeName: "Australia",
      capital: "Canberra",
      population: 25499884,
      region: "Oceania",
      subregion: "Australia and New Zealand",
      flag: "https://flagcdn.com/w320/au.png",
      languages: {
        eng: "English"
      },
      currencies: {
        AUD: {
          name: "Australian dollar",
          symbol: "$"
        }
      }
    },
    {
      name: "Brazil",
      nativeName: "Brasil",
      capital: "Brasília",
      population: 212559417,
      region: "Americas",
      subregion: "South America",
      flag: "https://flagcdn.com/w320/br.png",
      languages: {
        por: "Portuguese"
      },
      currencies: {
        BRL: {
          name: "Brazilian real",
          symbol: "R$"
        }
      }
    },
    {
      name: "Canada",
      nativeName: "Canada",
      capital: "Ottawa",
      population: 38005238,
      region: "Americas",
      subregion: "North America",
      flag: "https://flagcdn.com/w320/ca.png",
      languages: {
        eng: "English",
        fra: "French"
      },
      currencies: {
        CAD: {
          name: "Canadian dollar",
          symbol: "$"
        }
      }
    },
    {
      name: "China",
      nativeName: "中国",
      capital: "Beijing",
      population: 1439323776,
      region: "Asia",
      subregion: "Eastern Asia",
      flag: "https://flagcdn.com/w320/cn.png",
      languages: {
        zho: "Chinese"
      },
      currencies: {
        CNY: {
          name: "Chinese yuan",
          symbol: "¥"
        }
      }
    }
  ];

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<any[]> {
    // Return mock data with a small delay to simulate network request
    return of(this.mockCountries).pipe(delay(500));
  }

  getCountryByName(name: string): Observable<any> {
    // Find the country in the mock data
    const country = this.mockCountries.find(c => 
      c.name.toLowerCase() === name.toLowerCase()
    );
    
    if (country) {
      // Return the country with a small delay to simulate network request
      return of([country]).pipe(delay(500));
    } else {
      // Return an error if the country is not found
      return of([]).pipe(delay(500));
    }
  }
}