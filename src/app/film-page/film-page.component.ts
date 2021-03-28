import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
id = 'D0lJAv9WCSA';
  playerOptions = {
    cc_lang_pref: 'en'
  };
  private player;
  private ytEvent;
imageObject = [{
      image: 'https://api.kinoart.ru/storage/post/1999/regular_detail_picture-0b858bb02ffe94a7227e9c629278b35b.jpg',
      thumbImage: 'https://api.kinoart.ru/storage/post/1999/regular_detail_picture-0b858bb02ffe94a7227e9c629278b35b.jpg'
  }, {
      image: 'https://resizer.mail.ru/p/41ad0fd6-c0e3-54c6-9e2a-117c5ad1f042/AAACCLtzTj_WCGjzL5mCWwtjY04A8VXuZwXzy4Wprib0spKiMzXMFO1uVd9IRTZlkfhcss5JK8-v0k2ZwV0jcaCfRg8.jpg',
      thumbImage: 'https://resizer.mail.ru/p/41ad0fd6-c0e3-54c6-9e2a-117c5ad1f042/AAACCLtzTj_WCGjzL5mCWwtjY04A8VXuZwXzy4Wprib0spKiMzXMFO1uVd9IRTZlkfhcss5JK8-v0k2ZwV0jcaCfRg8.jpg'
  }, {
      image: 'https://resizer.mail.ru/p/41650291-02e9-5555-bf84-1299a08b12d2/AAACLwISyjIIPihnQlD9b_xXTD5dGUdZALQkO7F05aO4irflj7PJGFU5xau0pq50-kFQBAjd_3g2BIMTXBHwg3GbiO0.jpg',
      thumbImage: 'https://resizer.mail.ru/p/41650291-02e9-5555-bf84-1299a08b12d2/AAACLwISyjIIPihnQlD9b_xXTD5dGUdZALQkO7F05aO4irflj7PJGFU5xau0pq50-kFQBAjd_3g2BIMTXBHwg3GbiO0.jpg',
  },{
      image: 'https://resizer.mail.ru/p/7882b045-fd10-5ea5-aba6-417a3cbc245e/AAACeMJnasi5ltGZm2yVR57LFMy8MtirIn6mJSCVLBAdMrfLEE2g6I2K1dHEOUmLa_1AtxvDUDoP7xRNUHDborMcgow.jpg',
      thumbImage: 'https://resizer.mail.ru/p/7882b045-fd10-5ea5-aba6-417a3cbc245e/AAACeMJnasi5ltGZm2yVR57LFMy8MtirIn6mJSCVLBAdMrfLEE2g6I2K1dHEOUmLa_1AtxvDUDoP7xRNUHDborMcgow.jpg',
  }, {
      image: 'https://resizer.mail.ru/p/3ce77a16-15de-5885-abfd-2d3da5a30bf8/AAACBbm3gNtv4nLllFzetiPDys44XxDcrrguV4TSdd1ytMewutL74nUsu7ayEw3536CFTdfxgknm98ft_BNhvvlpCPA.jpg',
      thumbImage: 'https://resizer.mail.ru/p/3ce77a16-15de-5885-abfd-2d3da5a30bf8/AAACBbm3gNtv4nLllFzetiPDys44XxDcrrguV4TSdd1ytMewutL74nUsu7ayEw3536CFTdfxgknm98ft_BNhvvlpCPA.jpg'
  }];

  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    this.player = player;
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }
}
