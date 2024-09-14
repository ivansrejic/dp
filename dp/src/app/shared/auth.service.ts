import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserData } from '../models/user-data.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.firestore
          .collection('users')
          .doc(user.uid)
          .valueChanges()
          .subscribe((userData) => {
            this.userSubject.next(userData);
          });
      } else {
        this.userSubject.next(null);
      }
    });
  }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        alert('Error loggin in');
        this.router.navigate(['/login']);
      }
    );
  }

  async register(userData: UserData) {
    try {
      const userCredential = await this.fireAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );

      const userId = userCredential.user?.uid;
      const { password, ...userInfo } = userData;

      if (userId) {
        await this.firestore.collection('users').doc(userId).set(userInfo);
        console.log('User registration is successfull');
        this.router.navigate(['/login']);
      } else {
        throw new Error('User ID is not available');
      }
    } catch (err) {
      console.log('Error registing user', err);
    }
  }

  logout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
