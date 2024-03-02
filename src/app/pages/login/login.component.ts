import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router';
import { LocalStorgeService } from '../../services/local-storage.service';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string
  password: string

  constructor(private dbservice: DbService, private router: Router, private local: LocalStorgeService) {
    if (!User.id) {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    if (this.local.get("username")) {
      User.username = this.local.get("username")
      User.password = this.local.get("password")
      User.realname = this.local.get("realname")
      User.id = this.local.get("userId")
      // let user = new User()
      // user.name

      this.router.navigate(['/housings'])
    }
  }

  onSubmit() {
    this.dbservice.checkUserInfo(this.username, this.password).subscribe(res => {
      if (!res) {

      }
      else if (res.length > 0) {
        console.log("登录成功")
        const username = res[0].user_name
        const password = res[0].password
        const realname = res[0].real_name
        const userId = res[0].id
        this.local.set("username", username)
        this.local.set("password", password)
        this.local.set("realname", realname)
        this.local.set("userId", userId)
        User.username = username
        User.password = password
        User.realname = realname
        User.id = userId

        this.router.navigate(['/housings'])
      }
    })
  }

}
