import { NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Component, OnInit } from '@angular/core';
import { itemCart } from 'src/models/itemCart-interface';
import { AppService } from '../app.service';
import { Order, OrderDetail } from '../app-models';
import { Utilisateur } from 'src/models/utilisateur-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
cartItems: itemCart[];
total: number = 0;
  utilisateur: Utilisateur;
  constructor(private storage: NativeStorage, private navCtrl: NavController, private service: AppService, private router : Router) { }

  async ngOnInit() {
    // on récupère le contenu de la clé 'Cart' de notre Native Storage
    // Et on le stock dans la propriété 'cartItems' et qui est un tableau.
    this.cartItems = await this.storage.getItem("Cart");
    console.log('vvvvv',this.cartItems)
    // on parcours ce tableau afin de mettre 'zéro' comme frais de livraison
    // de tous les articles qui sont disponibles en magasin.
    this.cartItems.forEach((element: itemCart) => {
      // on calcul le prix total de ctous les articles présent dans le panier
      this.total += element.amount ;
    })
  }

  //  cette methode nous permettra de supprimer un article du panier
  async remove(index: number, item: itemCart) {
    const myTotal: number = item.amount;
    // on retire l'article du tableau 'cartItems'
    this.cartItems.splice(index, 1);
    // Ensuite on met à jour la clé 'Cart' de notre Native Storage avec le nouveau tableau
    await this.storage.setItem("Cart", this.cartItems);
    // on recalcule le total
    this.total -= myTotal;
  }
  // cette methode nous permettra de nous déplacer sur la page 'messagerie' pour contacte un vendeur
  contact(item: itemCart) {
    this.navCtrl.navigateForward(`/action-message/${'1000'}/write/${item.item.utilisateurId}`);
  }

  async commander(){
    this.utilisateur = await this.storage.getItem('Utilisateur');
    let order = new Order()
    order.orderDetails = []
    order.total = this.total
    order.utilisateurId = this.utilisateur.id
    this.cartItems.forEach(element => {
      let detail = new OrderDetail()
      detail.articleId = element.item.id
      detail.qty = element.qty
      order.orderDetails.push(detail)
    });
    this.service.orderAction(order).subscribe(
      res => {
        this.cartItems = []
        this.storage.setItem("Cart", this.cartItems);
        this.router.navigateByUrl('/home')
      }
    )

  }
}
