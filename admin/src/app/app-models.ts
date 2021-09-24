export class User {
    constructor(
        public email? : string,
        public password? : string,
      ) {}
}

export class Categ {
  constructor(
      public title? : string,
      public icon? : string,
      public description? : string,
    ) {}
}

export class Product {
  constructor(
      public title? : string,
      public description? : string,
      public pictures? : string,
      public categoryId? : string,
      public price? : number,
    ) {}
}

export class Utilisateur {
  constructor(
      public username? : string,
      public contact? : string,
      public email? : string,
      public password? : string,
      public avatar? : string,
    ) {}
}

export class Order {
  constructor(
      public utilisateurId? : string,
      public total? : number,
      public orderDetails ?: OrderDetail[]
    ) {}
}

export class OrderDetail {
  constructor(
      public articleId? : string,
      public orderId? : string,
      public qty? : number,
    ) {}
}



