import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { DbManagerService } from '../db-manager.service';

@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.scss'],
  imports: [FormsModule,IonicModule,ReactiveFormsModule],
  standalone: true
})
export class MymodalComponent  implements OnInit {
  nameForm: FormGroup;
  equation: string = '';
  user_inp: number = 0;
  right_answ: number = 0;
  pseudo: string = '';
  modalIsOpen: boolean = false;
  score: number = 0;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private router: Router,
    private fireService: DbManagerService
  ) {
    this.nameForm = this.formBuilder.group(
      {
        pseudo: ['', [Validators.required]],
      }
    );
  }

  ngOnInit() {
    console.log(`${this.equation} ${this.user_inp}`)
  }


  onSubmit() {
    const data = this.nameForm;
    const db = DbManagerService;
    if (data.value.pseudo != undefined && data.value.pseudo != null && data.valid){
      const pseudo = data.value.pseudo;
      console.log(pseudo, this.score);
      
      this.fireService.setData(pseudo, this.score);

      this.modalController.dismiss({pseudo}, 'ok');
      this.router.navigate(['/home']);
    }
  }

  onDismiss (data: string) {
    this.modalController.dismiss(data);
  }
}
