import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrl: './http.component.css',
})
export class HttpComponent implements OnInit {
  SellingCurrency: any;
  BuyingCurrency: any;
  SellingCurrencyValue: any;
  BuyingCurrencyValue: any;
  conversion_rate: any;
  valueLeft: any;
  valueRight: any;
  projecthttp: FormGroup = new FormGroup({
    ExchangeRateLeft: new FormGroup({
      currency: new FormControl(null),
      amount: new FormControl(null),
    }),
    ExchangeRateRight: new FormGroup({
      currency: new FormControl(null),
      amount: new FormControl(null),
    }),
  });
  constructor(private http: HttpClient) {
    this.projecthttp.valueChanges.subscribe((element) => {
      this.SellingCurrency = element.ExchangeRateLeft.currency;
      this.BuyingCurrency = element.ExchangeRateRight.currency;
      if (element.ExchangeRateLeft.amount) {
        this.SellingCurrencyValue = element.ExchangeRateLeft.amount;
      }
      if (element.ExchangeRateRight.amount) {
        this.BuyingCurrencyValue = element.ExchangeRateRight.amount;
      }
      this.http
        .get(
          'https://v6.exchangerate-api.com/v6/d32d2719b7837d3e8e831322/pair/' +
            this.SellingCurrency +
            '/' +
            this.BuyingCurrency
        )
        .subscribe(
          (data) => ((this.conversion_rate = data))
        );

      if (this.SellingCurrencyValue) {
        this.valueLeft =
          this.conversion_rate.conversion_rate * this.SellingCurrencyValue;
      }
      if (this.BuyingCurrencyValue) {
        this.valueRight =
          this.BuyingCurrencyValue / this.conversion_rate.conversion_rate;
      }
    });
  }

  ngOnInit(): void {}
  // ngOnChanges(changes: SimpleChanges): void {}
}
