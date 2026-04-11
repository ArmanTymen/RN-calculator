export const paymentTypeSchema = z.enum(['annuity', 'differentiated'])
differentiated = проблема тут

Percent Components Entities?

import {
  OperationConfig,
  PERCENT_OPERATIONS,
} from '@/features/percent-calculator/lib/percent-logic' ??

NdflForm => Widgets???


Общий план стандартизации (The Pattern)
Для каждого калькулятора (Currency, Savings, Vacation, Tax, Percent) структура должна быть такой:

entities/[domain]/model/schema.ts: Описание схемы через Zod. Отсюда экспортируется тип Infer. Это «закон» для данных.

entities/[domain]/model/store.ts: Маленький Zustand стор с persist. Он хранит только «сырые» данные формы.

entities/[domain]/lib/logic.ts: Чистые функции расчета. Никаких хуков, только математика.

features/[feature-name]/lib/use[Name]Form.ts: Контроллер. Здесь живет useForm с zodResolver, подписка на стор и вызов функций расчета.

widgets/[widget-name]/ui/: Глухой UI, который дергает хук и мапит данные на компоненты.

Что и где нужно исправить (Specific Tasks)

1. Калькулятор процентов (PercentagePage)
   Проблема: Логика (percent-logic.ts) лежит в features, нет слоя entities, нет Zod, нет сохранения состояния (Zustand).

Правка:

Создать entities/percent. Перенести туда percent-logic.ts.

Добавить entities/percent/model/schema.ts (Zod).

Добавить Zustand-стор для сохранения val1, val2 и operationType.

В usePercentForm добавить zodResolver.

2. Имущественный вычет (PropertyTaxDeductionForm)
   Проблема: Нет Zod-схемы, тип PropertyTaxFormSchema описан вручную как интерфейс.

Правка:

Создать entities/property-tax-form/model/schema.ts.

Заменить ручной интерфейс на z.infer<typeof propertyTaxSchema>.

Подключить резолвер в usePropertyTaxForm.

3. Калькулятор НДФЛ (NdflForm)
   Проблема: Огромный UI-компонент. useForm, useWatch и логика сброса перемешаны с версткой. Нет Zustand.

Правка:

Создать хук useNdflForm. Вынести туда все useWatch и setValue.

Создать Zustand-стор для сохранения введенного дохода и настроек (резидент/нерезидент).

Описать Zod-схему для NdflFormValues.

4. Калькулятор отпуска (VacationCalculator)
   Проблема: useForm объявлен прямо в UI. Логика модалок (setInfoContent) смешана с формой. Нет Zustand.

Правка:

Вынести логику в хук useVacationCalculator.

Zustand здесь критичен: дат много, пользователь будет расстроен, если при случайном закрытии всё слетит.

Добавить Zod-валидацию (особенно для дат, чтобы hiringDate не была позже calculationDate).

5. Конвертер валют (CurrencyConverterCalculator)
   Проблема: Логика onCalculate и swapCurrencies внутри UI. Прямой вызов useCurrencyRates (React Query) в компоненте.

Правка:

Создать хук useCurrencyConverter. Спрятать туда useCurrencyRates и всю логику пересчета.

UI должен получать только готовый result, isLoading и функции handleCalculate/handleSwap.

Правила типизации (No any)
Чтобы избежать any при работе с динамическими полями (как в имущественном вычете), используй дженерики в своих контролируемых инпутах:

TypeScript
interface ControlledInputProps<T extends FieldValues> {
control: Control<T>;
name: Path<T>;
// ...
}
Твой следующий шаг:
Выбери один модуль (например, НДФЛ или Проценты).

Создай для него Zod-схему и Zustand-стор в entities.

Напиши хук-контроллер в features.

Только после этого "вычищай" UI.
