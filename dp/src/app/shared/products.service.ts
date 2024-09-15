import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firestore: AngularFirestore) {}

  // products = [
  //   {
  //     id: 1,
  //     name: 'Nike Air Max 270',
  //     category: 'Footwear',
  //     size: '42',
  //     brand: 'Nike',
  //     price: 129.99,
  //     quantity: 2,
  //     img: 'https://images.unsplash.com/photo-1603286344070-7e1c5c7d6110?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG5pa2UlMjBhaXIgbWF4JTIwMjcwfGVufDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 2,
  //     name: 'Tommy Hilfiger Polo Shirt',
  //     category: 'Casual',
  //     size: 'M',
  //     brand: 'Tommy Hilfiger',
  //     price: 59.99,
  //     quantity: 3,
  //     img: 'https://images.unsplash.com/photo-1567205187-d1c5c6d3057f?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHRvbW15JTIwaGlsZmlnZXJ8ZW58MTYwNjE3NDI4Ng&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 3,
  //     name: 'Adidas Ultraboost Running Shoes',
  //     category: 'Footwear',
  //     size: '43',
  //     brand: 'Adidas',
  //     price: 149.99,
  //     quantity: 1,
  //     img: 'https://images.unsplash.com/photo-1603805027236-046c03eb6b0d?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGFkaWRhcyUyMHVsdHJhbG9vdHN8ZW58MTYwNjE3NDI4Ng&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 4,
  //     name: "Levi's 501 Original Fit Jeans",
  //     category: 'Casual',
  //     size: '32',
  //     brand: "Levi's",
  //     price: 89.99,
  //     quantity: 2,
  //     img: 'https://images.unsplash.com/photo-1594794820190-d71e7e2c2144?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGxldmlzb2NpdG91c3xlbnwwfDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 5,
  //     name: 'The North Face Nuptse Jacket',
  //     category: 'Outerwear',
  //     size: 'L',
  //     brand: 'The North Face',
  //     price: 199.99,
  //     quantity: 1,
  //     img: 'https://images.unsplash.com/photo-1531132226228-2b60ef8f14f0?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNoYW5lbCpmcmF0ZXJlfGVufDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 6,
  //     name: 'Calvin Klein Boxer Briefs (3-Pack)',
  //     category: 'Underwear',
  //     size: 'M',
  //     brand: 'Calvin Klein',
  //     price: 29.99,
  //     quantity: 5,
  //     img: 'https://images.unsplash.com/photo-1572567991181-0b1cbe788fc6?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJveGVyfGVufDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 7,
  //     name: 'Puma Essentials Hoodie',
  //     category: 'Casual',
  //     size: 'L',
  //     brand: 'Puma',
  //     price: 49.99,
  //     quantity: 2,
  //     img: 'https://images.unsplash.com/photo-1580252014693-0dbe7c5d3c3a?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExcHxlc3NlbnRpYWxzfGVufDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 8,
  //     name: 'Under Armour Training Shorts',
  //     category: 'Sportswear',
  //     size: 'L',
  //     brand: 'Under Armour',
  //     price: 34.99,
  //     quantity: 4,
  //     img: 'https://images.unsplash.com/photo-1571146861191-87b3f7e5d510?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHVuZGVyJTIwYXJtdXIlMjB0cmFpbmluZ3xlbnwwfDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 9,
  //     name: 'Ralph Lauren Cotton Sweater',
  //     category: 'Formalwear',
  //     size: 'M',
  //     brand: 'Ralph Lauren',
  //     price: 89.99,
  //     quantity: 1,
  //     img: 'https://images.unsplash.com/photo-1603707018180-036b94770a06?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHJhbHBoJTIwbGF1cmVuJTIwc3dlYXRlc3xlbnwwfDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 10,
  //     name: 'Hugo Boss Leather Belt',
  //     category: 'Accessories',
  //     size: 'One Size',
  //     brand: 'Hugo Boss',
  //     price: 39.99,
  //     quantity: 3,
  //     img: 'https://images.unsplash.com/photo-1592237937241-535ff44657ea?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExcHxlY29ub21pZXxlbnwwfDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 11,
  //     name: 'Nike Dri-FIT Training T-Shirt',
  //     category: 'Sportswear',
  //     size: 'S',
  //     brand: 'Nike',
  //     price: 24.99,
  //     quantity: 2,
  //     img: 'https://images.unsplash.com/photo-1571523930914-56a380b5b71b?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG5pa2UlMjBkcmlfRklUfGVufDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 12,
  //     name: 'Adidas Originals Trefoil Hoodie',
  //     category: 'Casual',
  //     size: 'L',
  //     brand: 'Adidas',
  //     price: 64.99,
  //     quantity: 1,
  //     img: 'https://images.unsplash.com/photo-1582037894712-4c0736de7270?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFkaWRhcyUyMG9yaWdpbmFsc3xlbnwwfDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 13,
  //     name: 'Calvin Klein Slim Fit Dress Shirt',
  //     category: 'Formalwear',
  //     size: 'S',
  //     brand: 'Calvin Klein',
  //     price: 79.99,
  //     quantity: 2,
  //     img: 'https://images.unsplash.com/photo-1583711205383-e13a9b730507?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJveGVyfGVufDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 14,
  //     name: 'Burberry Classic Check Scarf',
  //     category: 'Accessories',
  //     size: 'One Size',
  //     brand: 'Burberry',
  //     price: 199.99,
  //     quantity: 1,
  //     img: 'https://images.unsplash.com/photo-1581280799710-2c56a55d5763?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExcHxlY2hlY2t8ZW58MTYwNjE3NDI4Ng&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 15,
  //     name: 'Reebok Classic Leather Sneakers',
  //     category: 'Footwear',
  //     size: '44',
  //     brand: 'Reebok',
  //     price: 89.99,
  //     quantity: 1,
  //     img: 'https://images.unsplash.com/photo-1602087391315-1e9f91e8f282?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHJlYm9va3xlbnwwfDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 16,
  //     name: 'Diesel Black Gold Jacket',
  //     category: 'Outerwear',
  //     size: 'M',
  //     brand: 'Diesel',
  //     price: 249.99,
  //     quantity: 1,
  //     img: 'https://images.unsplash.com/photo-1560953063-f84a62901826?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJveGVyfGVufDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 17,
  //     name: 'Tommy Hilfiger Denim Shorts',
  //     category: 'Casual',
  //     size: '32',
  //     brand: 'Tommy Hilfiger',
  //     price: 49.99,
  //     quantity: 3,
  //     img: 'https://images.unsplash.com/photo-1588256095296-30d27e6b20a7?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHRvbW15JTIwaGlsZmlnZXJ8ZW58MTYwNjE3NDI4Ng&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 18,
  //     name: 'Jockey Performance Boxer Briefs',
  //     category: 'Underwear',
  //     size: 'L',
  //     brand: 'Jockey',
  //     price: 34.99,
  //     quantity: 4,
  //     img: 'https://images.unsplash.com/photo-1561410795-90673077f8b6?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJveGVyfGVufDE2MDYxNzQ2NTg&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 19,
  //     name: 'Gucci GG Marmont Bag',
  //     category: 'Accessories',
  //     size: 'One Size',
  //     brand: 'Gucci',
  //     price: 2299.99,
  //     quantity: 1,
  //     img: 'https://images.unsplash.com/photo-1588256362261-4df1a19d302e?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExcHxlY2hlY2t8ZW58MTYwNjE3NDI4Ng&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  //   {
  //     id: 20,
  //     name: 'Mango Basic Turtleneck',
  //     category: 'Casual',
  //     size: 'S',
  //     brand: 'Mango',
  //     price: 39.99,
  //     quantity: 3,
  //     img: 'https://images.unsplash.com/photo-1572035410124-1dc3e962d7fc?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExcHxlbW9vcmV8ZW58MTYwNjE3NDI4Ng&ixlib=rb-1.2.1&q=80&w=400',
  //   },
  // ];
  // async addProducts() {
  //   this.products.forEach(async (product) => {
  //     try {
  //       await this.firestore.collection('products').add(product);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // }

  getProducts(): Observable<any[]> {
    return this.firestore
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Object;
            const id = a.payload.doc.id; // Get the document ID
            return { id, ...data } as Product;
          })
        )
      );
  }

  addProductToFavorites(userID: string, product: Product): void {
    const userRef = this.firestore.collection('users').doc(userID);

    userRef.get().subscribe((doc) => {
      if (doc.exists) {
        const userData = doc.data() as any;
        const favorites = userData.favorites;

        const productExists = favorites.some(
          (fav: Product) => fav.id === product.id
        );

        if (!productExists) {
          favorites.push(product);
          userRef
            .update({
              favorites: favorites,
            })
            .then(() => {
              alert('Product added to favorites');
            })
            .catch((error) => {
              console.error('Error updating favorites: ', error);
            });
        } else {
          alert('This product is already in favorites');
        }
      }
    });
  }
}
