import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { IMessage } from '../../models/message';
import { DUMMY_MESSAGES } from '../constants/dummy-messages';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesSource = new BehaviorSubject([]);
  private messages$: Observable<IMessage[]>;
  constructor() {
    this.messages$ = this.messagesSource.asObservable();
    this.messagesSource.next(
      DUMMY_MESSAGES.map((message) => this.processMessage(message))
    );
  }

  removeMessage(message: IMessage) {
    return this.messages$.pipe(
      first(),
      tap((messages) => {
        const msgs = [...messages];
        msgs.splice(msgs.indexOf(message), 1);
        this.messagesSource.next([...msgs]);
      })
    );
  }

  addMessage(message: IMessage) {
    return this.messages$.pipe(
      first(),
      tap((messages) => {
        this.messagesSource.next([...messages, message]);
      })
    );
  }

  /**
   * @author Ahsan Ayaz
   * This function currently sends a dummy list of messages (after processing the messages)
   * @return {Observable}
   */
  getMessages(): Observable<Array<IMessage>> {
    return this.messages$;
  }

  getMessageById(id: number): Observable<IMessage> {
    return this.messages$.pipe(
      map((messages) => {
        const message = messages.find((msg) => msg.id === id);
        return message;
      })
    );
  }

  /**
   * @author Ahsan Ayaz
   * Returns an array of messages after processing it. Currently puts random userId and userImage url.
   * @param message {Array<IMessage>}
   * @return {Array<IMessage>}
   */
  processMessage(message: IMessage): IMessage {
    const id = Math.ceil(Math.random() * 3 + 1);
    return {
      ...message,
      userId: id,
      userImage: `assets/images/users/${id}.jpg`,
    };
  }
}
