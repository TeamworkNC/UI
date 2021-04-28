export class OtherUser {
    userId : number;
    login: string;
    email: string;
    birthday: string;
    logoUrl: string;
    description: string;
    registrationDate: string;
    constructor() {
           this.userId = 0;
           this.login = '';
           this.email = "";
           this.birthday = "";
           this.logoUrl ='';
           this.description='';
           this.registrationDate='';
        }
}

export class OtherUserArray {
    users : OtherUser[];

    constructor() {
           this.users = [];
        }
}
