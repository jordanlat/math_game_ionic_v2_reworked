import { Component, OnInit } from '@angular/core';
import { DbManagerService } from '../db-manager.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent  implements OnInit {
  arr_lead= this.fireService.arr_lead;
  data = [{'toto':'titi'},{'toto':6}]; 
  constructor(
    private fireService: DbManagerService,
  ) { }
  
  async ngOnInit() {
    await this.fireService.getData().then((data)=>{
      data.forEach((child: object)=>{
        //this.arr_lead.push(child);
        // console.log(Object.keys(child));
        //this.arr_lead.push(child['pseudo']);
        //Object.assign(this.arr_lead, child);
        //console.log(child['pseudo']);
      })
    });


    const list = document.getElementById('list');
    const item = document.createElement('ion-item');
    const p = document.createElement('p');
  
    /*
    this.arr_lead.map((obj,index)=>{
      console.log(obj); 
      console.log(index); 
    });
    */
  }
}
