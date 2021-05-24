import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../local-storage-service';
@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss']
})
export class AddFilmComponent implements OnInit {

  constructor(private readonly router: Router, private readonly localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    if(this.localStorageService.getItem("admin")=="1"){
    }else{
    this.router.navigate(['/home']);
    }
  }

}
