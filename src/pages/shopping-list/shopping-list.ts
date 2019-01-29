import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];
  constructor(public navCtrl: NavController,
              private slService: ShoppingListService,
              public navParams: NavParams) {
  }
ionViewEnter(){
    this.listItems = this.slService.getItems();
}

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.Amount);
    form.reset();
     this.loadItems();
  }
  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  public loadItems(){
    this.listItems = this.slService.getItems();
    console.log(this.listItems);
  }
}
