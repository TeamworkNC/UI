export class UserProfile{
    birthday: string;
    description: string;
    email: string;
    login: string;
    logoUrl: string;
    registrationDate : string;
    userId: number;
    favoriteFilms: [];
    constructor() {
       this.birthday = "";
       this.description= "";
       this.email = "";
       this.login = "";
       this.logoUrl = "";
       this.registrationDate = "";
       this.userId = 0;
       this.favoriteFilms = [];
    }
}
// "achievements": [
//     {
//       "achievementId": 0,
//       "name": "string",
//       "logoUrl": "string",
//       "description": "string"
//     }
// "favoriteFilms": [
//     {
//       "id_film": 0,
//       "film_title": "string",
//       "duration": "2021-04-27T23:06:31.633Z",
//       "release_date": "2021-04-27",
//       "film_poster": "string",
//       "film_trailer": "string",
//       "film_video": "string",
//       "film_budget": 0,
//       "description": "string"
//     }
//   ],
//   "wantWatchFilms": [
//     {
//       "id_film": 0,
//       "film_title": "string",
//       "duration": "2021-04-27T23:06:31.633Z",
//       "release_date": "2021-04-27",
//       "film_poster": "string",
//       "film_trailer": "string",
//       "film_video": "string",
//       "film_budget": 0,
//       "description": "string"
//     }
//   ],
//   "watchedFilms": [
//     {
//       "id_film": 0,
//       "film_title": "string",
//       "duration": "2021-04-27T23:06:31.633Z",
//       "release_date": "2021-04-27",
//       "film_poster": "string",
//       "film_trailer": "string",
//       "film_video": "string",
//       "film_budget": 0,
//       "description": "string"
//     }
//   ],
//   "favoriteStaffs": [
//     {
//       "id_staff": 0,
//       "staff_first_name": "string",
//       "staff_last_name": "string",
//       "birthday_date": "2021-04-27",
//       "description": "string"
//     }
//   ],
//   "globalRoles": [
//     {
//       "globalRoleId": 0,
//       "name": "string"
//     }
