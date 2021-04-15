import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogGet} from 'src/app/req/catalogGet';
import {CatalogInt} from 'src/app/catalogInt';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {
catalog : CatalogInt;
  constructor(private activateRoute: ActivatedRoute, private router: Router, private api: CatalogGet) {
    this.catalog= {
      "films" : [],
      "filters" : []
    }
    this.getCatalogData();
  }
  ngOnInit(): void {

  }

   getCatalogData(){
           this.api.getCommand()
               .subscribe((data: CatalogInt) => {
                 if( data == null){
                   this.catalog;
                 }else{
                 this.catalog  = data;
                 }
               });
         }

  goFilmPage(id : number) {
    this.router.navigate(
      ['/film/'+ id]);
  }

}
