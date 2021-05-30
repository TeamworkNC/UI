import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../local-storage-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddFilm} from 'src/app/req/addFilm';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss']
})
export class AddFilmComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  filmId:number;

  constructor(private readonly router: Router,
  private readonly localStorageService: LocalStorageService,
  private _formBuilder: FormBuilder,

  private api: AddFilm, ) { }

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
    }else{
    this.router.navigate(['/home']);
    }
  }

  addFilm(){
   this.api.postCommand(this.firstFormGroup.get('filmTitleCtrl').value, this.firstFormGroup.get('filmTrailerCtrl').value, this.firstFormGroup.get('descriptionCtrl').value)
              .subscribe((data: any) => {

                if( data.body == null){

                }else{
                this.filmId = data.idFilm;
                }
              },
              (err) => {}
              );
        }
  }


