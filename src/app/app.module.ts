import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilmPageComponent } from './film-page/film-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component';

import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RecommendationChatModule} from './features/recommendation-chat/recommendation-chat.module';
import {NbIconModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {CoreModule} from './features/core/core.module';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { NgImageSliderModule } from 'ng-image-slider';
import {MatSliderModule} from '@angular/material/slider';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FilmPageComponent,
    UserPageComponent,
    CatalogPageComponent,
    RegistrationPageComponent,
    AuthorizationPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatExpansionModule,
    NgbModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    RecommendationChatModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbIconModule,
    CoreModule,
    NbEvaIconsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxYoutubePlayerModule.forRoot(),
    NgImageSliderModule,
    MatSliderModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDatepickerModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
