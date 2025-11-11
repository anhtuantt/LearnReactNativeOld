import { Realm } from '@realm/react';
export interface INotification {
    title: string;
    message: string;
    type: EINotificationType;
    orderNo: string;
}

export enum EINotificationType {
    Alert = 0,
    Success = 1,
    ReNew = 2,
}

export class Notification extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  message!: string;
  isRead!: boolean;
  type!: number;
  orderNo!: string;
  createdAt!: Date;

  static generate(data: INotification) {
    return {
      _id: new Realm.BSON.ObjectId(),
      title: data.title,
      message: data.message,
      isRead: false,
      type: data.type,
      orderNo: data.orderNo,
      createdAt: new Date(),
    };
  }

  static schema:Realm.ObjectSchema = {
    name: 'Notification',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      message: 'string',
      isRead: { type: 'bool', default: false },
      type: 'int',
      orderNo: 'string',
      createdAt: 'date',
    },
  };
}
