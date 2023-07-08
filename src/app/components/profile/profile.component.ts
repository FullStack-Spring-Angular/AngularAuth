import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'user',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  };
}
