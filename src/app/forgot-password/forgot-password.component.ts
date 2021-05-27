import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from 'src/app/local-storage-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router: Router,
              public localStorageService: LocalStorageService,) { }

  ngOnInit(): void {
    if(this.localStorageService.getItem("userId") ){
            this.router.navigate(
                          ['/user', this.localStorageService.getItem("userId")]);}
  }

}
