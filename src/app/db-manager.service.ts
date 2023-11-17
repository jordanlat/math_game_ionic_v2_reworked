import { Injectable } from '@angular/core';
import { getDatabase, ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class DbManagerService {

  //app = initializeApp(firebaseConfig);
  constructor() { }

  async getData() {

  }

  setData(thisPseudo: string, thisScore: number) {
    const db = getDatabase();
    
    set(ref(db), {
      pseudo: thisPseudo,
      score: thisScore
    });

  }

}
