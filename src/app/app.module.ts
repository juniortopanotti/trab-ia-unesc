import { GamePage } from "./../pages/game/game";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { MinMaxProvider } from '../providers/min-max/min-max';

@NgModule({
  declarations: [MyApp, GamePage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, GamePage],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    MinMaxProvider],
})
export class AppModule {}
