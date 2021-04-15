import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogGet} from 'src/app/req/catalogGet';
import {CatalogInt} from 'src/app/catalogInt';
import {UserSearchFilm} from 'src/app/req/userSearchFilm';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {
catalog : CatalogInt;
@Input() userIn: string;
  constructor(private activateRoute: ActivatedRoute, private router: Router, private api: CatalogGet, private formBuilder: FormBuilder, private apiPost: UserSearchFilm) {
    this.userIn="";
    this.catalog= {
      "films" : [],
      "filters" : []
    }
    this.getCatalogData();
    this.filterFormGroup = this.formBuilder.group({
              filters: this.formBuilder.array([])
            });
  }
  filterFormGroup : FormGroup;
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

  onChange(event) {
      const array1 = <FormArray>this.filterFormGroup.get('filters') as FormArray;
      if(event.checked) {
        array1.push(new FormControl(event.source.value))
      } else {
        const i = array1.controls.findIndex(x => x.value === event.source.value);
        array1.removeAt(i);
      }
    }

  postUserSearchOptions(){
    this.apiPost.postCommand(this.filterFormGroup.value.filters, this.userIn)
                   .subscribe((data: CatalogInt) => {
                     if( data == null){
                       this.catalog;
                     }else{
                     this.catalog  = data;
                     }
                   });
  }

}
