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
    private router: Router
  ) {
    this.fireAuth.onAuthStateChanged((user) => {
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

  async login(email: string, password: string) {
    try {
      const userCredential = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const userDoc = await this.firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .toPromise();
        const userData = userDoc?.data() as UserData;

        if (userData) {
          const tokenData = JSON.stringify({
            role: userData.role,
            email: userData.email,
          });

          const encodedToken = btoa(tokenData);

          localStorage.setItem('token', encodedToken);

          this.router.navigate([
            userData.role === 'admin' ? '/admin-panel' : '/dashboard',
          ]);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
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
