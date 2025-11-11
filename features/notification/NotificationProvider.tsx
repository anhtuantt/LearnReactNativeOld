import { RealmProvider } from '@realm/react';
import { PropsWithChildren } from 'react';
import { Notification } from '../database/model/Notification';
import Realm from 'realm';
import RealmPlugin from 'realm-flipper-plugin-device';

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const realm = new Realm({
    path: 'default.realm',
    schema: [Notification],
  });

  return (
    <RealmProvider schema={[Notification]}>
      {__DEV__ && <RealmPlugin realms={[realm]} />}
      {children}
    </RealmProvider>
  );
};

export default NotificationProvider;
