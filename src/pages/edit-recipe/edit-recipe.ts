import { Component,OnInit } from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from"../../services/recipes";



@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
 mode = 'New';
 selectOptions = ['Easy', 'Medium','Hard'];
 recipeForm: FormGroup;

  constructor(public navCtrl: NavController,
              private actionSheetController: ActionSheetController,
              public navParams: NavParams,
              private alertCtrl:AlertController,
              private toastCtrl: ToastController,
              private recipesService: RecipesService) {
  }
  ngOnInit(){
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }
  onSubmit(){
    const value = this.recipeForm.value;
    const ingredients = [];
    if(value.ingredients.length > 0){
      const ingredients = value.ingredients.map(name => {
        return {name: name, amount:1};
      } );
    }
    this.recipesService.addRecipe(value.title,value.description, value.difficulty,
      value.ingredients);
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

private initializeForm(){
   this.recipeForm = new FormGroup({
     'title':new FormControl(null, Validators.required),
     'description':new FormControl(null, Validators.required),
     'difficulty': new FormControl('medium', Validators.required),
     'ingredients': new FormArray([])
   });
}
  onManageIngredients(){
    const actionSheet = this.actionSheetController.create({
      title:'what do u want to do',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: ()=> {
            this.createNewIngredientsAlert().present();
          }
        },
        {
          text:'remove all Ingredients',
          role:'destructive',
          handler: ()=> {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len-1; i>=0; i--){
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: ' All Ingredients were deleted ',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
            }

          }
        },
        {
          text: 'cancel',
          role:'cancel'
        }
      ]
    } );
    actionSheet.present();
  }
  private createNewIngredientsAlert(){
    return this.alertCtrl.create({
      title:'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder:'Name'
        }
      ],
      buttons: [
        {
          text:'cancel',
          role:'cancel'
        },
        {
          text:'Add',
          handler:data =>{
            if(data.name.trim() == ''|| data.name == null){
              const toast = this.toastCtrl.create({
                message: 'please enter a valid value',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray> this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'please enter a valid value',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }

        }
      ]

    });

  }

}
