import React, { ChangeEvent } from 'react';
import * as Yup from 'yup';
import { NOTIFICATION_RESOURCE, NOTIFICATION_TYPE } from './notificationsEnums';
import { INotification } from './types';
import { INPUT_NUMBER, PASSWORD_REG } from './constants';

export const validateEmail = (value: string) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
};

export const validatePhone = (value: string) => {
  return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);
};

export const validateNumber = (value: string) => {
  return /^\d+$/.test(value);
};

export const validateString = (value: string) => {
  return /[а-яёА-ЯЁ]+$/.test(value);
};

export const validateFrame = (value: string) => {
  return /[а-яёА-ЯЁ]+$/.test(value);
};

export const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  middleName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  phone: Yup.string()
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Некорректные данные')
    .required('Required'),
  dateOfBirth: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  street: Yup.string()
    .matches(/[а-яёА-ЯЁ]+$/, 'Некорректные данные')
    .required('Required'),
  house: Yup.string()
    .matches(/^\d+$/, 'Некорректные данные')
    .required('Required'),
  frame: Yup.string()
    .matches(/[а-яёА-ЯЁ]+$/, 'Некорректные данные')
    .required('Required'),
  apartament: Yup.string()
    .matches(/^\d+$/, 'Некорректные данные')
    .required('Required'),
  oldPassword: Yup.string()
    .matches(PASSWORD_REG, 'Некорректные данные')
    .required('Required'),
  newPassword: Yup.string()
    .matches(PASSWORD_REG, 'Некорректные данные')
    .required('Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Пароли должны совпадать'
  ),
});

export const validateShopSettings = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  logo: Yup.string().nullable(),
  userId: Yup.number().required('Required'),
  wallpaper: Yup.string().nullable(),
  telephone: Yup.string()
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Некорректные данные')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  address: Yup.string().required('Required'),
  language: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  legalEntity: Yup.string().required('Required'),
  inn: Yup.string().length(10, 'INN must have 10 numbers').required('Required'),
  kpp: Yup.string().length(9, 'KPP must have 9 numbers').required('Required'),
  legalAddress: Yup.string().required('Required'),
  bank: Yup.string().required('Required'),
  bik: Yup.string().length(9, 'BIK must have 9 numbers').required('Required'),
  checkAccount: Yup.string()
    .length(20, 'Account must have 20 numbers')
    .required('Required'),
  corpAccount: Yup.string()
    .length(20, 'Account must have 20 numbers')
    .required('Required'),
  notifyEmail: Yup.array().ensure().max(3).nullable(),
  notifyPush: Yup.array().ensure().max(3).nullable(),
  notifyTelephone: Yup.array().ensure().max(3).nullable(),
  newPassword: Yup.string().nullable(),
  oldPassword: Yup.string().nullable(),
});

export const validatePassword = (value: string) => {
  return PASSWORD_REG.test(value);
};

export const isEmpty = (value: string) => value.trim().length;

export const validatePasswordConfirm = (password: string) => {
  return (confirm: string) => password === confirm;
};

export const validateFirstName = (value: string) => {
  return /[а-яёА-ЯЁ]+/.test(value);
};

export const validatePercentNumber = (value: string) => Number(value) < 100;

export const validateConditionNumber = (value: string) => Number(value) > 1;

export const validateDiscountName = (value: string) => {
  return /^[аa-яёzАA-ЯЁZ_0-9]+/.test(value) && value.length <= 20;
};

export const setAndValidateInputs = (
  e: ChangeEvent<HTMLInputElement>,
  setCallback: React.Dispatch<any>,
  validateCallback: React.Dispatch<any>,
  validateFunc: (arg0: any) => any,
  inputType: string
) => {
  const { value } = e.target;
  const valid = validateFunc(value);
  if (inputType === INPUT_NUMBER) setCallback(Number(value));
  else setCallback(value);
  validateCallback(valid);
};

export const setNotifications = (
  orderEmail: boolean,
  messagesEmail: boolean,
  newsEmail: boolean,
  orderPhone: boolean,
  messagesPhone: boolean,
  newsPhone: boolean,
  orderPush: boolean,
  messagesPush: boolean,
  newsPush: boolean
): INotification[] => [
  {
    type: NOTIFICATION_TYPE.email,
    resource: NOTIFICATION_RESOURCE.orders,
    is_active: orderEmail,
  },
  {
    type: NOTIFICATION_TYPE.email,
    resource: NOTIFICATION_RESOURCE.message,
    is_active: messagesEmail,
  },
  {
    type: NOTIFICATION_TYPE.email,
    resource: NOTIFICATION_RESOURCE.news,
    is_active: newsEmail,
  },
  {
    type: NOTIFICATION_TYPE.phone,
    resource: NOTIFICATION_RESOURCE.orders,
    is_active: orderPhone,
  },
  {
    type: NOTIFICATION_TYPE.phone,
    resource: NOTIFICATION_RESOURCE.message,
    is_active: messagesPhone,
  },
  {
    type: NOTIFICATION_TYPE.phone,
    resource: NOTIFICATION_RESOURCE.news,
    is_active: newsPhone,
  },
  {
    type: NOTIFICATION_TYPE.push,
    resource: NOTIFICATION_RESOURCE.orders,
    is_active: orderPush,
  },
  {
    type: NOTIFICATION_TYPE.push,
    resource: NOTIFICATION_RESOURCE.message,
    is_active: messagesPush,
  },
  {
    type: NOTIFICATION_TYPE.push,
    resource: NOTIFICATION_RESOURCE.news,
    is_active: newsPush,
  },
];
