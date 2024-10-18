import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  profile: any = [];

  constructor(private requestService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    try {
      let storageUser = localStorage.getItem('user');
      if (storageUser) {
        let id = JSON.parse(storageUser).user.id;
        let response = await this.requestService.getUser(id).toPromise();
        this.profile = [
          {
            icon: 'person-outline',
            value: response.user.name,
          },
          {
            icon: 'mail-outline',
            value: response.user.email,
          },
        ];
      }
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
