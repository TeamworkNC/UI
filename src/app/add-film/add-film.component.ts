import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {LocalStorageService} from '../local-storage-service';
import {FormBuilder, FormGroup, Validators, FormControl,FormArray,} from '@angular/forms';
import {AddFilm} from 'src/app/req/addFilm';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {GenresGet} from "src/app/req/genresGet";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss']
})
export class AddFilmComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  filterFormGroup: FormGroup;
  filmId:number;
  filmPoster:number;
  selectedFile: File;
  filmScreen1: number;
  filmScreen2: number;
  filmScreen3: number;
  filmScreen4: number;
  filmScreen5: number;
  filmVideo: number;
  filters: any;
  filmGenre : number;
  constructor(private router: Router,
  private readonly localStorageService: LocalStorageService,
  private _formBuilder: FormBuilder,
  private http: HttpClient,
  private api: AddFilm,
  private api1: GenresGet,) { }

  ngOnInit(): void {
    if(this.localStorageService.getItem("admin")=="1"){
     this.firstFormGroup = this._formBuilder.group({
          filmTitleCtrl: ['', Validators.required],
          filmTrailerCtrl: ['', Validators.required],
          descriptionCtrl: ['', Validators.required]
        });
     this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
        });
     this.getInfo();
     this.filterFormGroup = this._formBuilder.group({
                   filters: this._formBuilder.array([]),
                 });
    }else{
    this.router.navigate(['/home']);
    }
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

  addFilm(){
   this.api.postCommand(this.firstFormGroup.get('filmTitleCtrl').value, this.firstFormGroup.get('filmTrailerCtrl').value, this.firstFormGroup.get('descriptionCtrl').value)
              .subscribe((data: any) => {

                if( data.body == null){

                }else{
                this.filmId = data.body.idFilm;
                console.log(this.filmId);
                }
              },
              (err) => {}
              );
        }

   onUpload(){
   const fd = new FormData();
   fd.append('file', this.selectedFile);
   this.http.post('https://mac21-portal-backend.herokuapp.com/api/v1/filmContent/' + this.filmId +  '/uploadPoster', fd).subscribe(() => {
   this.ngOnInit();
   this.filmPoster=1;
    });
   }

   onUploadVideo(){
      const fd = new FormData();
      fd.append('file', this.selectedFile);
      this.http.post('https://mac21-portal-backend.herokuapp.com/api/v1/filmContent/' + this.filmId +  '/uploadPoster', fd).subscribe(() => {
      this.ngOnInit();
      this.filmVideo=1;
       });
      }

   onUploadScreen(){
      const fd = new FormData();
      fd.append('file', this.selectedFile);
      this.http.post('https://mac21-portal-backend.herokuapp.com/api/v1/filmContent/' + this.filmId +  '/uploadVideo', fd).subscribe(() => {
      this.ngOnInit();
      if(!this.filmScreen1){
        this.filmScreen1=1;
        console.log(this.filmScreen1);
      }

      else{
        if(!this.filmScreen2){this.filmScreen2=2;}
        else{
         if(!this.filmScreen3)
          {this.filmScreen3=2;}
          else {
          if(!this.filmScreen4){this.filmScreen4=2;} else{
            this.filmScreen5=1;
            }
          }
         }}
      });
      }

   onFileChanged(event) {
           this.selectedFile = event.target.files[0];
         }

   getInfo(){
    this.api1.getCommand()
                      .subscribe((data: any) => {
                      if( data == null){
                                }else{
                                this.filters  = data.genres;
                                }
                              });
   }

   addGenre(){
     this.http.post("https://mac21-portal-backend.herokuapp.com/api/v1/films/" + this.filmId +"/addListGenre", this.filterFormGroup.value.filters  ).pipe(map(function (i: any) { return {
                                                                                  info: i
                                                                                  };})).subscribe((data: any) => {

                                                                                                         if( data == null){

                                                                                                         }else{
                                                                                               this.filmGenre=1;
                                                                                                         }
                                                                                                       });}

  }


