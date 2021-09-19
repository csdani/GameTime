import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    loginForm = this.formBuilder.group({
        email: '',
        password: ''
    });

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        let loginUser: User;
        this.userService.login(this.loginForm)
            .subscribe(user => {
                loginUser = user as User;

                if (loginUser == null) {
                    console.log("Loggin failed");
                } else {
                    localStorage.setItem('loggedInUser', loginUser.email);
                    console.log(this.loginForm.value);
                    this.router.navigate(['home']);
                }
        });
    }
  

}
