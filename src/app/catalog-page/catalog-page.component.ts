import { Component, Input, OnInit, ViewChild, ChangeDetectorRef,OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogGet} from 'src/app/req/catalogGet';
import {CatalogInt} from 'src/app/catalogInt';
import {UserSearchFilm} from 'src/app/req/userSearchFilm';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from 'rxjs';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {FilmShort} from 'src/app/filmShort';
import {GenresGet} from "src/app/req/genresGet";
import {AgeLimitsGet} from "src/app/req/ageLimitsGet";

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {
catalog : CatalogInt;
@Input() userIn: string;
@ViewChild(MatPaginator) paginator: MatPaginator;
obs: Observable<any>;
dataSource: MatTableDataSource<FilmShort>;
array2:any;
array1:any;
  constructor(private activateRoute: ActivatedRoute, private router: Router, private api: CatalogGet, private api1: GenresGet, private api2: AgeLimitsGet, private formBuilder: FormBuilder, private apiPost: UserSearchFilm, private changeDetector: ChangeDetectorRef) {
    this.userIn="";
    this.catalog= {
      "films" : [],
      "filters" : [],
      "ageLimits" : []
    }
    this.getFilms();
    this.getCatalogData();
    this.filterFormGroup = this.formBuilder.group({
              filters: this.formBuilder.array([]),
              age : this.formBuilder.array([])
            });
    this.array2 = <FormArray>this.filterFormGroup.get('age') as FormArray;
    this.array1 = <FormArray>this.filterFormGroup.get('filters') as FormArray;
  }
  filterFormGroup : FormGroup;

  ngOnInit(): void {
    this.changeDetector.detectChanges();
  }

   getCatalogData(){

           this.api1.getCommand()
                  .subscribe((data: any) => {
                  if( data == null){
                            }else{
                            this.catalog.filters  = data.genres;
                            }
                          });
           this.api2.getCommand()
                  .subscribe((data: any) => {
                  if( data == null){}
                  else{ this.catalog.ageLimits  = data.ageLimits; }
                                     });

         }
  getFilms(){
  this.api.getCommand()
                 .subscribe((data: CatalogInt) => {
                   if( data == null){
                     this.catalog;
                   }else{
                   this.catalog.films  = data.films;
                   this.dataSource= new MatTableDataSource<FilmShort>(this.catalog.films);
                   this.dataSource.paginator = this.paginator;
                   this.obs = this.dataSource.connect();
                   }
                 });
                 }

  goFilmPage(id : number) {
    this.router.navigate(
      ['/film/'+ id]);
  }

  onChange(event) {
      if(event.checked) {
        this.array1.push(new FormControl(event.source.value))
      } else {
        const i = this.array1.controls.findIndex(x => x.value === event.source.value);
        this.array1.removeAt(i);
      }
    }
  onChangeAge(event) {

        if(event.checked) {
          this.array2.push(new FormControl(event.source.value))
        } else {
          const i = this.array2.controls.findIndex(x => x.value === event.source.value);
          this.array2.removeAt(i);
        }
      }
  postUserSearchOptions(){
    this.apiPost.postCommand(this.filterFormGroup.value.filters, this.userIn, this.filterFormGroup.value.age)
                   .subscribe((data: any) => {
                     if( data == null){
                       this.catalog;
                     }else{
                     this.catalog.films  = data.films;
                     console.log(Array.from(this.catalog.films));
                     console.log(this.catalog.films);
                     this.dataSource= new MatTableDataSource<FilmShort>(Array.from(this.catalog.films));
                     this.dataSource.paginator = this.paginator;
                     this.obs = this.dataSource.connect();
                     }
                   });
  }

  dropSearchOptions(){
      this.apiPost.postCommand([], '', [])
                     .subscribe((data: any) => {
                       if( data == null){
                         this.catalog;
                       }else{
                       this.catalog.films  = data.films;
                       console.log(Array.from(this.catalog.films));
                       console.log(this.catalog.films);
                       this.dataSource= new MatTableDataSource<FilmShort>(Array.from(this.catalog.films));
                       this.dataSource.paginator = this.paginator;
                       this.obs = this.dataSource.connect();
                       }
                     });
          this.userIn='';
          this.getCatalogData();
          this.filterFormGroup.reset();

    }

  ngOnDestroy() {
        if (this.dataSource) {
          this.dataSource.disconnect();
        }
      }

}
