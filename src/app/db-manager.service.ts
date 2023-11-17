import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get, query, orderByChild, limitToLast } from 'firebase/database';
import { firebaseConfig } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbManagerService {

  app = initializeApp(firebaseConfig);
  db = getDatabase();
  arr_lead: any = [];

  constructor() { }

  async getData() {
    try {
      const thisref = ref(this.db, 'leaderboard');

      const fireQuery = query(thisref, orderByChild('score'), limitToLast(4));
      const query_get = get(fireQuery);

      await query_get.then((data) => {
        data.forEach((child) => {
          this.arr_lead.push(child.val());
        });
      });

      console.log(this.arr_lead.reverse());

    } catch (error) {
      console.log("erreur get pseudo");
      console.log(error);
    }
  }

  setData(thisPseudo: string, thisScore: number) {
    try {
      push(ref(this.db, 'leaderboard/'), {
        "pseudo": thisPseudo,
        "score": thisScore
      });
      this.getData();

    } catch (error) {
      console.log("erreur set pseudo");
      console.log(error);
    }
  }

}

