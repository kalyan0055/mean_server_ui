import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx'; 
import { Http, Headers, Response, RequestOptions } from '@angular/http';


@Injectable()
export class UploadService {
  progress$: any;
  progress: any;
  progressObserver: any;
  constructor() {
    this.progress$ = Observable.create(observer => {
      this.progressObserver = observer;
    }).share();
   
  }

  makeFileRequest(url: string, files: File[], data: any = ''): Observable<any> {
    return Observable.create(observer => {
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();
      
        
    // if user is logged in, append token to header
  
     const length: any = files.length;
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
        formData.append('length', length);
      }
     
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
             observer.next(xhr.response);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = event => {
        this.progress = Math.round(event.loaded / event.total * 100);

       // this.progressObserver.next(1);
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader("token", localStorage.getItem('token'));
      xhr.setRequestHeader("uploadpath", 'users');
      const serverFileName = xhr.send(formData);
       
      return xhr.response;
    });
  }

  mCategoryUpload( url: string, files: File[], data: any = ''): Observable<any> {
    return Observable.create(observer => {
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();
      console.log(data, 'rambabu');
      const length: any = files.length;
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
        formData.append('length', length);
        formData.append('name', data.name);
        formData.append('code', data.code);
        formData.append('type', data.type);

     }
     xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
           observer.next(xhr.response);
          observer.complete();
        } else {
          observer.error(xhr.response);
        }
      }
    };

    xhr.upload.onprogress = event => {
      this.progress = Math.round(event.loaded / event.total * 100);

     // this.progressObserver.next(1);
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader("token", localStorage.getItem('token'));
    xhr.setRequestHeader("uploadpath", 'users');
    const serverFileName = xhr.send(formData);
    return xhr.response;
    });
  }
 

  makeFileRequest_new(url: string, files: File[]): Observable<any> {
    return Observable.create(observer => {
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();
      console.log('fiules');
      const length: any = files.length;
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
        formData.append('length', length);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = event => {
        this.progress = Math.round(event.loaded / event.total * 100);

        this.progressObserver.next(this.progress);
      };
      xhr.open('POST', url, true);
      const serverFileName = xhr.send(formData);
      return serverFileName;
    });
  }

  PPEUpload(url: string, files: File[], data: any = ''): Observable<any> {
    console.log(data.username);
    
    return Observable.create(observer => {
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();
      console.log(data, 'fiules');
     // const length: any = files.length;
      for (let i = 0; i < 1; i++) {
        formData.append('file', files[i], files[i].name);
       // formData.append('length', length);
        formData.append('username',data.username);
        formData.append('mobile',data.mobile);
        formData.append('email',data.email)
        formData.append('photo',data.photo)
        formData.append('password',data.password)
        formData.append('conf_password',data.conf_password)
        formData.append('fee',data.fee)
        formData.append('course',data.course)
        formData.append('dob',data.dob)
        formData.append('id',data.id)
        formData.append('itemRows',JSON.stringify(data.itemRows))
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = event => {
        this.progress = Math.round(event.loaded / event.total * 100);
        this.progressObserver.next(this.progress);
      };
      xhr.open('POST', url, true);
      const serverFileName = xhr.send(formData);
      return serverFileName;
    });
  }
}
