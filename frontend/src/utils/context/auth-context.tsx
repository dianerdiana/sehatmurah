import { createContext, useContext, useEffect, useState } from 'react';

import type { AxiosResponse } from 'axios';

import { api } from '@/configs/api-config';

import type { LoginResponse } from '@/modules/auth/auth.response';
import type { LoginDto } from '@/modules/auth/auth.schema';

import { createAbility } from '@/utils/utils';

import type { AbilityRule } from '@/types/ability-rule.type';
import type { ApiResponse } from '@/types/api-response.type';
import { UserRole } from '@/types/enums/user-role.enum';
import type { UserData } from '@/types/user-data.type';

import { toApiError } from '../api-error.util';

import { AbilityContext } from './ability-context';

export type AuthContextType = {
  isAuthenticated: boolean;
  isInitialLoading: boolean;
  login: (credentials: any) => Promise<ApiResponse<LoginResponse>>;
  register: (credentials: any) => Promise<ApiResponse<LoginResponse>>;
  logout: () => Promise<void>;
  userData: UserData;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const ability = useContext(AbilityContext);

  const updateAbility = (permissions: AbilityRule[]) => {
    const newAbility = createAbility(permissions);
    ability.update(newAbility.rules);
  };

  const login = async (credentials: any): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await api.post<LoginDto, ApiResponse<LoginResponse>>('/auth/login', credentials);

      if (response.data.status === 'success') {
        const { data } = response.data;
        updateAbility(data.user.permissions);
        api.setToken(data.token);
        setUserData(data.user);
        setIsInitialLoading(false);
      }

      return response.data;
    } catch (error) {
      throw toApiError(error);
    }
  };

  const register = async (credentials: any): Promise<AxiosResponse<ApiResponse<LoginResponse>> | any> => {
    try {
      const response = await api.register(credentials);

      setIsInitialLoading(false);

      return response.data;
    } catch (error) {
      throw toApiError(error);
    }
  };

  const logout = async () => {
    await api.logout();

    setUserData(null);
  };

  useEffect(() => {
    const token = api.getToken();

    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsInitialLoading(false);
      return;
    }

    const bootstrap = async () => {
      try {
        const response = await api.get<ApiResponse<UserData>>('/auth/me');

        if (response.data.status === 'success') {
          setUserData(response.data.data);
          updateAbility(response.data.data.permissions);
        }
      } finally {
        setIsInitialLoading(false);
      }
    };

    void bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!userData,
        isInitialLoading,
        login,
        register,
        logout,
        userData: userData
          ? userData
          : ({
              id: '',
              role: UserRole.PATIENT,
              name: '',
              email: '',
            } as UserData),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
