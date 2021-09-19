import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { User  } from '../classes/user';
import { USERS } from '../mock-data/mock-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor() { }

    getUsers(): Observable<User[]> {
        const users = of(USERS)
        return users;
    }
    
    getUserByEmail(email: string): Observable<User | undefined> {
        let user: User | undefined = undefined;
        this.getUsers()
            .subscribe(users => {
                user = users.find(u => u.email === email);
            });
        return of(user);
    }

    login(loginForm: FormGroup): Observable<User | undefined> {
        let user: User | undefined = undefined;
        this.getUsers()
            .subscribe(users => {
                user = users.find(u => u.email === loginForm.value["email"] && u.password === loginForm.value["password"]);
            });
        return of(user);
    }
}
