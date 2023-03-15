import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../models/User/User';
import UserService from '../../http/services/UserService';
import { UserDto } from '../../models/User/UserDto';
import { UserAttributes } from '../../models/User/UserAttributes';
import { usersActions } from '../slices/users';
import { handleAxiosError } from '../../utils/handleAxiosErrors';

export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await UserService.getAllUsers();
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const getUserById = createAsyncThunk<User, string, { rejectValue: string }>(
  'users/getUserById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await UserService.getUserById(id);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const createUser = createAsyncThunk<void, UserDto, { rejectValue: string }>(
  'users/createUser',
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await UserService.createUser(body);
      dispatch(usersActions.addUser(data));
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const updateUser = createAsyncThunk<void, UserAttributes, { rejectValue: string }>(
  'users/updateUser',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const { id, ...body } = user;
      const { data } = await UserService.updateUser(id, body);

      dispatch(usersActions.updateUser(data));
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const deleteUser = createAsyncThunk<void, string, { rejectValue: string }>(
  'users/deleteUser',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await UserService.deleteUser(id);
      dispatch(usersActions.deleteUser(id));
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
