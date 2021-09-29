import { Component, OnInit } from '@angular/core';
import { SettingService } from "../../_services/setting.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  check: boolean = false;

  constructor(
    public settingService: SettingService,
  ) { }

  ngOnInit(): void {
    this.settingService.getSetting('register').subscribe(x => {
      if (x.value == 1) {
        this.check = true;
      }
    });
  }

  active(e: boolean){
    let params = {
      code: 'register',
      value: e
    }
      this.settingService.updateSetting(params).subscribe(response => {
        console.log(response);
      })

  }

}
