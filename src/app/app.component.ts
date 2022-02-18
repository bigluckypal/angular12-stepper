import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 12 Crud';
  fbImg = 'assets/images/facebook.jpg';
  instagramImg = 'assets/images/instagram.jpg';
  tiktokImg = 'assets/images/tiktok.png';
  tutorial: Tutorial = {
    title: '',
    accounts: [
      { id: 1, name: "United States" },
      { id: 2, name: "Australia" },
      { id: 3, name: "Canada" },
      { id: 4, name: "Brazil" },
      { id: 5, name: "England" }
    ],
    published: false
  };
  submitted = false;

  accounts = [
    { id: 1, name: "United States" },
    { id: 2, name: "Australia" },
    { id: 3, name: "Canada" },
    { id: 4, name: "Brazil" },
    { id: 5, name: "England" }
  ];
  networks = [
    { id: 1, name: "Facebook" },
    { id: 2, name: "Instagram" },
    { id: 3, name: "TikTok" },
    { id: 4, name: "YouTube" }
  ];
  budget = 0;

  constructor(private ngWizardService: NgWizardService){
    
  }

  ngOnInit(): void {
  }

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      // toolbarExtraButtons: [
      //   { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      // ],
    }
  };

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }
  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }
  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }
  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

  isValidTypeBoolean: boolean = true;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    const titleLabelObj = document.getElementById('title_Label')
    const titleObj = document.getElementById('title')

    if(this.tutorial.title == '') {
      if (titleLabelObj) titleLabelObj.style.color = '#ff0000'
      if (titleObj) titleObj.style.borderColor = '#ff0000'
      window.scrollTo(0,0);

      return false;
    }
    if (titleLabelObj) titleLabelObj.style.color = '#212529'
    if (titleObj) titleObj.style.borderColor = '#ced4da'

    return true;
  }
  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }

  validate(): void {
    const titleLabelObj = document.getElementById('title_Label')
    const titleObj = document.getElementById('title')

    if(this.tutorial.title == '') {
      if (titleLabelObj) titleLabelObj.style.color = '#ff0000'
      if (titleObj) titleObj.style.borderColor = '#ff0000'
    } else {
      if (titleLabelObj) titleLabelObj.style.color = '#212529'
      if (titleObj) titleObj.style.borderColor = '#ced4da'
    }
  }

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      accounts: this.tutorial.accounts
    };

    // this.tutorialService.create(data)
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.submitted = true;
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      accounts: [],
      published: false
    };
  }
}
