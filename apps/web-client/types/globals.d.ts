namespace GlobalTypes {
  export interface BaseWrapperProps {
    children?: React.ReactNode;
  }
  export interface ServerResponseParams<TResponseData = null> {
    isSuccess: boolean;
    message: string;
    data?: TResponseData;
  }
  export interface SelectItemProps {
    label: string;
    value: string;
  }
  export namespace Auth {
    export namespace Public {
      export interface RegisterProps {
        fullName: string;
        email: string;
        password: string;
      }
      export interface LoginProps {
        email: string;
        password: string;
      }
    }
    export namespace Protected {
      export interface AuthValidationProps {
        isAuthenticated: boolean;
      }
      export interface UserDetailsProps {
        fullName: string;
        email: string;
        isActive: boolean;
        isLocked: boolean;
      }
    }
  }
}
export default GlobalTypes;
