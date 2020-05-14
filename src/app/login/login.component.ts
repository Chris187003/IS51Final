import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../localStorageService';


interface IUser {
  id?: number;
  username: string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: IUser = { username: '', password: '' };
  localStorageService: LocalStorageService<IUser>;
  currentUser: IUser = null;

  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('user');
  }

  ngOnInit() {
    if (this.currentUser != null) {
      this.router.navigate(['cart']);
    }

  }

  login(user: IUser) {
    console.log('from login user: ', user);

    const presetUser: IUser = {username: 'Christopher', password: 'Christopher123' };
    if (user.username !== null && user.password !== null) {
      if (user.username === presetUser.username && user.password === presetUser.password) {
        this.localStorageService.saveItemsToLocalStorage(user);
        this.router.navigate(['cart', user]);
      } else {
        this.toastService.showToast('danger', 15000, 'Invalid Credentials');
      }
      // log the user in
      console.log('from within if statement...');
    }
  }

}
