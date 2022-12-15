import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { User } from 'src/app/models/user/User';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  userInfoForm: UntypedFormGroup;
  user: User;

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.createUserInfoForm();
  }

  createUserInfoForm(){
    this.userInfoForm = this.fb.group({
      name: [null],
      email: [null]
    });
  }
}
