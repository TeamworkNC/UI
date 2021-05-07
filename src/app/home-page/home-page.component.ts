import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HomeInt} from 'src/app/homeInt';
import {HomeGet} from 'src/app/req/homeGet';
import {HomeGetNovelty} from 'src/app/req/homeGetNovelty';
import {HomeGetRandom} from 'src/app/req/homeGetRandom';

@Component({
  selector: 'ngb-carousel-basic',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  home : HomeInt;
  constructor(private router: Router, private api: HomeGet, private api1: HomeGetNovelty, private api2: HomeGetRandom) {
        this.home= {
          "novelty": [],
          "recommendation": [],
          "slider": []
        }
        this.getHomeData();
   }

   getHomeData(){
         this.api.getCommand()
             .subscribe((data: any) => {
               if( data == null){
                 this.home;
               }else{
               this.home.recommendation  = data.recommendation;
               }
             });
         this.api1.getCommand()
                      .subscribe((data: any) => {
                        if( data == null){
                          this.home;
                        }else{
                        this.home.novelty  = data.novelty;
                        console.log(data);
                        }
                      });
         this.api2.getCommand()
                               .subscribe((data: any) => {
                                 if( data == null){
                                   this.home;
                                 }else{
                                 this.home.slider  = data.slider;
                                 console.log(data);
                                 }
                               });
       }

  ngOnInit(): void {
  this.getHomeData();
  }

  goFilmPage(id : number) {
                    this.router.navigate(
                      ['/film/' + id]);
                  }

}
