import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate({ name, params } as never);
  }
}

export function reset(name: string, index: number) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: index,
        routes: [{ name: name as never }],
      }),
    );
  }
}
