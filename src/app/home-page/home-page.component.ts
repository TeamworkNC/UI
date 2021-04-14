import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HomeInt} from 'src/app/homeInt';
import {HomeGet} from 'src/app/req/homeGet';

@Component({
  selector: 'ngb-carousel-basic',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  home : HomeInt;
  constructor(private router: Router, private api: HomeGet) {
        this.home= {
          "novelty": [],
          "recommendation": [],
          "slider": []
        }
        this.getHomeData();
   }

   getHomeData(){
         this.api.getCommand()
             .subscribe((data: HomeInt) => {

               if( data == null){
                 this.home;
               }else{
               this.home  = data;
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
