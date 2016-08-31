import { Injectable, provide, NgZone } from '@angular/core';
import { BehaviorSubject } from "rxjs/Rx";
import { ServerService } from './server';
import { Offer } from '../models/offer';

@Injectable()
export class OffersService {
  public items: BehaviorSubject<Array<Offer>> = new BehaviorSubject([]);

  private allItems: Array<Offer> = [];

  constructor(private zone: NgZone, private serverService: ServerService) {}

  public getOffers(): Promise<Array<Offer>> {
    return new Promise((resolve, reject) => {
      this.serverService.get('/news')
          .map(data => data.data)
          .subscribe(
            (data: any[]) => {
              const offers = data.map(json => new Offer(
                json.id,
                json.title,
                json.description,
                json.modified_date,
                json.image_url,
                json.hero
              ));

              this.allItems = offers;
              this.publishUpdates();

              resolve(this.allItems);
            },
            err => reject(err)
          );
    });
  }

  private publishUpdates() {
    this.zone.run(() => {
      this.items.next([...this.allItems]);
    });
  }
}

