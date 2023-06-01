import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';


import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private angularStorage: AngularFireStorage) { 
    
  }

  public deleteFileStorage(fullPath: string, element: string) {
    const obj: any = this.getPathAndFileName(fullPath); 
    const storageRef = this.angularStorage.ref(obj.path);
   
    storageRef.child(obj.imageName).delete();
  }

  private getPathAndFileName(fullPath: string) {
    let path = '';
    const length = fullPath.split('/').length - 1;
    const imageName = fullPath.split('/')[fullPath.split('/').length - 1];
    
    for (let i = 0; i < length; i++) {
      path +=  `${fullPath.split('/')[i]}/`;
    }

    return { path: path,  imageName: imageName};

  } 


}
