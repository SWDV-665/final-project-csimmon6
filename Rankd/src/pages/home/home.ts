import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: HttpClientModule) {

  }

  //base url variable
  baseUrl = "http://localhost:8080"

  //variable for list title
  list_title = '';

  //array for populating list-builder
  list_b = [
    
  ];

  //array of list arrays for populating newsfeed
  feed = [

  ];

  //functions to hide irrelevant elements on startup
  ngOnInit() {
    if (this.list_b.length == 0) {
      document.getElementById('post_button').style.display = 'none';
      document.getElementById('help_note').style.display = 'none';
    }

    if (this.feed.length == 0) {
      document.getElementById('no_posts').innerHTML = 'No posts to show right now :\'(';
    } else {
      document.getElementById('no_posts').innerHTML = 'Slide items left to give them a thumbs up!';
    }
  };

  //function to add item to list
  addItem() {
    const prompt = this.alertCtrl.create({
      title: 'Add an Item!',
      inputs: [
          {
            name: 'title',
            placeholder: 'Give your list a title',
            value: this.list_title
          },
        {
          name: 'value',
          placeholder: 'Write your list item here'
        }
      ],

      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: item => {
            console.log('Add clicked');
            this.list_b.push(item);
            this.list_title = item.title;
            //show relevant items when list is populated
            document.getElementById('post_button').style.display = 'block';
            document.getElementById('help_note').style.display = 'block';
          }
        }
      ]
    });
    prompt.present();
  }

  //function to edit item from list
  editItem(index, oldValue) {
    oldValue = oldValue.value;
    const prompt = this.alertCtrl.create({
      title: 'Make some changes!',
      inputs: [
        {
          name: 'value',
          value: oldValue.value,
        },
      ],

      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Save clicked');
            this.list_b[index] = item;
          }
        }
      ]
    });
    prompt.present();
  }
  
  //function to remove item from list
  deleteItem(index) {
    this.list_b.splice(index,1);
  }

  //function to add a built list to the newsfeed
  //sans data persistance
  postList(list, post_title) {
    //store the title and list array together in the
    //array which populates the newsfeed
    this.feed.push(
      {
        title: post_title
      },
      {
        list: list
      }
    );
    this.list_b = [];

    //hide/show irrelevant/relevant elements
    document.getElementById('post_button').style.display = 'none';
    document.getElementById('help_note').style.display = 'none';
    document.getElementById('no_posts').innerHTML = '';
    this.list_title = '';
  };
}