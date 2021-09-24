import { NavController } from '@ionic/angular';
import { environement } from './../../models/environements';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Article } from 'src/models/article-interface';
import { Observable } from 'rxjs';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  articles : Article[];
  isUserLoggedIn: boolean;
  constructor(private http: HttpClient , private storage : NativeStorage, private photoViewer: PhotoViewer, private navCtrl: NavController, private route: Router, private fb: Facebook) {
   
     //this.loadData();
  }

  ngOnInit() {
     // on appelle la methode pour charger tous les articles
    this.loadData()
    .subscribe((data: Article[]) => {
      // on stocke les articles dans 'articles'
      this.articles = data;
    })
  }

  //  Voici la methode pour charger les articles
  loadData() : Observable<Article[]> {
    let url: string = `${environement.api_url}/articles`;
    return this.http.get<Article[]>(url);
      
  }
  // Grace à cette methode on se déplace sur la page 'create-product'
  goToCreate() {
    this.navCtrl.navigateForward('/create-product');
  }

  
  //  Voici la methode pour utiliser le pull refresh
  doRefresh($event) {
    this.loadData()
    .subscribe((data: Article[]) => {
      console.log('articles à partir de doRefresh', data);
      this.articles = data;
        $event.target.complete();
    })
  }

  // methode pour visionner une image avec option de partage
  showImage(imgId: string, imgTitle: string, event) {
    event.stopPropagation();
    this.photoViewer.show(`http://192.168.43.61:3000/api/Containers/photos/download/${imgId}`, 
    //this.photoViewer.show(`${environement.api_url}/Containers/photos/download/${imgId}`,
    imgTitle, {share: true});
  }

    // Grace à cette methode on se déplace sur la page 'product-detail'
  showDetails(id: string) {
    this.navCtrl.navigateForward('/product-detail/'+id)
  }

  // on trie le tableau pour n'afficher que les articles dont le nom en miniscule
  // est égale à la valeur (en minuscule) entrée dans le champs
  onSearch(event) {
    let value: string = event.target.value;
    if(value) {
      this.articles = this.articles.filter((article) => {
        return article.title.toLowerCase().includes(value.toLowerCase());
      })
    }
  }
  onCancel(event) {
    this.loadData()
    .subscribe((data: Article[]) => {
      console.log('articles à partir de doRefresh', data);
      this.articles = data;
    })
  }


  goTo(route: string) : void {
    console.log('route', route);
    this.navCtrl.navigateForward(`/${route}`);
  }

  

  logout(){
    this.storage.setItem('isLoggedIn', true);
    this.storage.setItem('Utilisateur', null);
    this.navCtrl.navigateRoot('/intro');
  }
  

}
