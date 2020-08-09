import { GamePage } from "./../pages/game/game";
import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = GamePage;

  constructor(public platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {}
}
