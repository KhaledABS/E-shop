import { NavController } from '@ionic/angular';
import { environement } from './../../models/environements';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from './../../models/utilisateur-interface';
import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from '../app-models';
import { AppService } from '../app.service';



@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
utilisateur = {} as Utilisateur;
  route: any;
  user: User = new User();
  constructor( private fb: Facebook, private storage : NativeStorage, private http: HttpClient,
      private navCtrl: NavController, private service : AppService) { }
    
  

  ngOnInit() {
    console.log('intro')
  }

  //  Grace a cette methode on va pouvoir se connecter en passant par facebook
  loginWithFacebook() : void {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        this.fb.api('me?fields=email', [])
          .then(async profil => {
            console.log('return with profile', profil)
            let email: string = profil['email'];
            // on crée l'objet 'utilisateur'
            this.utilisateur = {
              contact : email,
              type: 'email',
              avatar: "",
              username: ""
            }
            
            // stocker utilisateur dans MongoDB
            let url : string = `${environement.api_url}/utilisateurs`;
            this.http.post(url, this.utilisateur)
            .subscribe(async user => {
              await this.storage.setItem('isLoggedIn', true);
              await this.storage.setItem('Utilisateur', user);
                  // naviguer vers la page d'acceuil
                  this.navCtrl.navigateRoot('/home');
                }, err => console.log('our srver err',err) )
          }).catch(error => console.log('facebook err', error)
          )
      })
      .catch(e => console.log('Error logging into Facebook', e));
      }

      //deconnexion
      login() {
        this.service.login(this.user).subscribe(
          res => {
           if (res) {
           this.storage.setItem('isLoggedIn', true);
           this.storage.setItem('Utilisateur', res);
           this.navCtrl.navigateRoot('/home');
           }
  
          }
        )


      }
       

}
