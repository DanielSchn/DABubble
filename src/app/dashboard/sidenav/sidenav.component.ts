import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule, MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.class';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from '@angular/fire/auth';
import { BehaviorSubject, Observable, catchError, filter, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    MatButtonModule,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent

  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition(':enter', [animate('300ms ease-in')]),
      transition(':leave', [animate('300ms ease-out')])
    ])
  ]
})

export class SidenavComponent {
  opened: boolean = true;
  imageSrc: string = './assets/img/sidemenu_close_normal.png';
  editSrc: string = './assets/img/edit_square.png';
  arrowSrc: string = './assets/img/arrow_drop_down.png';
  arrowSrcWs: string = './assets/img/arrow_drop_down.png';
  logoSrc: string = './assets/img/private_message_logo.png';
  logoSrcWs: string = './assets/img/workspaces.png';
  add: string = './assets/img/add_channel.png';
  addCircle: string = './assets/img/add_circle.png';
  online: boolean = true;
  users: User[] = [];
  userId: string = '';
  allUsers: User[] = [];

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private authService: AuthService) {

  }

  async ngOnInit() {
    // this.allUsers = await this.loadData();
    this.loadData();
  }


  toggleSidenav() {
    this.opened = !this.opened;
  }

  hoverMenuButton() {
    if (this.opened) {
      this.imageSrc = './assets/img/sidemenu_close_hover.png';
    } else {
      this.imageSrc = './assets/img/sidemenu_open_hover.png';
    }
  }

  resetHover() {
    if (!this.opened) {
      this.imageSrc = './assets/img/sidemenu_open_normal.png';
    } else {
      this.imageSrc = './assets/img/sidemenu_close_normal.png';
    }
  }

  hoverEdit(originalSrc: 'editSrc' | 'arrowSrc' | 'logoSrc' | 'logoSrcWs' | 'arrowSrcWs' | 'add' | 'addCircle', url: string) {
    this[originalSrc] = url;
  }

  resetHoverEdit(originalSrc: 'editSrc' | 'arrowSrc' | 'logoSrc' | 'logoSrcWs' | 'arrowSrcWs' | 'add' | 'addCircle', url: string) {
    this[originalSrc] = url;
  }

  getDataFromFirestore(): User[] {
    return this.dataService.allUsers;
  }

  //  getCurrentUserId(): string | undefined {
  //  const auth = getAuth();
  //   return auth.currentUser ? auth.currentUser.uid : undefined;
  // }
  async loadData() {
    const uid = this.authService.getUserAuthId();
    /* if (uid) {
      const users = await this.getDataFromFirestore();
      this.allUsers = users.filter(user => user.authUserId === uid);
    } */
  }
}
