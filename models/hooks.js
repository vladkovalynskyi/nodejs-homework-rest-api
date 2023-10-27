// Функція для обробки помилок під час збереження
export const handleSaveError = (error, data, next) => {
  const { name, code } = error;
  // Встановлюємо статус 409 для конфліктів унікальності, інакше 400
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

// Функція для налаштування параметрів під час оновлення
export const runValidatorsAtUpdate = function (next) {
  // Встановлюємо параметри для виконання валідаторів та отримання нового об'єкта
  this.options.runValidators = true;
  this.options.new = true;
  next();
};
