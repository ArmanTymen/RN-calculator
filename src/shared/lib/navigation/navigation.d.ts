import { AllScreensParamList } from './types'

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends AllScreensParamList {}
  }
}
