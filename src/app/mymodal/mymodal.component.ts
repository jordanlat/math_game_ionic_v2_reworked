import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.scss'],
  imports: [FormsModule,IonicModule,ReactiveFormsModule],
  standalone: true
})
export class MymodalComponent  implements OnInit {
  nameForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
  ) {
    this.nameForm = this.formBuilder.group(
      {
        pseudo: ['', [Validators.required]],
      }
    );
  }

  ngOnInit() {}

  pseudo: string = '';
  modalIsOpen: boolean = false;

  onSubmit() {
    const data = this.nameForm;
    if (data.value.pseudo != undefined && data.value.pseudo != null && data.valid){
      const pseudo = data.value.pseudo;
      console.log(pseudo);
      this.modalController.dismiss({pseudo}, 'ok');
    }
  }

  onDismiss (data: string) {
    this.modalController.dismiss(data);
  }
}
