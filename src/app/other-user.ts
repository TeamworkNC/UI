export class OtherUser {
    userId : number;
    login: string;
    email: string;
    birthday: string;
    logoUrl: string;
    description: string;
    registrationDate: string;
//     constructor() {
//            this.userId = 0;
//            this.login = '';
//            this.email = "";
//            this.birthday = "";
//            this.logoUrl ='';
//            this.description='';
//            this.registrationDate='';
//         }
    constructor(userId? : number, login? : string, email? : string, birthday? : string, logoUrl? : string, description? : string, registrationDate? : string) {
               this.userId = userId;
               this.login = login;
               this.email = email;
               this.birthday = birthday;
               this.logoUrl =logoUrl;
               this.description=description;
               this.registrationDate=registrationDate;
            }
}

export class OtherUserArray {
    users : OtherUser[];

    constructor() {
           this.users = [];
        }
}
