import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MymodalComponent } from '../mymodal/mymodal.component';


export class Globals {
  public static numberOne: number = 0;
  public static numberTwo: number = 0;
  public static result: number = 0;
  public static symbol: number = 0;
  public static str_equation: string = '';
  public static user_inp: number = 0;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  inpForm: FormGroup;
  modalIsOpen: boolean = false;

  remainingTime: number = 10;
  counting: boolean = false;
  countdownInterval: any;
  score: number = 0;

  isModalOpen: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private router: Router,
  ) {

    this.inpForm = this.formBuilder.group({
      inpValue: 0,
    });
  }

  ngOnInit() {
    if (this.isModalOpen) {
      this.isModalOpen = false;
    }
    this.geneEqua();
    this.startCountdown();
  }
  ngOnDestroy(): void {
    if(this.counting){
      clearInterval(this.countdownInterval);
    }
  }

  onSubmit(): void {
    this.stopCountdown();
    const data = this.inpForm.value.inpValue
    if (data != undefined && data != null){
      this.check_result(data);
      this.inpForm.reset();
    }
  }

  geneRandomNumber(max: number) {
    return Math.floor(Math.random() * (max - 1) + 1);
  }

  geneEqua() {
    Globals.numberOne = this.geneRandomNumber(20);
    Globals.numberTwo = this.geneRandomNumber(10);
    Globals.symbol = this.geneRandomNumber(4);
    const showEqua = document.getElementById('equation');
    const showScore = document.getElementById('score');

    if(showScore != undefined && showScore != null) {
      showScore.textContent = this.score.toString();
    }
 
    
    switch(Globals.symbol){
      case 0:
        // Addtion
        Globals.result = Globals.numberOne + Globals.numberTwo;
        
        if (showEqua != undefined && showEqua != null){
          Globals.str_equation = Globals.numberOne + ' + ' + Globals.numberTwo + ' = ?';
          showEqua.textContent = Globals.str_equation;
        }
        
        break;
  
      case 1:
        // Soustraction
        Globals.result = Globals.numberOne - Globals.numberTwo;
        if (showEqua != undefined && showEqua != null){
          Globals.str_equation = Globals.numberOne + ' - ' + Globals.numberTwo + ' = ?';
          showEqua.textContent = Globals.str_equation;
        }
        break;
  
      case 2:
        // Multiplication
        Globals.result = Globals.numberOne * Globals.numberTwo;
        if (showEqua != undefined && showEqua != null){
          Globals.str_equation = Globals.numberOne + ' * ' + Globals.numberTwo + ' = ?';
          showEqua.textContent = Globals.str_equation;
        }
        break;
  
      case 3:
        // Division
        const temp_result = Globals.numberOne * Globals.numberTwo;
        Globals.result = Globals.numberOne;
        Globals.numberOne = temp_result;
        if (showEqua != undefined && showEqua != null){
          Globals.str_equation = Globals.numberOne + ' / ' + Globals.numberTwo + ' = ?';
          showEqua.textContent = Globals.str_equation;
        }
        break;
      
      default:
        console.log("Error gen Number");
        break;
    }
    this.startCountdown();
  }

  check_result(inpValue:number) {
    Globals.user_inp = inpValue;

    if(Globals.symbol == 3) {
      if(inpValue == Globals.result) {
        console.log("Cooreect");
        this.score++;
        this.stopCountdown();
        this.geneEqua();
        this.startCountdown();        
      } else {
        console.log("FAUX");
        console.log(Globals.numberOne + " " + Globals.symbol + " " + Globals.numberTwo + " " + Globals.result);
        this.pauseCountdown();
        this.stopCountdown();
        this.openModal();
      }
    } else {
      if (inpValue == Globals.result){
        console.log("Cooreect");
        this.score++;
        this.stopCountdown();
        this.geneEqua();
        this.startCountdown();
      } else {
        console.log("FAUX");
        console.log(Globals.numberOne + " " + Globals.symbol + " " + Globals.numberTwo + " " + Globals.result);
        this.pauseCountdown();
        this.stopCountdown();
        this.openModal();
      }
    }
  }


  /** Chrono */
  startCountdown() {
    if (!this.counting) {
      this.counting = true;
      this.countdownInterval = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime === 0) {
          this.stopCountdown();
          this.openModal()
        }
      }, 1000);
    }
  }

  pauseCountdown() {
    clearInterval(this.countdownInterval);
    this.counting = false;
  }

  stopCountdown() {
    clearInterval(this.countdownInterval);
    this.counting = false;
    this.remainingTime = 10;
  }


  /** Modal */
  async openModal() {
    try {
      this.isModalOpen = true;
      const modal = await this.modalController.create({
        component: MymodalComponent,
        componentProps: {
          equation: Globals.str_equation,
          user_inp: Globals.user_inp,
          right_answ: Globals.result
        }
      });
  
  
      await modal.present();
  
      //await modal.
    } catch (error) {
      console.log(error);
    }

  }

}
