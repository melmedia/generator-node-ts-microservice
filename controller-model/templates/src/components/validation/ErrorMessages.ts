export const ErrorMessages = {
  isNotEmpty: () => 'Обязательно для заполнения',
  isInt: () => 'Нужно указать целое число',
  isEmail: () => 'Нужно указать email',
  isString: () => 'Нужно указать строку',
  minLength: (length: number) => `Минимальная длина пароля ${length} символов`,
  isMobilePhone: () => 'Нужно указать телефон',
  isUrl: () => 'Нужно указать ссылку',
  isDate: () => 'Нужно указать дату',
};
