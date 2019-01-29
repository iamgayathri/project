import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage({})
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  todo: FormGroup; 

  todoListItems: any = [];
  completedToDoListItems: any = [];
  listData :any= [];

  todoTasks = {
    title: "",
    description: "",
    data: "",
  }


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder) {
                
                this.todo = this.formBuilder.group({
                  title: ['', Validators.required],
                  description: [''],
                  data:['']
                } );


  }

  addForm() {
    if (this.todo.valid) {
    this.todoTasks.title = this.todo.value.title;
    this.todoTasks.description = this.todo.value.description;
    this.todoTasks.data = this.todo.value.data;

    this.todoListItems.push(this.todoTasks);
    console.log(this.todoListItems);
    this.todo.reset();
      
    }
    
  }

}
