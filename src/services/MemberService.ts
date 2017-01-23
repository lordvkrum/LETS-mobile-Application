import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Member } from '../domain/Member';
import { MEMBERS } from '../test/mock-members';

@Injectable()
export class MemberService{

    private membersArray: Array<Member>

    constructor(private settings: AppSettings,
        private httpBasicAuth: HttpBasicAuth){ }

    list(): Observable<Array<Member>> {
        
         // return this.httpBasicAuth.getWithAuth(this.settings.URL.members)
         this.membersArray = MEMBERS;
         return this.httpBasicAuth.get(this.settings.URL.config)
         .map(response => {
             return MEMBERS;
         });
    }

    getMemberWithId(id): Member {
        return this.membersArray.filter(member => member.id === id)[0];
    }

    get(id): Observable<Member> {
        return this.httpBasicAuth.getWithAuth(`${this.settings.URL.members}/${id}?depth=1`);
    }
}