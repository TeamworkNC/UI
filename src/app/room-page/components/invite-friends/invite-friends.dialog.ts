import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../../../local-storage-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.dialog.html',
  styleUrls: ['./invite-friends.dialog.css']
})
export class InviteFriendsDialog implements OnInit {

  friends: any[];

  constructor(
    private dialogRef: MatDialogRef<InviteFriendsDialog>,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number, sessionId: number }
  ) {
    console.log(data);
  }


  ngOnInit(): void {
    const userId = Number(this.localStorageService.getItem('userId'));
    this.loadUserFriends(userId).subscribe(value => {
        this.friends = value;
        console.log(this.friends);
      }
    );
  }

  loadUserFriends(userId: number): Observable<any> {
    const url = `https://mac21-portal-backend.herokuapp.com/api/v1/users/${userId}/friends`;
    return this.http.get<any>(url);
  }

  onInviteButtonClick(userId: number): void {
    const url = `https://mac21-portal-backend.herokuapp.com/api/v1/sessions/${this.data.sessionId}/invite`;
    this.http.post<any>(url, userId).subscribe();

    this.snackBar.open('приглашение успешно отправлено!', 'ок', {
      duration: 3000
    });
  }

  closeDialog(): void {
    this.dialogRef.close('Pizza!');
  }


}
