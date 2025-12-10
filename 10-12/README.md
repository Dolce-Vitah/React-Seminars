## Чеклист реализации

### 1. Управление пользователями (RTK Query)
Логика реализована в `src/api/usersApi.ts` и `src/components/UserManager.tsx`.

- [x] **Просмотр списка пользователей**
  - [x] Использован `RTK Query GET` endpoint (`getUsers`).
  - [x] В UI отображается список в формате: `name + email`.
- [x] **Добавление нового пользователя**
  - [x] Реализована UI-форма для ввода имени и email.
  - [x] Использован `RTK Query POST` mutation (`addUser`).
  - [x] Реализовано обновление списка после создания (использован механизм тегов: `invalidatesTags: ['User']`).
- [x] **Редактирование пользователя**
  - [x] Реализована форма редактирования (заполнение данными выбранного пользователя).
  - [x] Использован `RTK Query PUT` mutation (`updateUser`).

### 2. Продвинутая работа с Axios
Логика реализована в `src/api/axiosClient.ts` и `src/components/AxiosDemo.tsx`.

- [x] **Отмена запроса (AbortController)**
  - [x] Создана отдельная кнопка для GET запроса через Axios.
  - [x] Создана кнопка «Отменить загрузку».
  - [x] Реализована логика отмены через `AbortController` и `signal`.
  - [x] Добавлена обработка ошибки `axios.isCancel` для корректного отображения статуса.
- [x] **Axios Interceptors**
  - [x] Реализован `request interceptor`.
  - [x] Автоматическое добавление `baseURL`.
  - [x] Автоматическое добавление заголовка `Authorization: Bearer demo-token`.


