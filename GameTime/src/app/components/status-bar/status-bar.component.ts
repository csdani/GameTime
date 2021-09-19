import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/classes/user'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.less']
})
export class StatusBarComponent implements OnInit {

    dateFrom = new Date('2021-07-25T19:00:00');
    displayedElapsedTime = "00:00:00";
    startDate = this.dateFrom.getTime(); //TODO: Change it to data from db
    currentUser: User | undefined = undefined;

    constructor(
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        let loggedInEmail = localStorage.getItem('loggedInUser');
        if (loggedInEmail != null) {
            this.userService.getUserByEmail(loggedInEmail)
                .subscribe(user => {
                    this.currentUser = user;
            });
        }
    }

    elapsedTimeIntervalRef = setInterval(() => {
        this.displayedElapsedTime = this.getElapsedTime(this.startDate);
    }, 1000);

    getElapsedTime(startDate: number) {
        var elapsedTime = (Date.now() - startDate) / 1000;

        let seconds = Math.floor(elapsedTime % 60);
        let secondsAsString = seconds < 10 ? "0" + seconds : seconds;
        
        elapsedTime = Math.floor(elapsedTime / 60);

        let minutes = Math.floor(elapsedTime % 60);
        let minutesAsString = minutes < 10 ? "0" + minutes : minutes;

        let hours = Math.floor(elapsedTime / 60 % 24);
        let hoursAsString = hours < 10 ? "0" + hours : hours;

        return hoursAsString + ':' + minutesAsString + ':' + secondsAsString;
    }

    logOut() {
        localStorage.setItem('loggedInUser', '');
        location.reload();
    }

}
