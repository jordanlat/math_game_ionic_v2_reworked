import { Component, OnInit } from '@angular/core';
import { DbManagerService } from '../db-manager.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  arr_lead: any[] = [];

  constructor(
    private fireService: DbManagerService,
  ) { }

  async ngOnInit() {
    this.arr_lead = await this.fireService.getData();
  }
}
