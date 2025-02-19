namespace GlobalTypes {
  export interface BaseWrapperProps {
    children?: React.ReactNode;
  }

  export interface ServerResponseParams<TResponseData = null> {
    isSuccess: boolean;
    message: string;
    data?: TResponseData;
  }

  export interface LabelValuePairProps {
    label: string;
    value: string;
  }
}
export default GlobalTypes;
