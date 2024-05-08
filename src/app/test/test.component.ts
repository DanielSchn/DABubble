import { FormsModule } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  constructor( private authService: AuthService ) {}

  email: string | null = '';
  newEmail: string = '';

  fullname: string | null = '';
  newFullname: string = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setEmail();
    this.setFullname();
  }

  async setEmail() {
    try {
      this.email = await this.authService.getUserEmail();
    } catch (error) {
      console.error('Failed to get email. ', error);
    }
  }

  async setFullname() {
    try {
      const uid = await this.authService.getUserAuthId();
      if (uid) {
        this.fullname = await this.authService.getUserFullname(uid);
      }
    } catch (error) {
      console.error('Failed to get email. ', error);
    }
  }

  /**
   * Take this function to update users email address
   * TODO: Add Email validation before sending to update method to prevent firestore error warnings
   * @returns
   */
  async changeEmail() {
    if (!this.newEmail) { return; }
    try {
      await this.authService.updateEmailAddress(this.newEmail);
      console.log('Email sucessful changed.');
    } catch (error) {
      console.error('Error while updating the email adress to auth and db.', error);
    }
  }


  /**
   * Take this function to update users fullname on firestore
   * @returns A log or an error log. In hope for just a log.
   */
  async changeFullname() {
    if (!this.newFullname) { return; }
    try {
      await this.authService.updateName(this.newFullname);
      console.log('Name successfull changed.');
    } catch (error) {
      console.error('Error while updating the name.');
    }
  }


}
